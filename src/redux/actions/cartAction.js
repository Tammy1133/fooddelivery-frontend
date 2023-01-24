import { ActionTypes } from "../constants/action-types";

export const addToCart = (food, quantity) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { food, quantity },
  };
};

export const increaseQuantity = (name, quantity) => {
  return {
    type: ActionTypes.INCREASE_CART_QUANTITY,
    payload: { name, quantity },
  };
};
export const increaseQuantityInCart = (name) => {
  return {
    type: ActionTypes.INCREASE_CART_QUANTITY_IN_CART,
    payload: name,
  };
};
export const decreaseQuantity = (name) => {
  return {
    type: ActionTypes.DECREASE_CART_QUANTITY,
    payload: name,
  };
};

export const deleteCartItem = (name) => {
  return {
    type: ActionTypes.DELETE_CART_ITEM,
    payload: name,
  };
};
export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};
