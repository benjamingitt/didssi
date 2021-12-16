import {modsReducer} from '../../../store';

export const setLightBgMode = () => dispatch => {
    dispatch(modsReducer.setBgMode('light'));
};

export const setDarkBgMode = () => dispatch => {
    dispatch(modsReducer.setBgMode('dark'));
};

export const setDefaultBgMode = () => dispatch => {
    dispatch(modsReducer.setBgMode(null));
};
