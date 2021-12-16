import styled from 'styled-components';

const paddingTop = (p) => p.paddingTop || p.paddingY ? `padding-top: ${p.paddingTop || p.paddingY}px;` : '';
const paddingBottom = (p) => p.paddingBottom || p.paddingY ? `padding-bottom: ${p.paddingBottom || p.paddingY}px;` : '';
const paddingLeft = (p) => p.paddingLeft || p.paddingX ? `padding-left: ${p.paddingLeft || p.paddingX}px;` : '';
const paddingRight = (p) => p.paddingRight || p.paddingX ? `padding-right: ${p.paddingRight || p.paddingX}px;` : '';
const marginTop = (p) => p.marginTop || p.marginY ? `margin-top: ${p.marginTop || p.marginY}px;` : '';
const marginBottom = (p) => p.marginBottom || p.marginY ? `margin-bottom: ${p.marginBottom || p.marginY}px;` : '';
const marginLeft = (p) => p.marginLeft || p.marginX ? `margin-left: ${p.marginLeft || p.marginX}px;` : '';
const marginRight = (p) => p.marginRight || p.marginX ? `margin-right: ${p.marginRight || p.marginX}px;` : '';
const maxWidth = (p) => p.maxWidth ? `max-width: ${p.maxWidth};` : '';
const width = (p) => p.width ? `width: ${p.width};` : '';
const height = (p) => p.height ? `height: ${p.height};` : '';

export const Container = styled.div`
  ${p => paddingTop(p)}
  ${p => paddingBottom(p)}
  ${p => paddingLeft(p)}
  ${p => paddingRight(p)}
  ${p => marginTop(p)}
  ${p => marginBottom(p)}
  ${p => marginLeft(p)}
  ${p => marginRight(p)}
  ${p => maxWidth(p)}
  ${p => width(p)}
  ${p => height(p)}
`;


export const PageContainer = styled(Container)`
  padding-bottom: ${p => p.paddingBottom || p.paddingY ? `${p.paddingBottom || p.paddingY}px` : '48px'};
  min-height: calc(100vh - 64px - 64px);
`;

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 64px);
    padding-top: 4vh;
    padding-bottom: 8vh;
`;

export const Row = styled(Container)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: ${p => p.wrap || p.nowrap ? p.wrap || 'nowrap' : 'wrap'};
  flex-wrap: ${p => p.wrap || p.nowrap ? p.wrap || 'nowrap' : 'wrap'};
  justify-content: ${p => p.justifyContent ? p.justifyContent : 'unset'};
  align-items: ${p => p.alignItems ? p.alignItems : 'unset'};
  flex-direction: ${p => p.flexDirection ? p.flexDirection : 'unset'};
  // height: 100%;
  ${p => p.minHeight ? `min-height: ${p.minHeight}px;` : ''}
  width:  ${p => p.width || p.wide ? p.width || '100%' : 'auto'};
  margin-left: ${p => p.margin ? `${p.margin}px` : '0'};
  margin-right: ${p => p.margin ? `${p.margin}px` : '0'};
  
  

  ${p => p.margin ? `
    > * {
      padding: 0 ${-p.margin}px;
    }
  ` : ''};

  ${p => p.cols ? `
    > * {
      width: ${100 / p.cols}%;
      max-width: ${100 / p.cols}%;
    }
  ` : ''};

  ${p => p.minCols ? `
    > * {
      max-width: ${100 / p.minCols}%;
    }
  ` : ''};

  ${p => p.colsMarginBottom ? `
    > * {
      margin-bottom: ${p.colsMarginBottom}px;
    }
  ` : ''};

`;

export const Col = styled(Container)`
  flex-grow: ${({auto}) => auto ? 'unset' : '1'};
  ${(p) => p.width ? 'width: 100%' : ''};
  ${(p) => p.width ? ` max-width: ${p.width}` : ''};
  min-width: ${(p) => p.minWidth ? p.minWidth : 'unset'};
  ${(p) => p.padding ? `padding: 0 ${p.padding}px` : ''};
  ${(p) => p.height ? `height: ${p.height}px` : ''};

  ${p => p.paddingRight ? `
    padding-right: ${p.paddingRight}px;
  ` : ''}
  ${p => p.paddingLeft ? `
    padding-left: ${p.paddingLeft}px;
  ` : ''}
`;
