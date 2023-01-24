import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import food from "../utils/food.jpg";
import order from "../utils/order.png";
import { EachMenu } from "./eachmenu";

export const Menu = () => {
  const buttonData = ["ALL", "Swallow", "Light", "Semi heavy", "Meat"];
  const [category, setCategory] = useState("ALL");
  const allFood = useSelector((state) => {
    return state.allFoodReducer.food;
  });
  console.log(allFood);
  const [displayedData, setDisplayedData] = useState(allFood);
  const navigate = useNavigate();

  const getCategory = (itemName) => {
    if (itemName === "ALL") {
      setDisplayedData(allFood);
    } else {
      setDisplayedData(
        allFood.filter((item) => {
          return item.foodclass.toUpperCase() === itemName.toUpperCase();
        })
      );
    }
  };
  useEffect(() => {
    getCategory("ALL");
  }, []);

  return (
    <div>
      <h4 className="text-center text-6xl p-5">Our Menu</h4>

      <div className="mt-3  flex flex-wrap justify-center">
        {buttonData.map((item) => {
          return (
            <div
              className=""
              onClick={() => {
                getCategory(item);
              }}
            >
              <button
                className="mr-6  text-lg px-3 py-2
               text-white uppercase rounded-lg bg-slate-800"
              >
                {" "}
                {item}{" "}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 justify-center md:justify-start ml-3  lg:grid-cols-3 mt-3 gap-4 px-2 md:px-5 pt-4  ">
        {displayedData.map((item) => {
          return <EachMenu food={item}></EachMenu>;
        })}
      </div>

      <div>
        <div className="mt-[130PX] mb-10">
          <h2 className="text-center text-4xl ">HOW TO ORDER FOOD FROM US</h2>
        </div>
        <img src={order} alt="" className="w-100" />
      </div>
    </div>
  );
};
