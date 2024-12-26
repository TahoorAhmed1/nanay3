import React from "react";
import { H1, H6, Font1 } from "@/config/typography";
import { useNavigate } from "react-router-dom";

export default function Hero({ data }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/sign-in");
  };
  return (
    <div className="py-[30px] ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="grid grid-cols-1 mb-4 capitalize">
            <H1 className="font-creato mb-4 capitalize">{data.title}</H1>
            <Font1 className="font-montserrat text-[#666666] py-2">
              {data.content}
            </Font1>
            <Font1 className="font-montserrat text-[#232323] font-semibold">
              How often do you need a nanny?
            </Font1>
            <div className="mt-6">
              <button
                className="px-6 py-3 mb-4 bg-red-500 text-white font-medium rounded-[25px] me-2 hover:bg-red-600"
                onClick={handleLoginClick}
              >
                Part-Time
              </button>
              <button
                className="px-6 py-3 mb-4 border border-gray-300 text-gray-500 font-medium rounded-[25px] me-2 hover:text-white hover:bg-red-500"
                onClick={handleLoginClick}
              >
                Full-Time
              </button>
              <button
                className="px-6 py-3 mb-4 border border-gray-300 text-gray-500 font-medium rounded-[25px] me-2 hover:text-white hover:bg-red-500"
                onClick={handleLoginClick}
              >
                Not Sure
              </button>
            </div>
            <div className=" flex">
              <Font1 className="font-montserrat text-[18px] text-[#333333]">
                Have an Account?
              </Font1>
              <button  className="hover:underline"      onClick={handleLoginClick}>
                <Font1 className="font-montserrat text-[#232323] font-bold text-[18px] ms-2">
                  Log in
                </Font1>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1 ">
              <img
                src={data.Img}
                className={data.imgClass ? data.imgClass : "max-h-[550px]"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
