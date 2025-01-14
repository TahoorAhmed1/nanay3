import React, { useEffect, useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Get, Post } from "../../../config/api-method";
import Toast from "@/component/common/toast";
import { add } from "../../../redux/reducers/userSlice";

function Packages() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, []);

  const [payment, setPayment] = useState({ isOpen: false, data: {} });
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const [packages, setPackages] = useState([]);
  const getData = () => {
    Get("/package")
      .then((res) => {
        if (res?.data) {
          setPackages(res?.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const buySubscrption = async (e) => {
    e.preventDefault();
    if (!user?._id) return;
    try {
      let res = await Post(`/subscription`, {
        userId: user?._id,
        packageId: payment?.data?._id,
      });
      if (res?.user) {
        dispatch(add(res?.user));
        showToast("Plan buy successfully!", "success");
        if (res?.user?.role == "user") {
          navigate("/dashboard/for-family");
        } else if (res?.user?.role == "nanny") {
          navigate("/dashboard/for-nanny");
        }
      }
    } catch (error) {
      console.log("error", error);
      showToast(error?.message, "error");
    } finally {
      setTimeout(() => {
        getData();
        setPayment({ isOpen: false, data: {} });
      }, 1000);
    }
  };

  return (
    <div
      className="py-[30px] md:py-[50px] lg:py-[100px] h-[100dvh]"
      style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
    >
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <div className="container px-2 mx-auto">
        <div className="flex justify-end w-full text-2xl mb-14 underline font-semibold text-red-700">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/auth/sign-in");
            }}
          >
            Logout
          </button>
        </div>
        <div className={`grid lg:grid-cols-2  2xl:grid-cols-3 gap-6`}>
          {packages.map(({ name, price, detail, _id }, index) => {
            console.log("user", user, _id);
            return (
              <div
                className={`rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white hover:border-red-700 border ${
                  user?.selectPackage?.package_id === _id && "border-orange-600"
                }`}
                onClick={() =>
                  !user?.selectPackage?._id
                    ? setPayment({
                        isOpen: true,
                        data: { name, price, detail, _id },
                      })
                    : navigate(
                        `/dashboard/${
                          user?.role == "user" ? "for-family" : "for-nanny"
                        }`
                      )
                }
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-bold text-slate-900">
                    {index + 1}. {name}{" "}
                    <span className="text-lg capitalize font-semibold text-orange-600">
                      {user?.selectPackage?.package_id === _id &&
                        "(current plan)"}
                    </span>
                  </h2>
                  <p className="pt-[20px] relative">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ${price}
                    </span>

                    <span className="text-sm font-medium text-slate-500">
                      {/* /month or */}${price}/year
                    </span>
                  </p>
                  <h2 className="text-lg leading-6 font-bold text-slate-900 pt-4">
                    Feature:
                  </h2>
                </div>
                <div className="pt-8 pb-12 px-6">
                  <ul role="list" className="mt-4 space-y-3">
                    {detail?.map((text) => {
                      return (
                        <li className="flex space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 h-5 w-5 text-red-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M5 12l5 5l10 -10"></path>
                          </svg>
                          <span className="text-md text-slate-700">{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* <div
            className="rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white  hover:border-red-700 border"
            onClick={() => navigate("/payment-gateway")}
          >
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-bold text-slate-900">
                2. Plus Plan
              </h2>
              <p className="pt-[20px] relative">
                <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                  $30
                </span>

                <span className="text-sm font-medium text-slate-500">
                  /month or $27/quarterly or $25/year
                </span>

                <span className="text-lg font-bold text-red-400 tracking-tighter absolute right-0 top-0 ">
                  10%
                </span>
              </p>
              <h2 className="text-lg leading-6 font-bold text-slate-900 pt-4">
                Feature:
              </h2>
            </div>
            <div className="pt-8 pb-12 px-6">
              <ul role="list" className="mt-4 space-y-3">
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Access to basic nanny profiles, including name, location,
                    and availability.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Ability to view basic contact information (email only).
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Up to 3 bookings per month.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Standard customer support via email (response within 48
                    hours).
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Access to limited content such as articles, tips, and basic
                    FAQs.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Option to leave reviews and ratings for nannies.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    No featured a or priority placement.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white  hover:border-red-700 border"
            onClick={() => navigate("/payment-gateway")}
          >
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-bold text-slate-900">
                3. Premium Plan
              </h2>
              <p className="pt-[20px] relative">
                <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                  $60
                </span>

                <span className="text-sm font-medium text-slate-500">
                  {" "}
                  /month or $54/quarterly or $50/year
                </span>

                <span className="text-lg font-bold text-red-400 tracking-tighter absolute right-0 top-0 ">
                  17%
                </span>
              </p>
              <h2 className="text-lg leading-6 font-bold text-slate-900 pt-4">
                Feature:
              </h2>
            </div>
            <div className="pt-8 pb-12 px-6">
              <ul role="list" className="mt-4 space-y-3">
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    All features of the Plus Plan.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    24/7 dedicated customer support via phone, email, and live
                    chat.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Advanced nanny matching assistance: one-on-one consultation
                    with a dedicated nanny consultant.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Option to post job listings visible only to Premium members.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Featured profile placement for increased visibility to top
                    nannies.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Enhanced booking options, including emergency or last-minute
                    booking support.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    Access to nanny certification and training resources at no
                    additional cost.
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 h-5 w-5 text-red-400"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-md text-slate-700">
                    10% discount on additional services and bookings for special
                    events or seasonal requirements (e.g., holiday nannies,
                    travel support).
                  </span>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>

      {payment.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold text-gray-800">Confirm Payment</h2>
            <p className="mt-4 text-gray-600">
              Are you sure you want to proceed with this payment?
            </p>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setPayment({ isOpen: false, data: {} })}
              >
                Decline
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-[#eb8465] rounded-lg hover:bg-[#eb8465]/70 "
                onClick={buySubscrption}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;

// {user?.role == "user" && (
//           <div
//             className="rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white hover:border-red-700 border"
//             onClick={() => navigate("/dashboard/for-family")}
//           >
//             <div className="p-6">
//               <h2 className="text-2xl leading-6 font-bold text-slate-900">
//                 1. Free Membership
//               </h2>
//               <p className="text-sm mt-2 ">(Current Plan)</p>
//               <p className="pt-[20px] relative">
//                 <span className="text-4xl font-bold text-slate-900 tracking-tighter">
//                   $0
//                 </span>

//                 <span className="text-sm font-medium text-slate-500">
//                   /month or $0/year
//                 </span>

//                 {/* <span className="text-lg font-bold text-red-400 tracking-tighter absolute right-0 top-0 ">
//                 $20
//               </span> */}
//               </p>
//               <h2 className="text-lg leading-6 font-bold text-slate-900 pt-4">
//                 Feature:
//               </h2>
//             </div>
//             <div className="pt-8 pb-12 px-6">
//               <ul role="list" className="mt-4 space-y-3">
//                 <li className="flex space-x-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="flex-shrink-0 h-5 w-5 text-red-400"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     stroke-width="2"
//                     stroke="currentColor"
//                     fill="none"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M5 12l5 5l10 -10"></path>
//                   </svg>
//                   <span className="text-md text-slate-700">
//                     Priority email support with response within 24 hours.
//                   </span>
//                 </li>
//                 <li className="flex space-x-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="flex-shrink-0 h-5 w-5 text-red-400"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     stroke-width="2"
//                     stroke="currentColor"
//                     fill="none"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M5 12l5 5l10 -10"></path>
//                   </svg>
//                   <span className="text-md text-slate-700">
//                     Access to premium content, including interview guides and
//                     detailed background check reports.
//                   </span>
//                 </li>
//                 <li className="flex space-x-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="flex-shrink-0 h-5 w-5 text-red-400"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     stroke-width="2"
//                     stroke="currentColor"
//                     fill="none"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     aria-hidden="true"
//                   >
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M5 12l5 5l10 -10"></path>
//                   </svg>
//                   <span className="text-md text-slate-700">
//                     Profile visibility for nannies (nannies can see which
//                     parents have viewed their profiles).
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         )}
