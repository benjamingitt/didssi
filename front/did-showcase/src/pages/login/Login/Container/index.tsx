import React, {useEffect, useState} from 'react';
import {LoginPageView} from '../View';
import {useDispatch} from 'react-redux';
import {loaderActions} from '../../../../store/loader';
import {didStorage, history} from '../../../../routing';
import {userActions} from '../../../../store';
import {useLoginGenerateMutation, useLoginVerifyMutation} from '../../../../generated/graphql';
import {Loader} from '../../../../components';
import {Buffer} from 'buffer';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const [loginGenerate] = useLoginGenerateMutation();
    const [loginVerify] = useLoginVerifyMutation();
    const [accountDid, setAccountDid] = useState(null);
    const [fetchingDid, setFetchingDid] = useState(true);
    const [accountDidError, setAccountDidError] = useState('');

    useEffect(() => {
        loadDid();
    }, []);

    const loadDid = async () => {
        try {
            const res = await didStorage.loadDIDDocument(didStorage.currentAccountPublicKey);
            if (res) {
                setAccountDid(res.id);
            }
        } catch (e) {
            console.log('loadDIDDocumentError', e);

            if (e.message === 'runLocal: Account not found') {
                setAccountDidError('accountNotFound');
            }
        } finally {
            setFetchingDid(false);
        }
    };

    const refetchDid = () => {
        setAccountDidError('');
        setFetchingDid(true);
        loadDid();
    };


    //ToDo: divide logic
    const handleLogin = async () => {
        dispatch(loaderActions.showLoader());

        try {
            const resGenerate = await loginGenerate({variables: {did: accountDid}});

            const singedData = await didStorage.signData(Buffer.from(resGenerate.data.loginGenerate).toString('base64'));

            const resVerify = await loginVerify({
                variables: {
                    did: accountDid,
                    signedMessage: singedData.signatureHex
                }
            });
            const {loginVerify: loginVerifyRes} = resVerify.data;

            //setUser
            dispatch(userActions.setUser(loginVerifyRes.account));
            localStorage.setItem('token', loginVerifyRes.token);

            //finish
            history.push('/home');
        } catch (err) {
            console.warn('Login generate err:', err);
        } finally {
            dispatch(loaderActions.hideLoader());
        }
    };


    if (!fetchingDid) {
        return (
            <LoginPageView
                handleLogin={handleLogin}
                accountDid={accountDid}
                error={accountDidError}
                refetchDid={refetchDid}
            />
        );
    } else {
        return (
            <Loader label={'Checking for presence...'}/>
        );
    }
};
