import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';


const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true
});

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

export {loaderActions, loaderReducer} from './loader';
export {userActions, userReducer} from './user';
export {modsActions, modsReducer} from './mods';
export {entitiesActions, entitiesReducer} from './entities';
