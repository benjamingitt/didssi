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

export const VCTemplateSectionTitle = {
    DEFI_OWNERSHIP: 'DeFi Ownership',
    STATE_DOCS: 'State Documents',
    SOCIAL_NETWORKS: 'Social Networks',
    GAMES: 'Games'
};

export const ServiceName = {
    TON_SWAP: 'TON Swap',
    POKER_TON: 'PokerTON',
    EASY_VOTE: 'Easy Vote'
};


export interface Issuer {
    id: string
}

export interface Degree {
    type: string
    data: unknown
}

export interface CredentialSubject {
    id: string
    degree: Degree
}

export interface Proof {
    type: string
    created: Date
    verificationMethod: string
    signature: string
}

/*
EXAMPLE VC
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "http://freeton.id/credentials/123",
  "type": [
    "VerifiableCredential"
  ],
  "issuer": {
    "id": "did:freeton:<freeton.id_did>"
  },
  "issuanceDate": "2020-03-10T04:24:12.164Z",
  "credentialSubject": {
    "id": "did:freeton:<client_did>",
    "degree": {
      "type": "ProofTonAddress",
      "address": "0xC572Ec7B6F4404A1806aeBbE5ABa5854F73f4091"
    }
  },
  "proof": {
    "type": "Ed25519VerificationKey2020",
    "created": "2020-02-15T17:13:18Z",
    "verificationMethod": "did:freeton:<freeton.id_did>#<client_did>",
    "signature": "signatureOf(JSON.stringify(credentialSubject))"
  }
}
 */
export interface VerifiableCredentialEd25519 {
    '@context': string[]
    id: string
    type: string[]
    issuer: Issuer
    issuanceDate: Date
    credentialSubject: CredentialSubject
    proof: Proof
}
