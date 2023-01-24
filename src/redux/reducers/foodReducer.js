import { ActionTypes } from "../constants/action-types";
const initialstate = {
  food: [],
};

export const allFoodReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ActionTypes.SET_FOOD:
      return { ...state, food: action.payload };
    case ActionTypes.DELETE_FOOD:
      return {
        ...state,
        food: state.food.filter((item) => {
          return item._id !== action.payload;
        }),
      };

    case ActionTypes.UPDATE_FOOD:
      return { ...state, food: [...state.food, action.payload] };

    default:
      return state;
  }
};
