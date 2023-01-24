import React from "react";
import whitebg from "../utils/whitebg.jpg";
import food11 from "../utils/chicken.png";

export const Delivery = () => {
  return (
    <div>
      <div className="pt-24 relative h-[100vh]   lg:h-[80vh] ">
        <div className="absolute">
          <img
            src={whitebg}
            style={{ filter: "brightness(20%)" }}
            alt=""
            className="object-cover w-[100vw] h-[100vh]  lg:h-[80vh] "
          />
        </div>
        <div className="relative grid http://localhost:3000/  lg:grid-cols-2 items-center justify-center h-[100vh]  lg:h-[80vh] ">
          <div className="flex justify-center ml-5">
            <img src={food11} className="h-[330px] lg:h-[430px] " alt="" />{" "}
          </div>
          <div className="flex flex-col ml-28    text-white ">
            <h3 className="text-3xl lg:text-5xl">
              Free delivery <br /> Victoria Island
            </h3>
            <h3 className="text-2xl lg:text-4xl mt-3">
              Refer and Earn
              <br /> Free food for 10Days and <br />
              Cashback Rewards
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
