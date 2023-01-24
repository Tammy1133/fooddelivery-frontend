import { combineReducers } from "redux";
import { setCurrentUser } from "../reducers/accountReducer";
import { cartReducer } from "./cartReducer";
import { allPizzasReducer } from "./pizzaReducer";
import { payReducer } from "./payreducer";
import { OrderReducer } from "./orderReducer";
import { allFoodReducer } from "./foodReducer";

export const reducers = combineReducers({
  allPizzas: allPizzasReducer,
  allCartItems: cartReducer,
  accountDetails: setCurrentUser,
  payReducer: payReducer,
  orderReducer: OrderReducer,
  allFoodReducer: allFoodReducer,
});
