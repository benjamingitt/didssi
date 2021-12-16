export interface VerificationMethod {
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase: string;
}

export interface DIDDocument {
    '@context': string[];
    id: string;
    createdAt: string;
    publicKey: string;
    verificationMethod: VerificationMethod;
}
