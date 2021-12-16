import React from 'react';
import {history} from '../../../../routing';
import {Card} from '../../../../components';
import {Button, LoginContainer, OverpassTitle1Bold, Body1} from '../../../../ui';
import {COLORS} from '../../../../utils/static/colors';


export const LoginPageView = ({handleLogin, accountDid = null, error = '', refetchDid = null}) => {

    return (
        <LoginContainer>
            {!error && <Card textAlign={'center'} paddingTop={42} paddingBottom={40}>
                <OverpassTitle1Bold color={COLORS.black} marginBottom={27}>
                    FREETON.id
                </OverpassTitle1Bold>

                {accountDid ? <Button
                    label={'Log In'}
                    onClick={handleLogin}
                    wide
                />
                    : <Button
                        label={'I want to create DID'}
                        onClick={() => history.push('/why-freeton-info')}
                        background={'secondary'}
                        wide
                    />}
            </Card>}

            {error && <Card maxWidth={450}>
                <Body1 color={'#f30369'} marginBottom={30}>
                    {errors[error]}
                </Body1>

                <Button
                    label={'Try again'}
                    onClick={refetchDid}
                    wide
                />
            </Card>}
        </LoginContainer>
    );
};

const errors = {
    accountNotFound: `Sorry, we couldn't find your account
     in Free TON, please initialize the account (top up
      balance and deploy wallet) at first and try again.`
};
