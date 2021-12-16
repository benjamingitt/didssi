import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {entitiesActions} from '../../../store/entities';
import {history} from '../../../routing';
import {Card} from '../../../components';
import {Body3Bold, Button, Container, LabelText, LoginContainer, Row, Title2Bold} from '../../../ui';


export const CreateDID = () => {
    const dispatch = useDispatch();
    const [createdDid, setCreatedDid] = useState('');

    useEffect(() => {
        setCreatedDid(history.location.state);
    }, []);

    const copyDid = async () => {
        await navigator.clipboard.writeText(createdDid);
        dispatch(entitiesActions.showToast('Copied!'));
    };


    return (
        <LoginContainer>
            <Card paddingBottom={37} maxWidth={449} textAlign={'center'}>
                <Title2Bold marginBottom={'32'}>
                    Your DID has been<br/> created
                </Title2Bold>

                <Container paddingX={18}>
                    <LabelText wordBreak={'break-all'} marginBottom={12}>
                        {createdDid}
                    </LabelText>
                </Container>

                <Row justifyContent={'center'} marginBottom={'24'}>
                    <Button
                        label={'COPY DID'}
                        onClick={copyDid}
                        size={'small'}
                        outlined
                        TextStyle={Body3Bold}
                        paddingLeft={'18'}
                    />
                </Row>

                <Button
                    label={'Go to Authorization page'}
                    onClick={() => history.push('/login')}
                    wide
                />
            </Card>
        </LoginContainer>
    );
};


