import React, {useState} from 'react';
import {history} from '../../../routing';
import {Card} from '../../../components';
import {Button, LoginContainer, Row, Title2Bold} from '../../../ui';
import styled from 'styled-components';
import ChromeIcon from '../../../assets/img/chrome_extension_ic.svg';
import CrystalWalletIcon from '../../../assets/img/crystal_wallet_logo.svg';
import {TON_EXTENSION_URL} from '../../../utils/static';

export const ConnectWallet = () => {
    const [hasTon] = useState(false);

    const goChromeStore = () => {
        window.open(TON_EXTENSION_URL, '_self');
    };

    if (hasTon) {
        return (
            <LoginContainer>
                <Card textAlign={'center'}>
                    <Row flexDirection={'column'} justifyContent={'flex-end'} minHeight={'348'}>
                        <Title2Bold marginBottom={'26'}>
                            Please, connect<br/> TON Crystal Wallet
                        </Title2Bold>

                        <CrystalIcon src={CrystalWalletIcon}/>

                        <Button
                            label={'Connect'}
                            onClick={() => history.push('/login')}
                            marginTop={'79'}
                            wide
                        />
                    </Row>
                </Card>
            </LoginContainer>
        );
    } else {
        return (
            <LoginContainer>
                <Card textAlign={'center'}>
                    <Row flexDirection={'column'} justifyContent={'space-between'} minHeight={'348'}>
                        <Title2Bold marginBottom={'60'}>
                            Please, install TON<br/>Crystal Wallet
                        </Title2Bold>

                        <img src={ChromeIcon}/>
                        <Button
                            label={'Go Chrome store'}
                            onClick={goChromeStore}
                            marginTop={'52'}
                            wide
                        />
                    </Row>
                </Card>
            </LoginContainer>
        );
    }
};


const CrystalIcon = styled.img`
    width: 269px;
    margin-left: 38px;
`;
