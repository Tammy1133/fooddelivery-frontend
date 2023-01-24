import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../newsubcomponents/hero";
import { Menu } from "../newsubcomponents/menu";
import { Navbar } from "../newsubcomponents/navbar";

import { Delivery } from "../newsubcomponents/delivery";
import { Footer } from "../newsubcomponents/footer";

export const Main = () => {
  const dispatch = useDispatch();

  return (
    <div className="ov">
      <Navbar></Navbar>
      <Hero></Hero>
      <Menu></Menu>
      <Delivery></Delivery>
      <Footer></Footer>
    </div>
  );
};
