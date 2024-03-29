import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  loading: false,
  success: true,
  msg: "",
  msgDisplay: false,
};

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        msg: action.msg,
        msgDisplay: true,
      };
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        msg: action.msg,
        msgDisplay: true,
      };
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ACTION_TYPES.CLEAR_MSG:
      return {
        ...state,
        msgDisplay: false,
        msg: "",
      };
    default:
      return state;
  }
};
