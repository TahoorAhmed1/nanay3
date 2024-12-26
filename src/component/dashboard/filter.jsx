import React, { useState } from "react";
import { H1, H6, Font2 } from "@/config/typography";
import IconHeader5 from "@/assets/dashboard/filter/icon-5.png";

export default function Filter({filterList}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
        <div className="container mx-auto ">
          <div className="flex justify-between items-center py-6 px-8 rounded-md border">
            <div className=" ">
              <Font2 className="font-montserrat text-[#000] ">
                Showing {filterList?.length} Profiles:All
              </Font2>
            </div>
            <div className="flex items-center">
                  {/* <button
                    className=" border-none hover:text-white "
                    // onClick={toggleSidebar}
                  >
                    <img src={IconHeader5} width="22px" height="22px" />
                  </button> */}
            </div>
          </div>
        </div>

      {/* Sidebar Drawer */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 min-w-80 h-screen p-4 overflow-y-auto transition-transform border shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white `}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        {/* <a href="https://flowbite.com" className="flex items-center">
          <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
        </a>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center "
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button> */}
      </div>
    </>
  );
}
