import axios from 'axios';

import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    EMPTY_CART,
    SAVE_SHIPPING_INFO
} from '../reducers/cartReducer';

const api_prefix = '/api/v1';

export const addItemToCart = (id, quantity) => async (dispatch, getState) =>{

    const { data } = await axios.get(`${api_prefix}/products/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({ type: REMOVE_CART_ITEM, payload: id });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    // sessionStorage.removeItem('orderInfo');
}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({ type: SAVE_SHIPPING_INFO, payload: data});

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}