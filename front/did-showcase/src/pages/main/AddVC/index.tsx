import React from 'react';
import {useParams} from 'react-router-dom';
import {useVcTemplateQuery} from '../../../generated/graphql';
import {VCAddBox} from '../../../modules';
import {BackBar} from '../../../components';
import {Container, PageContainer} from '../../../ui';
import styled from 'styled-components';


export const AddVCPage = () => {
    const {id} = useParams();
    const {data, refetch} = useVcTemplateQuery({variables: {id: +id}});

    return (
        <PageContainer paddingTop={24} paddingX={39}>
            <BackBar/>

            <BoxWrapper marginTop={31}>
                <VCAddBox
                    vcTemplate={data && data.vcTemplate}
                    refetchTemplate={refetch}
                />
            </BoxWrapper>
        </PageContainer>
    );
};


const BoxWrapper = styled(Container)`
    max-width: 812px;
    margin-left: auto;
    margin-right: auto;
`;
