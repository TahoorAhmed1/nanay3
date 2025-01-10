import React, { useState, useEffect } from "react";
import { H1, H5, Font2 } from "@/config/typography";
import payrollBg from "@/assets/services/payroll/payroll-bg.svg"; // Correct image import
import ImgIcon1 from "@/assets/services/payroll/icon/payroll-icon-1.png";
import ImgIcon2 from "@/assets/services/payroll/icon/payroll-icon-2.png";
import ImgIcon3 from "@/assets/services/payroll/icon/payroll-icon-3.png";
import ImgIcon4 from "@/assets/services/payroll/icon/payroll-icon-4.png";
import ImgIcon5 from "@/assets/services/payroll/icon/payroll-icon-5.png";
import ImgIcon6 from "@/assets/services/payroll/icon/payroll-icon-6.png";
import ImgIcon7 from "@/assets/services/payroll/icon/payroll-icon-7.png";

export default function Payroll() {
  const [showBg, setShowBg] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowBg(window.innerWidth >= 1535);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="md:pb-20 pb-16">
        <H1 className="font-creato md:mb-6 mb-3 text-center capitalize">
          Full service payroll
        </H1>
      </div>
      <div
        className={`xl:flex justify-between gap-8 bg-contain  bg-center bg-no-repeat xl:min-h-[535px] md:px-[4%]  2xl:min-h-[550px] relative z-0`}
        style={
          showBg
            ? { backgroundImage: `url(${payrollBg})` }
            : { backgroundImage: "none" }
        }
      >
        <div className="flex flex-col justify-center xl:items-center border-8 border-red-300 md:pt-5 pt-7 md:p-5 p-3  rounded-xl 2xl:border-none mb-12 relative">
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon1}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>

            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Registering you as a household employer, allowing you to legally
                pay your household employee
              </Font2>
            </div>
          </div>
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon2}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Completing Federal and State tax filings: monthly (income tax,
                medicare, social security taxes) and quarterly (unemployment
                taxes)
              </Font2>
            </div>
          </div>
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon3}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Producing and submitting year-end documents (W2, W3)
              </Font2>
            </div>
          </div>
          <div className="flex  xl:hidden absolute top-[-40px] left-[20%] 2xl:left-[10%] bg-red-300 md:w-[250px] md:h-[60px] w-[200px] h-[55px] justify-center items-center text-center rounded-md z-10">
            <Font2 className="text-white">We make payroll</Font2>
          </div>
        </div>

        <div className="flex flex-col justify-center xl:items-center border-8 border-red-400 md:pt-5 pt-7 md:p-5 p-3  rounded-xl 2xl:border-none  relative">
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon4}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Transfer payments by direct deposit on your chosen pay cycle
              </Font2>
            </div>
          </div>
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon5}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Send pay stubs and receipts for you and your nanny
              </Font2>
            </div>
          </div>
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={ImgIcon6}
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Calculate Federal and State tax deductions on pay stubs
              </Font2>
            </div>
          </div>
          <div className="flex  w-full gap-x-4 items-stretch mb-4 xl:max-w-[470px]">
           
            <div className="rounded-full bg-[#FFA1A1] w-12 h-12  md:w-16 md:h-16  flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
               src={ImgIcon7} 
                alt="Feature icon"
                width={48}
                height={48}
                className="w-7 h-7 md:w-8 md:h-8 xl:w-9 xl:h-9 object-contain"
              />
            </div>
            <div className=" text-left pt-2">
              <Font2 className="font-montserrat text-[#666666] ">
                Provide support with your dedicated nanny payroll representative
              </Font2>
            </div>
          </div>
          <div className="flex  xl:hidden absolute top-[-40px] right-[20%] 2xl:right-[10%] bg-red-400 md:w-[250px] md:h-[60px] w-[200px] h-[55px] justify-center items-center text-center rounded-md z-10">
            <Font2 className="text-white">We make payroll</Font2>
          </div>
        </div>

        <div className="hidden xl:flex absolute top-[-30px] left-[13%] 2xl:left-[10%] bg-red-300 md:w-[250px] md:h-[60px] w-[200px] h-[55px] justify-center items-center text-center rounded-md z-10">
          <Font2 className="text-white">We make payroll</Font2>
        </div>
        <div className="hidden xl:flex absolute top-[-30px] right-[13%] 2xl:right-[10%] bg-red-400 md:w-[250px] md:h-[60px] w-[200px] h-[55px] justify-center items-center text-center rounded-md z-10">
          <Font2 className="text-white">We make payroll</Font2>
        </div>
      </div>
    </div>
  );
}
