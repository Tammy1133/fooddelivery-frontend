import { ActionTypes } from "../constants/action-types";
const initialstate = {
  pizzas: [],
};

export const allPizzasReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ActionTypes.SET_PIZZAS:
      return { ...state, pizzas: action.payload };
    case ActionTypes.ADD_PIZZA:
      return { ...state, pizzas: [...state.pizzas, action.payload] };
    case ActionTypes.DELETE_PIZZA:
      return {
        ...state,
        pizzas: state.pizzas.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};
