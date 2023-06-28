import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    RELOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_AUTH_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    CLEAR_USER_ERRORS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_PWD_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ALL_USERS_ERRORS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_USER_DETAILS_ERRORS,


} from  '../reducers/authReducer';

const api_prefix = '/api/v1';

// Login request
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post( `${api_prefix}/login`, { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                // 'content-type': 'multipart/form-data'
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`${api_prefix}/register`, userData, config);


        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Load logged in user with jwt
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`${api_prefix}/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Load user on reload
export const reloadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get(`${api_prefix}/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: RELOAD_USER_FAIL,
        })
    }
}


// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`${api_prefix}/logout`);

        dispatch({
            type: LOGOUT_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response.data.errMessage
        })
    }
}
// Clear Login errors
export const clearAuthErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_ERRORS
    })
}

// --- USER ACTIONS ---

// Update user profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`${api_prefix}/me/update`, userData, config);


        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Update User Details (Admin)
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`${api_prefix}/admin/user/${id}`, userData, config);


        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Deleted User (Admin)
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`${api_prefix}/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Clear userReducer Errors
export const clearUserErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_ERRORS
    })
}


// Load logged in user with jwt
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`${api_prefix}/admin/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

export const clearUserDetailsErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_DETAILS_ERRORS
    })
}

// --- Password Actions ---

// Update user password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`${api_prefix}/password/update`, passwords, config);


        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`${api_prefix}/password/forgot`, email, config);


        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

// New password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`${api_prefix}/password/reset/${token}`, passwords, config);


        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

export const clearPwdErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_PWD_ERRORS
    })
}


// All Users actions => /api/v1/admin/users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get(`${api_prefix}/admin/users`);

        // console.log({data})

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: err.response.data.errMessage
        })
    }
}

export const clearAllUsersErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALL_USERS_ERRORS
    })
}
