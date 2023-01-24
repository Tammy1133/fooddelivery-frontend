import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  clearCart,
  deleteCartItem,
  increaseQuantityInCart,
} from "../redux/actions/cartAction";
import {
  // addToCart,
  // increaseQuantity,
  // deleteCartItem,
  decreaseQuantity,
} from "../redux/actions/cartAction";
import { setOrders } from "../redux/actions/orderActions";
import { PaystackButton } from "react-paystack";
import { Navbar } from "./navbar";

// import Axios from "axios";
// import { setOrders } from "../redux/actions/orderActions";

export const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });
  console.log(cartItems);

  const total = cartItems.reduce(
    (x, item) => x + item.quantity * item.food.price,
    0
  );
  const user = useSelector((state) => state.accountDetails.currentUser);

  useEffect(() => {
    console.log(cartItems.length);
  }, []);
  const dispatch = useDispatch();

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status === "success") {
      try {
        await Axios.post("https://tammy1133-api.onrender.com/order", {
          email: user.username,
          id: reference.reference,
          cartItems: cartItems,
          total: total,
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => console.log(e));

        await Axios.get("https://tammy1133-api.onrender.com/getorders")

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
  return (
    <div>
      <Navbar></Navbar>
      <button
        onClick={() => navigate("/")}
        className=" ml-2 bg-red border-2 border-red-500 shadow-lg rounded-lg uppercase px-3 mt-3"
      >
        Back
      </button>
      <div className="grid md:grid-cols-2 mt-20 md:px-0 px-5 ">
        <div className="left flex flex-col md:items-center ">
          <h2 className="mb-7 mt-4  text-4xl font-semibold">My Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return (
                <div className="border-b-2">
                  <h5 className="text-lg">{item.food.name}</h5>
                  <h5 className="text-sm ">
                    Price: {item.quantity} *{item.food.price} ={" "}
                    {item.quantity * item.food.price}
                  </h5>
                  <h5 className="text-sm">
                    Quantity:
                    <span className="text-blue-500 cursor-pointer ml-2">
                      <button
                        onClick={() => {
                          dispatch(increaseQuantityInCart(item.food.name));
                        }}
                      >
                        Increase
                      </button>
                      <span className="text-xl mx-3 text-black cursor-default">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          dispatch(decreaseQuantity(item.food.name));
                        }}
                      >
                        Decrease
                      </button>
                      <span
                        className="ml-3"
                        onClick={() => {
                          dispatch(deleteCartItem(item.food.name));
                        }}
                      >
                        Delete
                      </span>
                    </span>
                  </h5>
                </div>
              );
            })
          ) : (
            <div className="mt-3"> Your cart is empty</div>
          )}
        </div>

        <div className=" flex flex-col justify-center items-end mt-7 md:mt-0">
          <button
            className="p-2 rounded-lg text-white bg-slate-800"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear cart
          </button>
          <h2 className="text-2xl">Sub-total</h2>
          <h4 className="mt-2 text-5xl">{total} Naira</h4>
          <div className="mt-4">
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};
