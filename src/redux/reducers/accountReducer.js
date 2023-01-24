import { ActionTypes } from "../constants/action-types";
import Axios from "axios";

const initialState = {
  currentUser: [],
};

export const setCurrentUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ActionTypes.LOGOUT:
      return { ...state, currentUser: [] };
    default:
      return state;
  }
};
