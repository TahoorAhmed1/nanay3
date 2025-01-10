import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbSmartHome } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { BsBroadcastPin } from "react-icons/bs";
import { Logo } from "@/assets";
import NotFound from "@/pages/not-found";
import AdminDashboardMain from "./home";
import Users from "./user";
import Bookings from "./booking";
import { removeData } from "@/config/helper";
import { useEffect, useState } from "react";
import Packages from "./packages";
import { Package } from "lucide-react";

const pagesArr = [
  {
    icon: <TbSmartHome  className="md:w-[34px] md:h-[34px] w-[25px] h-[25px]" color="#999999" />,
    route: "",
  },
  {
    icon: <GoPerson className="md:w-[34px] md:h-[34px] w-[25px] h-[25px]" color="#999999" />,
    route: "users",
  },
  {
    icon: <BsBroadcastPin className="md:w-[34px] md:h-[34px] w-[25px] h-[25px]" color="#999999" />,
    route: "bookings",
  },
  {
    icon: <Package className="md:w-[34px] md:h-[34px] w-[25px] h-[25px]" color="#999999" />,
    route: "packages",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const userData = useSelector((a) => a.user);
  console.log(userData);

  const logout = () => {
    removeData("token");
    window.location.href = "/";
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

useEffect(()=>{
  const token = localStorage.getItem("token");
  console.log('token', token)
  if(token !== "" && userData.role === "user"){
    return  navigate("/dashboard/for-family")
  }else if(token && userData?.role === "nanny"){
    return navigate("/dashboard/for-nanny")

  }else if( token && userData?.role === "admin"){
    return

  }
  else if(token !== ""){
    return navigate("/auth/sign-in")
  }else{
    return
  }
},[])


  return (
    <div className="grid-cols-1 h-screen">
      <div className="flex w-full justify-between h-[8%] bg-[#fff] border items-center">
        <div className="text-3xl font-medium text-black ps-3">
          <img src={Logo} className="mr-3 h-10" alt="Nanny Logo" />
        </div>
        <button
          className="block text-sm px-4 py-1 bg-red-400 me-2 rounded-sm hover:bg-red-500 text-white hover:shadow"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:relative bg-white border-r shadow-md w-20 h-full min-h-screen flex-shrink-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 z-20`}
      >
        <div className="h-full flex flex-col items-center gap-y-6 pt-6">
          <button
            className="md:hidden  text-gray-600"
            onClick={toggleSidebar}
          >
            ✕
          </button>
          {pagesArr.map((x, index) => (
            <div
              key={index}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-200 cursor-pointer"
              onClick={() => navigate(x.route)}
            >
              {x.icon}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow bg-white relative overflow-auto">
        <button
          className="md:hidden  z-30 bg-gray-200 p-2 m-3 rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <Routes>
          <Route path="" element={<AdminDashboardMain />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="packages" element={<Packages />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}
