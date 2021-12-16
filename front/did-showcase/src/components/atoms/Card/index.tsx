import styled from 'styled-components';
import {Container} from '../../../ui';
import {COLORS} from '../../../utils/static';


export const Card = styled(Container)`
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: ${p => p.background || COLORS.white};
    min-width: 448px;
    ${p => p.maxWidth ? `max-width: ${p.maxWidth}px;` : ''}
    ${p => p.width ? `width: ${p.width}px;` : ''}
    padding-top: ${p => p.paddingTop || p.paddingY ? `${p.paddingTop || p.paddingY}px` : '44px'};
    padding-bottom: ${p => p.paddingBottom || p.paddingY ? `${p.paddingBottom || p.paddingY}px` : '45px'};
    padding-left: ${p => p.paddingLeft || p.paddingX ? `${p.paddingLeft || p.paddingX}px` : '38px'};
    padding-right: ${p => p.paddingRight || p.paddingX ? `${p.paddingRight || p.paddingX}px` : '38px'};
    ${p => p.padding ? `padding: ${p.padding};` : ''}
    ${p => p.textAlign ? `text-align: ${p.textAlign};` : ''}
`;
