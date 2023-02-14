import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/actions/accountActions";
import LoginImage from "../utils/login.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../redux/actions/accountActions";
import { Footer } from "./footer";

export const Account = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => {
    return state.allCartItems.cartItems;
  });

  const isUserPresent = useSelector(
    (state) => state?.accountDetails?.currentUser?.username
  );
  const user = useSelector((state) => state?.accountDetails?.currentUser);

  useEffect(() => {
    if (isUserPresent) {
      navigate("/");
    }
  }, [isUserPresent]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="relative  overflow-y-hidden">
          <div>
            <div className=" bg-white  z-10 flex w-100 shadow-2xl justify-between py-4 px-[30px] md:px-[100px] items-center h-[10vh]">
              <h1
                className="text-xl pt-2 md:pt-0 md:text-4xl uppercase cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                FOODIES
              </h1>
              <div className="d-flex items-center cursor-pointer">
                <div
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  {!user?.isAdmin && (
                    <div>
                      <i className="bi bi-cart text-3xl"></i> {cartItems.length}
                    </div>
                  )}
                </div>

                {isUserPresent ? (
                  <div className="ml-3">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="cursor-pointer uppercase"
                      >
                        Logged in
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          {user.isAdmin ? "Admin" : user.username}
                        </Dropdown.Item>
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

          <div className="absolute">
            <img
              src={LoginImage}
              alt=""
              className="h-[130vh] w-[100vw] brightness-50"
            />
          </div>
          {showLogin && (
            <div className="relative flex justify-center items-center mt-24 pb-16 min-h-[85vh] ">
              <div className="bg-white p-4 flex flex-col rounded-xl shadow-2xl">
                <div className=" text-center mt-3">
                  <h3>Login</h3>
                </div>
                <form action="" className="flex-col flex justify-center">
                  <input
                    type="text"
                    className="shadow-xl p-2 mt-3"
                    placeholder="username"
                    value={username.toLowerCase()}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="shadow-xl mt-3 p-2"
                    placeholder="password"
                    value={password.toLowerCase()}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    className="button-3 mt-4"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await Axios.post(
                          "https://tammy1133-api.onrender.com/login",
                          {
                            username: username.toLowerCase(),
                            password: password.toLowerCase(),
                          }
                        ).then((response) => {
                          setLoading(false);
                          console.log(response);
                          if (response.status === 200) {
                            dispatch(setCurrentUser(response.data[0]));
                          }
                        });
                      } catch (error) {
                        // alert(error.response.data);
                        alert(error.response.data);

                        setLoading(false);
                      }
                    }}
                  >
                    Login
                  </button>
                </form>
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
            <div className="relative flex justify-center items-center mt-24 mb-32 min-h-[80vh] ">
              <div className="bg-white p-4 flex flex-col rounded-xl shadow-2xl">
                <div className=" text-center mt-3">
                  <h3>Register</h3>
                </div>
                <input
                  required
                  type="text"
                  className="shadow-xl p-2 mt-3"
                  placeholder="username"
                  value={username.toLowerCase()}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="shadow-xl mt-3 p-2"
                  placeholder="password"
                  value={password.toLowerCase()}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="shadow-xl mt-3 p-2"
                  placeholder=" confirm password"
                  value={confirmpassword.toLowerCase()}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <button
                  className="button-3 mt-4"
                  onClick={async () => {
                    if (password === confirmpassword) {
                      if (password.split("").length > 7) {
                        const user = {
                          username,
                          password,
                        };
                        setLoading(true);

                        try {
                          await Axios.post(
                            "https://tammy1133-api.onrender.com/registeruser",
                            user
                          ).then((response) => {
                            console.log(response);
                            setLoading(false);
                            setShowLogin(true);
                          });
                        } catch (error) {
                          alert(error.response.data);
                          setLoading(false);
                        }
                      } else {
                        alert("Password is to be longer than 7 characters");
                      }
                    } else {
                      alert("Password and confirm password should be the same");
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

          <div className="relative">
            <Footer></Footer>
          </div>
        </div>
      )}
    </div>
  );
};
