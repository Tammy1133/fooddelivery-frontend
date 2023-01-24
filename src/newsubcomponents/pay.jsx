import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { payAction } from "../redux/actions/payAction";
import Axios from "axios";

export const Pay = ({ total }) => {
  const user = useSelector((state) => state.accountDetails.currentUser);
  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });
  const dispatch = useDispatch();

  const tokenHandler = async (token) => {
    // dispatch(payAction(user, total, token, cartItems));
    try {
      const response = await Axios.post("http://localhost3001/pay", {
        user,
        total,
        token,
        cartItems,
      });
    } catch (error) {}
  };

  return (
    <div>
      <StripeCheckout
        amount={total * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51MRu1KLYhL5Q0bLBpFBIO3RjBAp6jK0rFoLc2YPQFC8xS4DArDh8qsycnbmImt6VVP8zU9PVcZGByNodRAaYvX5l00grsQFyDz"
      >
        <button className="bg-red-600 hover:bg-red-900 rounded-lg p-2 text-white">
          Pay {total} now
        </button>
      </StripeCheckout>
    </div>
  );
};
