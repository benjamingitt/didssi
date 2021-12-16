import {entitiesReducer} from '../../../store';


export const setCurrentService = (service) => dispatch => {
    dispatch(entitiesReducer.setCurrentService(service));
};

export const showToast = (title: string) => dispatch => {
    dispatch(entitiesReducer.showToast(title));
};

export const hideToast = () => dispatch => {
    dispatch(entitiesReducer.hideToast());
};
