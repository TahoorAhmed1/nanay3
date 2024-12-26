import React from "react";
import { Logo } from "@/assets";
import IconFooter1 from "@/assets/footer-icon/icon-1.png";
import IconFooter2 from "@/assets/footer-icon/icon-2.png";
import IconFooter3 from "@/assets/footer-icon/icon-3.png";
import IconFooter4 from "@/assets/footer-icon/icon-4.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FF6F61] shadow-md ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
        </Link>
        <span className="text-sm text-[#fff] sm:text-center ">
          © Copyright 2024, All Rights Reserved by Top Nanny Sitter
        </span>
        <ul className="flex items-center mt-3 text-sm font-medium text-[#fff]  sm:mt-0 justify-center">
          <li className="flex items-center justify-center">
            <a href="#" className="me-[25px]">
              <img src={IconFooter1} width="22px" height="22px" />
            </a>
          </li>
          <li className="flex items-center justify-center">
            <a href="#" className="me-[25px]">
              <img src={IconFooter2} width="22px" height="22px" />
            </a>
          </li>
          <li className="flex items-center justify-center">
            <a href="#" className="me-[25px]">
              <img src={IconFooter3} width="22px" height="22px" />
            </a>
          </li>
          <li className="flex items-center justify-center">
            <a href="#" className="me-[25px]">
              <img src={IconFooter4} width="22px" height="22px" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
