/* eslint-disable no-magic-numbers */
import path from 'path';

export default {
    server: {
        loggerConfig: {
            appenders: {
                out: {type: 'stdout'},
                fileOutAll: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/all/logs_all.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutTrace: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/trace/logs_trace.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutDebug: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/debug/logs_debug.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutInfo: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/info/logs_info.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutWarn: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/warn/logs_warn.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutError: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/error/logs_error.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                },
                fileOutFatal: {
                    type: 'file',
                    filename: path.join(__dirname, '/../../logs/fatal/logs_fatal.log'),
                    maxLogSize: 25 * 1024 * 1024, // maximum size (in bytes) for the log file.
                    backups: 100,
                    compress: true
                }
            },
            categories: {
                default: {
                    appenders: [
                        'out',
                        'fileOutAll',
                        'fileOutTrace',
                        'fileOutDebug',
                        'fileOutInfo',
                        'fileOutWarn',
                        'fileOutError',
                        'fileOutFatal'
                    ],
                    level: 'trace'
                }
            }
        },
        rateLimit: {
            windowMs: 1000 * 60 * 15,
            max: 100000,
            message: '{ "error": "Too many requests" }'
        },
        graphql: {
            path: '/graphql',
            introspection: true,
            playground: true,
            tracing: process.env.NODE_ENV !== 'production',
            mocksEnabled: false,
            mocksPreserveResolvers: true,
            debug: process.env.NODE_ENV !== 'production'
        },
        costAnalysis: {
            maximumCost: 120,
            defaultCost: 1
        },
        compression: {
            level: -1 // https://github.com/expressjs/compression#level
        },
        corsEnabled: true,
        port: 4001,
        maintenanceMode: {
            maintenanceModeEnabled: false,
            message: 'Sorry, we are down for maintenance',
            allowedHosts: [
                '127.1.0.1',
                '::1',
                '::ffff:127.0.0.1'
            ]
        },
        sessionExpiresIn: 30 * 24 * 60 * 60 * 1000,
        salt: 'kmpigYcbvjfKUBJvPCEuA43LXWrTb27Qe8Xv5uGuNQ6tyAvYC354VahSKpUR5SkR',
        maxUploadFileSizeBytes: 5 * 1024 * 1024,
        uploadAllowedFileTypes: [
            '.jpg',
            '.jpeg',
            '.png',
            '.webp',
            '.gif'
        ]
    },
    email: {
        host: 'smtp.ethereal.email',
        user: 'marianne.collier@ethereal.email',
        password: 'dbsrgD3q13GYBGm11B'
    },
    disableRegisterEmailConfirmation: false,
    freeTonIdKeys: {
        public: '8a1249f92681eb39ba30c80084e63bf9c19b6dd8f74a17be175630baa1b7c30d',
        secret: '9b80f988e9e59a4d704b7dc03a06a37f0292ea4c016bcbb5c2eecb35bc44741a'
    }
};
