import React from 'react';
import {Card, VerifyCheckbox} from '../../../components';
import {FixedModalWrapper} from '../components';
import {Body1, Body3, Body3Bold, Body4, Button, Col, Container, Row, Text, Title5} from '../../../ui';
import {getServiceProsList} from '../../../utils/helpers';
import {COLORS} from '../../../utils/static/colors';
import styled from 'styled-components';
import CloseIc from '../../../assets/img/close-ic.svg';
import StarIc from '../../../assets/img/star-ic-blue.svg';


export const ServiceModal = ({service = null, onClose = null, onGetVc = null}) => {

    if (service) {
        const prosList = getServiceProsList(service.pros);

        return (
            <FixedModalWrapper onClose={onClose}>
                <RelativeCard width={540} paddingY={36} paddingX={36}>
                    <CloseIcon src={CloseIc} onClick={onClose}/>

                    <Row margin={-6} minHeight={138} marginBottom={22} nowrap>
                        <Col width={'183px'} auto>
                            <LogoIcon src={service.logoUrl}/>
                        </Col>
                        <Col auto>
                            <Title color={'#516075'} marginBottom={16}>
                                {service.name}
                            </Title>

                            <Description color={'#516075'} marginLeft={2}>
                                {service.description}
                            </Description>
                        </Col>
                    </Row>

                    {prosList.map((item, key) => (
                        <Row margin={-2} nowrap key={key}>
                            <Col auto>
                                <StarImg src={StarIc}/>
                            </Col>
                            <BonusTitle color={'#516075'}>{item}</BonusTitle>
                        </Row>
                    ))}

                    <Container marginTop={34} marginBottom={15}>
                        <Row alignItems={'center'} margin={-3} nowrap>
                            <RequiredTitle>Required VCs</RequiredTitle>
                            <RequiredDivide/>
                        </Row>

                        <Row cols={2} marginTop={23} colsMarginBottom={17}>
                            {service.vcTemplates.map((item, key) => (
                                <Col key={key}>
                                    <Row alignItems={'center'} margin={-4}>
                                        <Col auto>
                                            <VerifyCheckbox size={'small'} verified={item.vc}/>
                                        </Col>
                                        {item.vc ? <Body3Bold color={COLORS.blue}>{item.title}</Body3Bold>
                                            : <Body3 color={'#516075'}>{item.title}</Body3>}
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Container>


                    <Button
                        label={'Get VCs'}
                        onClick={onGetVc}
                        TextStyle={Body1}
                        wide
                        marginBottom={3}
                    />
                </RelativeCard>
            </FixedModalWrapper>
        );
    }

    return null;
};


const RelativeCard = styled(Card)`
    position: relative;
`;

const CloseIcon = styled.img`
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
`;

const LogoIcon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
const Title = styled(Title5)`
    line-height: 19px;
`;
const Description = styled(Body4)`
    line-height: 19px;
`;

const BonusTitle = styled(Body3Bold)`
    line-height: 28px;
`;


const RequiredTitle = styled(Text)`
    font-size: 17px;
    line-height: 19px;
    color: #979797;
    white-space: nowrap;
`;
const RequiredDivide = styled.div`
    height: 1px;
    width: 100%;
    background: #979797;
`;
const StarImg = styled.img`
    width: 20px;
    max-width: 20px;
    height: 20px;
    max-height: 20px;
    margin-top: 3px;
`;
