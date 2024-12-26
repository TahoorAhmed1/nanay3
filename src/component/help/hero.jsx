import React from "react";
import bgImg from "@/assets/help/help-bg.png";

export default function Hero() {
  return (
    <div className="pb-[30px] md:pb-[50px] ">
      <div
        className=" min-h-[600px]"
        style={{
          background: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="container mx-auto  border-b border-gray-300 ">
        <div className="flex flex-wrap md:w-9/12 mx-auto justify-center mt-20 pb-10">
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Getting started
          </button>
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Updating my account information
          </button>
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Making changes to my profiles
          </button>
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Updating payroll information
          </button>
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Getting started
          </button>
          <button className="md:px-16 px-8 py-3 my-2 border border-gray-300 text-gray-500 rounded-[25px] me-2 flex">
            Ensuring your safety
          </button>
        </div>
      </div>
    </div>
  );
}
