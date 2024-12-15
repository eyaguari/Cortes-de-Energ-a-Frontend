import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        userInformation: {}
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.userInformation = {};
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.userInformation = payload;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.userInformation = {};
        },
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout } = authSlice.actions;