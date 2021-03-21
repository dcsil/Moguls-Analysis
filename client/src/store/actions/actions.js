import * as ACTION_TYPES from "./action_types";

export const success = (content) => {
  return {
    type: ACTION_TYPES.SUCCESS,
    msg: content,
  };
};

export const failure = (content) => {
  return {
    type: ACTION_TYPES.FAILURE,
    success: false,
    loading: false,
    msg: content,
  };
};

export const login_success = (username) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    username: username,
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

export const loading = () => {
  return {
    type: ACTION_TYPES.LOADING,
  };
};
