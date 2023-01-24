import { ActionTypes } from "../constants/action-types";

const initialState = {
  payDetails: [],
};

export const payReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PAY:
      return {
        ...state,

        payDetails: [...state.payDetails, action.payload],
      };

    default:
      return state;
  }
};
