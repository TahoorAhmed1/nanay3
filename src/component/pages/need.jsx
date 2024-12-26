import React from "react";
import { H3 } from "@/config/typography";
import Icon from "@/assets/need/para-icon.png";

import { Font1 } from "@/config/typography";

export default function Need({ data }) {
  return (
    <div className="pt-[20px]  md:pt-[20px] md:pb-36 pb-28 ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-10">
          <div className="col-span-6 flex flex-col justify-center relative z-10">
            <H3 className="font-creato mb-6 capitalize ">{data.title}</H3>
            <Font1 className="font-montserrat text-[#666666] py-2">
              {data.content}
            </Font1>

            <img
              src={Icon}
              className="w-[140px] absolute left-[30%] top-[50%]"
            />
          </div>
          <div className="col-span-6 my-8 ">
            <img src={data.Img} className="max-h-[550px] ms-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
