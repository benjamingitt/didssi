import React from 'react';
import {Container} from '../../../../ui';
import {COLORS} from '../../../../utils/static';
import styled from 'styled-components';


export const ServiceProgressBar = ({amount = 0, fill = 0}) => {

    const bars = [];
    for (let i = 0; i < amount; i++) {
        bars.push(<Bar filled={i < fill} key={i}/>);
    }

    return (
        <Wrapper>
            {bars}
        </Wrapper>
    );
};


const Wrapper = styled(Container)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const Bar = styled.div`
  position: relative;
  height: 14px;
  width: 14px;
  margin-right: 15px;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  ${p => p.filled ? `background: ${COLORS.lightBlue};` : `background: ${COLORS.lightGrey};`}
  outline: none;
`;

