import { useEffect } from "react";
import { ActionTypes } from "../constants/action-types";

const initialState = {
  cartItems: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    // case ActionTypes.OVERWRITE_CART:
    //   return { ...state, cartItems: action.payload };
    case ActionTypes.INCREASE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.food.name === action.payload.name) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        }),
      };
    case ActionTypes.INCREASE_CART_QUANTITY_IN_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.food.name === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case ActionTypes.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.food.name !== action.payload;
        }),
      };

    case ActionTypes.DECREASE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.food.name === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
