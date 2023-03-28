import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_AUTH_ERRORS
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

// Clear Login errors
export const clearLoginErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_ERRORS.toString()
    })
}

