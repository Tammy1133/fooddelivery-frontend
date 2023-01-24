import { ActionTypes } from "../constants/action-types";

const initialState = {
  orders: [],
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: action.payload };
    case ActionTypes.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, status: action.payload.newupdate };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};
