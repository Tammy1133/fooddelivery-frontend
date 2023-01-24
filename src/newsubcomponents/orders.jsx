import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/accountActions";
import { setOrders } from "../redux/actions/orderActions";
import { Navbar } from "./navbar";

export const Orders = () => {
  const dispatch = useDispatch();
  const username = useSelector(
    (state) => state.accountDetails.currentUser.username
  );

  const allOrders = useSelector((state) => state.orderReducer.orders);
  const myOrders = allOrders.filter((item) => {
    return item.email === username;
  });

  const getOrders = async () => {
    await Axios.get("https://tammy1133-api.onrender.com/getorders")

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

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-4">
        <table className=" mt-32">
          <tr className="">
            <th>Id</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
          {myOrders.map((item) => {
            return (
              <tr>
                <td>{item._id.slice(0, 10)}....</td>
                <td>{item.email}</td>
                <td>{item.total}</td>
                <td>{item.status}</td>

                <td></td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
