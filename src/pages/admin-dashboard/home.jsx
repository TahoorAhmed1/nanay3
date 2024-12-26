import React from "react";
import ChartBar from "../../component/admin-dashboard/chart-bar-options";
import ChartPie from "../../component/admin-dashboard/chart-pie";

export default function AdminDashboardMain() {
  return (
    <section className="px-4">
      <div className="flex md:flex-row flex-col gap-4 md:py-6 py-4 ">
        <div className="group relative cursor-pointer overflow-hidden bg-white p-2 ring-1 ring-gray-900/5 transition-all duration-300 sm:max-w-sm sm:rounded-lg w-full">
          <span className="absolute top-8 left-8 z-0 h-0 w-0 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10] group-hover:h-20 group-hover:w-20"></span>
          <div className="relative z-10 mx-auto w-full flex items-center justify-around">
            <span className="grid h-[55px] w-[55px] place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 w-10 text-white transition-all"
                stroke-width="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.243 5.757a6 6 0 0 1 0 8.486m-8.485 0a6 6 0 0 1 0-8.486m-2.83 11.314c-3.904-3.905-3.904-10.237 0-14.142m14.144 0c3.905 3.905 3.905 10.237 0 14.142M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 0v9"
                ></path>
              </svg>
            </span>
            <div className=" text-gray-600 transition-all duration-300 group-hover:text-white/90 w-[70%]">
              <p className="text-md">Bookings</p>
              <p>
                <a
                  href="/admin-dashboard/bookings"
                  className="text-sm text-sky-500 transition-all duration-300 group-hover:text-white"
                >
                  More Detail &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="group relative cursor-pointer overflow-hidden bg-white p-2 ring-1 ring-gray-900/5 transition-all duration-300 sm:max-w-sm sm:rounded-lg w-full">
          <span className="absolute top-8 left-8 z-0 h-0 w-0 rounded-full bg-fuchsia-500 transition-all duration-300 group-hover:scale-[10] group-hover:h-20 group-hover:w-20"></span>
          <div className="relative z-10 mx-auto w-full flex items-center justify-around">
            <span className="grid h-[55px] w-[55px] place-items-center rounded-full bg-fuchsia-500 transition-all duration-300 group-hover:bg-fuchsia-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-10 w-10 text-white transition-all"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 21a7 7 0 1 1 14 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
                ></path>
              </svg>
            </span>
            <div className=" text-gray-600 transition-all duration-300 group-hover:text-white/90 w-[70%]">
              <p className="text-md">User</p>
              <p>
                <a
                  href="/admin-dashboard/users"
                  className="text-sm text-sky-500 transition-all duration-300 group-hover:text-white"
                >
                  More Detail &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="group relative cursor-pointer overflow-hidden bg-white p-2 ring-1 ring-gray-900/5 transition-all duration-300 sm:max-w-sm sm:rounded-lg w-full">
          <span className="absolute top-8 left-8 z-0 h-0 w-0 rounded-full bg-pink-500 transition-all duration-300 group-hover:scale-[10] group-hover:h-20 group-hover:w-20"></span>
          <div className="relative z-10 mx-auto w-full flex items-center justify-around">
            <span className="grid h-[55px] w-[55px] place-items-center rounded-full bg-pink-500 transition-all duration-300 group-hover:bg-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-10 w-10 text-white transition-all"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </span>
            <div className=" text-gray-600 transition-all duration-300 group-hover:text-white/90 w-[70%]">
              <p className="text-md">Annocement</p>
              <p>
                <a
                  href="#"
                  className="text-sm text-sky-500 transition-all duration-300 group-hover:text-white"
                >
                  More Detail &rarr;
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex md:flex-row flex-col justify-between gap-2 ">
        <div className="md:w-[65%] w-full ring-1 ring-gray-900/5 rounded-md p-3">
          <ChartBar />
        </div>
        <div className="md:w-[35%] w-full ring-1 ring-gray-900/5 rounded-md ">
          <ChartPie />
        </div>
      </div>
    </section>
  );
}
