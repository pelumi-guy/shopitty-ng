import { createSlice } from "@reduxjs/toolkit";

const auth_request = (state, action) => {
  state.loading = true;
  state.isAuthenticated = false;
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

const userInitialState = { user: {} };

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
} = authSlice.actions;

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

    UPDATE_PROFILE_SUCCESS(state, action) {
      user_suceess(state, action);
    },

    UPDATE_PASSWORD_SUCCESS(state, action) {
      user_suceess(state, action);
    },

    UPDATE_PROFILE_FAIL(state, action) {
      user_fail(state, action);
    },

    UPDATE_PASSWORD_FAIL(state, action) {
      user_fail(state, action);
    },

    UPDATE_PROFILE_RESET(state, action) {
      user_reset(state, action);
    },

    UPDATE_PASSWORD_RESET(state, action) {
      user_reset(state, action);
    },

    CLEAR_USER_ERRORS(state, action) {
      state.error = null;
    },
  },
});

export const {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  CLEAR_USER_ERRORS,
} = userSlice.actions;

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

export const {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_PWD_ERRORS,
} = forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
