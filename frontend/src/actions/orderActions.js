import axios from "axios";

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ALTER_ORDER_ERRORS,
    CLEAR_ALL_ORDERS_ERRORS,
    CLEAR_ORDER_DETAILS_ERRORS,
    CLEAR_USER_ORDERS_ERRORS,
    CLEAR_ORDER_ERRORS
} from "../reducers/orderReducer";

const api_prefix = '/api/v1';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = axios.post(`${api_prefix}/order/new`, order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: err.response.data.errMessage
         })
    }
}

export const clearOrderErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ORDER_ERRORS
    })
}

// --- All user orders actions ---
export const getOrders = () => async (dispatch) => {
    try {

        dispatch({ type:  USER_ORDERS_REQUEST });

        const { data } = await axios.get(`${api_prefix}/orders/me`);

        dispatch({
            type: USER_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (err) {
        dispatch({
            type: USER_ORDERS_FAIL,
            payload: err.response.data.errMessage
         })
    }
}

export const clearUserOrdersErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_ORDERS_ERRORS
    })
}

// --- Order Details Actions ---
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type:  ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`${api_prefix}/order/${id}`);

        // console.log({data})

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response.data.errMessage
         })
    }
}

export const clearOrderDetailsErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ORDER_DETAILS_ERRORS
    })
}

// --- All Orders ---
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type:  ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`${api_prefix}/admin/orders`);

        // console.log({data})

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: err.response.data.errMessage
         })
    }
}

export const clearAllOrdersErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALL_ORDERS_ERRORS
    })
}


// --- Update Order ---
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.patch(`${api_prefix}/admin/order/${id}`, orderData, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: err.response.data.errMessage
         })
    }
}


// --- Delete Order ---
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`${api_prefix}/admin/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: err.response.data.errMessage
         })
    }
}

export const clearAlterOrderErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALTER_ORDER_ERRORS
    })
}