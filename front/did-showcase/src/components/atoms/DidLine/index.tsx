import React from 'react';
import {Body3Bold, Row} from '../../../ui';
import styled from 'styled-components';
import DidAvatar from '../../../assets/img/did_avatar.svg';

const didLineMaxLength = 22;

export const DidLine = ({didUrl = '', onClick, ...props}) => {
    const ellipsis = didUrl.length > didLineMaxLength ? '......' : '';

    let url = didUrl.substr(0, didLineMaxLength);
    url += ellipsis;


    return (
        <DidRow margin={-3} onClick={() => onClick(didUrl)} {...props}>
            <img src={DidAvatar}/>
            <Body3Bold>{url}</Body3Bold>
        </DidRow>
    );
};


const DidRow = styled(Row)`
    cursor: pointer;
    
    :hover > ${Body3Bold} {
        text-decoration: underline;
    }
`;
