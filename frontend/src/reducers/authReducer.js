import { createSlice } from '@reduxjs/toolkit';

const userInitialState = { user: {} };

const authSlice = createSlice({
    name: 'auth',
    initialState: userInitialState,
    reducers: {

        LOGIN_REQUEST(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
        },

        REGISTER_USER_REQUEST(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
        },

        LOGIN_SUCCESS(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        REGISTER_USER_SUCCESS(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        LOGIN_FAIL(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        REGISTER_USER_FAIL(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        CLEAR_AUTH_ERRORS(state, action) {
            state.error = null;
        }
    }
})

export const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_AUTH_ERRORS
} = authSlice.actions

export const authReducer = authSlice.reducer