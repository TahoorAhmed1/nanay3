import React from "react";
import { Logo } from "@/assets";
import { Search } from "@/config/app-constant";
import { Link } from "react-router-dom";

export default function RequestHeader() {
  return (
    <>
      <header>
        <nav className="px-3 lg:px-6 py-2.5 bg-transparent">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="mr-3 h-11 sm:h-14" alt="Nanny Logo" />
            </Link>
            <div className="border-gray-300 border-b my-2 relative md:block hidden">
              <input
                placeholder="search"
                className="bg-transparent px-8 py-4 
                     text-gray-900 text-sm w-full 
                      focus:outline-none min-w-[400px] xl:min-w-[650px] "
              />
              <div className="absolute top-[40%]">
                <Search />
              </div>
            </div>
            <div className="flex items-center ">
              <button className="px-4 xl:px-8 py-3 border-none text-white rounded-[25px] me-2 flex bg-[#ff6f61]">
                <a href="/request">Submint Request</a>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
