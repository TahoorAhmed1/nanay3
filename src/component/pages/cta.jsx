import React from "react";
import { H3 } from "@/config/typography";
import { Font2 } from "@/config/typography";
import { Link } from "react-router-dom";

export default function Cta({ data }) {
  return (
    <div
      style={{
        background: `url(${data.bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="md:py-12 py=6"
    >
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center md:gap-10 gap-5 ">
          <div className="col-span-1 ">
            <img src={data.Img} className="max-h-[500px]" />
          </div>
          <div className="col-span-1 px-3 pb-3">
            <H3 className="text-[#fff] capitalize mb-3 md:text-[52px] font-creato ">{data.title}</H3>
            <Font2 className="text-[#fff] text-opacity-80 md:text-lg font-quicksand  font-normal">
              {data.content}
            </Font2>
            <Link to={"https://www.nannylane.com/en-ca/nanny-share-payroll"}>
            <Font2 className="text-[#fff] md:text-[18px] text-opacity-80 underline decoration-white mt-4">
              {data.linkContent}
            </Font2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
