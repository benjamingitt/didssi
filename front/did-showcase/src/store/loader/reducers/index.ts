import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    visible: true,
    label: 'Loading...'
};

const loader = createSlice({
    name: 'loaderReducer',
    initialState,
    reducers: {
        showLoader(state, action) {
            state.visible = true;
            if (action.payload) {
                state.label = action.payload;
            }
        },
        hideLoader(state) {
            state.visible = false;
            state.label = null;
        }
    }
});

export const {
    showLoader,
    hideLoader
} = loader.actions;

export default loader.reducer;


