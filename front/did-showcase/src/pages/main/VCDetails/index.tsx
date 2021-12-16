import React from 'react';
import {useParams} from 'react-router-dom';
import {useVcTemplateQuery} from '../../../generated/graphql';
import {VCDetails} from '../../../modules';
import {Loader} from '../../../components';
import {Container, PageContainer, PageDescription} from '../../../ui';
import styled from 'styled-components';
import {COLORS} from '../../../utils/static/colors';


export const VCDetailsPage = () => {
    const {id} = useParams();
    const {data, loading} = useVcTemplateQuery({variables: {id: +id}});

    return (
        <PageContainer paddingTop={58} paddingX={39}>

            {data && <BoxWrapper>
                <VCDetails
                    vcTemplate={data.vcTemplate}
                    showContinue
                />
            </BoxWrapper>}

            {loading && <Loader/>}
        </PageContainer>
    );
};


const BoxWrapper = styled(Container)`
    max-width: 812px;
    margin-left: auto;
    margin-right: auto;
`;
