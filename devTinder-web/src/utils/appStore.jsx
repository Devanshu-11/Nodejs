import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.jsx';

// It can consists of various slices
const appStore=configureStore({
    reducer:{
        user:userReducer
    }
});

export default appStore;