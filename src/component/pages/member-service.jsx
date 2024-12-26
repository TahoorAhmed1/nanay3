import React from "react";
import { H2, H3, H5, Font2 } from "@/config/typography";
import useEmblaCarousel from "embla-carousel-react";

import cardImgBG from "@/assets/member-service/service-card-bg.png";
import { A } from "@/config/typography";
import { Link } from "react-router-dom";

const OPTIONS = { align: "center" };

export default function MemberService({ data, list, button   }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div className="pt-[70px] lg:pt-[120px] ">
      {/* slider */}
      <div className="container mx-auto ">
        <H2 className="font-creato mb-5 text-center capitalize">
          {data.title}
        </H2>
        <Font2 className="text-[#333333] text-opacity-80 md:text-[18px]  text-center">
          {data.content}
        </Font2>
        <div className="embla py-4 md:py-4 lg:py-8">
          <div
            className="embla__viewport "
            ref={emblaRef}
            options={OPTIONS}
          >
            <div className="embla__container">
              {list.map((item, index) => (
                <div className="embla__slide" key={index}>
                  <div
                    className="px-8 py-8 2xl:py-7 rounded-[30px] border shadow-lg border-gray-200 mt-6 mb-2 min-h-[313px] relative"
                    style={{
                      background: `url(${cardImgBG})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <H5 className="mb-3 md:mb-5 md:font-bold font-semibold  md:text-[20px] text-[18px]">{item.title}</H5>
                    <p className="text-[#333333] md:b-5 mb-3 md:text-[18px] text-[16px] font-normal font-quicksand" >{item.para}</p>
                    <Link to={"/for-nannies"}>
                    <p   className="mb-5 text-[#FF6F61] text-[18px] font-semibold underline decoration-[#FF6F61] ">
                      {item.title}
                    </p>
                    </Link>

                    <div className="absolute bottom-[25px] right-[25px] text-red text-[25px] p-[10px] rounded-full ">
                      <img src={item.icon} width="45px" height="45px" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <H3 className="font-creato my-6 text-center capitalize ">
            {data.title2}
          </H3>

          <Link to={"/auth/sign-up"} className="px-10 py-3 my-4 bg-[#FF6F61] text-white font-medium rounded-[25px] hover:bg-red-500 ">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
