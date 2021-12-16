import React from 'react';
import styled from 'styled-components';
import CheckIc from '../../../assets/img/check-ic.svg';
import {COLORS} from '../../../utils/static/colors';


export const VerifyCheckbox = ({verified = false, size = 'default'}) => {

    if (verified) {
        return (
            <Ok size={config[size].wrapperSize}>
                <IconCheck
                    src={CheckIc}
                    width={config[size].checkWidth}
                    height={config[size].checkHeight}
                />
            </Ok>
        );
    } else {
        return (
            <Empty size={config[size].wrapperSize}/>
        );
    }
};


const config = {
    default: {
        wrapperSize: 35,
        checkWidth: 17,
        checkHeight: 12
    },
    small: {
        wrapperSize: 21,
        checkWidth: 10,
        checkHeight: 7
    }
};


const IconBg = styled.div`
    height: ${p => p.size}px;
    width: ${p => p.size}px;
    border-radius: 100%;
`;
const Ok = styled(IconBg)`
    background: ${COLORS.blue};
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Empty = styled(IconBg)`
    background: #F7F7FC;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
`;
const IconCheck = styled.img`
    margin-left: 1px;
    width: ${p => p.width}px;
    height: ${p => p.height}px;
`;
