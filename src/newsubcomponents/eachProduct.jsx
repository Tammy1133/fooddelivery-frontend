import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, increaseQuantity } from "../redux/actions/cartAction";
import { Navbar } from "./navbar";

export const EachProduct = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });

  const params = useParams();
  const allFood = useSelector((state) => {
    return state.allFoodReducer.food;
  });
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const getProductDetails = () => {
    const product = allFood.find((item) => item.name === params.name);
    setProduct(product);
  };

  useEffect(() => getProductDetails(), []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-28 ">
        <button
          className="px-3 py-2 ml-4 rounded-lg border-red-400 border-2 "
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <h4 className="text-center text-5xl mt-4 text-slate-800 uppercase">
        {product?.name}
      </h4>

      <hr className="mt-7"></hr>
      <div className="mt-3 mx-4">
        <h4 className="text-2xl">Description</h4>
        <div className="mt-3 mx-4">{product.description}</div>
      </div>

      <hr />

      <div className="flex justify-end mr-5">
        <button
          className="py-3 px-4 my-4 ml-4 text-white
               bg-slate-800 hover:bg-slate-900  rounded-xl text-xl"
          onClick={() => {
            const isthere = cartItems.find((item) => {
              return item?.food.name === product.name;
            });
            console.log(isthere);

            if (isthere) {
              dispatch(increaseQuantity(product.name, 1));
            }

            if (isthere === undefined) {
              dispatch(addToCart(product, 1));
            }
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
