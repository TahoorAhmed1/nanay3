import React, { useEffect } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Packages() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, []);
  return (
    <div
      className="py-[30px] md:py-[50px] lg:py-[100px] h-[100dvh]"
      style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
    >
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
        <div
          className={`grid lg:grid-cols-2 ${
            user?.role == "user" ? "2xl:grid-cols-4" : "2xl:grid-cols-3"
          } gap-6`}
        >
          {user?.role == "user" && (
            <div
              className="rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white hover:border-red-700 border"
              onClick={() => navigate("/dashboard/for-family")}
            >
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-bold text-slate-900">
                  1. Free Membership
                </h2>
                <p className="text-sm mt-2 ">(Current Plan)</p>
                <p className="pt-[20px] relative">
                  <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                    $0
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    /month or $0/year
                  </span>

                  {/* <span className="text-lg font-bold text-red-400 tracking-tighter absolute right-0 top-0 ">
                  $20
                </span> */}
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
                      Priority email support with response within 24 hours.
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
                      Access to premium content, including interview guides and
                      detailed background check reports.
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
                      Profile visibility for nannies (nannies can see which
                      parents have viewed their profiles).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div
            className="rounded-lg shadow-lg divide-y-2 divide-slate-200 bg-white hover:border-red-700 border"
            onClick={() => navigate("/payment-gateway")}
          >
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-bold text-slate-900">
                1. Basic
              </h2>
              <p className="pt-[20px] relative">
                <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                  $10
                </span>

                <span className="text-sm font-medium text-slate-500">
                  /month or $120/year
                </span>

                {/* <span className="text-lg font-bold text-red-400 tracking-tighter absolute right-0 top-0 ">
                  $20
                </span> */}
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
                    All features of the Basic Plan.
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
                    Unlimited bookings.
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
                    Full access to nanny profiles, including ratings, reviews,
                    and detailed contact information (phone, email).
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
                    Priority email support with response within 24 hours.
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
                    Access to premium content, including interview guides and
                    detailed background check reports.
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
                    Profile visibility for nannies (nannies can see which
                    parents have viewed their profiles).
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
