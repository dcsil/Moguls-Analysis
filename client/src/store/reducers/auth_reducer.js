import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  isAuth: false,
  username: "",
  login: () => {},
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true,
        username: action.username,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
        username: "",
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        is_authenticated: false,
        username: "",
      };
    default:
      return state;
  }
};
