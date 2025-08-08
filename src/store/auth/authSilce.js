import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({ 
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        id: null,
        name: null,
        token: null,
        errorMessage: null
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticated',
            state.id = payload.id,
            state.name = payload.name,
            state.token = payload.token,
            state.errorMessage = null
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated',
            state.id = null,
            state.name = null,
            state.token = null,
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        revalidateToken: (state, { payload }) => {
            state.status = 'authenticated';
            state.id = payload.id;
            state.name = payload.name;
            state.token = payload.token;
            state.errorMessage = null;
        }
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, revalidateToken } = authSlice.actions;