import React from 'react';
import {history} from '../../routing';
import {VerifyCheckbox} from '../../components';
import {Body2, Body4, Button, Container, PageDescription, Row, Title1Bold} from '../../ui';
import styled from 'styled-components';
import {COLORS} from '../../utils/static';
import {receiveVC} from '../../utils/helpers/api';


export const VCAddBox = ({vcTemplate = null, refetchTemplate = null, handleAddVc = null, ...props}) => {

    const AddVc = async () => {
        try {
            await receiveVC(vcTemplate.type);
            refetchTemplate();
            history.push(`/vc/${vcTemplate.id}`, history.location.state);
        } catch (e) {
            console.log('Receive vc error', e);
        }
    };


    if (vcTemplate) {
        return (
            <Container {...props}>
                <PageDescription color={COLORS.white} marginBottom={28}>
                    You do not have this verifiable credential yet.
                    Add the VC to your Freeton.ID profile either
                    by uploading it or requesting it from the
                    issuer right here.
                </PageDescription>

                <AddVCCard paddingX={26} paddingTop={26} paddingBottom={60}>
                    <Row>
                        <VerifyCheckbox/>
                    </Row>

                    <Title1Bold marginTop={-6} marginBottom={32}>
                        {vcTemplate.title}
                    </Title1Bold>

                    {vcTemplate.description && <Container paddingX={45}>
                        <Body2 marginBottom={35}>
                            {vcTemplate.description}
                        </Body2>
                    </Container>}

                    <Body4 marginBottom={58}>Issuer <Link>{vcTemplate.issuer}</Link></Body4>

                    <Container paddingX={146}>
                        <Button
                            label={'Add VC'}
                            onClick={handleAddVc || AddVc}
                            wide
                        />
                    </Container>
                </AddVCCard>

            </Container>
        );
    }

    return null;
};

const AddVCCard = styled(Container)`
    background: ${COLORS.white};
    box-shadow: 0px 4px 36px rgba(27, 49, 79, 0.3);
    border-radius: 3px;
    text-align: center;
`;

const Link = styled.a`
    margin-left: 7px;
    text-decoration: underline;
    color: ${COLORS.blue};
`;
