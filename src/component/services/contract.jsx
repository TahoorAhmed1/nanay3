import React, { useState } from "react";
import { H1, H5, Font1, Font2 } from "@/config/typography";

export default function Contract({ data, list }) {
  const [hoveredIndex, setHoveredIndex] = useState(null); 
  return (
    <div
      className={`pb-[20px] md:pb-[50px] lg:pb-[100px] pt-[20px] md:pt-[50px] lg:pt-[100px] px-3 border ${
        data.bg ? "bg-white" : "bg-[#609FC6]"
      }`}
    >
      <div className="container mx-auto ">
        <H1
          className={`font-creato md:mb-8 mb-4 capitalize text-center ${
            data.bg ? "text-black" : "text-white"
          }`}
        >
          {data.title}
        </H1>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center md:gap-8 gap-6 md:py-[50px] py-[25px]">
          {list.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-300 flex items-start px-8 py-12 rounded-[20px] group min-h-[200px] ${
                data.bg ? "hover:bg-[#F19A7C]" : "hover:bg-[#fff]"
              }  transition-colors duration-500 ease-in-out`}
              onMouseEnter={() => setHoveredIndex(index)} // Set the index of the hovered card
              onMouseLeave={() => setHoveredIndex(null)} // Reset on mouse leave
            >
              <div className={`w-[70px] h-[70px]`}>
                <img
                  src={hoveredIndex === index ? item.img2 : item.img1}
                  alt="Icon"
                />
              </div>
              <div className="ps-3 pt-3">
                <Font1
                  className={`font-creato capitalize md:font-bold mb-[20px] font-semibold text-base ${
                    data.bg
                      ? "group-hover:text-white"
                      : "text-white group-hover:text-black"
                  }`}
                >
                  {item.title}
                </Font1>
                <Font2
                  className={`font-montserrat text-[#666666] md:text-lg  ${
                    data.bg
                      ? "group-hover:text-white"
                      : "text-white group-hover:text-[#666666]"
                  }`}
                >
                  {item.description}
                </Font2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
