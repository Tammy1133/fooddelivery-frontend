import { ActionTypes } from "../constants/action-types";

export const setFood = (food) => {
  return {
    type: ActionTypes.SET_FOOD,
    payload: food,
  };
};
export const deleteFood = (id) => {
  return {
    type: ActionTypes.DELETE_FOOD,
    payload: id,
  };
};
export const updateFood = (food) => {
  return {
    type: ActionTypes.UPDATE_FOOD,
    payload: food,
  };
};
