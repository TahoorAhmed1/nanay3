import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "@/assets";
import { Font1 } from "@/config/typography";
import IconHeader1 from "@/assets/dashboard/header-icon/icon-1.png";
import IconHeader2 from "@/assets/dashboard/header-icon/icon-2.png";
import IconHeader3 from "@/assets/dashboard/header-icon/icon-3.png";
import IconHeader4 from "@/assets/dashboard/header-icon/icon-4.png";
import profileIcon from "@/assets/dashboard/header-icon/user-icon.png";
import upload from "@/assets/dashboard/header-icon/upload.png";
import edit from "@/assets/dashboard/header-icon/edit.png";
import { removeData } from "@/config/helper";
import InputField from "@/component/common/input";
import FileUpload from "@/component/common/upload";
import TextArea from "@/component/common/textarea";
import { Close } from "@/config/app-constant";
import { Put, Get } from "@/config/api-method";
import { add } from "@/redux/reducers/userSlice";
import Toast from "@/component/common/toast";
import Table from "@/component/common/table";
import { CgClose } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BiLoader, BiUser } from "react-icons/bi";
import { useNanny } from "../../zustand";
import { FaUserCircle } from "react-icons/fa";

const Requests = [
  { heading: "Sno", key: "Sno" },
  { heading: "Region", key: "region" },
  { heading: "Name", key: "firstName" },
  { heading: "email", key: "email" },
  { heading: "Status", key: "status" },
  { heading: "Detail", key: "detail" },
];

export default function DashboardHeader({ children, onClickSearch }) {
  const [allDatasource, setAllDatasource] = useState([]);
  const [userDatasource, setUserDatasource] = useState([]);
  const [requestModelOpen, setRequestModelOpen] = useState(false);
  const requestModalRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [isSubModalOpen, setSubModalOpen] = useState(false);
  const subModalRef = useRef(null);
  const [serviceTypedropdown, setServiceTypeDropdown] = useState(false);
  const serviceTypedropdownRef = useRef(null);
  const [shareNannydropdown, setshareNannyDropdown] = useState(false);
  const shareNannydropdownRef = useRef(null);
  const [regiondropdown, setRegionDropdown] = useState(false);
  const regiondropdownRef = useRef(null);
  const userData = useSelector((state) => state.user);
  const [selected, setSelected] = useState(true);
  const [isReject, setIsReject] = useState(false);
  const [singleBooking, setSingleBooking] = useState({});
  const [singleBookingId, setSingleBookingId] = useState();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const [model, setModel] = useState({
    image: "",
    firstName: "",
    lastName: "",
    serviceType: "",
    experience: "",
    isAIDcertificate: "",
    isCPRcertificate: "",
    isDrivingLicense: "",
    doMealPrep: "",
    careSpecialChild: "",
    budget: "",
    region: "",
    zipCode: "",
  });

  useEffect(() => {
    if (userData) {
      setModel({
        image: userData.image || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        serviceType: userData.serviceType || "",
        experience: userData.experience || "",
        isAIDcertificate: userData.isAIDcertificate ? "true" : "false",
        isCPRcertificate: userData.isCPRcertificate ? "true" : "false",
        isDrivingLicense: userData.isDrivingLicense ? "true" : "false",
        doMealPrep: userData.doMealPrep ? "true" : "false",
        careSpecialChild: userData.careSpecialChild ? "true" : "false",
        budget: userData.budget || "",
        region: userData.region || "",
        zipCode: userData.zipCode || "",
      });
    }
  }, [userData]);

console.log('model', model,userData)
  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      fillModel("image",reader.result);
    };

    reader.onerror = () => {
      console.error("Error reading file.");
    };

    reader.readAsDataURL(file);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleServiceTypeDropdown = () => {
    setServiceTypeDropdown(!serviceTypedropdown);
  };

  const toggleshareNannyDropdown = () => {
    setshareNannyDropdown(!shareNannydropdown);
  };

  const toggleRegionDropdown = () => {
    setRegionDropdown(!regiondropdown);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        requestModalRef.current &&
        !requestModalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceTypedropdownRef.current &&
        !serviceTypedropdownRef.current.contains(event.target)
      ) {
        setServiceTypeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareNannydropdownRef.current &&
        !shareNannydropdownRef.current.contains(event.target)
      ) {
        setshareNannyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        regiondropdownRef.current &&
        !regiondropdownRef.current.contains(event.target)
      ) {
        setRegionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    removeData("token");
    window.location.href = "/";
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const {setIsOpen}=useNanny()

  const Request =
    userData?.role === "user"
      ? [
        { heading: "Sno", key: "Sno" },
        { heading: "Location", key: "region" },
        { heading: "Children Count", key: "childrenCount" },
        { heading: "Children Ages", key: "childrenAges" },
        { heading: "Schedule", key: "schedule" },
        { heading: "status", key: "status" },
      ]
      : [
        { heading: "Sno", key: "Sno" },
        { heading: "Location", key: "region" },
        { heading: "Children Count", key: "childrenCount" },
        { heading: "Children Ages", key: "childrenAges" },
        { heading: "Schedule", key: "schedule" },
        { heading: "status", key: "status" },
        { heading: "Detail", key: "detail" },
      ];

  const [isLoading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    Put(
      "auth",
      {
        ...model
      },
      userData?._id
    )
      .then((res) => {
        showToast("Profile Update Successfully", "success");
        dispatch(add({ ...res.data?.data }));
        setTimeout(() => {
          setLoading(false);
          setModalOpen(false);
        }, 2000);
      })
      .catch((err) => {
        // console.log(err);
        setTimeout(() => {
          setLoading(false);
          setModalOpen(false);
        }, 2000);
      });
  };

  const handleRequestModal = () => {
    setRequestModelOpen(true);
  };

  const getAllData = () => {
    Get("/booking/All")
      .then((res) => {
        if (res?.data) {
          const bookingPromises2 = res.data.map((item, index) =>
            Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};
              return {
                Sno: index + 1,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges.join(", "),
                schedule: item.schedule,
                status: (
                  <span
                    className={`font-bold capitalize ${item.status === "approved"
                        ? "text-sky-800"
                        : item.status === "pending"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                  >
                    {item.status}
                  </span>
                ),
                detail: (
                  <button onClick={() => handleSubModel(item._id)}>
                    <HiOutlineDotsVertical />
                  </button>
                ),
                firstName: user.firstName,
                email: user.email,
                region: user.region,
              };
            })
          );

          Promise.all(bookingPromises2)
            .then((userData) => {
              setAllDatasource(userData);
              console.log(userData, "sasas");
            })
            .catch((err) => {
              console.error("Error resolving booking details:", err);
            });
        } else {
          console.log("No bookings data found.");
          setUserDatasource([]);
        }
      })
      .catch((err) => { });
  };

  const getUserData = () => {
    console.log(" userData", userData.role);
    let id =
      userData?.role === "user"
        ? {
          parentId: userData?._id,
        }
        : {
          nannyId: userData?._id,
        };
    Get(`/booking`, null, id)
      .then((res) => {
        if (res?.data) {
          console.log("res", res?.data);
          const bookingPromises = res.data.map((item, index) =>
            Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};
              return {
                Sno: index + 1,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges.join(", "),
                schedule: item.schedule,
                status: (
                  <span
                    className={`font-bold capitalize ${item.status === "approved"
                        ? "text-sky-800"
                        : item.status === "pending"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                  >
                    {item.status}
                  </span>
                ),

                ...(userData?.role === "user" && {
                  detail: (
                    <button onClick={() => handleSubModel(item._id)}>
                      <HiOutlineDotsVertical />
                    </button>
                  ),
                }),

                firstName: user.firstName,
                email: user.email,
                region: user.region,
              };
            })
          );

          // Resolve all booking promises
          Promise.all(bookingPromises)
            .then((userData) => {
              console.log(userData, "dadaw");
              setUserDatasource(userData);
            })
            .catch((err) => {
              console.error("Error resolving booking details:", err);
            });
        } else {
          console.log("No bookings data found.");
          setUserDatasource([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  };

  console.log("UserDatasource Length:", userDatasource.length);

  const getDataById = (id) => {
    // First, fetch the booking data
    Get(`/booking/${id}`)
      .then((res) => {
        if (res?.data) {
          const booking = res?.data; // Save the booking data

          // Now, fetch the user data using the userId from the booking
          Get(`/auth/${booking.parentId}`)
            .then((userRes) => {
              const user = userRes?.data || {}; // Handle user data

              setSingleBooking({
                name: user.firstName,
                email: user.email,
                region: user.region,
                status: booking.status,
                message: booking.message,
                childrenCount: booking.childrenCount,
                childrenAges: booking.childrenAges,
              });
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching booking data:", err);
      });
  };

  useEffect(() => {
    getAllData();
    getUserData();
  }, []);

  const handleSubModel = (id) => {
    getDataById(id);
    setSingleBookingId(id);
    setSubModalOpen(true);
  };

  const approvedBooking = () => {
    Put(
      "booking",
      {
        status: "approved",
      },
      singleBookingId
    )
      .then((res) => {
        showToast("Booking Update Successfully", "success");
        isSubModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const RejectBooking = () => {
    Put(
      "booking",
      {
        ...model,
        status: "reject",
      },
      singleBookingId
    )
      .then((res) => {
        showToast("Booking Update Successfully", "success");
        isSubModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log('userData', userData)

  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5 bg-white shadow-lg my-2">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2  relative ">
            <Link to="/" className="flex items-center ">
              <img src={Logo} className="mr-3 h-12 sm:h-14" alt="Nanny Logo" />
            </Link>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto "
              id="mobile-menu-2"
            >
              <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {userData.role === "nanny" ? (
                  <li className="underline-animation">
                    <Font1> Nannies</Font1>
                  </li>
                ) : (
                  <li className="underline-animation">
                    <Font1>Families </Font1>
                  </li>
                )}
              </ul>
            </div>
            <div className=" md:flex hidden items-center">
              <button
                className="text-black mx-4 flex flex-col items-center 
              text-center"
                onClick={onClickSearch}
              >
                <img
                  src={IconHeader1}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Search</span>
              </button>
              {children}
              <button className="text-black mx-4 flex flex-col items-center text-center">
                <img
                  src={IconHeader2}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Conversations</span>
              </button>
              {userData.role !== "nanny" && (
                <button
                  className="text-black mx-4 flex flex-col items-center text-center"
                  onClick={()=>setIsOpen(true)}
                >
                  <img
                    src={IconHeader3}
                    width="20px"
                    height="20px"
                    className="mb-1"
                  />
                  <span className="hidden sm:block">Request</span>
                </button>
              )}
              {userData.role !== "nanny" && (
                <button
                  className="text-black mx-4 flex flex-col items-center text-center"
                  onClick={()=>setIsOpen(false)}
                >
                 <BiUser className="w-[20px] h-[20px] mb-1" />
                  <span className="hidden sm:block">Nanny</span>
                </button>
              )}
              <button
                className="text-black mx-4 flex flex-col items-center text-center relative"
                onClick={toggleDropdown}
              >
                <img
                  src={IconHeader4}
                  width="20px"
                  height="20px"
                  className="mb-1"
                />
                <span className="hidden sm:block">Profile</span>
                {dropdownOpen && (
                  <div
                    className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[250px] flex flex-col justify-end mt-16 transition-all duration-500 ease-in-out h-[150px] right-0`}
                  >
                    <ul className="text-sm text-gray-700 ">
                      <li>
                        <button
                          className=" mb-8 mx-3 flex justify-start items-center text-black md:text-lg text-sm font-semibold capitalize underline hover:no-underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen(false);
                            setModalOpen(true);
                          }}
                        >
                          <img
                            src={profileIcon}
                            width={500}
                            height={500}
                            alt="Profile"
                            className="w-[28px] mr-2"
                          />{" "}
                          view profiles
                        </button>
                      </li>
                      <li onClick={logout}>
                        <a
                          href="/"
                          className="block px-4 py-2 mb-4 mx-3 bg-red-400 hover:bg-red-500 text-white hover:shadow"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2">
              {children}

              <button
                className="text-black flex flex-col items-center text-center"
                onClick={onClickSearch}
              >
                <img
                  src={IconHeader1}
                  width={20}
                  height={20}
                  alt="Search"
                  className="mb-1"
                />
                <span className="text-xs">Search</span>
              </button>

              <button className="text-black flex flex-col items-center text-center">
                <img
                  src={IconHeader2}
                  width={20}
                  height={20}
                  alt="Conversations"
                  className="mb-1"
                />
                <span className="text-xs">Conversations</span>
              </button>
              <button
                className="text-black flex flex-col items-center text-center"
                onClick={()=>setIsOpen(true)}
              >
                            <BiUser className="w-[20px] h-[20px] mb-1" />

                <span className="text-xs">Nanny</span>
              </button>
              <button
                className="text-black flex flex-col items-center text-center"
                onClick={()=>setIsOpen(false)}
              >
                <img
                  src={IconHeader3}
                  width={20}
                  height={20}
                  alt="Request"
                  className="mb-1"
                />
                <span className="text-xs">Request</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  className="text-black flex flex-col items-center text-center"
                  onClick={toggleDropdown}
                >
                  <img
                    src={IconHeader4}
                    width={20}
                    height={20}
                    alt="Profile"
                    className="mb-1"
                  />
                  <span className="text-xs">Profile</span>
                </button>
                {dropdownOpen && (
                  <div
                    className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-[250px] flex flex-col justify-end bottom-full right-0 mb-2 transition-all duration-500 ease-in-out`}
                  >
                    <ul className="text-sm text-gray-700">
                      <li>
                        <button
                          className="mb-4 mx-3 flex justify-start items-center text-black md:text-lg text-base font-semibold capitalize underline hover:no-underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen(false);
                            setModalOpen(true);
                          }}
                        >
                          <img
                            src={profileIcon}
                            width={500}
                            height={500}
                            alt="Profile"
                            className="md:pe-4 pe-2 md:w-[22px] md:h-[22px] w-[28px] h-[24px]"
                          />{" "}
                          view profiles
                        </button>
                      </li>
                      <li onClick={logout}>
                        <a
                          href="/"
                          className="block md:px-4 md:py-2 px-3 py-2.5 mb-4 mx-3 bg-red-400 hover:bg-red-500 text-white hover:shadow"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 back  inset-1 z-40 flex justify-center items-center w-full h-full min-h-screen overflow-scroll bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="md:p-4 p-2 w-full md:max-w-[70%] max-w-[95%] max-h-full rounded-md"
            ref={modalRef}
          >
            <div className="bg-white md:px-8 px-4 rounded-md shadow-md border lg:h-[700px] sm:h-[850px]   py-2 z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6">
                {isEdit ? (
                  <button>
                    <button
                      disabled={isLoading}
                      className="w-20 mx-auto px-2 py-1 text-center text-[16px] bg-red-500 text-white font-medium rounded-md  hover:bg-red-600"
                      onClick={save}
                    >
                      {isLoading ? (
                        <BiLoader className="w-7 h-7 mx-auto animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </button>
                ) : (
                  <button
                    className="border border-red-500 rounded-md px-8 py-1 text-[18px] flex  font-semibold"
                    onClick={handleEdit}
                  >
                    Edit <img src={edit} className="ps-4" />
                  </button>
                )}
              </div>

              <div className="gap-4 md:grid grid-cols-12 ">
                <div className="col-span-4 flex md:justify-center justify-start items-center">
                  <FileUpload
                    disabled={isEdit ? false : true}
                    onChange={handleImageChange}
                    className="bg-transparent mt-2 mb-4 rounded-full border-gray-200 border h-[120px] w-[120px]
                     text-[#666666] text-sm flex justify-center items-start
                      focus:outline-none "
                  >
                    <img
                      src={model?.image}
                      alt="Uploaded Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </FileUpload>
                </div>
                <div className="col-span-8 flex flex-col md:justify-center md:mb-0 mb-5">
                  <span
                    //   className="flex justify-center items-center bg-green-500
                    // rounded-sm w-[95px] h-[30px] opacity-50 text-lime-950 font-semibold border-lime-950 border-2 my-2 text-md"
                    className="text-lg font-semibold text-teal-700 italic font-lato"
                  >
                    Active-- 
                  </span>
                  <h4 className="md:text-sm text-xs font-medium font-lato">
                    <div className="capitalize">{userData?.role}</div>
                    <span className="mr-1">{userData?.firstName}</span>
                    <span>{userData?.lastName}</span>
                  </h4>
                  <h4 className="md:text-sm text-xs font-medium font-lato">
                    {userData?.email}
                  </h4>
                </div>
              </div>
              <div className="gap-4 grid lg:grid-cols-3 grid-cols-2">
  <div>
    <span className="md:text-sm text-xs font-medium font-lato">First Name</span>
    <InputField
      disabled={isEdit ? false : true}
      type="text"
      value={model.firstName}
      onChange={(e) => fillModel("firstName", e.target.value)}
      placeholder={userData?.firstName}
      inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    />
  </div>

  <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Last Name</span>
    <InputField
      disabled={isEdit ? false : true}
      type="text"
      value={model.lastName}
      onChange={(e) => fillModel("lastName", e.target.value)}
      placeholder={userData?.lastName}
      inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    />
  </div>

  <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Service Type</span>
    <select
      name="serviceType"
      disabled={isEdit ? false : true}
      value={model.serviceType || userData?.serviceType || ""}
      onChange={(e) => fillModel("serviceType", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select Service Type</option>
      <option value="part-time">Part Time</option>
      <option value="full-time">Full Time</option>
      <option value="occasional">Occasional</option>
    </select>
  </div>
{userData.role == "nanny" &&  
  <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Experience</span>
    <select
      name="experience"
      disabled={isEdit ? false : true}
      value={model.experience || userData?.experience || ""}
      onChange={(e) => fillModel("experience", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select Experience</option>
      <option value="toddlers">Toddlers (1-3 years)</option>
      <option value="pre-school">Preschoolers (4-9 years)</option>
      <option value="grade-school">Grade-schoolers (10-12 years)</option>
      <option value="high-school">High-schoolers (13-17 years)</option>
      <option value="adult">Adults (18+ years)</option>
    </select>
  </div>
}
 {userData.role == "nanny" &&   <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">First Aid Certified</span>
    <select
      name="isAIDcertificate"
      disabled={isEdit ? false : true}
      value={model.isAIDcertificate || userData?.isAIDcertificate || ""}
      onChange={(e) => fillModel("isAIDcertificate", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>}

{userData.role == "nanny" &&    <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">CPR Certified</span>
    <select
      name="isCPRcertificate"
      disabled={isEdit ? false : true}
      value={model.isCPRcertificate || userData?.isCPRcertificate || ""}
      onChange={(e) => fillModel("isCPRcertificate", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>
}
 {userData.role == "nanny" &&   <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Driving License</span>
    <select
      name="isDrivingLicense"
      disabled={isEdit ? false : true}
      value={model.isDrivingLicense || userData?.isDrivingLicense || ""}
      onChange={(e) => fillModel("isDrivingLicense", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>}

{userData.role == "nanny" &&    <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Meal Prep</span>
    <select
      name="doMealPrep"
      disabled={isEdit ? false : true}
      value={model.doMealPrep || userData?.doMealPrep || ""}
      onChange={(e) => fillModel("doMealPrep", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>}

 {userData.role == "nanny" &&   <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Work with Special Needs</span>
    <select
      name="careSpecialChild"
      disabled={isEdit ? false : true}
      value={model.careSpecialChild || userData?.careSpecialChild || ""}
      onChange={(e) => fillModel("careSpecialChild", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>}

{userData.role == "nanny" &&   <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Hourly Rate (Budget)</span>
    <InputField
      disabled={isEdit ? false : true}
      type="text"
      value={model.budget || userData?.budget || ""}
      onChange={(e) => fillModel("budget", e.target.value)}
      placeholder={userData?.budget}
      inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    />
  </div>}

  {/* Region */}
  <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Region</span>
    <select
      name="region"
      disabled={isEdit ? false : true}
      value={model.region || userData?.region || ""}
      onChange={(e) => fillModel("region", e.target.value)}
      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    >
      <option value="">Select Region</option>
      <option value="usa">USA</option>
      <option value="canada">Canada</option>
    </select>
  </div>

  <div>
    <span className="md:text-sm text-xs font-medium font-lato mb-10">Zip Code</span>
    <InputField
      disabled={isEdit ? false : true}
      type="text"
      value={model.zipCode || userData?.zipCode || ""}
      onChange={(e) => fillModel("zipCode", e.target.value)}
      placeholder={userData?.zipCode}
      inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
    />
  </div>
</div>

              {userData?.role === "nanny" && (
                <div>
                  <span className="md:text-sm text-xs font-medium font-lato mb-10">
                    Describtion
                  </span>
                  <TextArea
                    disabled={isEdit ? false : true}
                    // type="text"
                    value={
                      userData?.parentJobDescription ||
                      model.parentJobDescription
                    }
                    onChange={(e) =>
                      fillModel("parentJobDescription", e.target.value)
                    }
                    placeholder={userData?.parentJobDescription || "message"}
                    rows={5}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
              )}
              {userData?.role === "user" && (
                <div>
                  <span className="md:text-sm text-xs font-medium font-lato mb-10">
                    Describtion
                  </span>
                  <TextArea
                    disabled={isEdit ? false : true}
                    // type="text"
                    value={userData?.aboutYourself || model.aboutYourself}
                    onChange={(e) => fillModel("aboutYourself", e.target.value)}
                    placeholder={userData?.aboutYourself || "message"}
                    rows={5}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
              )}
              <button
                onClick={handleCloseModal}
                className="absolute top-[-15px] left-[-15px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      {requestModelOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-h-full rounded-md relative  max-w-[1200px] mt-16"
            ref={requestModalRef}
          >
            <>
              <Table datasource={userDatasource} cols={Request} />
              <div className="absolute top-[-5px] right-[-5px] bg-[#999999] rounded-full p-2">
                <CgClose
                  size={24}
                  color="#fff"
                  onClick={() => {
                    setRequestModelOpen(false);
                  }}
                />
              </div>
            </>
          </div>

          <div className="absolute top-2 w-[350px]">
            <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-[#999999]">
              <div className="relative w-full h-full flex items-center">
                <div
                  onClick={() => setSelected(true)}
                  className={`${selected === true
                      ? "rounded-md bg-[#FF6F61] "
                      : " bg-transparent "
                    } cursor-pointer w-full flex justify-center h-full text-white`}
                >
                  <button>Your Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSubModalOpen && singleBooking && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 Sflex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 md:w-full md:max-w-[45%] w-[90%] max-h-full rounded-md"
            ref={subModalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <h2 className="absolute font-bold text-lg top-3 left-[30%] right-[30%] text-center">
                Booking Detail
              </h2>
              <div className="mb-2">
                <p
                  className={`italic absolute top-3 left-auto right-3 text-sm capitalize
                  ${singleBooking?.status === "pending" && "text-green-800"}
                  ${singleBooking?.status === "approved" && "text-blue-800"}
                  ${singleBooking?.status === "reject" && "text-red-800"}
                  `}
                >
                  {singleBooking?.status || "Status not available"}
                </p>
              </div>
              <div className="grid grid-cols-2 mt-2">
                <div className="flex flex-col rounded-md">
                  <h3 className="text-md font-semibold">Name:</h3>
                  <p className="text-sm text-gray-800">
                    {singleBooking?.name || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col rounded-md">
                  <h3 className="text-md font-semibold">Email:</h3>
                  <p className="text-sm text-gray-800">
                    {singleBooking?.email || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col rounded-md">
                  <h3 className="text-md font-semibold">Region:</h3>
                  <p className="text-sm text-gray-800">
                    {singleBooking?.region || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <h3 className="text-md font-semibold">Parent Message:</h3>
                <p className="text-sm text-gray-800 italic ">
                  {singleBooking?.message || "No message available."}
                </p>
              </div>

              {userData?.role === "user" && (
                <>
                  <h2 className=" font-bold text-lg text-center">
                    Child Detail
                  </h2>
                  <div className="mb-2">
                    <h3 className="text-md font-semibold">Total Child:</h3>
                    <p className="text-sm text-gray-800 italic ">
                      {singleBooking?.childrenCount || "No message available."}
                    </p>
                  </div>
                  <div className=" flex divide-x-2 flex-wrap gap-2">
                    {singleBooking?.childrenAges?.length > 0 ? (
                      singleBooking.childrenAges.map((age, index) => (
                        <div key={index} className="px-4">
                          <h3 className="text-md font-semibold">
                            Child {index + 1}
                          </h3>
                          <p className="text-sm text-gray-800 ">{age}</p>
                        </div>
                      ))
                    ) : (
                      <li>No message available.</li>
                    )}
                  </div>
                </>
              )}

              {userData?.role === "nanny" && (
                <>
                  <h3 className="text-sm font-semibold">
                    Please update this booking status?
                  </h3>
                  <div className="flex my-2 gap-4">
                    <button
                      className="rounded-full px-4 py-1 bg-blue-500/85 text-white"
                      onClick={approvedBooking}
                    >
                      Accept
                    </button>
                    <button
                      className={`rounded-full px-4 py-1  text-white ${isReject ? "bg-gray-600/85" : "bg-red-600/85"
                        }`}
                      onClick={() => setIsReject(!isReject)}
                    >
                      {isReject ? "cancel" : "Reject"}
                    </button>
                  </div>
                  {isReject && (
                    <>
                      <div className="my-4">
                        <TextArea
                          type="text"
                          label="Reason"
                          rows={3}
                          className=""
                          value={model.rejectReason}
                          onChange={(e) =>
                            fillModel("rejectReason", e.target.value)
                          }
                        />
                      </div>
                      <button
                        className="rounded-full border px-4 py-1 bg-gray-950/85  text-white"
                        onClick={RejectBooking}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </>
              )}
              <button
                onClick={() => setSubModalOpen(false)}
                className="absolute top-[-25px] left-[-25px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
