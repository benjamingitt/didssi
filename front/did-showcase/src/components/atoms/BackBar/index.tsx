import React from 'react';
import {history} from '../../../routing';
import {Row} from '../../../ui';
import ArrowBack from '../../../assets/img/arrow-back.svg';
import styled from 'styled-components';
import {COLORS} from '../../../utils/static/colors';


export const BackBar = () => {

    return (
        <div>
            <BackButton margin={-9} alignItems={'center'} onClick={() => history.goBack()}>
                <img src={ArrowBack}/>
                <Title>Back</Title>
            </BackButton>
        </div>
    );
};

const BackButton = styled(Row)`
    width: fit-content;
    cursor: pointer;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: ${COLORS.white};
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;
