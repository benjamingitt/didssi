import React from 'react';
import {useServicesQuery} from '../../../generated/graphql';
import {entitiesActions} from '../../../store/entities';
import {history} from '../../../routing';
import {AvailableServicesBoxView} from '../View';
import {useDispatch} from 'react-redux';


export const AvailableServicesBox = ({vcTemplateId = null}) => {
    const dispatch = useDispatch();
    const {data} = useServicesQuery({
        variables: {
            vcTemplateId: vcTemplateId ? +vcTemplateId : undefined
        }
    });

    const goToService = (service) => {
        dispatch(entitiesActions.setCurrentService(service));
        history.push(`/service/${service.id}`);
    };

    return (
        <AvailableServicesBoxView
            services={data && data.services}
            goToService={goToService}
        />
    );
};
