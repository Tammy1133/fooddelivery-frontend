import { Navbar } from "../subcomponents/navbar";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  increaseQuantity,
  deleteCartItem,
  decreaseQuantity,
} from "../redux/actions/cartAction";
import { Pay } from "./pay";
import { PaystackButton } from "react-paystack";
import Axios from "axios";
import { setOrders } from "../redux/actions/orderActions";

export const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });
  console.log(cartItems);

  const total = cartItems.reduce(
    (x, item) => x + item.quantity * item.pizzaDetails.prices[0][item.varient],
    0
  );
  const user = useSelector((state) => state.accountDetails.currentUser);
  console.log(user.email);

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status === "success") {
      try {
        await Axios.post("http://localhost:3001/order", {
          email: user.username,
          id: reference.reference,
          cartItems: cartItems,
          total: total,
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => console.log(e));

        await Axios.get("http://localhost:3001/getorders")

          .then((res) => {
            return dispatch(setOrders(res.data));
          })
          .catch((e) => {
            console.log(e);
          });
        navigate("/orders");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_7837c68d348c6d5d0888e1b4bce0aaed4a18fd98",
  };
  const componentProps = {
    ...config,
    text: "Paynow",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  useEffect(() => {
    console.log(cartItems);
  }, []);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar></Navbar>
      <button
        onClick={() => navigate("/")}
        className=" ml-2 bg-red border-2 border-red-500 shadow-lg rounded-lg uppercase px-3 mt-3"
      >
        Back
      </button>
      <div className="grid md:grid-cols-2 mt-2 md:px-0 px-5">
        <div className="left flex flex-col md:items-center ">
          <h2 className="mb-7">My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="border-b-2">
                <h5 className="text-lg">
                  {item.pizzaDetails.name} [{item.varient}]
                </h5>
                <h5 className="text-sm ">
                  Price: {item.quantity} *
                  {item.pizzaDetails.prices[0][item.varient]} =
                  {item.quantity * item.pizzaDetails.prices[0][item.varient]}
                </h5>
                <h5 className="text-sm">
                  Quantity:
                  <span className="text-blue-500 cursor-pointer ml-2">
                    <button
                      onClick={() => {
                        dispatch(increaseQuantity(item.pizzaDetails._id));
                      }}
                    >
                      {" "}
                      Increase
                    </button>
                    <span className="text-xl mx-3 text-black cursor-default">
                      {item.quantity}{" "}
                    </span>{" "}
                    <button
                      onClick={() => {
                        dispatch(decreaseQuantity(item.pizzaDetails._id));
                      }}
                    >
                      Decrease
                    </button>
                    <span
                      className="ml-3"
                      onClick={() =>
                        dispatch(deleteCartItem(item.pizzaDetails._id))
                      }
                    >
                      Delete
                    </span>
                  </span>
                </h5>
              </div>
            );
          })}
        </div>
        <div className=" flex flex-col justify-center items-end mt-7 md:mt-0">
          {" "}
          <h2 className="text-2xl">Sub-total</h2>
          <h4 className="mt-2 text-5xl">{total}Naira</h4>
          <div className="mt-4">
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};
