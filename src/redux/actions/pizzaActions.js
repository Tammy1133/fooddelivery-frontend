import { ActionTypes } from "../constants/action-types";

export const setPizzas = (pizzas) => {
  return { type: ActionTypes.SET_PIZZAS, payload: pizzas };
};

export const addPizza = (pizza) => {
  return { type: ActionTypes.ADD_PIZZA, payload: pizza };
};
export const deletePizza = (id) => {
  return { type: ActionTypes.DELETE_PIZZA, payload: id };
};

export const overwritePizzas = (newPizzaList) => {
  return { type: ActionTypes.OVERWRITE_CART, payload: newPizzaList };
};
