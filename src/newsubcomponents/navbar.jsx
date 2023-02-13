import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../redux/actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });

  const isUserPresent = useSelector(
    (state) => state.accountDetails.currentUser.username
  );
  const user = useSelector((state) => state.accountDetails.currentUser);

  return (
    <div>
      <div className="fixed top-0 z-20 mx-auto w-[100vw]">
        <marquee behavior="" direction="">
          20% Discount for the first 50 customers to order ten times new month
        </marquee>
      </div>
      <div className="fixed bg-white top-0 z-10 flex w-100 shadow-2xl justify-between py-4 px-[30px] md:px-[100px] items-center">
        <h1
          className="text-xl pt-2 md:pt-0 md:text-4xl uppercase cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          FOODIES
        </h1>
        <div className="d-flex items-center cursor-pointer text-sm">
          <div
            onClick={() => {
              navigate("/cart");
            }}
          >
            {!user.isAdmin && (
              <div>
                <i className="bi bi-cart text-md md:text-3xl"></i>{" "}
                {cartItems.length}
              </div>
            )}
          </div>

          {isUserPresent ? (
            <div className="ml-3">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="cursor-pointer uppercase text-xs"
                >
                  Logged in
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
                        onClick={() => navigate("/orders")}
                      >
                        <h5 className="text-base">Orders</h5>
                      </div>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item className="bg-red-500">
                    {user.isAdmin ? "Admin" : user.username}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <h5
              className="cursor-pointer ml-4 md:ml-10 rounded-xl mt-2"
              onClick={() => navigate("/account")}
            >
              Login
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};
