import * as ACTION_TYPES from "../actions/action_types";

export const initialState = {
  allData: [],
};

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA:
      return {
        data: action.data,
      };
    case ACTION_TYPES.ADD_DATA:
      return {
        data: [...state.data, action.newData],
      };
    case ACTION_TYPES.DELETE_DATA:
      return {
        data: state.data.filter((record) => record._id !== action._id),
      };
    default:
      return state;
  }
};
