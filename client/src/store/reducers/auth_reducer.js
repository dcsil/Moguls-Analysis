import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  // TODO: change this
  isAuth: false,
  username: "",
  token: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        username: action.username,
        token: action.token,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        username: "",
        token: "",
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuth: false,
        username: "",
        token: "",
      };
    default:
      return state;
  }
};
