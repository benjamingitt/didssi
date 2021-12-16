import React from 'react';
import {history} from '../../../../routing';
import {Container, Row, Col, HeaderTitle, Body4, Body5, Body5Light, OverpassBody2Bold} from '../../../../ui';
import {COLORS} from '../../../../utils/static';
import styled from 'styled-components';
import LogoutIcon from '../../../../assets/img/logout_ic.svg';
import {didToFront} from '../../../../utils/helpers';
import {DID_URL_PREFIX} from '../../../../utils/static';


export const HeaderView = ({user, onLogout}) => {


    return (
        <HeaderContainer>
            <OverpassBody2Bold
                color={COLORS.white}
                onClick={() => history.push('/home')}
            >
                FREETON.id
            </OverpassBody2Bold>

            {user && <Row margin={-20} alignItems={'center'}>
                <Col>
                    <AccountBlockRow
                        margin={-5}
                        alignItems={'center'}
                    >
                        <Col>
                            <ImageContainer>
                                <img src={`https://avatars.dicebear.com/api/bottts/${user.did}.svg`}/>
                            </ImageContainer>
                        </Col>

                        <Col>
                            <DidTitle color={COLORS.white} marginBottom={1}>
                                <PrefixTitle color={COLORS.white}>
                                    {DID_URL_PREFIX}
                                </PrefixTitle>
                                {user.did}
                            </DidTitle>
                            <Body5Light color={COLORS.turquoise}>Connected to Mainnet</Body5Light>
                        </Col>

                        <DidViewer>
                            <Body4 color={COLORS.white} textAlign={'center'}>
                                {didToFront(user.did)}
                            </Body4>
                        </DidViewer>
                    </AccountBlockRow>
                </Col>

                <Col>
                    <LogoutButton onClick={onLogout}>
                        <img src={LogoutIcon}/>
                    </LogoutButton>
                </Col>
            </Row>}


        </HeaderContainer>
    );
};


const HeaderContainer = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    width: 100%;
    height: 64px;
    padding: 0 24px 0 32px;
    background: rgba(105, 109, 228, 0.2);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0px 64px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.15);
    z-index: 50;
`;

const DidTitle = styled(HeaderTitle)`
     max-width: 142px;
     overflow:hidden; 
     white-space:nowrap; 
     text-overflow: ellipsis;
`;

const DidViewer = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: 400px;
    padding: 5px 10px;
    background: ${COLORS.grey};
    border-radius: 10px;
    word-break: break-all;
    opacity: 0;
    visibility: hidden;
    transition: ease-out 0.15s;
`;
const AccountBlockRow = styled(Row)`
    position: relative;
    cursor: pointer;
    
    :hover ${DidViewer} {
        opacity: 1;
        visibility: visible;
    }
`;
const ImageContainer = styled(Container)`
     position: relative;
     height: 24px;
     width: 24px;
     > img {
        width: 100%;
        height: 100%;
     }
     
     :after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${COLORS.turquoise};
        border-radius: 50%;
        border: 1px solid ${COLORS.white};
        bottom: -3px;
        right: -3px;
    }
`;

const PrefixTitle = styled(Body5)`
    font-size: 12px;
    display: inline;
`;
const LogoutButton = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
