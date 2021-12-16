import React from 'react';
import {WhyFreeTonCard} from '../../../components';
import {FixedModalWrapper} from '../components';


export const WhyFreeTonModal = ({onClose = null}) => {

    return (
        <FixedModalWrapper onClose={onClose} top={'30%'} >
            <WhyFreeTonCard
                onClick={onClose}
            />
        </FixedModalWrapper>
    );
};

