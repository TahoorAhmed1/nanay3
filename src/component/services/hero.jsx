import React from "react";
// import HeroImg from "@/assets/services/hero/hero-img.png"
import Icon from "@/assets/services/hero/icon.png";
import { H1, H6, Font1 } from "@/config/typography";

export default function Hero({ data }) {
  return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center md:gap-8 gap-6">
          <div className="mb-4 ">
            <img src={Icon} className="h-[50px] " />
            <H1 className="font-creato mb-4 capitalize">{data.title}</H1>
            <Font1 className="font-montserrat text-[#666666] py-2 border-b border-gray-300">
              {data.content}
            </Font1>
            <Font1 className="font-montserrat text-[#666666] py-2">
              {data.content2}
            </Font1>
          </div>
          <div className="">
            <img src={data.Img} className="md:h-[550px] h-full" />
          </div>
        </div>
      </div>
  );
}
