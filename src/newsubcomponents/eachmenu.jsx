import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, increaseQuantity } from "../redux/actions/cartAction";
import foodimg from "../utils/food.jpg";

export const EachMenu = ({ food }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });
  console.log(cartItems);
  return (
    <div>
      <div className="shadow-2xl cursor-pointer">
        <img
          src={food.image}
          className=" h-[290px] w-[100%] object-cover rounded-t-xl "
          alt=""
          onClick={() => {
            navigate(`/eachProduct/${food.name}`);
          }}
        />
        <h4 className="pt-4 pl-4 hover:text-slate-700 cursor-pointer ">
          {food.name}
        </h4>
        <h4 className="pt-4 pl-4 cursor-pointer">Category: {food.foodclass}</h4>
        <div className="flex items-center">
          <button
            className="py-3 px-4 my-4 ml-4 text-white
               bg-slate-800 hover:bg-slate-900  rounded-xl text-xl"
            onClick={() => {
              const isthere = cartItems.find((item) => {
                return item?.food.name === food.name;
              });
              console.log(isthere);

              if (isthere) {
                dispatch(increaseQuantity(food.name, quantity));
              }

              if (isthere === undefined) {
                dispatch(addToCart(food, quantity));
              }
            }}
          >
            Add to cart
          </button>
          <div className="ml-7 right flex flex-col justify-center items-center ">
            <h2 className="text-lg font-normal mt-[-20px]">Quantity</h2>
            <select
              name=""
              id=""
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
              className=" w-24 border-2  border-black"
            >
              {[...Array(10).keys()].map((item) => {
                return <option value={item + 1}>{item + 1}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
