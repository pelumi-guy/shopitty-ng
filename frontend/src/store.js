// import { combineReducers } from 'redux';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  alterProductReducer,
  productReviewsReducer,
  reviewReducer,

} from "./reducers/productReducer";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,

} from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderReducer,
  userOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  alterOrderReducer,

} from "./reducers/orderReducer";

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
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    order: orderReducer,
    userOrders: userOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    alterProduct: alterProductReducer,
    allOrders: allOrdersReducer,
    alterOrder: alterOrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
