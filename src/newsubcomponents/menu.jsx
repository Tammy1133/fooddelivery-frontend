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

  const allFood = useSelector((state) => {
    return state.allFoodReducer.food;
  });
  console.log(allFood);

  const [displayedData, setDisplayedData] = useState([]);
  const navigate = useNavigate();

  const getCategory = (itemName) => {
    setDisplayedData(
      allFood.filter((item) => {
        return item.foodclass.toUpperCase() === itemName.toUpperCase();
      })
    );
  };

  useEffect(() => {
    setDisplayedData(allFood);
  }, [allFood]);

  return (
    <div id="menu">
      <h4 className="text-center text-6xl p-5">Our Menu</h4>

      <div className="mt-3  flex flex-wrap gap-y-3 ml-[40px] sm:ml-[0px]   sm:justify-center">
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
                {item}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 justify-center md:justify-start  lg:grid-cols-3 mt-3 gap-4 px-2 md:px-5 pt-4  ">
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
