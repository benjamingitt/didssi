import React from 'react';
import {Body1, Container} from '../../../ui';
import {COLORS} from '../../../utils/static';
import styled from 'styled-components';


export const Button = (
    {
        label = '',
        TextStyle = Body1,
        size = 'large',
        outlined = false,
        borderRadius = defaultBorderRadius(outlined),
        background = defaultBackground(outlined),
        color = defaultColor(outlined),
        width = null,
        wide = false,
        ...props
    }) => {

    const usedColor = BG_CONFIG[color] || color;


    return (
        <ButtonWrapper
            height={SIZE_CONFIG[size]}
            background={BG_CONFIG[background] || background}
            wide={wide}
            width={width}
            paddingX={14}
            borderRadius={borderRadius}
            borderColor={outlined && usedColor}
            {...props}
            onClick={!props.disabled && props.onClick || null}
        >
            <TextStyle color={usedColor}>{label}</TextStyle>
        </ButtonWrapper>
    );
};

const defaultBorderRadius = (outlined) => outlined ? 3 : 8;
const defaultBackground = (outlined) => outlined ? 'transparent' : 'primary';
const defaultColor = (outlined) => outlined ? 'primary' : COLORS.white;

const BG_CONFIG = {
    primary: COLORS.blue,
    secondary: COLORS.purple
};
const SIZE_CONFIG = {
    large: 56,
    medium: 40,
    small: 38
};

const ButtonWrapper = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${p => p.height}px;
    width: ${p => p.width ? `${p.width}px` : p.wide ? '100%' : 'fit-content'};
    border-radius: ${p => p.borderRadius ? `${p.borderRadius}px;` : ''}
    background: ${p => p.background};
    ${p => p.borderColor ? `border: 1px solid ${p.borderColor};` : ''}
    transition: 0.15s;
    
    ${p => p.disabled ? `
        opacity: 0.7;
        cursor: default;
    ` : `
        cursor: pointer;
    `}
`;
