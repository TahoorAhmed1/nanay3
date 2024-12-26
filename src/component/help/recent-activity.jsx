import React, { useState, useEffect } from "react";
import { H1, H5, Font2 } from "@/config/typography";
import MsgIcon from "@/assets/help/icon.png";

export default function RecentActivity({ data, list }) {
  // const [openAccordion, setOpenAccordion] = useState(null);

  // const toggleAccordion = (index) => {
  //   setOpenAccordion(openAccordion === index ? null : index);
  // };

  return (
    <section className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="container mx-auto ">
        <div className="mb-16">
          <H1 className="font-creato mb-6 text-center">{data.title}</H1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="accordion-group" data-accordion="default-accordion">
            {list.map((item, index) => (
              <div
                key={index}
                className={`border-b border-solid border-gray-700 px-4 mb-8 `}
              >
                <div
                  className={`md:flex items-end justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full `}
                >
                  <div>
                    <H5 className="mb-1">{item.question}</H5>
                    <Font2 className="font-montserrat text-[#666666] py-2">
                      {item.answer}
                    </Font2>
                  </div>
                  <div className="flex items-center">
                    <Font2 className="font-montserrat text-[#666666] py-2">
                      Article created 1 year ago
                    </Font2>
                    <img src={MsgIcon} className="w-[20px] h-[20px] mx-2" />
                    <Font2 className="font-montserrat text-[#666666] py-2">
                      0
                    </Font2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
