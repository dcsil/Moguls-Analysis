import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  // TODO: change this
  isAuth: true,
  username: "Test Username",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        username: action.username,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        username: "",
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuth: false,
        username: "",
      };
    default:
      return state;
  }
};
