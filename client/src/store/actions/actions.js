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

export const clear_loading = () => {
  return {
    type: ACTION_TYPES.CLEAR_LOADING,
  };
};

export const clear_msg = () => {
  return {
    type: ACTION_TYPES.CLEAR_MSG,
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

export const set_data = (data) => {
  return {
    type: ACTION_TYPES.SET_DATA,
    data: data,
  };
};

export const add_data = (newData) => {
  return {
    type: ACTION_TYPES.ADD_DATA,
    newData: newData,
  };
};

export const delete_data = (_id) => {
  return {
    type: ACTION_TYPES.DELETE_DATA,
    _id: _id,
  };
};
