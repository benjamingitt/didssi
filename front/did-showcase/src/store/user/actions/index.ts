import {userReducer} from '../../../store';

export const setUser = (user) => dispatch => {
    dispatch(userReducer.setUser(user));
};

export const removeUser = () => dispatch => {
    dispatch(userReducer.setUser(null));
};
