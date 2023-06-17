import { createSlice } from "@reduxjs/toolkit";
import { objectMap } from "../utils/utilFunctions";

const auth_request = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
  state.user = null;
};

const auth_success = (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
};

const auth_fail = (state, action) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = null;
  state.error = action.payload;
};

const userInitialState = {
  user: {},
  isAuthenticated: false,
  loading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    LOGIN_REQUEST(state, action) {
      auth_request(state, action);
    },

    REGISTER_USER_REQUEST(state, action) {
      auth_request(state, action);
    },

    LOAD_USER_REQUEST(state, action) {
      auth_request(state, action);
    },

    LOGIN_SUCCESS(state, action) {
      auth_success(state, action);
    },

    LOGOUT_SUCCESS(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    REGISTER_USER_SUCCESS(state, action) {
      auth_success(state, action);
    },

    LOAD_USER_SUCCESS(state, action) {
      auth_success(state, action);
    },

    LOGIN_FAIL(state, action) {
      auth_fail(state, action);
    },

    REGISTER_USER_FAIL(state, action) {
      auth_fail(state, action);
    },

    LOAD_USER_FAIL(state, action) {
      auth_fail(state, action);
    },

    RELOAD_USER_FAIL(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },

    LOGOUT_FAIL(state, action) {
      state.error = action.payload;
    },

    CLEAR_AUTH_ERRORS(state, action) {
      state.error = null;
    },
  },
});

const authTypes = objectMap(authSlice.actions, (action) => action.toString());

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  RELOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_AUTH_ERRORS,
} = authTypes;

export const authReducer = authSlice.reducer;


// --- User Reducer ---

const user_request = (state, action) => {
  state.loading = true;
};

const user_suceess = (state, action) => {
  state.loading = false;
  state.isUpdated = action.payload;
};

const user_fail = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const user_reset = (state, action) => {
  state.isUpdated = false;
};

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    UPDATE_PROFILE_REQUEST(state, action) {
      user_request(state, action);
    },

    UPDATE_PASSWORD_REQUEST(state, action) {
      user_request(state, action);
    },

    UPDATE_USER_REQUEST(state, action) {
      user_request(state, action);
    },

    DELETE_USER_REQUEST(state, action) {
      user_request(state, action);
    },

    UPDATE_PROFILE_SUCCESS(state, action) {
      user_suceess(state, action);
    },

    UPDATE_PASSWORD_SUCCESS(state, action) {
      user_suceess(state, action);
    },

    UPDATE_USER_SUCCESS(state, action) {
      user_suceess(state, action);
    },

    DELETE_USER_SUCCESS(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },

    UPDATE_PROFILE_FAIL(state, action) {
      user_fail(state, action);
    },

    UPDATE_PASSWORD_FAIL(state, action) {
      user_fail(state, action);
    },

    UPDATE_USER_FAIL(state, action) {
      user_fail(state, action);
    },

    DELETE_USER_FAIL(state, action) {
      user_fail(state, action);
    },

    UPDATE_PROFILE_RESET(state, action) {
      user_reset(state, action);
    },

    UPDATE_PASSWORD_RESET(state, action) {
      user_reset(state, action);
    },

    UPDATE_USER_RESET(state, action) {
      user_reset(state, action);
    },

    DELETE_USER_RESET(state, action) {
      state.isDeleted = false;
    },

    CLEAR_USER_ERRORS(state, action) {
      state.error = null;
    },
  },
});

const userTypes = objectMap(userSlice.actions, (action) => action.toString());

export const {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_USER_ERRORS,
} = userTypes;

export const userReducer = userSlice.reducer;


// --- Forgot Password Reducer ---

const password_request = (state, action) => {
  state.loading = true;
  state.error = null;
};

const password_success = (state, action) => {
  state.loading = false;
  state.message = action.payload;
};

const password_fail = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {},
  reducers: {
    FORGOT_PASSWORD_REQUEST(state, action) {
      password_request(state, action);
    },

    NEW_PASSWORD_REQUEST(state, action) {
      password_request(state, action);
    },

    FORGOT_PASSWORD_SUCCESS(state, action) {
      password_success(state, action);
    },

    NEW_PASSWORD_SUCCESS(state, action) {
      state.success = action.payload
    },

    FORGOT_PASSWORD_FAIL(state, action) {
      password_fail(state, action);
    },

    NEW_PASSWORD_FAIL(state, action) {
      password_fail(state, action);
    },

    CLEAR_PWD_ERRORS(state, action) {
      state.error = null;
    },
  },
});

const forgotPasswordTypes = objectMap(forgotPasswordSlice.actions, (action) => action.toString());

export const {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_PWD_ERRORS,
} = forgotPasswordTypes;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;


// --- All User Reducer ---
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: { users: [] },
  reducers: {
    ALL_USERS_REQUEST(state, action) {
      state.loading = true;
    },

    ALL_USERS_SUCCESS(state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    ALL_USERS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ALL_USERS_ERRORS(state, action) {
      state.error = null;
    },
  },
});

const allUsersTypes = objectMap(allUsersSlice.actions, (action) => action.toString());

export const {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ALL_USERS_ERRORS,
} = allUsersTypes;

export const allUsersReducer = allUsersSlice.reducer;


// --- User Details (Admins) ---
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { user: {} },
  reducers: {
    USER_DETAILS_REQUEST(state, action) {
      state.loading = true;
    },

    USER_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.user = action.payload;
    },

    USER_DETAILS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_USER_DETAILS_ERRORS(state, action) {
      state.error = null;
    },
  },
});

const userDetailsTypes = objectMap(userDetailsSlice.actions, (action) => action.toString());

export const {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_USER_DETAILS_ERRORS,
} = userDetailsTypes;

export const userDetailsReducer = userDetailsSlice.reducer;
