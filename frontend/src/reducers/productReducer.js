import { createSlice } from '@reduxjs/toolkit';
import { objectMap } from '../utils/utilFunctions';

const productsRequest = (state, action) => {
    state.loading = true;
    state.products = [];
}

const productsFail = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

const productsInitialState = { products: [] };

const productSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        ALL_PRODUCTS_REQUEST(state, action) {
            productsRequest(state, action);
        },

        ADMIN_PRODUCTS_REQUEST(state, action) {
            productsRequest(state, action);
        },

        ALL_PRODUCTS_SUCCESS (state, action) {
            state.loading = false;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount
            state.resPerPage = action.payload.resPerPage
            state.filteredProductsCount = action.payload.filteredProductsCount
        },

        ADMIN_PRODUCTS_SUCCESS (state, action) {
            state.loading = false;
            state.products = action.payload.product;
        },

        ALL_PRODUCTS_FAIL (state, action) {
            productsFail(state, action);
        },

        ADMIN_PRODUCTS_FAIL(state, action) {
            productsFail(state, action);
        },

        CLEAR_PRODUCT_ERRORS (state, action) {
            state.error = null;
        }
    }
})

const productTypes = objectMap(productSlice.actions, (action) => action.toString());

export const {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_PRODUCT_ERRORS
} = productTypes;

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

        CLEAR_DETAILS_ERRORS (state, action) {
            state.error = null;
        }

    }
})

const productDetailsTypes = objectMap(productDetailsSlice.actions, (action) => action.toString());

export const {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_DETAILS_ERRORS
} = productDetailsTypes;

export const productDetailsReducer = productDetailsSlice.reducer;


// --- Reviews Reducer ---

// New Review Reducer
const newReviewSlice = createSlice({
    name: 'newReview',
    initialState: {},
    reducers: {
        NEW_REVIEW_REQUEST(state, action) {
            state.loading = true;
        },

        NEW_REVIEW_SUCCESS(state, action) {
            state.loading = false;
            state.success = action.payload;
        },

        NEW_REVIEW_FAIL(state, action) {
            state.error = action.payload;
        },

        NEW_REVIEW_RESET(state, action) {
            state.success = false;
        },

        CLEAR_NEW_REVIEW_ERRORS (state, action) {
            state.error = null;
        }
    }
});

export const newReviewTypes = objectMap(newReviewSlice.actions, (action) => action.toString());

export const {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    CLEAR_NEW_REVIEW_ERRORS
} = newReviewTypes;

export const newReviewReducer = newReviewSlice.reducer;

// New Review Reducer
const productReviewsSlice = createSlice({
    name: 'productReviews',
    initialState: { reviews: [] },
    reducers: {
        GET_REVIEWS_REQUEST(state, action) {
            state.loading = true;
        },

        GET_REVIEWS_SUCCESS(state, action) {
            state.loading = false;
            state.reviews = action.payload;
        },

        GET_REVIEWS_FAIL(state, action) {
            state.error = action.payload;
            state.reviews = [];
        },

        CLEAR_GET_REVIEWS_ERRORS (state, action) {
            state.error = null;
        }
    }
});

export const productReviewsTypes = objectMap(productReviewsSlice.actions, (action) => action.toString());

export const {
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    CLEAR_GET_REVIEWS_ERRORS
} = productReviewsTypes;

export const productReviewsReducer = productReviewsSlice.reducer;

// Delete Review reducer
const reviewSlice = createSlice({
    name: 'review',
    initialState: {},
    reducers: {
        DELETE_REVIEW_REQUEST(state, action) {
            state.loading = true;
        },

        DELETE_REVIEW_SUCCESS(state, action) {
            state.loading = false;
            state.isDeleted = action.payload;
        },

        DELETE_REVIEW_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        DELETE_REVIEW_RESET(state, action) {
            state.isDeleted = false;
        },

        CLEAR_ALTER_REVIEW_ERRORS (state, action) {
            state.error = null;
        }
    }
});

export const reviewTypes = objectMap(reviewSlice.actions, (action) => action.toString());

export const {
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_REVIEW_ERRORS
} = reviewTypes;

export const reviewReducer = reviewSlice.reducer;


// --- New Product Reducer ---
const newProductSlice = createSlice({
    name: 'newProduct',
    initialState: { product: {} },
    reducers: {
        NEW_PRODUCT_REQUEST(state, action) {
            state.loading = true;
        },

        NEW_PRODUCT_SUCCESS(state, action) {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },

        NEW_PRODUCT_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        NEW_PRODUCT_RESET(state, action) {
            state.success = false;
        },

        CLEAR_NEW_PRODUCT_ERRORS (state, action) {
            state.error = null;
        }
    }
})

export const newProductTypes = objectMap(newProductSlice.actions, (action) => action.toString());

export const {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    CLEAR_NEW_PRODUCT_ERRORS
} = newProductTypes;

export const newProductReducer = newProductSlice.reducer;


// --- Edit Product Reducer ---
const alterRequest = (state, action) => {
    state.loading = true;
}

const alterFail = (state, action) => {
    state.error = action.payload;
}

const alterProductSlice = createSlice({
    name: 'alterProduct',
    initialState: {},
    reducers: {
        DELETE_PRODUCT_REQUEST(state, action) {
            alterRequest(state, action);
        },

        UPDATE_PRODUCT_REQUEST(state, action) {
            alterRequest(state, action);
        },

        DELETE_PRODUCT_SUCCESS(state, action) {
            state.loading = false;
            state.isDeleted = action.payload;
        },

        UPDATE_PRODUCT_SUCCESS(state, action) {
            state.loading = false;
            state.isUpdated = action.payload;
        },

        DELETE_PRODUCT_FAIL(state, action) {
            alterFail(state, action);
        },

        UPDATE_PRODUCT_FAIL(state, action) {
            alterFail(state, action);
        },

        DELETE_PRODUCT_RESET(state, action) {
            state.isDeleted = false;
        },

        UPDATE_PRODUCT_RESET(state, action) {
            state.isUpdated = false;
        },

        CLEAR_ALTER_PRODUCT_ERRORS (state, action) {
            state.error = null;
        }
    }
});

export const alterProductTypes = objectMap(alterProductSlice.actions, (action) => action.toString());

export const {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    CLEAR_ALTER_PRODUCT_ERRORS
} = alterProductTypes;

export const alterProductReducer = alterProductSlice.reducer;