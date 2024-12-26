import React from "react";
import { H2, H4, Font1 } from "@/config/typography";
// import pointsImg1 from "@/assets/points/points-img-1.png"
// import pointsImg2 from "@/assets/points/points-img-2.png"
import icon1 from "@/assets/points/icons/icon-1.png";
import icon2 from "@/assets/points/icons/icon-2.png";
import icon3 from "@/assets/points/icons/icon-3.png";

export default function Points({ data }) {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="container mx-auto ">
        <H2 className="font-creato block xl:hidden mb-3 md:mb-5 capitalize">
          {data.title}
        </H2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="col-span-6 xl:col-span-5 lg:block hidden ">
            <img src={data.Img} className="w-full h-full " />
          </div>

          <div className="col-span-6 xl:col-span-7 xl:pt-12 relative">
            <H2 className="font-creato xl:block hidden  mb-10">
             {data.title}
            </H2>

            {data.points.map((item, index) => (
              <div
                className={`px-8 py-5 rounded-[30px] ${item.bg} bg-opacity-30 my-5  relative`}
              >
                <H4 className="mb-2 xl:mb-3">{item.title}</H4>
                <Font1 className="text-[#333333]">{item.content}</Font1>
                <div
                  className={`absolute top-[25px] right-[25px] text-red text-[25px] p-[10px] rounded-full ${item.bg}`}
                >
                  <img src={icon3} width="15px" height="15px" />
                </div>
              </div>
            ))}
            <div className="absolute top-[-60px] right-[0px] ">
              <img src={icon1} width="75px" height="75px" />
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
}
