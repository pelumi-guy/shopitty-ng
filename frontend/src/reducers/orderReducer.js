import { createSlice } from "@reduxjs/toolkit";
import { objectMap } from "../utils/utilFunctions";

const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        CREATE_ORDER_REQUEST(state, action) {
            state.loading = true;
        },

        CREATE_ORDER_SUCCESS(state, action) {
            state.loading = false;
            state.order = action.payload;
        },

        CREATE_ORDER_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        PAYMENT_FAILED (state, action) {
            state.error = action.payload;
        },

        CLEAR_ORDER_ERRORS(state, action) {
            state.error = null;
        }
    }
})

const orderTypes = objectMap(orderSlice.actions, (action) => action.toString());

export const {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    PAYMENT_FAILED,
    CLEAR_ORDER_ERRORS
} = orderTypes;

export const orderReducer = orderSlice.reducer;


// --- All user orders reducer ---

const userOrdersSlice = createSlice({
    name: "userOrders",
    initialState: { orders: [] },
    reducers: {
        USER_ORDERS_REQUEST(state, action) {
            state.loading = true;
        },

        USER_ORDERS_SUCCESS(state, action) {
            state.loading = false;
            state.orders = action.payload;
        },

        USER_ORDERS_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_USER_ORDERS_ERRORS(state, action) {
            state.error = null;
        }
    }
});

const userOrdersTypes = objectMap(userOrdersSlice.actions, (action) => action.toString());

export const {
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    CLEAR_USER_ORDERS_ERRORS
} = userOrdersTypes;

export const userOrdersReducer = userOrdersSlice.reducer;


// --- Order Details Reducer ---
const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: { order: {} },
    reducers: {
        ORDER_DETAILS_REQUEST(state, action) {
            state.loading = true;
        },

        ORDER_DETAILS_SUCCESS(state, action) {
            state.loading = false;
            state.order = action.payload;
        },

        ORDER_DETAILS_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_ORDER_DETAILS_ERRORS(state, action) {
            state.error = null;
        }
    }
})

const orderDetailsTypes = objectMap(orderDetailsSlice.actions, (action) => action.toString());

export const {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ORDER_DETAILS_ERRORS
} = orderDetailsTypes;

export const orderDetailsReducer = orderDetailsSlice.reducer;


// --- All Orders Reducer (Admin) ---
const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState: { orders: [] },
    reducers: {
        ALL_ORDERS_REQUEST(state, action) {
            state.loading = true;
        },

        ALL_ORDERS_SUCCESS(state, action) {
            state.loading = false;
            state.orders = action.payload.orders;
            state.totalAmount = action.payload.totalAmount;
        },

        ALL_ORDERS_FAIL(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        CLEAR_ALL_ORDERS_ERRORS(state, action) {
            state.error = null;
        }
    }
})

const allOrdersTypes = objectMap(allOrdersSlice.actions, (action) => action.toString());

export const {
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    CLEAR_ALL_ORDERS_ERRORS
} = allOrdersTypes;

export const allOrdersReducer = allOrdersSlice.reducer;


// --- Alter Order Reducer (Admin) ---
const alterRequest = (state, action) => {
    state.loading = true;
}

const alterFail = (state, action) => {
    state.error = action.payload;
}

const alterOrderSlice = createSlice({
    name: 'alterOrder',
    initialState: {},
    reducers: {
        UPDATE_ORDER_REQUEST(state, action) {
            alterRequest(state, action);
        },

        DELETE_ORDER_REQUEST(state, action) {
            alterRequest(state, action);
        },

        UPDATE_ORDER_SUCCESS(state, action) {
            state.loading = false;
            state.isUpdated = action.payload.success;
        },

        DELETE_ORDER_SUCCESS(state, action) {
            state.loading = false;
            state.isDeleted = action.payload.success;
        },

        UPDATE_ORDER_FAIL(state, action) {
            alterFail(state, action);
        },

        DELETE_ORDER_FAIL(state, action) {
            alterFail(state, action);
        },

        UPDATE_ORDER_RESET(state, action) {
            state.isUpdated = false;
        },

        DELETE_ORDER_RESET(state, action) {
            state.isDeleted = false;
        },

        CLEAR_ALTER_ORDER_ERRORS (state, action) {
            state.error = null;
        }
    }
});

export const alterOrderTypes = objectMap(alterOrderSlice.actions, (action) => action.toString());

export const {
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    CLEAR_ALTER_ORDER_ERRORS,
} = alterOrderTypes;

export const alterOrderReducer = alterOrderSlice.reducer;