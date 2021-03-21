import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  loading: false,
  success: true,
  msg: null,
};

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
