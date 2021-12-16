import React from 'react';
import {useDispatch} from 'react-redux';
import {entitiesActions} from '../../store/entities';
import {history} from '../../routing';
import styled from 'styled-components';
import {Card, VerifyCheckbox} from '../../components';
import {Body3, Body3Bold, Body4, Body4Bold, Button, Col, Container, Row, Title6} from '../../ui';
import {COLORS} from '../../utils/static';
import {formatDate, downloadVcTemplate, stringMiddleCompress} from '../../utils/helpers';
import CopyIcon from '../../assets/img/copy-icon.svg';
import DownloadIcon from '../../assets/img/download-icon.svg';

export const VCDetails = ({vcTemplate = null, showContinue = false, ...props}) => {
    const dispatch = useDispatch();


    if (vcTemplate.vc) {
        const copyToClipboard = async () => {
            await navigator.clipboard.writeText(vcTemplateData);
            dispatch(entitiesActions.showToast('Copied!'));
        };

        const issuanceDate = new Date(vcTemplate.vc?.value.VC?.issuanceDate);
        const vcTemplateData = JSON.stringify(vcTemplate.vc?.value.VC, undefined, 4);
        const {credentialSubject} = vcTemplate.vc.value.VC;
        const tableLineLength = 32;
        const didPrefixLength = 12;

        return (
            <VerifyContainer {...props}>
                <TopRow justifyContent={spaceBetween} alignItems={'center'}>
                    <Row margin={-10} alignItems={'center'} nowrap>
                        <Col marginLeft={2}>
                            <VerifyCheckbox verified/>
                        </Col>
                        <Title6>{vcTemplate.title}</Title6>
                    </Row>

                    <Col width={'40%'}>
                        <Button
                            label={'Verified'}
                            TextStyle={Body4Bold}
                            size={'medium'}
                            outlined
                            wide
                        />
                    </Col>
                </TopRow>


                <MiddleRow justifyContent={spaceBetween}>
                    <Col width={'53%'}>
                        <ProveDescr marginBottom={16}>
                            {vcTemplate.description}
                        </ProveDescr>

                        {vcTemplate.vc && <div>
                            <TableRow
                                title={'Issuance date'}
                                data={formatDate(issuanceDate)}
                            />
                            <TableRow
                                title={'ID'}
                                data={stringMiddleCompress(vcTemplate.vc.value.VC?.id, tableLineLength)}
                            />
                            <TableRow
                                title={'Issuer'}
                                data={<Link>{vcTemplate.issuer}</Link>}
                            />
                            <TableRow
                                title={'Expiration date'}
                                data={formatDate(getExpirationDate(issuanceDate))}
                            />
                            <TableRow
                                title={'Subject'}
                                data={stringMiddleCompress(
                                    credentialSubject.id, tableLineLength - didPrefixLength, didPrefixLength
                                )}
                            />
                            {Object.entries(credentialSubject.degree.data).map((item, key) => (
                                <TableRow
                                    title={item[0].replace('_', ' ')}
                                    data={typeof item[1] === 'string' ? stringMiddleCompress(item[1], tableLineLength) : item[1]}
                                    key={key}
                                />
                            ))}
                        </div>}
                    </Col>

                    <Col width={'40%'}>
                        <RowVCWrapper>
                            <RowVCHeader alignItems={'center'} justifyContent={spaceBetween}>
                                <Body3Bold>Raw VC</Body3Bold>

                                <Row margin={-8} alignItems={'center'}>
                                    <Col height={24}>
                                        <ImgButton
                                            src={CopyIcon}
                                            alt=""
                                            onClick={copyToClipboard}
                                        />
                                    </Col>
                                    <Col height={24}>
                                        <ImgButton
                                            onClick={() => downloadVcTemplate(vcTemplate.title, vcTemplateData)}
                                            src={DownloadIcon}
                                            alt=""
                                        />
                                    </Col>
                                </Row>
                            </RowVCHeader>

                            <RowVcTextContainer height={'209px'}>
                                <RowVCText>
                                    {vcTemplateData}
                                </RowVCText>
                            </RowVcTextContainer>

                        </RowVCWrapper>
                    </Col>
                </MiddleRow>


                {showContinue && <Container paddingTop={8} paddingX={24} paddingBottom={26}>
                    <Button
                        label={'Continue'}
                        onClick={() => history.push(history.location?.state?.getVcFromPath || '/home')}
                        wide
                    />
                </Container>}
            </VerifyContainer>
        );
    }

    return null;
};

const TableRow = ({title, data = null, children = null}) => {

    return (
        <Row nowrap margin={-3} minHeight={32}>
            <Col width={'139px'}>
                <TableRowTitle color={'rgba(53, 52, 56, 0.7)'}>
                    {title}
                </TableRowTitle>
            </Col>

            <Body4>{data || children}</Body4>
        </Row>
    );
};


const defaultDaysExpiration = 30;
const getExpirationDate = (issuanceDate: Date, daysExpiration: number = defaultDaysExpiration) => {
    const hoursADay = 24;
    const minutesPerHour = 60;
    const secondsPerMinute = 60;
    const msPerSecond = 1000;
    const expirationMsTime = daysExpiration * hoursADay * minutesPerHour * secondsPerMinute * msPerSecond;

    return new Date(new Date(issuanceDate).getTime() + expirationMsTime);
};


const spaceBetween = 'space-between';

const VerifyContainer = styled(Card)`
     position: relative;
     min-width: 260px;
     width: 100%;
     min-height: 293px;
     border-radius: 3px;
     margin-bottom: 50px;
     padding: 0;
`;

const MiddleRow = styled(Row)`
     padding: 24px;
`;
const TopRow = styled(MiddleRow)`
     padding: 24px;
     border-bottom: 1px dashed rgba(53, 52, 56, 0.5);
`;
const ProveDescr = styled(Body3)`
    line-height: 22px;
`;
const TableRowTitle = styled(Body4)`
    text-transform: capitalize;
`;
const Link = styled.a`
    text-decoration: underline;
    color: ${COLORS.blue}
`;

const RowVCHeader = styled(Row)`
    padding-left: 21px;
    padding-right: 14px;
    height: 52px;
    background: linear-gradient(0, rgba(196, 196, 196, 0.3) 0%, rgba(196, 196, 196, 0) 100%);
`;
const ImgButton = styled.img`
    cursor: pointer;
`;
const RowVCWrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
`;
const RowVcTextContainer = styled(Container)`
    padding: 23px 15px 17px 16px;
    overflow: auto;
`;
const RowVCText = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.7);
    white-space: pre-wrap;
    word-break: break-word;
`;
