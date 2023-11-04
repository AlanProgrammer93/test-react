import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from './userReducer'
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: []
})

export default store