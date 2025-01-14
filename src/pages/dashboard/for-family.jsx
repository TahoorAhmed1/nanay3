import React, { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/component/layout/dashboard-header";
import Hero from "@/component/dashboard/hero";
import Filter from "@/component/dashboard/filter";
import List from "@/component/dashboard/list";
import ChatBot from "@/component/dashboard/chat-bot";
import { Get } from "@/config/api-method";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Close } from "@/config/app-constant";
import { Post } from "@/config/api-method";
import Toast from "@/component/common/toast";
import icon1 from "@/assets/dashboard/model-icon/1.png";
import icon2 from "@/assets/dashboard/model-icon/2.png";
import icon3 from "@/assets/dashboard/model-icon/3.png";
import icon4 from "@/assets/dashboard/model-icon/4.png";
import icon5 from "@/assets/dashboard/model-icon/5.png";
import icon6 from "@/assets/dashboard/model-icon/6.png";
import icon7 from "@/assets/dashboard/model-icon/7.png";
import icon8 from "@/assets/dashboard/model-icon/8.png";
import icon9 from "@/assets/dashboard/model-icon/9.png";
import icon10 from "@/assets/dashboard/model-icon/10.png";
import icon15 from "@/assets/dashboard/model-icon/15.png";
import icon16 from "@/assets/dashboard/model-icon/16.png";
import icon17 from "@/assets/dashboard/model-icon/17.png";
import icon18 from "@/assets/dashboard/model-icon/18.png";
import icon19 from "@/assets/dashboard/model-icon/19.png";
import icon20 from "@/assets/dashboard/model-icon/20.png";
import icon23 from "@/assets/dashboard/model-icon/23.png";
import TextArea from "@/component/common/textarea";
import profile from "@/assets/dashboard/list/profile.png";
import { H5 } from "@/config/typography";
import FormatLastSeen from "../../component/common/date-format";
import { useSelector } from "react-redux";
import { VscLoading } from "react-icons/vsc";
import { Helmet } from "react-helmet-async";
import { useNanny } from "../../zustand";
import { useChat } from "../../zustand/chat";
import { BiLoader } from "react-icons/bi";

export default function ForFamily() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [listData, setListData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [nannyId, setNannyId] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const modalRef = useRef(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [childCount, setChildCount] = useState(null);
  const [booking, setBooking] = useState({
    parentId: userData?._id,
    nannyId: modalData._id,
    location: userData?.region,
    message: "",
    childrenCount: "",
    childrenAges: [],
    budget: "",
    status: "pending",
    schedule: "",
    timing: "",
    to: "",
    selectedDays: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "" && userData.role == "user") {
      navigate("/dashboard/for-family");
    } else if (token && userData?.role == "nanny") {
      navigate("/dashboard/for-nanny");
    } else if (token && userData?.role == "admin") {
      navigate("/admin-dashboard/");
    } else if (token !== "") {
      navigate("/auth/sign-in");
    } else {
    }
  }, []);

  const fillModel = (key, val) => {
    setBooking({ ...booking, [key]: val });
  };

  const getData = () => {
    Get("/auth")
      .then((res) => {
        const nannies =
          res?.data?.filter((user) => user.role === "nanny") || [];
        setListData(nannies);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  console.log(listData);

  const getDataById = (id) => {
    Get(`/auth/${id}`)
      .then((res) => {
        setModalData(res?.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const toggleInput = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setFilterList([]);
      return;
    }

    const filtered = listData.filter((x) => {
      const firstNameMatch = x.firstName?.toLowerCase().includes(query);
      const budgetMatch = x.budget?.toLowerCase().includes(query);
      return firstNameMatch || budgetMatch;
    });

    setFilterList(filtered);
  };

  const handleOpenModal = (id) => {
    getDataById(id);
    setModalOpen(true);
    setNannyId(id);
  };

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  useEffect(() => {
    if (modalData._id) {
      setBooking((prevBooking) => ({
        ...prevBooking,
        nannyId: modalData._id,
      }));
    }
  }, [modalData]);

  const AddBooking = () => {
    setShowBooking(true);
  };

  const [loading, setLoading] = useState(false);

  const newBooking = () => {
    booking.status = "pending";
    if (
      booking?.message == "" ||
      booking?.childrenCount == "" ||
      !booking?.childrenAges?.length ||
      booking?.budget == "" ||
      booking?.status == "" ||
      booking?.schedule == "" ||
      booking?.timing == "" ||
      booking?.to == ""
    ) {
      return showToast("All fields are required", "error");
    }

    setLoading(true);

    Post("booking", booking)
      .then((res) => {
        console.log(res?.data);
        if (res?.data) {
          setTimeout(() => {
            showToast("Booking is success", "success");
            setLoading(false);
            setModalOpen(false);

            setBooking({
              parentId: userData?._id,
              nannyId: modalData._id,
              location: userData?.region,
              message: "",
              childrenCount: "",
              childrenAges: [],
              budget: "",
              status: "pending",
              schedule: "",
              timing: "",
              selectedDays: [],
            });
          }, 2000);
        } else {
          setTimeout(() => {
            showToast("Unexpected response format.", "error");
            setLoading(false);
            setModalOpen(false);

            setBooking({
              parentId: userData?._id,
              nannyId: modalData._id,
              location: userData?.region,
              message: "",
              childrenCount: "",
              childrenAges: [],
              budget: "",
              status: "pending",
              schedule: "",
              timing: "",
              selectedDays: [],
            });
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          showToast("Unexpected response format.", "error");
          setLoading(false);
          setModalOpen(false);

          setBooking({
            parentId: userData?._id,
            nannyId: modalData._id,
            location: userData?.region,
            message: "",
            childrenCount: "",
            childrenAges: [],
            budget: "",
            status: "pending",
            schedule: "",
            timing: "",
            selectedDays: [],
          });
        }, 2000);
      });
  };

  const handleChildCountChange = (e) => {
    const newCount = parseInt(e.target.value) || 0;
    setChildCount(newCount);
    setBooking((prevBooking) => ({
      ...prevBooking,
      childrenCount: newCount,
      childrenAges: new Array(newCount)?.fill(""),
    }));
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...booking.childrenAges];
    newAges[index] = value;
    setBooking({ ...booking, childrenAges: newAges });
  };

  const handleTimingSelection = (e) => {
    const selectedTiming = e.target.value;

    setBooking({ ...booking, timing: selectedTiming });
  };
  const generateSchedule = () => {
    if (!booking?.timing || !booking?.to) {
      return "Please select valid days and timings.";
    }

    const getPeriodOfDay = (hours) => {
      if (hours >= 0 && hours < 12) return "Morning";
      if (hours >= 12 && hours < 18) return "Afternoon";
      return "Evening";
    };

    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    };

    const formatDateWithDayAndMonth = (date) => {
      const day = date.toLocaleDateString("en-GB", { weekday: "long" });
      const numericDate = date.toLocaleDateString("en-GB");
      return `${day}, ${numericDate}`;
    };

    const startDate = new Date(booking.timing);
    const endDate = new Date(booking.to);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "Invalid date or time format. Please check your input.";
    }

    if (startDate > endDate) {
      return "The start time cannot be after the end time.";
    }

    const startFormattedDate = formatDateWithDayAndMonth(startDate);
    const startPeriod = getPeriodOfDay(startDate.getHours());
    const startTime = formatTime(startDate);

    const endFormattedDate = formatDateWithDayAndMonth(endDate);
    const endPeriod = getPeriodOfDay(endDate.getHours());
    const endTime = formatTime(endDate);

    if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
      return `${startFormattedDate} ${startPeriod} (${startTime} - ${endTime})`;
    }

    return `${startFormattedDate} ${startPeriod} (${startTime}) to ${endFormattedDate} ${endPeriod} (${endTime})`;
  };

  const handleTimingtoSelection = (e) => {
    const selectedTiming = e.target.value;

    setBooking({ ...booking, to: selectedTiming });
    generateSchedule();
  };

  const schedule = generateSchedule();

  booking.schedule = schedule;

  const { isOpenTable } = useNanny();

  const [allDatasource, setAllDatasource] = useState([]);
  const { chat, setChat } = useChat();
  const [isBokkingLoading, setLoadingBooking] = useState(false);

  const getAllData = () => {
    setLoadingBooking(true);
    Get("/booking", null, { parentId: userData?._id })
      .then((res) => {
        if (res?.data) {
          const bookingPromises2 = res.data.map((item, index) => {
            const user = res?.data || {};
            return {
              location: item.location,
              childrenCount: item.childrenCount,
              childrenAges: item.childrenAges.join(", "),
              schedule: item.schedule,
              createdAt: item?.createdAt,
              status: (
                <span
                  className={`font-bold capitalize ${
                    item.status === "approved"
                      ? "text-sky-800"
                      : item.status === "pending"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {item.status}
                </span>
              ),
              firstName: user.firstName + " " + user.lastName,
              user: user,
              email: user.email,
              region: user.region,
              ...item,
            };
          });

          Promise.all(bookingPromises2)
            .then((userData) => {
              setAllDatasource(userData);
              console.log("userDatasasasa", userData);
              let user = userData?.filter(
                ({ rawStatus }) => rawStatus === "approved"
              );
              console.log("user", user);

              let uniqueUsers = [
                ...new Map(
                  user?.map((item) => [item?.user?._id, item])
                ).values(),
              ];

              setChat(uniqueUsers);

              setTimeout(() => {
                setLoadingBooking(false);
              }, 2000);
            })
            .catch((err) => {
              console.error("Error resolving booking details:", err);
              setTimeout(() => {
                setLoadingBooking(false);
              }, 2000);
            });
        } else {
          console.log("No bookings data found.");
          setTimeout(() => {
            setLoadingBooking(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setLoadingBooking(false);
        }, 2000);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(allDatasource.length / rowsPerPage);

  const paginatedData = allDatasource
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>For Family</title>
      </Helmet>
      <DashboardHeader onClickSearch={toggleInput}>
        <div
          className={`overflow-hidden transition-all rounded-8 border-b-2 border-red-300 duration-300 absolute left-[30%] right-[30%] w-[40%] ${
            isVisible ? "max-h-40 block" : "max-h-0 hidden"
          }`}
        >
          <input
            type="text"
            placeholder="search"
            className={`w-full h-[60px] bg-white p-2 rounded-8 transition-transform transform outline-none shadow-2xl ${
              isVisible ? "translate-y-0" : "-translate-y-10"
            }`}
            onChange={handleSearchChange}
          />
        </div>
      </DashboardHeader>
      {filterList.length > 0 ? null : (
        <div className="md:px-6 px-3 flex flex-col  md:gap-y-[30px] gap-y-[20px]  py-[40px]">
          {/* <Alert /> */}
          <Hero />
        </div>
      )}
      <div className="min-h-[60vh]">
        {isOpenTable ? (
          <div className="w-full ">
            {isBokkingLoading ? (
              <div className="flex w-full  min-h-[60vh] mx-auto justify-center items-center ">
                <BiLoader className="w-8 h-8 mx-auto animate-spin " />
              </div>
            ) : (
              <div className="md:px-6 px-3 mb-20">
      <div className="container mx-auto w-full rounded-lg overflow-x-auto">
        <table className="w-full shadow-lg rounded-lg overflow-scroll">
          <thead>
            <tr className="bg-gradient-to-r from-[#FF6F61] to-[#FF9473] text-white">
              {["S.No", "Location", "Children Count", "Children Ages", "Schedule", "Status"].map((header) => (
                <th key={header} className="py-4 px-6 text-left text-[14px] font-bold uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-[#FFEBE9] transition-colors duration-200`}
                >
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.location || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.childrenCount || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {item.childrenAges || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 max-w-[200px]">
                    {item.schedule || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-700 font-medium">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        {paginatedData?.length > 0 && (
          <div className="flex items-center justify-center my-10 space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF6F61] hover:bg-[#FF9473] rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF6F61] hover:bg-[#FF9473] rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
    </div>
            )}
          </div>
        ) : (
          <div className="md:px-6 px-3  md:mb-[50px] mb-[80px]">
            <div className="mb-[30px]">
              <Filter
                filterList={filterList.length > 0 ? filterList : listData}
              />
            </div>
            <div className="container mx-auto min-h-screen">
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 rounded-md md:gap-10 gap-6">
                {filterList.length > 0
                  ? filterList.map((x, i) => (
                      <List
                        key={x._id}
                        image={x.image || profile}
                        firstName={x.firstName}
                        email={x.email}
                        budget={`${x?.budget} | 3 years experience`}
                        getDataById={getDataById}
                        modalData={modalData}
                      >
                        {userData?.selectPackage ? (
                          <button
                            onClick={() => handleOpenModal(x._id)}
                            className="mb-4 mt-2 underline decoration-black font-normal"
                          >
                            <H5>view profile</H5>
                          </button>
                        ) : (
                          <Link
                            to={"/package"}
                            className="mb-4 mt-2 underline decoration-black font-normal"
                          >
                            <H5>view profile</H5>
                          </Link>
                        )}
                      </List>
                    ))
                  : listData.map((x, i) => (
                      <List
                        key={x._id}
                        image={x.image || profile}
                        firstName={x.firstName}
                        email={x.email}
                        budget={`${x?.budget} | 3 years experience`}
                        getDataById={getDataById}
                        modalData={modalData}
                      >
                        {userData?.selectPackage ? (
                          <button
                            onClick={() => handleOpenModal(x._id)}
                            className="mb-4 mt-2 underline decoration-black font-normal"
                          >
                            <H5>view profile</H5>
                          </button>
                        ) : (
                          <Link
                            to={"/package"}
                            className="mb-4 mt-2 underline decoration-black font-normal"
                          >
                            <H5>view profile</H5>
                          </Link>
                        )}
                      </List>
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <List data={listData} getDataById={getDataById} modalData={modalData} /> */}
      <ChatBot />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-black-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-h-full rounded-md relative max-w-full md:max-w-[620px]"
            ref={modalRef}
          >
            <div className="bg-white p-4 rounded-md shadow-md border overflow-y-auto h-[90vh] md:h-auto md:max-h-[90vh] z-0 relative">
              <div className="flex flex-col items-center mb-2 text-center">
                <div className="h-[95px] w-[95px] relative">
                  <img src={modalData.image || profile} alt="Profile" />
                  <div className="h-[30px] w-[30px] absolute top-[70%] left-[70%] z-10">
                    <img src={icon1} alt="Profile" />
                  </div>
                </div>
                <H5 className="my-2 font-normal">
                  {modalData?.firstName || "Max"}
                </H5>
              </div>
              <div className="flex items-center pb-2 border-b">
                <img src={icon1} className="h-[30px] w-[30px]" />
                <h3 className="text-base font-semibold ms-4">
                  Featured Profile with PLUS
                </h3>
              </div>
              {showBooking === true ? (
                <>
                  <h3 className="text-lg font-bold mt-4 ">Booking</h3>
                  <div className="mt-3">
                    <h3 className="text-sm mb-1 font-semibold">Start:</h3>
                    <input
                      type="datetime-local"
                      value={booking.timing}
                      onChange={handleTimingSelection}
                      className="bg-transparent mb-3 px-6 py-2  rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">End:</h3>
                    <input
                      type="datetime-local"
                      value={booking.to}
                      onChange={handleTimingtoSelection}
                      className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5">
                      Working Schedule:
                    </h3>
                    <span className="font-normal text-xs text-slate-600">
                      {schedule && schedule}
                    </span>
                  </div>

                  <div className="my-3">
                    <input
                      type="text"
                      disabled={userData?.budget ? true : false}
                      placeholder={
                        userData?.budget
                          ? userData?.budget
                          : "Enter Your budget"
                      }
                      value={
                        userData?.budget ? userData?.budget : booking.budget
                      }
                      onChange={(e) =>
                        setBooking({ ...booking, budget: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                      Number of children
                    </h3>
                    <input
                      type="number"
                      placeholder="Number of children"
                      value={booking.childrenCount || ""}
                      onChange={handleChildCountChange}
                      className="flex mt-2 h-10 w-full border-[1px] rounded-md px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div className=" flex gap-2">
                    {Array.from({ length: booking?.childrenCount })?.map(
                      (_, index) => (
                        <div key={index} className="mt-2 max-w-[150px]">
                          <input
                            type="number"
                            value={booking.childrenAges[index] || ""}
                            onChange={(e) =>
                              handleAgeChange(index, e.target.value)
                            }
                            placeholder={`Age of Child ${index + 1}`}
                            className="flex h-10 w-full px-3 py-2 text-sm border-[1px] rounded-sm focus:outline-none"
                          />
                        </div>
                      )
                    )}
                  </div>

                  <div className="my-4">
                    <TextArea
                      type="text"
                      label="Message"
                      value={booking.message || ""}
                      onChange={(e) => fillModel("message", e.target.value)}
                      rows={5}
                      className=""
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                    <div className="flex items-center  pt-3">
                      <img src={icon2} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        <FormatLastSeen date={modalData?.lastSeen} />
                      </p>
                    </div>
                    <div className="flex  w-full items-center pt-3 ">
                      <img src={icon3} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        Responds within a day
                      </p>
                    </div>
                    <div className="flex items-center pt-3 ">
                      <img src={icon4} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        {modalData?.region}
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon23} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        {modalData?.budget}
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon9} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        {modalData?.childAgeGroup}
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <img src={icon10} className="h-[18px]" />
                      <p className="ml-2 text-gray-600 text-[15px]">
                        specail child:
                        <span>
                          {modalData?.careSpecialChild === true ? "yes" : "no"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold ">
                    A little bit about us...
                  </h3>
                  <p className="text-gray-800 my-2 text-[16px]">
                    {modalData?.aboutYourself}
                  </p>
                  <h3 className="text-lg font-bold border-t pt-3">
                    Looking For
                  </h3>
                  <p className="text-gray-800 my-1 font-semibold">
                    Availability
                  </p>
                  <div className="flex flex-wrap justify-between pe-3">
                    <div className="flex items-center">
                      <img src={icon5} className="h-[16px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        Start: ASAP
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img src={icon6} className="h-[16px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        {modalData?.availability?.length > 0
                          ? modalData?.availability.join(", ")
                          : "any-time"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img src={icon7} className="h-[16px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        {modalData?.isLiven === true ? "Live In" : "Live Out"}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <img src={icon8} className="h-[16px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        {modalData?.serviceType}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">Requirments</h3>
                  <div>
                    <p className="text-gray-800 my-1 font-semibold">
                      Certification
                    </p>
                    <div className="flex flex-col md:flex-row justify-start">
                      {modalData?.isDrivingLicense && (
                        <div className="flex items-center ">
                          <img src={icon18} className="h-[22px]" />
                          <p className="text-gray-600 ml-1 text-[15px]">
                            Driver’s License
                          </p>
                        </div>
                      )}
                      {modalData?.isCPRcertificate && (
                        <div className="flex items-center md:ml-6 mt-2 md:mt-0">
                          <img src={icon16} className="h-[22px]" />
                          <p className="text-gray-600 ml-1 text-[15px]">
                            CPR certificate
                          </p>
                        </div>
                      )}
                      {modalData?.isAIDcertificate && (
                        <div className="flex items-center md:ml-6 mt-2 md:mt-0">
                          <img src={icon17} className="h-[22px]" />
                          <p className="text-gray-600 ml-1 text-[15px]">
                            First Aid Kit
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800 my-1 font-semibold">
                      Fluent Languages
                    </p>
                    <div className="flex justify-start">
                      <div className="flex items-center ">
                        <img src={icon15} className="h-[22px]" />
                        <p className="text-gray-600 ml-1 text-[15px] capitalize">
                          {modalData?.Language}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 my-1 font-semibold">Other</p>
                  <div className="flex flex-col md:flex-row justify-start gap-4">
                    <div className="flex items-center ">
                      <img src={icon20} className="h-[22px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        Do HouseKeeping:
                        <span>
                          {modalData?.doHouseKeeping === true ? "yes" : "no"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center ">
                      <img src={icon19} className="h-[22px]" />
                      <p className="text-gray-600 ml-1 text-[15px]">
                        Do Meal Preparing:
                        <span>
                          {modalData?.doHouseKeeping === true ? "yes" : "no"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-2 mb-1 font-semibold">
                    Start Experience From
                  </p>
                  <div className="flex justify-start">
                    <div className="flex items-center ">
                      <img src={icon15} className="h-[22px]" />
                      <p className="text-gray-600 ml-1 text-[15px] capitalize">
                        {modalData?.experience}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {showBooking === false ? (
                <div className="py-2 absolute top-2 right-2 md:top-0 md:right-0">
                  <button
                    className="px-4 py-2 border-none text-white rounded-[5px] me-2 flex bg-emerald-900/60 text-sm"
                    onClick={AddBooking}
                    // onClick={newBooking}
                  >
                    Add Booking
                  </button>
                </div>
              ) : (
                <div className="py-2 absolute top-2 right-2 md:top-0 md:right-0">
                  <button
                    className="px-4 w-28 text-center mx-auto justify-center py-2 border-none text-white rounded-[5px] me-2 flex bg-cyan-900/80 text-sm"
                    onClick={newBooking}
                  >
                    {loading ? (
                      <VscLoading className=" animate-spin w-7 h-5 mx-auto" />
                    ) : (
                      "Book Now"
                    )}
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="absolute top-[-5px] left-[-5px] "
            >
              <Close />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
