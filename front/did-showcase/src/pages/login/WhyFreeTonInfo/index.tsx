import React from 'react';
import {useDispatch} from 'react-redux';
import {didStorage, history} from '../../../routing';
import {loaderActions, modsActions} from '../../../store';
import {WhyFreeTonCard} from '../../../components';
import {LoginContainer} from '../../../ui';
import {didToFront} from '../../../utils/helpers';


export const WhyFreeTonPage = () => {
    const dispatch = useDispatch();

    const createDid = async () => {
        dispatch(loaderActions.showLoader());

        try {
            const resCreatedDid = await didStorage.createDID();

            if (resCreatedDid) {
                waitingBlockchainDelay(resCreatedDid.id);
            }
        } catch (e) {
            dispatch(loaderActions.hideLoader());
            console.log(e);
        }
    };

    const timeoutPing = 1500;
    const waitingBlockchainDelay = (did) => {
        try {
            let timerId = setTimeout(async function tick() {
                const resLoadedDid = await didStorage.loadDIDDocument(didStorage.currentAccountPublicKey);

                if (!resLoadedDid) {
                    timerId = setTimeout(tick, timeoutPing);
                } else {
                    dispatch(modsActions.setLightBgMode());
                    dispatch(loaderActions.hideLoader());
                    history.push('/create-did', didToFront(did));
                }
            }, timeoutPing);
        } catch (e) {
            console.log('waitingBlockchainDelay error', e);
        }
    };

    return (
        <LoginContainer>
            <WhyFreeTonCard
                onClick={createDid}
            />
        </LoginContainer>
    );
};
