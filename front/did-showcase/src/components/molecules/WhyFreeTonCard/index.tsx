import React from 'react';
import {Body4, Button, Text, Title5} from '../../../ui';
import {Card} from '../../../components';
import CrystalsIcon from '../../../assets/img/crystals_ic.svg';


export const WhyFreeTonCard = ({onClick = null}) => {

    return (
        <Card maxWidth={448} paddingTop={31} paddingBottom={38}>
            <Text textAlign={'center'} height={122}>
                <img src={CrystalsIcon}/>
            </Text>

            <Title5 marginTop={26} marginBottom={19}>
                WHY DO YOU NEED FREETON.id?
            </Title5>

            <Body4>
                To get bonuses, privileges and discounts! Your favourite services
                want to know whether you are credible and experienced to get
                this advantage or to authorize as a credible community member.
                Therefore they want you to provide several verifiable credentials
                (VCs) in exchange for their specials offers.
            </Body4>

            <Button
                label={'Let’s go!'}
                onClick={onClick}
                marginTop={31}
                wide
            />
        </Card>
    );
};
