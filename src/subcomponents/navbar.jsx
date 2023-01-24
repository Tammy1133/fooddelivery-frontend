import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../redux/actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems.length;
  });

  const isUserPresent = useSelector(
    (state) => state.accountDetails.currentUser.username
  );
  const user = useSelector((state) => state.accountDetails.currentUser);

  return (
    <div className="px-10 py-4 drop-shadow-2xl bg-white relative">
      <div className="flex justify-between items-center">
        <h3 className="cursor-pointer" onClick={() => navigate("/")}>
          MY PIZZA
        </h3>
        <div className="flex  ">
          {isUserPresent ? (
            // <h5 className="mr-6 font-semibold cursor-pointer uppercase">
            //   {user.username}
            // </h5>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="cursor-pointer uppercase"
              >
                {user.isAdmin ? "Admin" : user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    onClick={() => {
                      console.log("clicked");
                      return dispatch(logout());
                    }}
                  >
                    Logout
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  {user.isAdmin && (
                    <button onClick={() => navigate("/admin")}>
                      Admin Panel
                    </button>
                  )}
                </Dropdown.Item>
                <Dropdown.Item>
                  {!user.isAdmin && (
                    <div
                      className="flex text-base"
                      onClick={() => navigate("/cart")}
                    >
                      <h5 className="text-base">Cart</h5>
                      <h5 className="ml-3 text-base">{cartItems}</h5>
                    </div>
                  )}
                </Dropdown.Item>
                <Dropdown.Item>
                  {!user.isAdmin && (
                    <div
                      className="flex text-base"
                      onClick={() => navigate("/orders")}
                    >
                      <h5 className="text-base">Orders</h5>
                    </div>
                  )}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <h5 className="cursor-pointer" onClick={() => navigate("/account")}>
              Login
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};
