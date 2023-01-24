import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/actions/accountActions";

import LoginImage from "../utils/login.jpg";
import { Navbar } from "./navbar";

export const Account = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserPresent = useSelector(
    (state) => state.accountDetails.currentUser.username
  );

  useEffect(() => {
    if (isUserPresent) {
      navigate("/");
    }
  }, [isUserPresent]);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="relative h-[100vh] overflow-y-hidden">
          <Navbar></Navbar>
          <div className="absolute">
            <img
              src={LoginImage}
              alt=""
              className="h-[130vh] w-[100vw] brightness-50"
            />
          </div>
          {showLogin && (
            <div className="relative flex justify-center items-center h-[100vh]">
              <div className="bg-white p-4 flex flex-col rounded-xl shadow-2xl">
                <div className=" text-center mt-3">
                  <h3>Login</h3>
                </div>
                <input
                  type="text"
                  className="shadow-xl p-2 mt-3"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="shadow-xl mt-3 p-2"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="button-3 mt-4"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await Axios.post("http://localhost:3001/login", {
                        username: username,
                        password: password,
                      }).then((response) => {
                        setLoading(false);
                        console.log(response);
                        if (response.data?.message === "Error") {
                          alert("Error");
                        } else {
                          dispatch(setCurrentUser(response.data[0]));
                        }
                      });
                    } catch (error) {
                      setLoading(false);
                    }
                  }}
                >
                  Login
                </button>
                <div className="my-3">
                  <div className="flex items-center">
                    <p className="mt-2 mr-2">Don't have an account?</p>
                    <button
                      className="button-3  bg-red"
                      onClick={() => {
                        setShowLogin(false);
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showLogin && (
            <div className="relative flex justify-center items-center h-[80vh]">
              <div className="bg-white p-4 flex flex-col rounded-xl shadow-2xl">
                <div className=" text-center mt-3">
                  <h3>Register</h3>
                </div>
                <input
                  type="text"
                  className="shadow-xl p-2 mt-3"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="shadow-xl mt-3 p-2"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="shadow-xl mt-3 p-2"
                  placeholder=" confirm password"
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <button
                  className="button-3 mt-4"
                  onClick={() => {
                    if (password === confirmpassword) {
                      const user = {
                        username,
                        password,
                      };

                      setLoading(true);
                      try {
                        Axios.post(
                          "http://localhost:3001/registeruser",
                          user
                        ).then((response) => {
                          setLoading(false);
                          setShowLogin(true);
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      alert("Enter correct Password");
                    }
                  }}
                >
                  Register
                </button>
                <div className="my-3">
                  <div className="flex items-center">
                    <p className="mt-2 mr-2">Already have an account?</p>
                    <button
                      className="button-3  bg-red"
                      onClick={() => {
                        setShowLogin(true);
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
