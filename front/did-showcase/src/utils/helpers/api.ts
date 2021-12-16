import {apolloClient} from '../../utils/ApolloClient';
import {
    vcCreateProofOfEthAddress,
    vcCreateProofOfFunfairAccount,
    vcCreateProofOfStateId,
    vcCreateProofOfTaxResidency,
    vcCreateProofOfTonAddressGenerate,
    vcCreateProofOfTonAddressVerify,
    vcCreateProofOfTwitterAccount,
    vcCreateProofOfUniswapAccount
} from '../../graphql/mutations';
import {didStorage} from '../../routing';
import {Buffer} from 'buffer';


// eslint-disable-next-line complexity
export const receiveVC = (type) => {

    switch (type) {
        case 'PROOF_OF_ETH_ADDRESS': {
            return apolloClient.mutate({mutation: vcCreateProofOfEthAddress});
        }
        case 'PROOF_OF_TON_ADDRESS': {
            return getTonAddress();
        }
        case 'PROOF_OF_STATE_ID': {
            return apolloClient.mutate({mutation: vcCreateProofOfStateId});
        }
        case 'PROOF_OF_TAX_RESIDENCY': {
            return apolloClient.mutate({mutation: vcCreateProofOfTaxResidency});
        }
        case 'PROOF_OF_UNISWAP_ACCOUNT': {
            return apolloClient.mutate({mutation: vcCreateProofOfUniswapAccount});
        }
        case 'PROOF_OF_TWITTER_ACCOUNT': {
            return apolloClient.mutate({mutation: vcCreateProofOfTwitterAccount});
        }
        case 'PROOF_OF_FUNFAIR_ACCOUNT': {
            return apolloClient.mutate({mutation: vcCreateProofOfFunfairAccount});
        }
        default: {
            return new Error(`No ${type} create rule`);
        }
    }
};

const getTonAddress = async () => {
    const {data} = await apolloClient.mutate({mutation: vcCreateProofOfTonAddressGenerate});
    const {vcCreateProofOfTonAddressGenerate: message} = data;

    const {signatureHex} = await didStorage.signData(Buffer.from(message).toString('base64'));

    return apolloClient.mutate({
        mutation: vcCreateProofOfTonAddressVerify,
        variables: {signatureHex: signatureHex, walletAddress: didStorage.currentAccountAddress}
    });
};
