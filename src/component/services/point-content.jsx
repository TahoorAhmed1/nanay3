import React from "react";
import { H1, H2, Font2 } from "@/config/typography";

export default function PointContent({ data }) {
  return (
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 ">
          {data.ImgLeft && (
            <>
              <div className="flex justify-center">
                <img
                  src={data.ImgLeft}
                  className="md:h-[550px] h-full "
                />
              </div>
              <div className="">
                <H2 className="font-creato md:mb-6 mb-3 capitalize">{data.title}</H2>
                {/* <H5 className="mb-2 xl:mb-3">{data.title}</H5> */}
                <ul className="list-disc ps-2">
                  {data.desc.map((item, index) => (
                    <li key={index} className="ms-5">
                      <Font2 className=" font-montserrat text-[#666666] py-3 md:text-[18px]">
                        {item}
                      </Font2>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {data.ImgRight && (
            <>
              <div className="">
                <H2 className="font-creato md:mb-6 mb-3  capitalize">{data.title}</H2>
                <ul className="mb-2">
                  {data.desc.map((item, index) => (
                    <li key={index} className="ps-2 mb-3 max-w-[500px]">
                      <Font2 className="font-montserrat mb-0 md:font-bold md:text-xl">
                        {item.title}
                      </Font2>
                      <Font2 className=" font-montserrat text-[#666666] py-5 md:font-normal md:text-lg">
                        {item.desc}
                      </Font2>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src={data.ImgRight}
            className="md:h-[550px] h-full "
                />
              </div>
            </>
          )}
        </div>
      </div>
  );
}
