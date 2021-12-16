import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentService: null,
    toast: {
        visible: false,
        title: ''
    }
};

const entities = createSlice({
    name: 'entitiesReducer',
    initialState,
    reducers: {
        setCurrentService(state, action) {
            state.currentService = action.payload;
        },
        showToast(state, action) {
            state.toast = {
                visible: true,
                title: action.payload
            };
        },
        hideToast(state) {
            state.toast = {
                visible: false,
                title: ''
            };
        }
    }
});

export const {
    setCurrentService,
    showToast,
    hideToast
} = entities.actions;

export default entities.reducer;


