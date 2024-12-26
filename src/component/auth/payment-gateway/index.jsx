import React, { useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { useNavigate } from "react-router-dom";

export default function PaymentGateway() {
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    // Validate card number length and CVC (basic validation)
    if (cardNumber.length < 16 || cvc.length < 3) {
      alert("Please enter a valid card number and CVC.");
      return;
    }

    // Display the alert to ask for CVC
    alert("Please enter the CVC code for your card.");

    // After the user acknowledges the alert, navigate to the dashboard
    navigate("/welcome-dashboard");
  };

  return (
    <div
      className="py-[50px]  h-[100dvh]"
      style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
    >
      <div className="container mx-auto">
        <form
          className="max-w-2xl mx-auto bg-white rounded-[25px] py-[50px] px-[25px] border shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            {/* First Name & Last Name Fields */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-3 my-1 font-lato px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-3 my-1 font-lato px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group bg-white rounded-[25px]">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-3 my-1 font-lato px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          {/* Card Number Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="card_number"
              //   id="card_number"
              className="block py-3 my-1 font-lato px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <label
              htmlFor="card_number"
              className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Card Number
            </label>
          </div>

          {/* CVC Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="cvc"
              //   id="cvc"
              className="block py-3 my-1 font-lato px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
            />
            <label
              htmlFor="cvc"
              className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              CVC
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-gray-950 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg w-full sm:w-auto px-[45px] py-2 my-1 font-lato text-center "
            onClick={() => navigate("/welcome-dashboard")}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}
