import React from "react";
import { useState } from "react";
import foodImage from "../utils/food.jpg";

export const Hero = () => {
  return (
    <div>
      <div className=" md:flex mt-[90px]  items-center justify-between overflow-x-hidden  ">
        <div className="relative h-[90vh] ">
          <div className="absolute">
            <img
              className="object-cover w-[100vw] h-[90vh] 
          "
              style={{ filter: "brightness(30%)" }}
              src={foodImage}
              alt=""
            />
          </div>
          <div className="relative px-6 pt-14 lg:pt-32 flex items-center justify-center h-[80%] w-[100vw] flex-col text-center">
            <h3 className="text-center text-white pt-4 md:text-6xl  text-5xl font-semibold">
              Welcome to Foodies
            </h3>
            <p className="pt-4  px-4   text-lg md:text-2xl text-slate-100 w-[93%] lg:w-[90%] lg:mx-auto">
              We offer different services, such as food delivery, party
              contracting, and other services. We deliver right on time and we
              never disappoint out customers.
            </p>
            <a href="#menu">
              <button className="p-3 hover:bg-slate-900 bg-slate-800 rounded-lg text-white mt-4">
                Visit our menu now
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black py-16 flex lg:flex-row  flex-col justify-between px-[20px] md:px-[150px] ">
        <div className="flex flex-col items-center">
          <h5 className="text-white text-xl sm:ml-[-60px]  ml-[-20px] ">
            Get up to 20% Discount today
          </h5>
          <div>
            <input
              type="text"
              className="p-3 rounded-2xl mt-3"
              placeholder="Email"
            />
            <button className=" mt-3 ml-1 sm:mt-0 p-3 sm:ml-4  bg-slate-900 rounded-lg text-white">
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-14 lg:mt-0">
          <h5 className="text-white text-xl sm:ml-[-20px]  ">
            Become our loyal customer today
          </h5>
          <div>
            <input
              type="text"
              className="p-3 rounded-2xl mt-3"
              placeholder="Phone number"
            />
            <button className=" mt-3  sm:mt-0 p-3 sm:ml-4 bg-slate-900 rounded-lg text-white">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
