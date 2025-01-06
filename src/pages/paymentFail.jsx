// PaymentFail.jsx
import React from "react";

const PaymentFail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center bg-white p-8 rounded shadow-lg">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => window.location.href = "/retry"}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
