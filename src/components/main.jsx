import React from "react";
import { Navbar } from "../subcomponents/navbar";

import { Pizzas } from "./pizzas";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/actions/accountActions";
import { setOrders } from "../redux/actions/orderActions";
import Axios from "axios";

const Main = () => {
  const navigate = useNavigate();

  const getOrders = async () => {
    await Axios.get("http://localhost:3001/getorders")

      .then((res) => {
        return dispatch(setOrders(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const isUserPresent = useSelector(
    (state) => state.accountDetails.currentUser.username
  );

  useEffect(() => {
    if (isUserPresent) {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <Navbar></Navbar>
      <Pizzas></Pizzas>
    </div>
  );
};

export default Main;
