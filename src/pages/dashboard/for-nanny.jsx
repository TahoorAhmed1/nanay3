import React, { useState, useRef, useEffect } from "react";
import DashboardHeader from "@/component/layout/dashboard-header";
import Alert from "@/component/dashboard/alert";
import Hero from "@/component/dashboard/hero";
import Filter from "@/component/dashboard/filter";
import List from "@/component/dashboard/list";
import ChatBot from "@/component/dashboard/chat-bot";
import { useNavigate, useLocation } from "react-router-dom";
import { Get, Put, Delete, Post } from "@/config/api-method";
import Toast from "@/component/common/toast";

import { Close } from "@/config/app-constant";
import icon1 from "@/assets/dashboard/model-icon/1.png";
import icon2 from "@/assets/dashboard/model-icon/2.png";
import icon3 from "@/assets/dashboard/model-icon/3.png";
import icon4 from "@/assets/dashboard/model-icon/4.png";
import icon24 from "@/assets/dashboard/model-icon/24.png";
import icon6 from "@/assets/dashboard/model-icon/6.png";
import icon7 from "@/assets/dashboard/model-icon/7.png";
import icon8 from "@/assets/dashboard/model-icon/8.png";
import icon9 from "@/assets/dashboard/model-icon/9.png";
import icon10 from "@/assets/dashboard/model-icon/10.png";
import icon11 from "@/assets/dashboard/model-icon/11.png";
import icon12 from "@/assets/dashboard/model-icon/12.png";
import icon13 from "@/assets/dashboard/model-icon/13.png";

import TextArea from "@/component/common/textarea";
import profile from "@/assets/dashboard/list/profile.png";
import { H1, H5, Font2 } from "@/config/typography";
import FormatLastSeen from "../../component/common/date-format";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { BiLoader } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

export default function ForNanny() {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to track changes
  const [listData, setListData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDetail, setModalOpenDetail] = useState(false);
  const [singleBooking, setSingleBooking] = useState({});
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const userData = useSelector((state) => state.user);
useEffect(()=>{
  const token = localStorage.getItem("token");
  if(token !== "" && userData.role =="user"){
    navigate("/dashboard/for-family")
  }else if(token && userData?.role== "nanny"){
    navigate("/dashboard/for-nanny")

  }else if( token && userData?.role== "admin"){
    navigate("/admin-dashboard/")

  }
  else if(token == ""){
    navigate("/auth/sign-in")
  }
},[])

  const [model, setModel] = useState({});
  const [isReject, setIsReject] = useState(false);

  const modalRef = useRef(null);
  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };
  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const getData = () => {
    Get("/auth")
      .then((res) => {
        const nannies = res?.data?.filter((user) => user.role === "user") || [];
        setListData(nannies);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const getDataByIdPro = (id) => {
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
                id: user._id,
                name: user.firstName + " " + user.lastName,
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

  useEffect(() => {
    // This effect will run when the component mounts and whenever the location changes
    console.log("filterList updated:", filterList);
  }, [filterList, location]); // Include location in the dependency array

  const [isVisible, setIsVisible] = useState(false);

  const toggleInput = () => {
    setIsVisible((prev) => !prev);
  };
  const [singleBookingId, setSingleBookingId] = useState();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  const approvedBooking = () => {
    setAcceptLoading(true);
    Put(
      "booking",
      {
        status: "approved",
      },
      singleBookingId
    )
      .then((res) => {
        showToast("Booking approve successfully", "success");
        setTimeout(() => {
          setModalOpen(false);
          setAcceptLoading(false);
          setModalOpenDetail(false);
          setSingleBooking({});
        }, 2000);
      })
      .catch((err) => {
        showToast("Error while booking", "success");
        setTimeout(() => {
          setAcceptLoading(false);
          setModalOpen(false);
          setModalOpenDetail(false);
          setSingleBooking({});
        }, 2000);
      });
  };

  const RejectBooking = () => {
    setDeclineLoading(true);
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
        setTimeout(() => {
          setModalOpen(false);

          setDeclineLoading(false);
          setModalOpenDetail(false);
          setSingleBooking({});
        }, 2000);
      })
      .catch((err) => {
        showToast("Error while booking", "error");
        setTimeout(() => {
          setModalOpen(false);
          setModalOpenDetail(false);
          setSingleBooking({});
          setDeclineLoading(false);
        }, 2000);
      });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      // If the input is empty, clear the filterList to show banner and filter
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

  // const handleOpenModal = (id) => {
  //   getDataById(id);
  //   setModalOpen(true);
  // };

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
  const [allDatasource, setAllDatasource] = useState([]);
  const handleSubModel = (id) => {
    setSingleBookingId(id);
    getDataByIdPro(id);
    setModalOpenDetail(true);
  };

  const getAllData = () => {
    Get("/booking", null, { nannyId: userData?._id })
      .then((res) => {
        if (res?.data) {
          const bookingPromises2 = res.data.map((item, index) =>
            Get(`/auth/${item.parentId}`).then((res) => {
              const user = res?.data || {};
              console.log("user", user);
              return {
                Sno: index + 1,
                location: item.location,
                childrenCount: item.childrenCount,
                childrenAges: item.childrenAges.join(", "),
                schedule: item.schedule,
                budget: item.budget,
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
                detail: (
                  <button onClick={() => handleSubModel(item._id)}>
                    <HiOutlineDotsVertical />
                  </button>
                ),
                firstName: user.firstName + " " + user.lastName,
                email: user.email,
                region: user.region,
              };
            })
          );

          // Resolve all booking promises
          Promise.all(bookingPromises2)
            .then((userData) => {
              setAllDatasource(userData);
            })
            .catch((err) => {
              console.error("Error resolving booking details:", err);
            });
        } else {
          console.log("No bookings data found.");
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Change this to adjust the number of rows per page

  // Calculate total pages
  const totalPages = Math.ceil(allDatasource.length / rowsPerPage);

  // Get the data for the current page
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
        <title>For Nanny</title>
      </Helmet>
      <DashboardHeader onClickSearch={toggleInput}>
        <div
          className={`overflow-hidden transition-all rounded-8 border-b-2 shadow-md  border-red-300 duration-300 absolute lg:left-[30%] md:left-[20%] md:top-10 left-4 -top-[70px]  md:right-[30%] md:w-[40%] w-[60%] ${
            isVisible ? "max-h-40 block" : "max-h-0 hidden"
          }`}
        >
          <input
            type="text"
            placeholder="search"
            className={`w-full h-[60px] bg-white p-2 rounded-8 transition-transform transform outline-none  shadow-2xl ${
              isVisible ? "translate-y-0" : "-translate-y-10"
            }`}
            onChange={handleSearchChange}
          />
        </div>
      </DashboardHeader>
      {filterList.length > 0 ? null : (
        <div className="md:px-6 px-3 py-[40px]">
          <Hero />
        </div>
      )}
      <div className=" px-3 md:px-6">
      <div className=" container mx-auto  w-full mb-20 rounded-lg overflow-hidden ">
      {allDatasource.length == 0 ? (
            <div className="flex w-full  min-h-[60vh] mx-auto justify-center items-center ">
              <BiLoader className="w-8 h-8 mx-auto animate-spin " />
            </div>
          ) : (

            <>
            <div className="overflow-x-auto  font-montserrat">
             <table className="w-full shadow-lg rounded-lg overflow-scroll">
             <thead>
                <tr className="bg-gradient-to-r from-[#FF6F61] to-[#FF9473] text-white">
                <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="py-4 px-6  text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Children Count
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Children Ages
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Region
                    </th>
                    <th className="py-4 px-6 text-left text-[13px] font-semibold  w-full uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 ">
                  {paginatedData                 
                    ?.map((item, index) => (
                      <tr
                     key={index}
                     className={`${
                       index % 2 === 0 ? "bg-gray-100" : "bg-white"
                     } hover:bg-[#FFEBE9] transition-colors duration-200`}
                   >
                        <td className="py-4 px-6 text-sm w-full text-gray-800">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700 font-medium">
                          {item.firstName}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700">
                          {item.email}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700">
                          ${item.budget}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700">
                          {item.location || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700">
                          {item.childrenCount || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700">
                          {item.childrenAges || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-700 max-w-[500px]">
                          {item.schedule || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-sm w-full">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            } capitalize`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-600">
                          {item.region}
                        </td>
                        <td className="py-4 px-6 text-sm w-full text-gray-600">
                          {item.detail}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
              <div className="flex items-center justify-center my-6 space-x-4">
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
            </>

          )}
        </div>
      </div>
      {/* <List data={listData} getDataById={getDataById} modalData={modalData} /> */}
      {/* <ChatBot /> */}

      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0  flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-h-full rounded-md relative  max-w-[500px]"
            ref={modalRef}
          >
            <div className="bg-white p-4 rounded-md shadow-md border overflow-y-scroll  h-[90vh] z-0 ">
              <div className="flex flex-col items-center mb-2 text-center">
                <div className="h-[95px] w-[95px] relative">
                  <img src={profile} alt="Profile" />
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
                  {" "}
                  Featured Profile with PLUS
                </h3>
              </div>
              <div className="flex flex-wrap md:gap-4 gap-2 ">
                <div className="flex items-center pt-3">
                  <img src={icon2} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">
                    <FormatLastSeen date={modalData?.lastSeen} />
                  </p>
                </div>
                <div className="flex items-center pt-3">
                  <img src={icon3} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">Responds within a day</p>
                </div>
                <div className="flex items-center pt-3">
                  <img src={icon4} className="h-[18px]" />
                  <p className="ml-2 text-gray-600">{modalData?.region}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-2">Job Describtion</h3>
              <p className="text-gray-800 my-1">
                {modalData?.parentJobDescription}
              </p>
              <h3 className="text-lg font-bold border-t pt-3">Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 ">
                <div className="md:col-span-9 space-y-2">
                  <p className="text-gray-800 font-semibold">Personal</p>
                  <div className="flex flex-col sm:flex-row justify-start gap-4">
                    <div className="flex items-center">
                      <img
                        src={icon13}
                        alt="Name"
                        width={22}
                        height={22}
                        className="mr-1"
                      />
                      <p className="text-gray-600 flex w-full">
                        {modalData.firstName} {modalData.lastName}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={icon24}
                        alt="Email"
                        width={22}
                        height={22}
                        className="mr-1"
                      />
                      <p className="text-gray-600">{modalData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <p className="text-gray-800 font-semibold mb-2">
                    Service Type
                  </p>
                  <div className="flex items-center">
                    <img
                      src={icon8}
                      alt="Service"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    <p className="text-gray-600">{modalData.serviceType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 mb-4">
                <TextArea
                  type="text"
                  label="Message"
                  // value={model[question.key] || ''}
                  // onChange={(e) => fillModel(question.key, e.target.value)}
                  minlength={30}
                  className=""
                />
              </div>

              <div className="py-2">
                <button className="px-16 py-3 border-none text-white rounded-[25px] me-2 flex bg-[#ff6f61]">
                  <a>Next</a>
                </button>
              </div>

              <button
                onClick={handleCloseModal}
                className="absolute top-[-5px] left-[-5px] "
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpenDetail && singleBooking && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[55%] max-h-full rounded-md"
            ref={modalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6"></div>
              <div className="mt-8">
                <h2 className="absolute font-bold text-lg top-3 left-[30%] right-[30%] text-center">
                  Booking Detail
                </h2>
                <div className="mb-2">
                  <p
                    className={`italic absolute top-3 text-sm left-auto right-3 capitalize
                        ${
                          singleBooking?.status === "pending" &&
                          "text-green-800"
                        }
                        ${
                          singleBooking?.status === "approved" &&
                          "text-blue-800"
                        }
                        ${singleBooking?.status === "reject" && "text-red-800"}
                        `}
                  >
                    {singleBooking?.status || "Status not available"}
                  </p>
                </div>
                <div className="grid grid-cols-3 my-2">
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
                <div className="mb-1 flex items-center">
                  <h3 className="text-md font-semibold">Parent Message:</h3>
                  <p className="text-sm text-gray-800 italic ps-2">
                    {singleBooking?.message || "No message available."}
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="text-md font-semibold">Total Child:</h3>
                  <p className="text-sm text-gray-800 ps-2">
                    {singleBooking?.childrenCount || "No message available."}
                  </p>
                </div>
                <div className=" flex flex-wrap gap-2 mb-2">
                  {singleBooking?.childrenAges?.length > 0 ? (
                    singleBooking.childrenAges.map((age, index) => (
                      <div key={index} className="flex items-center">
                        <h3 className="text-sm font-semibold">
                          Child {index + 1} :
                        </h3>
                        <p className="text-sm text-gray-600 ps-2">{age}</p>
                      </div>
                    ))
                  ) : (
                    <li>No message available.</li>
                  )}
                </div>
                {singleBooking?.status == "pending" && (
                  <div className="">
                    <h3 className="text-sm font-semibold">
                      Please update this booking status?
                    </h3>
                    <div className="flex my-2 gap-4">
                      <button
                        disabled={acceptLoading}
                        className="rounded-md w-[100px] py-1 text-center bg-blue-500/85 text-white"
                        onClick={approvedBooking}
                      >
                        {acceptLoading ? (
                          <BiLoader className="h-5 w-5 mx-auto animate-spin" />
                        ) : (
                          "Accept"
                        )}
                      </button>
                      <button
                        className={`rounded-md w-[100px] py-1 text-center text-white ${
                          isReject ? "bg-gray-600/85" : "bg-red-600/85"
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
                          disabled={declineLoading}
                          className="rounded-md border w-[100px] py-1 text-center bg-gray-950/85  text-white   "
                          onClick={RejectBooking}
                        >
                          {declineLoading ? (
                            <BiLoader className="h-5 w-5 mx-auto animate-spin" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </>
                    )}
                    <Toast
                      message={toast.message}
                      type={toast.type}
                      isVisible={toast.isVisible}
                      onClose={() => setToast({ ...toast, isVisible: false })}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setModalOpenDetail(false);
                  setSingleBooking({});
                }}
                className="absolute top-[-20px] right-[-20px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
