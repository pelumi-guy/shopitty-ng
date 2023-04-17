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
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_PWD_ERRORS,

} from  '../reducers/authReducer';

// Login request
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS.toString(),
            payload: data
        })

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/register', userData, config)


        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

// Load logged in user with jwt
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST.toString() })

        const { data } = await axios.get('/me')

        dispatch({
            type: LOAD_USER_SUCCESS.toString(),
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

// Load user on reload
export const reloadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST.toString() })

        const { data } = await axios.get('/me')

        dispatch({
            type: LOAD_USER_SUCCESS.toString(),
            payload: data.user
        })

    } catch (err) {
        dispatch({
            type: RELOAD_USER_FAIL.toString(),
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/logout')

        dispatch({
            type: LOGOUT_SUCCESS.toString()
        })

    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}
// Clear Login errors
export const clearAuthErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_ERRORS.toString()
    })
}

// --- USER ACTIONS ---

// Update user profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/me/update', userData, config)


        dispatch({
            type: UPDATE_PROFILE_SUCCESS.toString(),
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: UPDATE_PROFILE_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

export const clearUserErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_ERRORS.toString()
    })
}

// --- Passwrod Actions ---

// Update user password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.put('/password/update', passwords, config)


        dispatch({
            type: UPDATE_PASSWORD_SUCCESS.toString(),
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/password/forgot', email, config)


        dispatch({
            type: FORGOT_PASSWORD_SUCCESS.toString(),
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

// New password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST.toString() })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/password/reset/${token}', passwords, config)


        dispatch({
            type: NEW_PASSWORD_SUCCESS.toString(),
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: NEW_PASSWORD_FAIL.toString(),
            payload: err.response.data.errMessage
        })
    }
}

export const clearPwdErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_PWD_ERRORS.toString()
    })
}
