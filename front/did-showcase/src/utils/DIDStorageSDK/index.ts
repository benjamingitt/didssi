import {ProviderRpcClient, RawProviderApiResponse} from 'ton-inpage-provider';
import {DIDStorageABI} from './DIDStorageABI';
import {DIDDocument} from './DIDInterfaces';

function hexToDec(data: string): string {
    let hex = data;
    if (hex.length % 2) {
        hex = `0${hex}`;
    }

    const bn = BigInt(`0x${hex}`);

    return bn.toString(10);
} 

export class DIDStorage {
    ton: ProviderRpcClient;
    currentAccountPublicKey: string;
    currentAccountAddress: string;
    inpageProviderConnected = false;
    private DIDStorageContractAddress = '0:256dfbf328016c5622aee36d2098b829aa06fe99b37bba9d5ca588e6e303d9f9';

    constructor() {
        console.log('DID Storage created');
    }

    async initInpageProvider(): Promise<boolean> {
        console.log('initInpageProvider...');
        if (this.inpageProviderConnected) {
            return true;
        }
        const provider = await import('ton-inpage-provider');
        this.ton = new provider.ProviderRpcClient();

        if (!(await provider.hasTonProvider())) {
            throw new Error('Extension is not installed');
        }
        await this.ton.ensureInitialized();

        const {accountInteraction} = await this.ton.rawApi.requestPermissions({
            permissions: ['tonClient', 'accountInteraction']
        });

        console.log({accountInteraction});

        if (accountInteraction == null) {
            throw new Error('Insufficient permissions');
        }

        this.currentAccountPublicKey = accountInteraction.publicKey;
        this.currentAccountAddress = accountInteraction.address;
        console.log('this.currentAccountAddress', this.currentAccountPublicKey);
        console.log('this.DIDStorageContractAddress', this.DIDStorageContractAddress);
        // console.log('this.currentAccountAddress', this.currentAccountPublicKey);
        // console.log('this.DIDStorageContractAddress', this.DIDStorageContractAddress);
        // console.log('this.currentAccountPublicKey', this.currentAccountPublicKey);
        console.log('Inpage provided injected');
        this.inpageProviderConnected = true;
        return true;
    }

    async createDID(dryRun = false): Promise<DIDDocument> {
        const newDIDDoc: DIDDocument = {
            id: this.currentAccountPublicKey.toString(),
            createdAt: new Date().getTime().toString(),
            '@context': [
                'https://www.w3.org/ns/did/v1',
                'https://w3id.org/security/suites/ed25519-2020/v1'
            ],
            publicKey: this.currentAccountPublicKey.toString(),
            verificationMethod: {
                id: null,
                type: 'Ed25519VerificationKey2020',
                controller: null,
                publicKeyMultibase: this.currentAccountPublicKey
            }
        };

        if (!dryRun) {
            const response = await this.ton.rawApi.sendMessage({
                sender: this.currentAccountAddress,
                recipient: this.DIDStorageContractAddress,
                amount: '20000000',
                bounce: true,
                payload: {
                    abi: JSON.stringify(DIDStorageABI),
                    method: 'addDid',
                    params: {
                        pubKey: hexToDec(this.currentAccountPublicKey.toString()),
                        didDocument: JSON.stringify(newDIDDoc)
                    }
                }
            });
            console.log('response');
            console.log(response);
        }

        return newDIDDoc;
    }

    async loadDIDDocument(DID: string): Promise<DIDDocument> {
        console.log(`loadDIDDocument(${DID})`);
        const {output} = await this.ton.rawApi.runLocal({
            address: this.DIDStorageContractAddress,
            functionCall: {
                abi: JSON.stringify(DIDStorageABI),
                method: 'getDid',
                params: {
                    id: `0x${DID}`
                }
            }
        });
        console.log('output');
        console.log(output);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((output.value0 as any).didDocument) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return JSON.parse((output.value0 as any).didDocument) as DIDDocument;
        } else {
            return null;
        }
    }

    async getMyPubKey(): Promise<string> {
        const res = await this.ton.rawApi.sendExternalMessage({
            local: false,
            publicKey: this.currentAccountPublicKey,
            recipient: this.DIDStorageContractAddress,
            payload: {
                abi: JSON.stringify(DIDStorageABI),
                method: 'getMyPubKey',
                params: {}
            }
        });

        return res.output.value0 as string;
    }

    async signData(data: string): Promise<RawProviderApiResponse<'signData'>> {
        return await this.ton.rawApi.signData({
            data,
            publicKey: this.currentAccountPublicKey
        });
    }

    async verifySignature(data: string, signature: string): Promise<boolean> {
        const res = await this.ton.rawApi.sendExternalMessage({
            local: true,
            publicKey: this.currentAccountPublicKey,
            recipient: this.DIDStorageContractAddress,
            payload: {
                abi: JSON.stringify(DIDStorageABI),
                method: 'verifySignature',
                params: {
                    data,
                    signature
                }
            }
        });

        return res.output.value0 as boolean;
    }

}
