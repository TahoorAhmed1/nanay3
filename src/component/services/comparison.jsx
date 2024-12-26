import React from "react";
import { H2, H3, H5, Font2 } from "@/config/typography";
import Bg from "@/assets/services/comparison/comparison-img.png";

const OPTIONS = { align: "center" };
const SLIDE_COUNT = 6;

export default function Comparison() {
  return (
      <div className="container mx-auto group">
        <H2 className="font-creato md:mb-4 mb-2 text-center capitalize">
          Annual cost comparison
        </H2>
        <Font2 className="text-[#333333] text-opacity-80 text-center md:text-lg">
          Get the convenience you deserve at the price you can afford
        </Font2>
        <div className="flex justify-center">
          <img src={Bg} className="md:mt-20 mt-10" />
        </div>
      </div>
  );
}
