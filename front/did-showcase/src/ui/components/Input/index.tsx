import React from 'react';
import {Container, Label} from '../../../ui';
import styled from 'styled-components';


export const Input = ({label = '', wide = false, containerProps = null, ...props}) => {

    return (
        <Wrapper {...containerProps}>
            <Label>{label}</Label>
            <StyledInput
                wide={wide}
                {...props}
            />
        </Wrapper>
    );
};


const Wrapper = styled(Container)`
    text-align: 
`;

const StyledInput = styled.input`
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
    border: 1px solid rgba(209, 209, 209, 0.75);
    box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    height: 40px;
    ${p => p.wide ? 'width: 100%;' : ''}
    padding: 8px;
    outline: none;
`;
