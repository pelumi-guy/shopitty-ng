import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_PRODUCT_ERRORS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_DETAILS_ERRORS,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_NEW_REVIEW_ERRORS,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    CLEAR_NEW_PRODUCT_ERRORS,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CLEAR_ALTER_PRODUCT_ERRORS,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    CLEAR_GET_REVIEWS_ERRORS,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_REVIEW_ERRORS,

} from '../reducers/productReducer';

const api_prefix = '/api/v1';

// Get all products
export const getProducts = (currentPage, keyword = '', price = 0, category, rating = 0) => async (dispatch) => {
    try {
        // console.log('type of reducer.slice.actions: ', typeof(ALL_PRODUCTS_REQUEST.toString()));
        // console.log('ALL_PRODUCTS_REQUEST as string: ', ALL_PRODUCTS_REQUEST.toString());

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) link = `/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`

        const { data } = await axios.get(api_prefix+link);

        // console.log({data});

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (err) {
        // console.log('error message: ', err.response.data.errMessage);

        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear product errors
export const clearProductErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCT_ERRORS
    })
}

// Get Admin products
export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`${api_prefix}/admin/products`);

        // console.log({data});

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (err) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: err.response.data.errMessage
        })

    }
}


// Get product DETAILS
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${api_prefix}/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (err) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear product details errors
export const clearDetailsErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_DETAILS_ERRORS
    })
}


// --- Review Actions ---

// Add new review => api/v1/review
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
        }

        const { data } = await axios.patch(`${api_prefix}/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear new review errors
export const clearNewReviewErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_REVIEW_ERRORS
    })
}

// Get Reviews (Admin)
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST });

        const { data } = await axios.get(`${api_prefix}/reviews?id=${id}`);

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (err) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear new review errors
export const clearProductReviewsErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_GET_REVIEWS_ERRORS
    })
}

// Delete review => api/v1/review/:id
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(`${api_prefix}/review/${id}?productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear delete product error
export const clearDeleteReviewErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_REVIEW_ERRORS
    })
}


// --- Add New Product ---

// Add new product (Admin) => api/v1/product/new
export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json'
                    // 'Content-Type': "multipart/form-data"
                }
        }

        // console.log({productData})
        const { data } = await axios.post(`${api_prefix}/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear new product errors
export const clearNewProductErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_PRODUCT_ERRORS
    })
}


// --- Alter Product Actions ---

// Delete product => api/v1/admin/product/:id
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`${api_prefix}/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: err.response.data.errMessage
        })

    }
}

// Clear delete product error
export const clearAlterProductErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALTER_PRODUCT_ERRORS
    })
}

// Update Product (Admin) => api/v1/product/new
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json'
                }
        }

        // console.log({productData})
        const { data } = await axios.put(`${api_prefix}/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: err.response.data.errMessage
        })

    }
}