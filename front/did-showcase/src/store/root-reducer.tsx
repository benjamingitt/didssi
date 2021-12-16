import {combineReducers} from '@reduxjs/toolkit';

import loaderReducer from './loader/reducers';
import userReducer from './user/reducers';
import modsReducer from './mods/reducers';
import entitiesReducer from './entities/reducers';


export const rootReducer = combineReducers({
    loader: loaderReducer,
    user: userReducer,
    mods: modsReducer,
    entities: entitiesReducer
});

export type RootState = ReturnType<typeof rootReducer>
