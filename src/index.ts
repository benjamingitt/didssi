/* eslint-disable new-cap */
import config from './config/config';
import express from 'express';
import {ApolloError, ApolloServer} from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolver';
import {getLogger} from './tools/Logger';
import rateLimit from 'express-rate-limit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import costAnalysis from 'graphql-cost-analysis';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import RequestLogger from './tools/RequestLogger';
import StatusCodes from './tools/StatusCodes';
import {prisma} from './tools/Prisma';
import packageJson from '../package.json';
import {mocks} from './tools/mocks';
import {addMocksToSchema, createMockStore} from '@graphql-tools/mock';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import {AccountStatus} from './generated/graphql_api';
import {GraphQLContext} from './IContext';
import path from 'path';
import multer from 'multer';
import {nanoid} from 'nanoid';
import {AddressInfo} from 'net';
import uaParse from 'ua-parser-js';
import geoip, {Lookup} from 'geoip-lite';
import {DIDTools} from './tools/DIDTools';

const log = getLogger('server');
const app = express();

if (config.server.corsEnabled) {
    app.use(cors());
}

class CostAnalysisApolloServer extends ApolloServer {
    async createGraphQLServerOptions(req: express.Request, res: express.Response) {
        const options = await super.createGraphQLServerOptions(req, res);

        options.validationRules = options.validationRules ? options.validationRules.slice() : [];
        options.validationRules.push(costAnalysis({
            variables: req.body.variables,
            maximumCost: config.server.costAnalysis.maximumCost,
            defaultCost: config.server.costAnalysis.defaultCost,
            onComplete: (costs: number) => log.trace(`costs: ${costs} (max: ${config.server.costAnalysis.maximumCost})`)
        }));

        return options;
    }
}

let schema = makeExecutableSchema({typeDefs, resolvers});

if (config.server.graphql.mocksEnabled) {
    const store = createMockStore({schema, mocks});
    schema = addMocksToSchema({
        store,
        schema,
        mocks,
        preserveResolvers: config.server.graphql.mocksPreserveResolvers
    });

    const RESET_MOCK_STORE_INTERVAL = 200;
    setInterval(() => {
        store.reset();
    }, RESET_MOCK_STORE_INTERVAL);
}

const server = new CostAnalysisApolloServer({
    schema,
    introspection: config.server.graphql.introspection,
    debug: config.server.graphql.debug,
    formatError: (err) => {
        if (err.extensions?.internalData === undefined) {
            delete err.extensions?.internalData; // remove "undefined" field from logs
        }
        const SPACES = 2;
        log.debug(JSON.stringify(err, null, SPACES));
        if (!config.server.graphql.debug && err.extensions?.stacktrace) {
            err.extensions.stacktrace = undefined;
        }
        if (err.extensions?.internalData) {
            err.extensions.internalData = undefined;
        }
        return err;
    },
    // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
    context: async ({req}): Promise<GraphQLContext> => {
        RequestLogger.logGraphQL(req);
        let authHeader = req.header('authorization');

        const BEARER_PREFIX = 'bearer ';
        if (authHeader?.toLowerCase().startsWith(BEARER_PREFIX)) {
            authHeader = authHeader?.slice(BEARER_PREFIX.length);
        }

        const session = authHeader && await prisma.accountSession.findFirst({
            where: {token: authHeader},
            include: {account: true}
        });

        if (session) {
            if (new Date().getTime() > session.expiresAt.getTime()) {
                throw new ApolloError('Session expired', String(StatusCodes.UNAUTHORIZED));
            }

            if (!session.account) {
                throw new ApolloError('Account not found', String(StatusCodes.NOT_FOUND));
            }
        } else if (authHeader) {
            throw new ApolloError('Session not found', String(StatusCodes.UNAUTHORIZED));
        }

        const account = !session ? undefined : {
            ...session.account,
            status: session.account.status as AccountStatus,
            sessions: null
        };

        let location: Lookup | null = null;
        if (session) {
            location = geoip.lookup(session.ipAddr || '');
        }
        let address = '';
        if (location) {
            address = location.country;
            if (location.city.length > 0) {
                address = `${address} (${location.city})`;
            }
        }

        return {
            prisma,
            request: req,
            session: !session || !account ? undefined : {
                ...session,
                userAgent: !session.userAgent ? undefined : uaParse(session.userAgent),
                address: address.length > 0 ? address : undefined,
                account
            }
        };
    },
    plugins: [
        config.server.graphql.playground
            ? ApolloServerPluginLandingPageGraphQLPlayground({
                settings: {
                    'tracing.hideTracingResponse': !config.server.graphql.debug,
                    'queryPlan.hideQueryPlanResponse': !config.server.graphql.debug,
                    'editor.theme': 'light'
                }
            })
            : ApolloServerPluginLandingPageDisabled(),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        config.server.graphql.tracing ? require('apollo-tracing').plugin() : {}
    ]
});

app.use(RequestLogger.logHttp);
app.use(rateLimit(config.server.rateLimit));
app.use(compression(config.server.compression));

app.use(helmet({contentSecurityPolicy: false}));
app.use((req, res, next) => {
    if (!config.server.maintenanceMode.maintenanceModeEnabled) {
        next();
        return;
    }
    const ip: string = req.socket.remoteAddress || 'unknown';

    if (config.server.maintenanceMode.allowedHosts.indexOf(ip) >= 0) {
        log.info(`Maintenance mode enabled. Disable it in config. Got request from: [${ip}]`);
        next();
    } else {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            status: config.server.maintenanceMode.message
        });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.');
        const RANDOM_SUFFIX_SIZE = 12;
        const fileName = `${Date.now()}-${nanoid(RANDOM_SUFFIX_SIZE)}.${ext[ext.length - 1]}`;
        log.trace(`Upload file "${file.originalname}": ${fileName}`);
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter(req: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (config.server.uploadAllowedFileTypes.indexOf(fileExt) >= 0) {
            return callback(null, true);
        } else {
            return callback(new Error(`Allowed file types to upload: ${config.server.uploadAllowedFileTypes.join(', ')}`));
        }
    },
    limits: {
        fileSize: config.server.maxUploadFileSizeBytes,
        fieldSize: config.server.maxUploadFileSizeBytes
    },
    dest: path.join(__dirname, '..', 'uploads')
}).single('file');

app.post('/upload',
    (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'error',
                    message: err.message
                });
            }

            if (!req?.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'error',
                    message: 'Field "file" not provided'
                });
            }

            await prisma.upload.create({
                data: {
                    originalFilename: req.file.originalname,
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                    extension: path.extname(req.file.originalname).toLowerCase(),
                    uploaderIp: (<AddressInfo>req.socket.address()).address
                }
            });

            return res.status(StatusCodes.OK).json({
                status: 'ok',
                filePath: `/uploads/${req.file.filename}`,
                originalName: req.file.originalname
            });
        });
    }
);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

async function main() {
    await server.start();
    server.applyMiddleware({app, path: config.server.graphql.path});

    await DIDTools.initDB(prisma);
    app.listen({port: config.server.port}, () => {
        log.info(`*** ${packageJson.name} ready at http://127.0.0.1:${config.server.port}${server.graphqlPath} ***`);
    });

    const CLEAR_EXPIRED_SESSIONS_INTERVAL = 10000;
    setInterval(async () => {
        const deletedSessions = await prisma.accountSession.deleteMany({
            where: {
                expiresAt: {lt: new Date()}
            }
        });
        if (deletedSessions.count > 0) {
            log.debug(`Deleted ${deletedSessions.count} expired sessions`);
        }
    }, CLEAR_EXPIRED_SESSIONS_INTERVAL);
}

main().catch(console.log);
