import { createSlice } from '@reduxjs/toolkit';

const productsInitialState = { products: [] };

const productSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        ALL_PRODUCTS_REQUEST(state, action) {
            state.loading = true;
            state.products = [];
        },

        ALL_PRODUCTS_SUCCESS (state, action) {
            state.loading = false;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount
            state.resPerPage = action.payload.resPerPage
            state.filteredProductsCount = action.payload.filteredProductsCount
        },

        ALL_PRODUCTS_FAIL (state, action) {
            state.loading = false;
            state.error = action.payload
        },

        CLEAR_ERRORS (state, action) {
            state.error = null;
        }
    }
})

export const {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_PRODUCT_ERRORS
} = productSlice.actions;

export const productReducer = productSlice.reducer;


// --- Product Details Reducer ---

const productDetailsInitialState = { product: {} };

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: productDetailsInitialState,
    reducers: {

        PRODUCT_DETAILS_REQUEST(state, action) {
            state.loading = true
        },

        PRODUCT_DETAILS_SUCCESS(state, action) {
            state.loading = false
            state.product = action.payload
        },

        PRODUCT_DETAILS_FAIL(state, action) {
            state.error = action.payload
        },

        CLEAR_ERRORS (state, action) {
            state.error = null;
        }

    }
})

export const {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_DETAILS_ERRORS
} = productDetailsSlice.actions;

export const productDetailsReducer = productDetailsSlice.reducer;