import { ActionTypes } from "../constants/action-types";

export const setOrders = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};
export const updateOrder = (id, newupdate) => {
  return {
    type: ActionTypes.UPDATE_ORDER,
    payload: { id, newupdate },
  };
};
