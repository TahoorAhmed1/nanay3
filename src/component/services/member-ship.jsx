import React from "react";
import { H2, H3, H5, Font2 } from "@/config/typography";
import useEmblaCarousel from "embla-carousel-react";
import Icon from "@/assets/services/hero/icon.png";
import { Link } from "react-router-dom";

const OPTIONS = { align: "center" };
const SLIDE_COUNT = 6;

export default function MemberShip({ data, list }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
      <div className="container mx-auto group">
        <img src={Icon} className="h-[50px] mx-auto mb-4" />
        <H2 className="font-creato md:mb-4 mb-2 text-center capitalize">
          {data.title}
        </H2>
        <Font2 className="text-[#333333] text-opacity-80 text-center md:text-lg max-w-[600px] w-full mx-auto">
          {data.content}
        </Font2>
        <div className="embla md:my-8 my-4">
          <div
            className="embla__viewport md:my-8 my-4"
            ref={emblaRef}
            options={OPTIONS}
          >
            <div className="embla__container">
              {list.map((item, index) => (
                <div className="embla__slide" key={index}>
                  <div className="md:px-10 md:py-12 py-8   px-6 rounded-[30px] border border-gray-200 mt-6 mb-2 h-[300px] hover:border-[#609FC6] hover:shadow-md text-center flex flex-col items-center">
                    <img
                      src={item.icon}
                      width="70px"
                      height="70px"
                      className="mb-4"
                    />
                    <H5 className="mb-2 xl:mb-3 md:font-bold md:text-2xl">{item.title}</H5>
                    <Font2 className="text-[#333333] md:text-lg font-montserrat  ">{item.para}</Font2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to={"/auth/sign-up"} className="px-10 py-3 mb-4 bg-[#609FC6] text-white font-medium rounded-[25px]  ">
            Learn More
          </Link>
        </div>
      </div>
  );
}
