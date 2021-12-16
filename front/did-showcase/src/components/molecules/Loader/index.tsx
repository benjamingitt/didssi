import React from 'react';
import {Title5} from '../../../ui/typography';
import styled from 'styled-components';
import LoaderIcon from '../../../assets/img/loader_icon.svg';
import {COLORS} from '../../../utils/static/colors';


export const Loader = ({label = 'Processing....'}) => {

    return (
        <Wrapper>
            <img src={LoaderIcon}/>
            <Title5 marginTop={34} color={COLORS.white}>{label || 'Processing....'}</Title5>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100% - 64px - 64px);
    padding-bottom: 8vh;
`;
