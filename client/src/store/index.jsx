import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: []
})

export default store