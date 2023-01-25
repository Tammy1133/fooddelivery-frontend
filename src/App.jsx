import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import { Main } from "./newcomponents/main";
import { EachProduct } from "./newsubcomponents/eachProduct";
import { Cart } from "./newsubcomponents/cart";
import { Account } from "./newsubcomponents/account";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "./redux/actions/orderActions";
import { useEffect } from "react";
import { Orders } from "./newsubcomponents/orders";
import { Admin } from "./newsubcomponents/admin";
import { setFood } from "./redux/actions/foodActions";

function App() {
  const getFood = async () => {
    await Axios.get("https://tammy1133-api.onrender.com/getfood")

      .then((res) => {
        return dispatch(setFood(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
    getFood();
  }, []);
  const dispatch = useDispatch();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route
          path="/eachproduct/:name"
          element={<EachProduct></EachProduct>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/account" element={<Account></Account>}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </div>
  );
}

export default App;
