import React from 'react';
import {VerifyCheckbox} from '../../atoms';
import {Body3, Body4, Col, Container, Row, Title2Bold} from '../../../ui';
import {ServiceProgressBar} from './ServiceProgressBar';
import {COLORS} from '../../../utils/static';
import styled from 'styled-components';


export const ServiceCard = ({logo = '', descr = '', allVC = 0, verifiedVC = 0, ...props}) => {

    return (
        <ServiceCardContainer {...props}>
            <Container marginLeft={-5} width={'100%'}>
                <Row alignItems={'center'} margin={-6} wide>
                    <Col height={'40'} auto>
                        <VerifyCheckbox verified={allVC === verifiedVC}/>
                    </Col>
                    {allVC === verifiedVC && <Body3
                        color={COLORS.lightBlue}
                        fontWeight={500}
                    >
                        Verified
                    </Body3>}
                </Row>
            </Container>

            <ImageContainer>
                <LogoImg src={logo}/>
            </ImageContainer>
            <Body4
                color={COLORS.grey}
                lineHeight={19}
                whiteSpace={'pre-wrap'}
            >
                {descr}
            </Body4>

            <ProgressBarContainer>
                <ServiceProgressBar
                    amount={allVC}
                    fill={verifiedVC}
                />
            </ProgressBarContainer>

        </ServiceCardContainer>
    );
};

export const ServiceCardEmpty = ({...props}) => {

    return (
        <EmptyCardContainer {...props}>
            <Container marginLeft={-5} width={'100%'}>
                <VerifyCheckbox verified={false}/>
            </Container>

            <ImageContainer>
                <Title2Bold color={COLORS.white}>Coming Soon</Title2Bold>
            </ImageContainer>

            <Body4
                lineHeight={19}
                color={COLORS.white}
            >
                SSI is a new era of opportunities in a decentralized world!
                <br/><br/>
                New services are coming soon.
            </Body4>

        </EmptyCardContainer>
    );
};

const ServiceCardContainer = styled(Container)`
     position: relative;
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
     flex-basis: auto;
     width: 260px;
     min-height: 293px;
     height: 100%; 
     background: ${COLORS.white};
     box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
     border-radius: 3px;
     padding-top: ${p => p.paddingTop || p.paddingY ? `${p.paddingTop || p.paddingY}px` : '14px'};
     padding-bottom: ${p => p.paddingBottom || p.paddingY ? `${p.paddingBottom || p.paddingY}px` : '64px'};
     padding-left: ${p => p.paddingLeft || p.paddingX ? `${p.paddingLeft || p.paddingX}px` : '22px'};
     padding-right: ${p => p.paddingRight || p.paddingX ? `${p.paddingRight || p.paddingX}px` : '22px'};
     ${p => p.padding ? `padding: ${p.padding};` : ''}
     ${p => p.textAlign ? `text-align: ${p.textAlign};` : ''}
     cursor: pointer;
`;
const EmptyCardContainer = styled(ServiceCardContainer)`
    background: transparent;
    border: 1px solid #FFFFFF;
`;

const ImageContainer = styled.div`
     display: flex;
     align-items: center; 
     height: 100px;
     margin-bottom: 10px;
`;
const LogoImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const ProgressBarContainer = styled.div`
     position: absolute;
     left: ${p => p.paddingLeft || p.paddingX ? `${p.paddingLeft || p.paddingX}px` : '22px'};
     bottom: ${p => p.paddingBottom || p.paddingY ? `${p.paddingBottom || p.paddingY}px` : '25px'};
`;
