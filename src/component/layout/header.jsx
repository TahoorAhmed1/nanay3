import React, { useState, useRef, useEffect } from "react";
import { Logo } from "@/assets";
import { Font1, Font2 } from "@/config/typography";
import IconHeader from "@/assets/common-icon/help-icon.png";
import Menu from "@/assets/common-icon/menu.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close dropdown if clicked outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <header>
        <nav className="px-3 lg:px-6 py-2.5 bg-transparent">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="mr-3 h-11 sm:h-14" alt="Nanny Logo" />
            </Link>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto relative">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link 
                  to="/"
                 
                  >
                    <Font1 className="font-lato md:font-normal md:text-lg">For Families</Font1>
                  </Link>
                </li>
                <li>
                  <Link
                  to="/for-nannies"
                 
                  >
                    <Font1 className="font-lato md:font-normal md:text-lg">For Nannies</Font1>
                  </Link>
                </li>
                
                 <li>
                  <a href="/nanny-share">
                    <Font1 className="font-lato md:font-normal md:text-lg">Nanny Share</Font1>
                  </a>
                </li> 
                <li ref={dropdownRef}>
                  {" "}
                  {/* Attach the ref here */}
                  <button
                    className="bg-transparent focus:outline-none flex items-center"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    <Font1 className="font-lato md:font-normal md:text-lg">Service</Font1>
                    <svg
                      className={`w-3 h-3 ms-3 mt-1 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[300px] flex flex-col justify-center mt-2 transition-all duration-500 ease-in-out`}
                    >
                      <ul className="py-2 text-sm text-gray-700 ">
                        <li>
                          <Link
                            to="/service/nanny-payroll/"
                       
                            className="block px-4 py-2 hover:bg-red-400 hover:text-white hover:shadow"
                          >
                            <Font2>Nanny Payroll</Font2>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/service/nanny-background-check"
                         
                            className="block px-4 py-2 hover:bg-red-400 hover:text-white hover:shadow"
                          >
                            <Font2>Nanny Background Check</Font2>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/service/nanny-contracts"
                         
                            className="block px-4 py-2 hover:bg-red-400 hover:text-white hover:shadow"
                          >
                            <Font2>Nanny Contracts</Font2>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/service/nanny-plus-member"
                          
                            className="block px-4 py-2 hover:bg-red-400 hover:text-white hover:shadow"
                          >
                            <Font2>Nanny Plus Membership</Font2>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className="flex items-center ">
              <button className="md:px-8 px-5 md:py-2 py-1.5 border border-gray-300 text-black rounded-[25px] me-2 flex">
                <img
                  src={IconHeader}
                  className="me-3 md:w-[25px] md:h-[25px] w-[22px] h-[22x]"
                />
                <a href="/help">Help</a>
              </button>
              <div className="text-center block lg:hidden">
                <button className="" type="button" onClick={toggleSidebar}>
                  <img src={Menu} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar Drawer */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 min-w-80 h-screen p-4 overflow-y-auto transition-transform border shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white `}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <Link to="/" className="flex items-center">
          <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
        </Link>
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
        </button>
        <div className="py-4 overflow-y-auto">
          <div className="justify-between items-center w-full lg:flex lg:w-auto relative">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 gap-y-4">
              <li>
                <Link  to="/" onClick={()=>setSidebarOpen(false)}>
                  <Font1>For Families</Font1>
                </Link>
              </li>
              <li>
                <Link  to="/for-nannies"
                onClick={()=>setSidebarOpen(false)}
                >
                  <Font1>For Nannies</Font1>
                </Link>
              </li>
              {/* <li>
                  <a href="/nanny-share">
                    <Font1>Nanny Share</Font1>
                  </a>
                </li> */}
              <li>
                <button
                  className="bg-transparent focus:outline-none flex items-center"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <Font1>Services</Font1>
                  <svg
                    className={`w-3 h-3 ms-3 mt-1 ${
                      dropdownOpen ? "-rotate-90" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    className={` bg-white divide-y divide-gray-100  flex flex-col justify-center mt-2 transition-all duration-500 ease-in-out`}
                  >
                    <ul className="py-2 text-sm text-gray-700 ">
                      <li>
                        <Link
                          to="/service/nanny-payroll"
                          onClick={()=>setSidebarOpen(false)}
                          className="block px-4 py-2 hover:text-red-400 "
                        >
                          <Font2>Nanny Payroll</Font2>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service/nanny-background-check"
                          onClick={()=>setSidebarOpen(false)}
                          className="block px-4 py-2 hover:text-red-400 "
                        >
                          <Font2>Nanny Background Check</Font2>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service/nanny-contracts"
                          onClick={()=>setSidebarOpen(false)}
                          className="block px-4 py-2 hover:text-red-400 "
                        >
                          <Font2>Nanny Contracts</Font2>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service/nanny-plus-member"
                          onClick={()=>setSidebarOpen(false)}
                          className="block px-4 py-2 hover:text-red-400 "
                        >
                          <Font2>Nanny Plus Membership</Font2>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
