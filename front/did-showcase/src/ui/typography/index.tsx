import styled from 'styled-components';
import {COLORS} from '../../utils/static';


export const Title1Bold = styled.h1`
  font-weight: bold;
  font-size: 29px;
  line-height: 20px;
  color: ${({color}) => color ? color : COLORS.defaultText};
  ${p => marginBottom(p)}
  ${p => marginTop(p)}
  ${p => p.textAlign ? `text-align: ${p.textAlign};` : ''}
`;
export const Title2Bold = styled.h2`
  font-weight: bold;
  font-size: 26px;
  line-height: 34px;
  color: ${({color}) => color ? color : COLORS.defaultText};
  ${p => marginBottom(p)}
  ${p => marginTop(p)}
  ${p => p.textAlign ? `text-align: ${p.textAlign};` : ''}
`;
export const Title3 = styled.h3`
`;
export const Title4 = styled.h4`
`;
export const Title5 = styled.h5`
  font-size: 22px;
  line-height: 24px;
  font-weight: bold;
  color: ${({color}) => color ? color : COLORS.defaultText};
  ${p => marginTop(p)}
  ${p => marginBottom(p)}
`;

export const Title6 = styled.h6`
  font-size: 19px;
  line-height: 20px;
  font-weight: bold;
  color: ${({color}) => color ? color : COLORS.defaultText};
  ${p => marginTop(p)}
`;


export const Text = styled.div`
  ${p => fontWeight(p)}
  color: ${({color}) => color ? color : COLORS.defaultText};
  ${p => marginBottom(p)}
  ${p => marginTop(p)}
  ${p => marginLeft(p)};
  ${p => marginRight(p)};
  ${p => padding(p)};
  ${p => paddingTop(p)};
  ${p => textAlign(p)};
  ${p => textDecoration(p)};
  ${p => height(p)};
  ${p => p.onClick ? 'cursor: pointer;' : ''};
`;
const OverpassTemplate = styled(Text)`
  font-family: 'Overpass', sans-serif;
`;


export const Body1 = styled(Text)`
    font-size: 20px;
    line-height: 23px;
`;
export const Body1Bold = styled(Text)`
  font-weight: bold;
    font-size: 20px;
    line-height: 23px;
`;

export const Body2 = styled(Text)`
    font-size: 18px;
  line-height: 28px;
`;

export const Body3 = styled(Text)`
  font-size: 16px;
  line-height: 24px;
`;
export const Body3Bold = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

export const Body4 = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  ${p => p.whiteSpace ? `white-space: ${p.whiteSpace};` : ''}
`;
export const Body4Bold = styled(Body4)`
  font-weight: bold;
`;
export const Body5 = styled(Text)`
  font-size: 11px;
  line-height: 17px;
`;
export const Body5Light = styled(Body5)`
  font-weight: 300;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: #717171;
  opacity: 0.75;
  margin-bottom: ${p => p.marginBottom ? `${p.marginBottom}px` : '4px'}
`;
export const LabelText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: #717171;
  opacity: 0.75;
  ${p => p.wordBreak ? `word-break: ${p.wordBreak};` : ''}
`;

export const HeaderTitle = styled(Text)`
  font-weight: 300;
  font-size: 17px;
  line-height: 20px;
`;


export const OverpassTitle1Bold = styled(OverpassTemplate)`
  font-weight: 900;
  font-size: 28px;
  line-height: 43px;
`;
export const OverpassBody2Bold = styled(OverpassTemplate)`
  font-size: 18px;
  font-weight: 900;
  line-height: 28px;
`;
export const OverpassBody3Bold = styled(OverpassTemplate)`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export const PageDescription = styled(Body1Bold)`
    line-height: 28px;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const fontWeight = (p) => p.fontWeight ? `font-weight: ${p.fontWeight};` : '';
const marginBottom = (p) => p.marginBottom ? `margin-bottom: ${p.marginBottom}px;` : '';
const marginTop = (p) => p.marginTop ? ` margin-top: ${p.marginTop}px;` : '';
const marginLeft = (p) => p.marginLeft ? `margin-left: ${p.marginLeft}px;` : '';
const marginRight = (p) => p.marginRight ? `margin-right: ${p.marginRight}px;` : '';
const padding = (p) => p.padding ? `padding: ${p.padding}px;` : '';
const paddingTop = (p) => p.paddingTop ? `padding-top: ${p.paddingTop}px;` : '';
const textAlign = (p) => p.textAlign ? `text-align: ${p.textAlign};` : '';
const textDecoration = (p) => p.textDecoration ? `text-decoration: ${p.textDecoration};` : '';
const height = (p) => p.height ? `height: ${p.height}px;` : '';
