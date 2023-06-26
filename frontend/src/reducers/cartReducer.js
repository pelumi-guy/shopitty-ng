import { createReducer, createSlice } from "@reduxjs/toolkit";
import { objectMap } from "../utils/utilFunctions";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },

    REMOVE_CART_ITEM(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },

    EMPTY_CART(state, action) {
      state.cartItems = []
    },

    SAVE_SHIPPING_INFO(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

const cartTypes = objectMap(cartSlice.actions, (action) => action.toString());

export const { ADD_TO_CART, REMOVE_CART_ITEM, EMPTY_CART, SAVE_SHIPPING_INFO, } = cartTypes;

export const cartReducer = cartSlice.reducer;
