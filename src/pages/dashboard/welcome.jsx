import React, { useEffect, useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { H6, H1 } from "@/config/typography";
import Img from "@/assets/dashboard/welcome/welcome-bg.png";
import { Logo } from "@/assets";
import Button from "@/component/dashboard/button";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "@/component/common/toast";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (location.state && location.state.loggedIn) {
      showToast("Login successfully!", "success");
    }
  }, [location]);

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const userData = useSelector((state) => state.user);
  console.log("User logged in:", userData);

  const handleRoute = () => {
    userData.role === "user" && navigate("/dashboard/for-family");
    userData.role === "nanny" && navigate("/dashboard/for-nanny");
  };

  return (
    <>
     <Helmet>
            <title>Welcome</title>
          </Helmet>
    <div
      className="py-[30px] h-[100dvh] relative"
      style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
    >
      
      <div className="container m-auto ">
        <div className="flex justify-center items-center min-h-[90vh] my-auto relative">
          <div className="md:grid md:grid-cols-12 gap-8 bg-white shadow-lg rounded-md md:p-24 p-12">
            <div className="col-span-12 lg:col-span-6 mb-4 capitalize flex flex-col justify-center items-start">
              <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
              <H1 className="font-creato my-4">
                Welcome to Top
                <span className="text-[#FF6F61] md:font-extrabold font-bold"> Nanny Sitter</span>
              </H1>
              <Button
                className="w-[95%] rounded-[35px] py-1 px-6 bg-[#FF6F61] text-white text-[22px] focus:outline-none"
                onClick={handleRoute}
                // onClick={() => navigate("/dashboard/for-family")}
              >
                Welcome
              </Button>
            </div>
            <div className="lg:col-span-6 hidden lg:block md:border-l">
              <img
                src={Img}
                className="max-w-[300px] xl:max-w-[350px] mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
    </>
  );
}
