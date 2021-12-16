import {gql} from '@apollo/client';

export const vcCreateProofOfEthAddress = gql`
    mutation {
        vcCreateProofOfEthAddress {
            id
            value
        }
    }
`;

export const vcCreateProofOfTonAddressGenerate = gql`
    mutation {
        vcCreateProofOfTonAddressGenerate
    }
`;

export const vcCreateProofOfTonAddressVerify = gql`
    mutation ($signatureHex: String!, $walletAddress: String!) {
        vcCreateProofOfTonAddressVerify(signatureHex: $signatureHex, walletAddress: $walletAddress) {
            id
            value
            createdAt
            updatedAt
        }
    }
`;

export const vcCreateProofOfStateId = gql`
    mutation {
        vcCreateProofOfStateId {
            id
            value
            createdAt
            updatedAt
        }
    }
`;

export const vcCreateProofOfTaxResidency = gql`
    mutation {
        vcCreateProofOfTaxResidency {
            id
            value
        }
    }
`;

export const vcCreateProofOfUniswapAccount = gql`
    mutation {
        vcCreateProofOfUniswapAccount {
            id
            value
        }
    }
`;

export const vcCreateProofOfTwitterAccount = gql`
    mutation {
        vcCreateProofOfTwitterAccount {
            id
            value
        }
    }
`;

export const vcCreateProofOfFunfairAccount = gql`
    mutation {
        vcCreateProofOfFunfairAccount {
            id
            value
        }
    }
`;
