import React, {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useServiceQuery} from '../../../generated/graphql';
import {history} from '../../../routing';
import {BackBar, CongratsModal, VerifyCheckbox} from '../../../components';
import {Body1Bold, Body3, Body3Bold, Body4, Button, Col, Container, PageContainer, Row, Title1Bold} from '../../../ui';
import {downloadVcTemplate, getServiceProsList} from '../../../utils/helpers';
import {COLORS} from '../../../utils/static';
import styled from 'styled-components';
import StarIc from '../../../assets/img/star_ic.svg';


export const ServiceDetails = ({...props}) => {
    const {id} = useParams();
    const {data} = useServiceQuery({variables: {id: +id}});
    const [showCongratsModal, setShowCongratsModal] = useState(false);

    const downloadedVCCount = (vcTemplates) => {
        return vcTemplates.filter(item => item.vc).length;
    };

    const getBonusDisabled = useMemo(() => {
        if (data) {
            return downloadedVCCount(data.service.vcTemplates) < data.service.vcTemplates.length;
        }
        return null;
    }, [data?.service.vcTemplates]);


    if (data) {
        const {service} = data;
        const prosList = getServiceProsList(service.pros);

        return (
            <PageContainer paddingTop={31} paddingX={39}>
                <BackBar/>

                <Wrapper>
                    <InfoContainer {...props}>
                        <InformationContainer>
                            <Row margin={-10} nowrap>
                                <ImageContainer>
                                    <LogoImg src={service.logoUrl} alt=""/>
                                </ImageContainer>

                                <Col marginBottom={40}>
                                    <Title marginBottom={14} color={'#1B314F'}>
                                        {service.name}
                                    </Title>

                                    <Body3 marginBottom={12} color={'#1B314F'}>
                                        {service.description}
                                    </Body3>

                                    {prosList.map((item, key) => (
                                        <Row margin={-2} nowrap key={key}>
                                            <Col auto>
                                                <StarImg src={StarIc}/>
                                            </Col>
                                            <Body3Bold color={'#1B314F'}>{item}</Body3Bold>
                                        </Row>
                                    ))}
                                </Col>
                            </Row>
                        </InformationContainer>

                        <ButtonContainer>
                            <Button
                                label={'Get Bonus!'}
                                onClick={() => setShowCongratsModal(true)}
                                disabled={getBonusDisabled}
                                TextStyle={Body1Bold}
                                marginBottom={13}
                                wide
                            />
                            <Body4
                                color={'#1B314F'}
                                textAlign={'center'}
                            >
                                Your privileges will be available only after Your collect and provide all the necessary
                                VCs.
                            </Body4>
                        </ButtonContainer>
                    </InfoContainer>

                    <Row cols={4} margin={-5} marginTop={24} colsMarginBottom={10}>
                        {service.vcTemplates.map((item, key) => (
                            <Col minWidth={'200px'} key={key}>
                                <DownloadCard
                                    id={item.id}
                                    title={item.title}
                                    vcData={item.vc}
                                />
                            </Col>
                        ))}
                    </Row>
                </Wrapper>

                {showCongratsModal && <CongratsModal
                    serviceName={service.name}
                    onClose={() => setShowCongratsModal(false)}
                />}
            </PageContainer>
        );
    }

    return null;
};


export const DownloadCard = ({title = '', vcData = null, id}) => {
    const downloadVc = () => {
        downloadVcTemplate(title, JSON.stringify(vcData, undefined, 4));
    };

    return (
        <DownloadContainer paddingTop={14} paddingX={16} paddingBottom={23}>
            <Row marginBottom={19}>
                <VerifyCheckbox verified={vcData}/>
            </Row>

            <Body4 marginBottom={39} textAlign={'center'}>{title}</Body4>

            {vcData && <Button
                label={'DOWNLOAD'}
                onClick={downloadVc}
                TextStyle={Body3Bold}
                size={'small'}
                borderRadius={3}
                wide
            />}
            {!vcData && <Button
                label={'RECEIVE'}
                onClick={() => history.push(`/vc/${id}/add`, {getVcFromPath: history.location.pathname})}
                TextStyle={Body3Bold}
                size={'small'}
                borderRadius={3}
                outlined
                wide
            />}
        </DownloadContainer>
    );
};


const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const CardContainer = styled(Container)`
    ${p => p.maxWidth ? `max-width: ${p.maxWidth}px;` : ''}
    background: ${p => p.background || COLORS.white};
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
    padding-top: ${p => p.paddingTop || p.paddingY ? `${p.paddingTop || p.paddingY}px` : '44px'};
    padding-bottom: ${p => p.paddingBottom || p.paddingY ? `${p.paddingBottom || p.paddingY}px` : '45px'};
    padding-left: ${p => p.paddingLeft || p.paddingX ? `${p.paddingLeft || p.paddingX}px` : '38px'};
    padding-right: ${p => p.paddingRight || p.paddingX ? `${p.paddingRight || p.paddingX}px` : '38px'};
    ${p => p.padding ? `padding: ${p.padding};` : ''}
    ${p => p.textAlign ? `text-align: ${p.textAlign};` : ''}
`;
const InfoContainer = styled(CardContainer)`
     position: relative;
     min-width: 260px;
     width: 100%;
     min-height: 293px;
     border-radius: 3px;
     padding: 0;

     a {
        color: ${COLORS.blue}
     }
`;
const Title = styled(Title1Bold)`
    font-size: 28px;
    line-height: 28px;
`;


const InformationContainer = styled.div`
     padding-top: 39px;
     padding-left: 32px;
     padding-right: 32px;
`;

const ImageContainer = styled(Col)`
     display: flex;
     align-items: center;
     justify-content: center;
     max-width: 210px;
     width: 100%;
`;
const LogoImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const ButtonContainer = styled.div`
     border-top: 1px dashed rgba(53, 52, 56, 0.5);
     padding-top: 32px;
     padding-bottom: 16px;
     padding-left: 38px;
     padding-right: 38px;
`;


const DownloadContainer = styled(CardContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 190px;
    min-height: 188px;
    height: 100%;
    border-radius: 3px;
`;
const StarImg = styled.img`
    width: 20px;
    height: 20px;
    margin-top: 1px;
`;
