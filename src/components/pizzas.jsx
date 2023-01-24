import React from "react";
import { useState, useEffect } from "react";
import { Pizza } from "./pizza";
import { pizzaData } from "./pizzadata";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPizzas } from "../redux/actions/pizzaActions";

export const Pizzas = () => {
  const [selectedVarient, setSelectedVarient] = useState("");
  const dispatch = useDispatch();
  const allPizzas = useSelector((state) => {
    return state.allPizzas.pizzas;
  });

  const getPizzas = async () => {
    try {
      const allPizzas = await Axios.get("http://localhost:3001/getPizzas");
      dispatch(setPizzas(allPizzas.data));
      console.log(allPizzas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);
  return (
    <div className="mt-3  ">
      <div className="flex justify-center my-6"></div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 p-6 md:p-3">
        {allPizzas?.map((pizza) => {
          return <Pizza pizza={pizza}></Pizza>;
        })}
      </div>
    </div>
  );
};
