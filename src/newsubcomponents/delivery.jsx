import React from "react";
import whitebg from "../utils/whitebg.jpg";
import food11 from "../utils/chicken.png";
import food12 from "../utils/efo.png";
import food13 from "../utils/newrice.png";

export const Delivery = () => {
  return (
    <div>
      <div className="pt-24  h-[100vh]   lg:h-[80vh] ">
        <div className="absolute">
          <img
            src={whitebg}
            style={{ filter: "brightness(10%)" }}
            alt=""
            className="object-cover w-[100vw] h-[100vh]  lg:h-[80vh] "
          />
        </div>
        <div className="relative grid md:grid-cols-2 items-center md:justify-center  h-[100vh]  lg:h-[80vh] ">
          <div className="flex justify-center ml-5">
            <img src={food13} className="h-[130px]  md:h-[430px] " alt="" />
          </div>
          <div className="flex flex-col ml-4 justify-start text-center  text-white mt-[-100px] sm:mt-[-20px] max-w-[500px] mx-auto ">
            <h3 className="text-3xl lg:text-5xl   ">
              Free delivery <br /> Victoria Island
            </h3>
            <h3 className="text-2xl lg:text-4xl mt-3 ">
              Refer and Get
              <br /> Free food for 10Days and <br />
              Cashback Rewards
            </h3>
          </div>
          <div className="flex justify-center ml-5 md:hidden">
            <img src={food11} className="h-[130px]  mt-[-110px] " alt="" />
          </div>
        </div>
      </div>

      <div className="pt-[9rem] pb-10 px-10 bg-slate-200">
        <h4 className=" text-slate-800 my-3 text-4xl uppercase  ">
          Contact us
        </h4>
        <div className="flex mt-[1.24rem]">
          <h1 className="text-xl">OFFICE ADDRESS:</h1>
          <p className="mt-[2px] ml-5 text-lg uppercase">
            Plot 3, Block 4, Off Awolowo Road, Ijesha, Ikorodu, Lagos, Nigeria.{" "}
          </p>
        </div>
        <div className="flex  mt-1">
          <h1 className="text-xl">PHONE-NUMBER 1</h1>
          <p className="mt-[4px] ml-5">08112037963</p>
        </div>
        <div className="flex  mt-1">
          <h1 className="text-xl">PHONE-NUMBER 2</h1>
          <p className="mt-[4px] ml-5">0906435353</p>
        </div>
      </div>
    </div>
  );
};
