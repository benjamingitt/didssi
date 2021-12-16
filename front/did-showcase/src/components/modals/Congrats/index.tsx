import React from 'react';
import {history} from '../../../routing';
import {Card} from '../../../components';
import {FixedModalWrapper} from '../components';
import {Body1, Button, Title2Bold} from '../../../ui';
import styled from 'styled-components';


export const CongratsModal = ({onClose = null, serviceName = ''}) => {

    return (
        <FixedModalWrapper onClose={onClose}>
            <Card maxWidth={448} paddingTop={34} paddingBottom={37} textAlign={'center'}>
                <Title2Bold>Congrats!</Title2Bold>
                <br/>
                <Description marginBottom={68}>
                    You have been successfully authorized in the {serviceName} service
                    with verifiable credentials! Stay tuned and
                    enjoy your Free TON services!
                </Description>

                <Button
                    label={'Explore FreeTON.id'}
                    onClick={() => history.push('/home')}
                    TextStyle={Body1}
                    wide
                />
            </Card>
        </FixedModalWrapper>
    );
};

const Description = styled(Body1)`
    line-height: 28px;
    font-weight: bold;
`;
