import React from "react";

import { H1 } from "@/config/typography";
import { Font2, H5 } from "@/config/typography";
import Icon1 from "@/assets/find/icons/icon-1.png";
import { Link } from "react-router-dom";

export default function Find({ data }) {
  return (
      <div className="container mx-auto ">
        <H1 className="font-creato mb-3 md:mb-6 capitalize">{data.title}</H1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Box 1 */}
          <div className="col-span-1 my-0 xl:my-4 ">
            <div className="flex flex-col">
              <img src={data.icon1} className="" />
              <div className="relative p-2">
                <H5 className="mb-1 underline decoration-black font-normal">
                  {data.text1}
                </H5>
                <Font2 className="text-[#333333] mb-2">{data.content1}</Font2>
                <Link to={"/service/nanny-background-check"} className="absolute top-[10px] right-[10px]">
                  <img src={Icon1} width="30px" height="30px" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-1 ">
            {/* Box 2 */}
            <div className="sm:flex items-center mb-10 xl:mb-6">
              <img src={data.icon2} className="sm:max-h-[230px]" />
              <div className="ps-4 pt-2">
                <H5 className="mb-2 underline decoration-black font-normal">
                  {data.text2}
                </H5>
                <Font2 className="text-[#333333] mb-2">{data.content2}</Font2>
              </div>
            </div>
            {/* Box 3 */}
            <div className="sm:flex items-center">
              <img src={data.icon3} className="sm:max-h-[230px]" />
              <div className="ps-4 pt-2">
                <H5 className="mb-2 underline decoration-black font-normal">
                  {data.text3}
                </H5>
                <Font2 className="text-[#333333] mb-2">{data.content3}</Font2>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
