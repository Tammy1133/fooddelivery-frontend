import React from "react";
import { Navbar } from "../subcomponents/navbar";
import { useDispatch, useSelector } from "react-redux";
import { pizzaData } from "../components/pizzadata";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addPizza, deletePizza } from "../redux/actions/pizzaActions";
import { setOrders, updateOrder } from "../redux/actions/orderActions";
import { deleteFood, updateFood } from "../redux/actions/foodActions";

export const Admin = () => {
  const animatedComponents = makeAnimated();
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const allPizzas = useSelector((state) => {
    return state.allPizzas.pizzas;
  });
  const isUserPresent = useSelector(
    (state) => state.accountDetails.currentUser.username
  );
  const isAdmin = useSelector(
    (state) => state.accountDetails.currentUser.isAdmin
  );
  const allOrders = useSelector((state) => state.orderReducer.orders);

  const [category, setCategory] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  // const [order, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [price, setPrice] = useState("");
  const [foodClass, setFoodClass] = useState("");

  const categoryOptions = [
    { value: "Swallow", label: "Swallow" },
    { value: "Light", label: "Light" },
    { value: "Semi heavy", label: "Semi heavy" },
    { value: "Meat", label: "Meat" },
  ];

  const [food, setFood] = useState([]);
  const allFood = useSelector((state) => {
    return state.allFoodReducer.food;
  });

  useEffect(() => {
    setFood(allFood);
  }, [allFood]);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await Axios.delete(`https://localhost:3001//deletefood/${id}`)
      .then((res) => {
        dispatch(deleteFood(id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!isUserPresent && !isAdmin) {
      navigate("/");
    }
  }, [isUserPresent]);

  return (
    isAdmin && (
      <div>
        <Navbar></Navbar>

        <div className="newProduct">
          <h2
            className="font-semibold text-4xl 
          mb-[70px] ml-[70px] mt-8"
          >
            Add product
          </h2>

          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(category);
              try {
                await Axios.post("https://localhost:3001//addfood", {
                  name: name,
                  price: price,
                  foodclass: category.value,
                  image: image,
                  description: description,
                }).then((res) => {
                  dispatch(updateFood(res.data));
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <div className="grid md:grid-cols-3 grid-cols-2 gap-6  mx-3">
              <input
                type="text"
                className="shadow-xl border-blue-300 border-2 px-6 py-2"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <input
                type="text"
                className="shadow-xl border-blue-300 border-2 px-6 py-2"
                placeholder="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />

              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={categoryOptions}
                onChange={(value) => {
                  setCategory(value);
                }}
                placeholder="Select category"
              />

              <input
                type="text"
                className="shadow-xl border-blue-300 border-2 px-6 py-2 "
                placeholder="Image"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                value={image}
              />
              <textarea
                type="text"
                className="shadow-xl border-blue-300 border-2 px-6 py-5 "
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            <button
              type="submit"
              className="mt-5 ml-6 bg-green-600 p-2 text-white rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-2 mt-5 mx-3 gap-y-10 gap-x-10 justify-center lg:justify-start">
          <div className="products">
            <h2 className="font-semibold text-4xl ml-3 mb-[50px]">Products</h2>
            <div className="mt-3 pl-[2rem]">
              <table className="">
                <tr className="">
                  {/* <th className="">Image</th> */}
                  <th>Id</th>
                  <th>Name</th>
                  <th>Foodclass</th>
                  <th>Action</th>
                </tr>
                {food.map((item) => {
                  return (
                    <tr>
                      <td>{item._id.slice(0, 10)}... </td>
                      <td>{item.name}</td>
                      <td>{item.foodclass}</td>
                      <td className="flex justify-center items-center ">
                        <button
                          onClick={() => {
                            handleDelete(item._id);
                            dispatch(deleteFood(item._id));
                          }}
                          className="bg-red-500 text-white p-2 rounded-lg "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="orders mb-[50px]">
            <h2 className="font-semibold text-4xl">Orders</h2>
            <div className="mt-3 pl-[2rem]">
              <table className="">
                <tr className="">
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {allOrders.map((item) => {
                  return (
                    <tr>
                      <td>{item._id.slice(0, 10)}....</td>
                      <td>{item.email}</td>
                      <td>{item.total}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="text-white bg-green-600 p-2 rounded-lg mr-4"
                          onClick={async () => {
                            if (item.status === "Not Delivered") {
                              try {
                                await Axios.put(
                                  `https://localhost:3001//updatestatus/${item._id}`,
                                  { status: "Delivered" }
                                ).then((res) => {
                                  return dispatch(
                                    updateOrder(item._id, "Delivered")
                                  );
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            } else {
                              try {
                                await Axios.put(
                                  `https://localhost:3001//updatestatus/${item._id}`,
                                  { status: "Not Delivered" }
                                ).then((res) => {
                                  return dispatch(
                                    updateOrder(item._id, "Not Delivered")
                                  );
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}
                        >
                          Change Status
                        </button>
                      </td>

                      <td></td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
