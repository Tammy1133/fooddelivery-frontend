import { ActionTypes } from "../constants/action-types";

export const payAction = (currentuser, subtotal, token, cartitems) => {
  return {
    type: ActionTypes.PAY,
    payload: { currentuser, subtotal, token, cartitems },
  };
};
