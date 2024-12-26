import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";
import { Get, Put, Delete, Post } from "@/config/api-method";
import Table from "@/component/common/table";
import { Close } from "@/config/app-constant";
import edit from "@/assets/dashboard/header-icon/edit.png";
import { useSelector } from "react-redux";
import upload from "@/assets/dashboard/header-icon/upload.png";
import InputField from "@/component/common/input";
import FileUpload from "@/component/common/upload";
import TextArea from "@/component/common/textarea";
import Toast from "@/component/common/toast";
import OTPInput from "@/component/common/otpField";
import Button from "@/component/dashboard/button";
import { Font1, H6, Font2 } from "@/config/typography";
import { MdOutlineDeleteSweep } from "react-icons/md";

const AllRequestCol = [
  { heading: "Image", key: "image" },
  { heading: "Name", key: "firstName" },
  { heading: "Email", key: "email" },
  { heading: "Role", key: "role" },
  { heading: "Region", key: "region" },
  { heading: "Status", key: "isActive" },
  { heading: "Detail", key: "detail" },
  { heading: "Remove", key: "remove" },
];

export default function Users() {
  const [allDatasource, setAllDatasource] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const requestModalRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [isUserModal, setUserModal] = useState(false);
  const UsermodalRef = useRef(null);
  const [isUserActive, setUserActive] = useState(false);
  const UserActiveRef = useRef(null);
  const [UserId, setUserId] = useState(false);
  const [serviceTypedropdown, setServiceTypeDropdown] = useState(false);
  const serviceTypedropdownRef = useRef(null);
  const [shareNannydropdown, setshareNannyDropdown] = useState(false);
  const shareNannydropdownRef = useRef(null);
  const [regiondropdown, setRegionDropdown] = useState(false);
  const regiondropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState(true);
  const [otpData, setOtpData] = useState({});
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [timer, setTimer] = useState(600);
  const [otpModel, setOtpModel] = useState(false);
  const otpRef = useRef(null);

  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  const getData = () => {
    Get("/auth")
      .then((res) => {
        if (res?.data) {
          const AllUserData = res?.data.map((item) => ({
            image: (
              <img
                src={
                  item?.image ||
                  "https://ghaliajewelry.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"
                }
                className="h-[35px] w-[35px] rounded-full"
              />
            ),
            firstName: item.firstName,
            email: item.email,
            role: item.role,
            region: item?.region || "N/A",
            isActive: (
              <button
                className={`rounded-md px-6 py-1  text-white w-[110px] ${
                  item.isActive === true ? "bg-sky-800/85" : "bg-red-600/85"
                }`}
                onClick={() => handleActiveUser(item._id)}
              >
                {item?.isActive === true ? "active" : "inactive"}
              </button>
            ),
            detail: (
              <button onClick={() => handleSubModel(item._id)}>
                <HiOutlineDotsVertical />
              </button>
            ),
            remove: (
              <button onClick={() => DeleteUser(item?._id)}>
                <MdOutlineDeleteSweep size={24} className="text-red-700/55" />
              </button>
            ),
          }));
          setLoading(false);
          setAllDatasource(AllUserData);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const getDataById = (id) => {
    Get(`/auth/${id}`)
      .then((res) => {
        console.log("Fetched nanny data:", res?.data);
        setUser({ ...res?.data });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  const DeleteUser = (id) => {
    if (!id) {
      console.error("Invalid ID provided for deletion");
      return;
    }
    console.log("Deleting user with ID:", id);
    Delete(`/auth/${id}`)
      .then((res) => {
        showToast("User Removed Successfully", "success");
      })
      .catch((err) => {
        console.error("Error while deleting user:", err);
      });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const save = () => {
    Put(
      "auth",
      {
        user,
        ...model,
      },
      user?._id
    )
      .then((res) => {
        showToast("Profile Update Successfully", "success");
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubModel = (id) => {
    console.log("Submodel clicked for ID:", id);
    getDataById(id);
    setModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Filter logic
  useEffect(() => {
    let filteredData = [...allDatasource];

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.firstName?.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedRole) {
      filteredData = filteredData.filter((item) => item.role === selectedRole);
    }

    setFilterList(filteredData);
  }, [searchQuery, selectedRole, allDatasource]);

  useEffect(() => {
    getData();
  }, []);

  const [imageUri, setImageUri] = useState();

  const [model, setModel] = useState({
    // DateofBirth: JSON.parse(JSON.stringify(new Date())),
    image: imageUri,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleActiveUser = (id) => {
    Get(`/auth/${id}`)
      .then((res) => {
        setUserActive(true);
        console.log("Fetched nanny data:", res?.data);
        setUser({ ...res?.data });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  const ActiveUser = () => {
    Put(
      "auth",
      {
        isActive: true,
      },
      user._id
    )
      .then((res) => {
        showToast("User Active Successfully", "success");
        setUserActive(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const DeActiveUser = () => {
    Put(
      "auth",
      {
        isActive: false,
      },
      user._id
    )
      .then((res) => {
        showToast("User Active Successfully", "success");
        setUserActive(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        UsermodalRef.current &&
        !UsermodalRef.current.contains(event.target)
      ) {
        setUserModal(false);
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

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown if clicked outside
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
      if (otpRef.current && !otpRef.current.contains(event.target)) {
        setOtpModel(false);
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

  const createUserOtp = () => {
    Post("auth/send-otp", model)
      .then((res) => {
        console.log("Full response:", res); // Log the entire response
        setOtpData({ ...res?.data });
        console.log("otp data:", otpData);
        setOtpModel(true);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message); // More detailed error logging
        showToast("Signup failed. Please try again.", "error");
      });
  };

  const createUser = () => {
    console.log(model);
    model.isActive = true;
    if (selected === true) {
      model.role = "user";
    } else {
      model.role = "nanny";
    }

    Post("auth/signup", model)
      .then((res) => {
        console.log("Response received:", res);
        console.log("Response data:", res.data);
        setOtpModel(false);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
        showToast("Signup failed. Please try again.", "error");
      });
  };

  const handleOtpComplete = (otp) => {
    console.log("OTP entered:", otp);
    model.otp = otp;
  };

  useEffect(() => {
    console.log("Updated otpData:", otpData);
  }, [otpData]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer as "mm:ss"
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  return (
    <section className="px-4">
      <div className="flex gap-4 justify-between py-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          className="w-[280px] h-[40px] bg-white border p-2 rounded-md outline-none"
          onChange={handleSearchChange}
        />

        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <select
            name="role"
            className="bg-transparent px-8 py-2 rounded-md border-gray-200 border text-gray-600 text-sm block w-full focus:outline-none"
            onChange={handleRoleChange}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="nanny">Nanny</option>
          </select>
          <div>
            <button onClick={() => setUserModal(true)}>
              <MdPersonAdd size={28} color="#dbcce0" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Table
          tableClass="overflow-y-scroll max-h-[420px] border w-full"
          tableHeaderClass="bg-fuchsia-700 w-full text-white sticky top-0 capitalize font-montserrat"
          datasource={filterList.length > 0 ? filterList : allDatasource}
          cols={AllRequestCol}
          loading={loading}
          loaderColor="text-fuchsia-700"
        />
      </div>

      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[45%] max-h-full rounded-md"
            ref={modalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <div className="absolute top-6 right-6">
                {isEdit ? (
                  <button>
                    <button
                      className="px-8 py-1 text-[16px] bg-red-500 text-white font-medium rounded-md  hover:bg-red-600"
                      onClick={save}
                    >
                      Save
                    </button>
                  </button>
                ) : (
                  <button
                    className="border border-red-500 rounded-md px-8 py-1 text-[16px] flex  font-semibold items-center"
                    onClick={handleEdit}
                  >
                    Edit <img src={edit} className="ps-4 h-[18px]" />
                  </button>
                )}
              </div>

              <div className="gap-4 grid grid-cols-12 ">
                <div className="col-span-4 flex justify-center items-center">
                  <FileUpload
                    disabled={isEdit ? false : true}
                    onChange={handleImageChange}
                    className="bg-transparent mt-2 mb-4 rounded-full border-gray-200 border h-[90px] w-[90px]
                     text-[#666666] text-sm flex justify-center items-start
                      focus:outline-none "
                  >
                    <img
                      src={upload || user?.image}
                      className="w-full h-full"
                    />
                  </FileUpload>
                </div>
                <div className="col-span-8 flex flex-col justify-center">
                  <span
                    //   className="flex justify-center items-center bg-green-500
                    // rounded-sm w-[95px] h-[30px] opacity-50 text-lime-950 font-semibold border-lime-950 border-2 my-2 text-md"
                    className="text-md font-semibold text-teal-700 italic font-lato"
                  >
                    Active--
                  </span>
                  <h4 className="text-sm font-medium font-lato">
                    <span>{user?.firstName}</span>
                    <span>{user?.lastName}</span>
                  </h4>
                  <h4 className="text-sm font-medium font-lato">
                    {user?.email}
                  </h4>
                </div>
              </div>
              <div className="gap-4 grid grid-cols-3">
                <div>
                  <span className="text-sm font-medium font-lato">
                    First Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.firstName}
                    onChange={(e) => fillModel("firstName", e.target.value)}
                    placeholder={user?.firstName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Last Name
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.lastName}
                    onChange={(e) => fillModel("lastName", e.target.value)}
                    placeholder={user?.lastName}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>

                {/* Service Type */}
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Service Type
                  </span>
                  <select
                    name="serviceType"
                    disabled={isEdit ? false : true}
                    value={model.serviceType || ""}
                    onChange={(e) => fillModel("serviceType", e.target.value)}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Select Service Type</option>
                    <option value="part-time">Part Time</option>
                    <option value="full-time">Full Time</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </div>

                {/* Region */}
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Region
                  </span>
                  <select
                    name="region"
                    disabled={isEdit ? false : true}
                    value={model.region || ""}
                    onChange={(e) => fillModel("region", e.target.value)}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Select Region</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                  </select>
                </div>

                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Zip Code
                  </span>
                  <InputField
                    disabled={isEdit ? false : true}
                    type="text"
                    value={model.zipCode}
                    onChange={(e) => fillModel("zipCode", e.target.value)}
                    placeholder={user?.zipCode}
                    inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
              </div>
              {user?.role === "nanny" && (
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Describtion
                  </span>
                  <TextArea
                    disabled={isEdit ? false : true}
                    value={model.parentJobDescription}
                    onChange={(e) =>
                      fillModel("parentJobDescription", e.target.value)
                    }
                    placeholder={user?.parentJobDescription || "message"}
                    rows={5}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
              )}
              {user?.role === "user" && (
                <div>
                  <span className="text-sm font-medium font-lato pb-2">
                    Describtion
                  </span>
                  <TextArea
                    disabled={isEdit ? false : true}
                    value={model.aboutYourself}
                    onChange={(e) => fillModel("aboutYourself", e.target.value)}
                    placeholder={user?.aboutYourself || "message"}
                    rows={5}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                  />
                </div>
              )}

              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-[-20px] right-[-20px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      {isUserModal && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full bg-slate-50 bg-opacity-5 backdrop-blur-lg"
        >
          <div
            className="p-4 w-full max-w-[70%] max-h-full rounded-md"
            ref={UsermodalRef}
          >
            <div className="bg-white px-8 rounded-md shadow-md border py-10 z-0 flex flex-col justify-center relative">
              <div className="mt-8">
                {selected === true ? (
                  <>
                    <div className="gap-x-4 grid grid-cols-3">
                      <div>
                        <span className="text-sm font-medium font-lato">
                          Profile Picture
                        </span>
                        <FileUpload
                          onChange={handleImageChange}
                          className="bg-transparent flex  items-center px-6 h-[38px] rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm
                w-full focus:outline-none"
                        >
                          <span className="text-[#ccc] font-medium">
                            upload
                          </span>
                        </FileUpload>
                      </div>
                      <div>
                        <span className="text-sm font-medium font-lato">
                          First Name
                        </span>
                        <InputField
                          type="text"
                          value={model.firstName}
                          onChange={(e) =>
                            fillModel("firstName", e.target.value)
                          }
                          placeholder="firstName"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Last Name
                        </span>
                        <InputField
                          type="text"
                          value={model.lastName}
                          onChange={(e) =>
                            fillModel("lastName", e.target.value)
                          }
                          placeholder="lastName"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato">
                          Email
                        </span>
                        <InputField
                          type="text"
                          value={model.email}
                          onChange={(e) => fillModel("email", e.target.value)}
                          placeholder="email"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      {/* Service Type */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Service Type
                        </span>
                        <select
                          name="serviceType"
                          value={model.serviceType || ""}
                          onChange={(e) =>
                            fillModel("serviceType", e.target.value)
                          }
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select Service Type</option>
                          <option value="part-time">Part Time</option>
                          <option value="full-time">Full Time</option>
                          <option value="occasional">Occasional</option>
                        </select>
                      </div>

                      {/* Region */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Region
                        </span>
                        <select
                          name="region"
                          value={model.region || ""}
                          onChange={(e) => fillModel("region", e.target.value)}
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select Region</option>
                          <option value="usa">USA</option>
                          <option value="canada">Canada</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Zip Code
                        </span>
                        <InputField
                          type="text"
                          value={model.zipCode}
                          onChange={(e) => fillModel("zipCode", e.target.value)}
                          placeholder="zipCode"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          password
                        </span>
                        <InputField
                          type="password"
                          value={model.password || ""}
                          onChange={(e) =>
                            fillModel("password", e.target.value)
                          }
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium font-lato pb-2">
                        Describtion
                      </span>
                      <TextArea
                        value={model.parentJobDescription}
                        onChange={(e) =>
                          fillModel("parentJobDescription", e.target.value)
                        }
                        placeholder={"message"}
                        rows={5}
                        className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                      />
                    </div>

                    <button
                      className="rounded-md border px-4 py-1 bg-gray-950/85  text-white w-[250px]"
                      onClick={createUserOtp}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <div className="gap-x-4 grid grid-cols-4">
                      <div>
                        <span className="text-sm font-medium font-lato">
                          Profile Picture
                        </span>
                        <FileUpload
                          onChange={handleImageChange}
                          className="bg-transparent flex  items-center px-6 h-[38px] rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm
                w-full focus:outline-none"
                        >
                          <span className="text-[#ccc] font-medium">
                            upload
                          </span>
                        </FileUpload>
                      </div>
                      <div>
                        <span className="text-sm font-medium font-lato">
                          First Name
                        </span>
                        <InputField
                          type="text"
                          value={model.firstName}
                          onChange={(e) =>
                            fillModel("firstName", e.target.value)
                          }
                          placeholder="firstName"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Last Name
                        </span>
                        <InputField
                          type="text"
                          value={model.lastName}
                          onChange={(e) =>
                            fillModel("lastName", e.target.value)
                          }
                          placeholder="lastName"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato">
                          Email
                        </span>
                        <InputField
                          type="text"
                          value={model.email}
                          onChange={(e) => fillModel("email", e.target.value)}
                          placeholder="email"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      {/* Service Type */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Service Type
                        </span>
                        <select
                          name="serviceType"
                          value={model.serviceType || ""}
                          onChange={(e) =>
                            fillModel("serviceType", e.target.value)
                          }
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select Service Type</option>
                          <option value="part-time">Part Time</option>
                          <option value="full-time">Full Time</option>
                          <option value="occasional">Occasional</option>
                        </select>
                      </div>

                      {/* Region */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Region
                        </span>
                        <select
                          name="region"
                          value={model.region || ""}
                          onChange={(e) => fillModel("region", e.target.value)}
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select Region</option>
                          <option value="usa">USA</option>
                          <option value="canada">Canada</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Zip Code
                        </span>
                        <InputField
                          type="text"
                          value={model.zipCode}
                          onChange={(e) => fillModel("zipCode", e.target.value)}
                          placeholder="zipCode"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          password
                        </span>
                        <InputField
                          type="password"
                          value={model.password || ""}
                          placeholder="password"
                          onChange={(e) =>
                            fillModel("password", e.target.value)
                          }
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      <div>
                        <span className="text-sm font-medium font-lato pb-2">
                          Budget
                        </span>
                        <InputField
                          type="text"
                          value={model.budget}
                          onChange={(e) => fillModel("budget", e.target.value)}
                          placeholder="budget"
                          inputClass="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                        />
                      </div>

                      {/* Language */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-3">
                          Language
                        </span>
                        <select
                          name="Language"
                          value={model.Language || ""}
                          onChange={(e) =>
                            fillModel("Language", e.target.value)
                          }
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select Language</option>
                          <option value="english">English</option>
                          <option value="spanish">Canada</option>
                        </select>
                      </div>

                      {/* child Age Group */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-3">
                          child Age Group
                        </span>
                        <select
                          name="childAgeGroup"
                          value={model.childAgeGroup || ""}
                          onChange={(e) =>
                            fillModel("childAgeGroup", e.target.value)
                          }
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select child Age Group</option>
                          <option value="0-11">0-11m</option>
                          <option value="1-3">1-3yrs</option>
                          <option value="4-9">4-9yrs</option>
                          <option value="10+">10+yrs</option>
                        </select>
                      </div>

                      {/* experience */}
                      <div>
                        <span className="text-sm font-medium font-lato pb-3">
                          Experience
                        </span>
                        <select
                          name="experience"
                          value={model.experience || ""}
                          onChange={(e) =>
                            fillModel("experience", e.target.value)
                          }
                          className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                        >
                          <option value="">Select an experience</option>
                          <option value="infant">Infants (0-11 months)</option>
                          <option value="toddlers">Toddlers (1-3years)</option>
                          <option value="pre-school">
                            Preschoolers (4-9years)
                          </option>
                          <option value="grade-school">
                            Grade-schoolers (10-12years)
                          </option>
                          <option value="high-school">
                            High-schoolers (13-17 years)
                          </option>
                          <option value="adult">1-3yrs</option>
                        </select>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.isAIDcertificate}
                          onChange={(e) =>
                            fillModel("isAIDcertificate", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          AID certificate
                        </label>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.isCPRcertificate}
                          onChange={(e) =>
                            fillModel("isCPRcertificate", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          CPR certificate
                        </label>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.isDrivingLicense}
                          onChange={(e) =>
                            fillModel("isDrivingLicense", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          Driving License
                        </label>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.doHouseKeeping}
                          onChange={(e) =>
                            fillModel("doHouseKeeping", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          Do HouseKeeping
                        </label>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.careSpecialChild}
                          onChange={(e) =>
                            fillModel("careSpecialChild", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          care SpecialChild
                        </label>
                      </div>

                      <div className="flex items-center h-[40px] my-auto pt-2">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={model.isLiven}
                          onChange={(e) =>
                            fillModel("isLiven", e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium font-lato  text-gray-800"
                        >
                          Liven
                        </label>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium font-lato my-2">
                        Describtion
                      </span>
                      <TextArea
                        value={model.aboutYourself}
                        onChange={(e) =>
                          fillModel("aboutYourself", e.target.value)
                        }
                        placeholder={"message"}
                        rows={5}
                        className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] 
                border-gray-200 border text-gray-900 text-sm  block
                w-full focus:outline-none "
                      />
                    </div>

                    <button
                      className="rounded-md border px-4 py-1 bg-gray-950/85  text-white w-[250px]"
                      onClick={createUserOtp}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
              <div className="absolute top-2 w-[40%] left-[30%] right-[30%]">
                <div className="relative w-full mt-4 rounded-full border h-10 p-1 bg-[#ccc]">
                  <div className="relative w-full h-full flex items-center">
                    <div
                      onClick={() => setSelected(true)}
                      className={`${
                        selected === true
                          ? "rounded-full bg-fuchsia-800 "
                          : " bg-transparent "
                      } cursor-pointer w-full flex justify-center h-full text-white`}
                    >
                      <button>User</button>
                    </div>
                    <div
                      onClick={() => setSelected(false)}
                      className={`${
                        selected === false
                          ? "rounded-full bg-fuchsia-800 "
                          : " bg-transparent "
                      } cursor-pointer w-full flex justify-center h-full text-white`}
                    >
                      <button>Nanny</button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setUserModal(false)}
                className="absolute top-[-20px] right-[-20px]"
              >
                <Close />
              </button>
            </div>
          </div>
        </div>
      )}

      {isUserActive && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full "
        >
          <div
            className="p-4 w-full max-w-[350px] max-h-full rounded-md"
            ref={UserActiveRef}
          >
            <div className="bg-white px-8 rounded-md shadow-2xl border py-10 z-0 flex flex-col justify-center relative">
              <h3 className="text-md font-semibold">
                Do you want to update this user?
              </h3>
              <div className="flex my-2 gap-4">
                <button
                  className={`rounded-md text-center w-[110px] py-1 ${
                    user?.isActive === true ? "bg-red-500/85" : "bg-blue-500/85"
                  } text-white`}
                  onClick={user?.isActive === true ? DeActiveUser : ActiveUser}
                >
                  {user?.isActive === true ? "De-Active" : "Accept"}
                </button>
                <button
                  className={`rounded-md text-center w-[110px] py-1  text-white bg-gray-600/85`}
                  onClick={() => setUserActive(false)}
                >
                  cancel
                </button>
                <button
                  onClick={() => setUserActive(false)}
                  className="absolute top-[-20px] right-[-20px]"
                >
                  <Close />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {otpModel && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 flex justify-center items-start mt-2 w-full h-full "
        >
          <div
            className="p-4 w-full max-w-[450px] max-h-full rounded-md"
            ref={otpRef}
          >
            <div className="bg-white px-8 rounded-md shadow-2xl border py-10 z-0 flex flex-col justify-center relative">
              <div className="flex my-[25px] flex-col">
                <H6 className=" text-center py-1 capitalize h-full">
                  OTP Verification
                </H6>
                <Font2 className="text-sm text-[#666] text-center mb-4">
                  please enter otp {otpData.otp}
                </Font2>
                <div>
                  <OTPInput length={6} onComplete={handleOtpComplete} />
                  <p className="italic text-end text-sm pt-1">{formatTime()}</p>
                </div>
                <Button
                  className="rounded-md border px-4 py-1 bg-fuchsia-950/85  text-white w-full"
                  onClick={createUser}
                >
                  confirm
                </Button>
              </div>
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
    </section>
  );
}
