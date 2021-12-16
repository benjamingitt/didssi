import React from 'react';
import {Loader, SideBar} from '../../../components';
import {Col, PageContainer, Row} from '../../../ui';
import {useServicesQuery, useVcTemplateSectionsQuery} from '../../../generated/graphql';


export const AsideWrapper = ({children}) => {
    const {loading: templateLoading} = useVcTemplateSectionsQuery();
    const {loading} = useServicesQuery();


    if (templateLoading && loading) {
        return (
            <Row alignItems={'center'} justifyContent={'center'} height={'calc(100% - 64px - 64px)'}>
                <Loader label={'Loading...'}/>
            </Row>
        );
    } else {
        return (
            <PageContainer paddingTop={59} paddingLeft={110} paddingRight={50}>
                <Row margin={-10} nowrap>
                    <Col auto>
                        <SideBar/>
                    </Col>

                    <Col>
                        {children}
                    </Col>
                </Row>
            </PageContainer>
        );
    }
};
