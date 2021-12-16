import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const user = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});

export const {
    setUser
} = user.actions;

export default user.reducer;


