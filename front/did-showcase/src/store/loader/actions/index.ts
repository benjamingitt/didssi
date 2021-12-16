import {loaderReducer, modsActions} from '../../../store';


export const showLoader = (label = '') => dispatch => {
    dispatch(loaderReducer.showLoader(label));
    dispatch(modsActions.setDarkBgMode());
};

export const hideLoader = () => dispatch => {
    dispatch(loaderReducer.hideLoader());
    dispatch(modsActions.setDefaultBgMode());
};
