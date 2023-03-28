import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_PRODUCT_ERRORS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_DETAILS_ERRORS
} from '../reducers/productReducer';

// Get all products
export const getProducts = (currentPage, keyword = '', price = 0, category, rating = 0) => async (dispatch) => {
    try {
        // console.log('type of reducer.slice.actions: ', typeof(ALL_PRODUCTS_REQUEST.toString()));
        // console.log('ALL_PRODUCTS_REQUEST as string: ', ALL_PRODUCTS_REQUEST.toString());

        dispatch({ type: ALL_PRODUCTS_REQUEST.toString() })

        let link = `/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) link = `/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`

        const { data } = await axios.get(link)

        // console.log('data recieved: ', data)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS.toString(),
            payload: data
        })

    } catch (err) {
        // console.log('error message: ', err.response.data.errMessage);

        dispatch({
            type: ALL_PRODUCTS_FAIL.toString(),
            payload: err.response.data.errMessage
        })

    }
}

// Clear product errors
export const clearProductErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCT_ERRORS.toString()
    })
}

// Get product DETAILS
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST.toString() })

        const { data } = await axios.get(`/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS.toString(),
            payload: data.product
        })

    } catch (err) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL.toString(),
            payload: err.response.data.errMessage
        })

    }
}

// Clear product details errors
export const clearDetailsErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_DETAILS_ERRORS.toString()
    })
}