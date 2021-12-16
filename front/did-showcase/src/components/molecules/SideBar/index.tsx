import React, {useMemo, useState} from 'react';
import {history} from '../../../routing';
import {useVcTemplateSectionsQuery} from '../../../generated/graphql';
import {VerifyCheckbox} from '../../atoms';
import {Body3, Row, Text} from '../../../ui';
import {COLORS} from '../../../utils/static';
import styled from 'styled-components';


export const SideBar = () => {
    const {data} = useVcTemplateSectionsQuery();

    const availableVc = useMemo(() => {
        if (data) {
            const {vcTemplateSections} = data;

            const reducer = (accum = 0, item) => {
                return accum + item.vcTemplates.length;
            };

            return vcTemplateSections.reduce(reducer, 0);
        }

        return 0;
    }, [data]);


    if (data) {
        const {vcTemplateSections} = data;

        return (
            <Wrapper>
                <Header justifyContent={'space-between'}>
                    <Text color={COLORS.white}>Available VCs</Text>
                    <Text color={COLORS.white} fontWeight={400}>{availableVc}</Text>
                </Header>

                {vcTemplateSections.map((item, key) =>
                    <AccordionLine
                        item={item}
                        key={key}
                    />
                )}
            </Wrapper>
        );
    }

    return null;
};


const AccordionLine = ({item}) => {
    const [activeInner, setActiveInner] = useState(false);

    const toggleInner = () => setActiveInner(!activeInner);

    return (
        <AccordionWrapper>
            <AccordionMain onClick={toggleInner} disabled={item.vcTemplates.length <= 0}>
                <Title disabled={item.vcTemplates.length <= 0}>{item.title}</Title>
            </AccordionMain>

            <AccordionInner active={activeInner}>
                {item.vcTemplates && item.vcTemplates.map((itemTemplate, key) => (
                    <AccordionInnerLine
                        onClick={() => history.push(`/home/vc/${itemTemplate.id}`)}
                        active={history.location.pathname === `/home/vc/${itemTemplate.id}`}
                        key={key}
                    >
                        <IconOkWrapper>
                            {itemTemplate.vc && <VerifyCheckbox
                                verified={true}
                                size={'small'}
                            />}
                        </IconOkWrapper>

                        <Body3
                            color={COLORS.black}
                            textDecoration={'underline'}
                            marginLeft={10}
                        >
                            {itemTemplate.title}
                        </Body3>
                    </AccordionInnerLine>
                ))}
            </AccordionInner>
        </AccordionWrapper>
    );
};


const Wrapper = styled.div`
  width: 275px;
  background: ${COLORS.white};
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;
const Header = styled(Row)`
    height: 62px;
    padding: 20px 18px 14px 19px;
    background: #696DE4;
    font-family: Overpass;
    font-weight: 900;
    font-size: 18px;
    line-height: 28px;
`;

const AccordionWrapper = styled.div`
    border-top: 1px solid rgba(53, 52, 56, 0.5);
`;
const AccordionMain = styled.div`
    min-height: 50px;
    padding: 8px 18px;
    display: flex;
    align-items: center;
    cursor: ${p => p.disabled ? 'default' : 'pointer'};
`;
const AccordionInnerLine = styled.div`
   display: flex;
   align-items: center;
   padding: 0 8px;
   transition: height ease-out .15s;
   cursor: pointer;
   border: 2px solid transparent;
   ${p => p.active ? `
    border: 2px solid #696DE4;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
   ` : ''}
   
`;
const AccordionInner = styled.div`
    height: ${p => p.active ? '100%' : '0'};
    overflow: hidden;
    transition: ease-out .15s;

    > ${AccordionInnerLine} {
        height: ${p => p.active ? '56px' : '0'};
    }
`;

const IconOkWrapper = styled.div`
    width: 24px;
    height: 24px;
`;

const Title = styled.div`
    display: inline;
    font-size: 18px;
    line-height: 28px;
    font-weight: ${p => p.fontWeight ? p.fontWeight : 'bold'};
    color: ${p => p.color ? p.color : COLORS.black};
    ${p => p.disabled ? 'opacity: 0.4;' : ''}
`;
