import React from 'react';
import {history} from '../../../routing';
import {useParams} from 'react-router-dom';
import {Container, PageDescription} from '../../../ui';
import {AvailableServicesBox, VCAddBox, VCDetails} from '../../../modules';
import {COLORS} from '../../../utils/static';
import {useVcTemplateQuery} from '../../../generated/graphql';
import {Loader} from '../../../components';


export const HomeVCDetailsPage = () => {
    const {id} = useParams();
    const {data, loading} = useVcTemplateQuery({variables: {id: +id}});


    return (
        <Container maxWidth={'812px'} marginLeft={37}>

            {data && <Container marginBottom={62}>
                {data?.vcTemplate.vc ? <div>
                    <PageDescription color={COLORS.white} marginBottom={28}>
                            Here you can view your verifiable credential and ensure
                            its validity and digital integrity.
                            Use VCs to authorize in services and obtain bonuses and discounts!
                    </PageDescription>

                    <VCDetails
                        vcTemplate={data.vcTemplate}
                    /></div>
                    : <VCAddBox
                        vcTemplate={data.vcTemplate}
                        handleAddVc={() => history.push(`/vc/${id}/add`, {getVcFromPath: history.location.pathname})}
                    />}
            </Container>}

            {loading && <Container height={'500px'}>
                <Loader label={'Loading...'}/>
            </Container>}


            <AvailableServicesBox
                vcTemplateId={id}
            />
        </Container>
    );
};
