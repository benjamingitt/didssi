import React from 'react';
import styled from 'styled-components';


export const FixedModalWrapper = ({onClose = null, children = null, ...props}) => {

    const handleClose = (e) => {
        if (!e.target.closest(ModalWrapper)) {
            onClose();
        }
    };

    return (
        <ModalFixedBgWrapper onClick={handleClose}>
            <ModalWrapper {...props}>
                {children}
            </ModalWrapper>
        </ModalFixedBgWrapper>
    );
};

const ModalFixedBgWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.69);
    z-index: 51;
`;

export const ModalWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: ${p => p.top ? p.top : '50%'};
    transform: translate(-50%, ${p => p.top ? `-${p.top}` : '-50%'}); 
`;
