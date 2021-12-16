import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    bgMode: null
};

const mods = createSlice({
    name: 'modsReducer',
    initialState,
    reducers: {
        setBgMode(state, action) {
            state.bgMode = action.payload;
        }
    }
});

export const {
    setBgMode
} = mods.actions;

export default mods.reducer;


