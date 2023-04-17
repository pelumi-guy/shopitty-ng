// import { combineReducers } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/authReducer';

// const reducer = combineReducers({

// });

let preloadedState = {};

// const middlware = [thunk];

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        authentication: authReducer,
        user: userReducer,
        forgotPassword: forgotPasswordReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
})

export default store;