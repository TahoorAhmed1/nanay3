import React, { useState } from "react";
import Toast from "@/component/common/toast";
import { Post } from "@/config/api-method";
import { useDispatch } from "react-redux";
import { add } from "@/redux/reducers/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import TextArea from "@/component/common/textarea";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepBookNanny, setStepBookNanny] = useState(1);
  const [step, setStep] = useState(true);
  const [stepRegsteredNanny, setStepRegsteredNanny] = useState(1);
  const [stepAccountQuestion, setStepAccountQuestion] = useState(1);
  const [stepHelpQuestion, setStepHelpQuestion] = useState(1);
  const [request, setRequest] = useState({});
  const [userChoice, setUserChoice] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    parentId: userData._id,
    location: "",
    childrenCount: "",
    childrenAges: [],
    message: "",
    budget: "",
    status: "pending",
    schedule: "", // Single string that will contain combined days and timing, like "Monday Wednesday Friday Evening (4 PM - 8 PM)"
    timing: "", // Timing selected from dropdown
    selectedDays: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const fillModel = (key, val) => {
    request[key] = val;
    setRequest({ ...request });
  };
  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const validate = () => {
    let validationErrors = {};

    if (
      stepHelpQuestion === 2 &&
      (!request.message || !request.message.trim())
    ) {
      validationErrors.message = "Message is required.";
    }

    // Existing validation logic
    switch (stepBookNanny) {
      case 2:
        if (!formData.location.trim())
          validationErrors.location = "Location is required.";
        break;
      case 3:
        if (
          !formData.childrenCount ||
          isNaN(formData.childrenCount) ||
          formData.childrenCount <= 0
        )
          validationErrors.childrenCount =
            "Please enter a valid number of children.";
        break;
      case 4:
        if (
          !formData.childrenAges.length ||
          formData.childrenAges.some((age) => isNaN(age) || age <= 0)
        )
          validationErrors.childrenAges =
            "Please enter valid ages for each child.";
        break;
      case 5:
        if (!formData.schedule.trim())
          validationErrors.schedule = "Schedule is required.";
        break;
      case 6:
        if (!formData.budget.trim())
          validationErrors.budget = "Budget is required.";
        break;
      default:
        break;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleHelp = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        console.log("Request submitted:", request);
        showToast("Request submitted", "success");
        setLoading(false);
        setIsOpen(false);
        resetChatbotState();
      }, 3000);
    }
  };

  const handleOptionSelect = (value) => {
    if (step === true) {
      setUserChoice(value);
      if (value === "I'm looking for a nanny.") {
        setStep(false);
        setStepRegsteredNanny(null);
        setStepAccountQuestion(null);
        setStepBookNanny(2);
      } else if (value === "I want to register as a nanny.") {
        setStep(false);
        setStepBookNanny(null);
        setStepRegsteredNanny(2);
      } else if (value === "I have questions about my account.") {
        setStep(false);
        setStepBookNanny(null);
        setStepAccountQuestion(2);
      } else {
        setStep(false);
        // setStepBookNanny(16);
        setStepBookNanny(null);
        setStepHelpQuestion(2);
      }
    }
  };

  const nextStepBookNanny = () => {
    if (validate()) {
      setErrors({});
      setLoading(true); // Show loading indicator

      // Simulate a 2-second delay before continuing
      setTimeout(() => {
        if (stepBookNanny === 7) {
          newBooking(stepBookNanny === 7);
          setIsOpen(false);
          resetChatbotState();
        } else {
          setStepBookNanny((prevStepBookNanny) => prevStepBookNanny + 1);
        }
        setLoading(false); // Hide loading indicator after 2 seconds
      }, 2000);
    }
  };

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };

  const newBooking = () => {
    formData.message = "hello";
    formData.status = "pending";

    setLoading(true); // Show loading indicator

    Post("booking", formData)
      .then((res) => {
        setLoading(false); // Hide loading indicator
        setStepBookNanny(0);
        if (res?.data) {
          showToast("Booking is Success", "success");
          setIsOpen(false);
          setStepBookNanny(0);
        } else {
          showToast("Unexpected response format.", "error");
        }
      })
      .catch((err) => {
        setLoading(false); // Hide loading indicator
        showToast("Login failed. Please check your credentials.", "error");
      });
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    // Check if the timing is selected
    if (!formData.timing) {
      alert("Please select a timing first.");
      return;
    }

    // Toggle day selection
    let updatedDays = [...formData.selectedDays];
    if (updatedDays.includes(day)) {
      // Remove the day if it's already selected
      updatedDays = updatedDays.filter((item) => item !== day);
    } else {
      // Add the day if it's not selected
      updatedDays.push(day);
    }

    // Update the selectedDays array
    setFormData({
      ...formData,
      selectedDays: updatedDays,
    });
  };

  // Handle timing selection
  const handleTimingSelection = (e) => {
    const selectedTiming = e.target.value;

    // Update the timing in formData
    setFormData({ ...formData, timing: selectedTiming });
  };

  // Generate the schedule string
  const generateSchedule = () => {
    if (formData.selectedDays.length === 0 || !formData.timing) {
      return "";
    }

    // Create the schedule string: "Monday Wednesday Friday Evening (4 PM - 8 PM)"
    return `${formData.selectedDays.join(" ")} ${formData.timing}`;
  };

  // Use the generated schedule
  const schedule = generateSchedule();

  formData.schedule = schedule;

  const resetChatbotState = () => {
    setStep(true);
    setStepBookNanny(1);
    setStepRegsteredNanny(1);
    setStepAccountQuestion(1);
    setStepHelpQuestion(1);
    setRequest({});
    setFormData({
      parentId: userData._id,
      location: "",
      childrenCount: "",
      childrenAges: [],
      message: "",
      budget: "",
      status: "pending",
      schedule: "",
      timing: "",
      selectedDays: [],
    });
    setErrors({});
    setUserChoice(null);
  };

  return (
    <>
      <button
        onClick={toggleChatBox}
        className="fixed md:bottom-4 md:right-4 bottom-14 right-2   inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-red-500 hover:bg-gray-700 text-white"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed md:bottom-[calc(4rem+1.5rem)] bottom-0 right-0 md:mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[380px] h-[450px]">
          <div className="flex flex-col space-y-1.5 pb-6 relative">
            <h2 className="font-semibold text-lg tracking-tight">
              TopNannySitter Chatbot
            </h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Your virtual assistant for nanny services.
            </p>
          </div>

          <div className="pr-4 py-4 overflow-y-auto">
            <div className="flex flex-col space-y-3">
              {step === true && !loading && (
                <p>
                  Bot: Welcome to TopNannySitter.com! How can I assist you
                  today?
                </p>
              )}
              {stepBookNanny === 2 && !loading && (
                <p>
                  Bot: Great! To help find the perfect nanny, please tell me
                  your location.
                </p>
              )}
              {stepBookNanny === 3 && !loading && (
                <p>Bot: How many children do you need care for?</p>
              )}
              {stepBookNanny === 4 && !loading && (
                <p>Bot: Please provide the ages of each child.</p>
              )}
              {stepBookNanny === 5 && !loading && (
                <p>Bot: When do you need the nanny? (e.g., 'Monday 9am-5pm')</p>
              )}
              {stepBookNanny === 6 && !loading && (
                <p>Bot: What is your budget for this service?</p>
              )}
              {stepBookNanny === 7 && !loading && (
                <p>
                  Bot: Thank you! I’ll show you a list of available nannies in
                  your area. You can also email us at{" "}
                  <a
                    href="mailto: info@topnannysitter.com"
                    className="underline font-bold"
                  >
                    info@topnannysitter.com
                  </a>
                  for personalized assistance
                </p>
              )}
              {loading &&
                (stepHelpQuestion === 2 ? null : (
                  <img
                    src="https://media.tenor.com/cnb4G0hjQmwAAAAC/writing-loading.gif"
                    className="w-[30px] mx-auto"
                  />
                ))}
            </div>
          </div>

          <div className="flex items-center pt-0">
            <div className="flex flex-col space-y-2 w-full">
              {stepBookNanny === 1 && !loading && (
                <>
                  <button
                    onClick={() =>
                      handleOptionSelect("I'm looking for a nanny.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I'm looking for a nanny.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I want to register as a nanny.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I want to register as a nanny.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I have questions about my account.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I have questions about my account.
                  </button>
                  <button
                    onClick={() =>
                      handleOptionSelect("I need help with something else.")
                    }
                    className="bg-gray-200 rounded-md p-2"
                  >
                    I need help with something else.
                  </button>
                </>
              )}
              {stepBookNanny === 2 && !loading && (
                <div className="flex flex-col">
                  <button
                    className="bg-gray-200 rounded-md p-2 w-12/12 mb-2 border focus:border-red-400 hover:border-red-400"
                    onClick={() =>
                      setFormData({ ...formData, location: "usa" })
                    }
                  >
                    usa
                  </button>
                  <button
                    className="bg-gray-200 rounded-md p-2 w-12/12 mb-2 border focus:border-red-400 hover:border-red-400"
                    onClick={() =>
                      setFormData({ ...formData, location: "canada" })
                    }
                  >
                    canada
                  </button>
                  {errors.location && (
                    <p className="text-red-500">{errors.location}</p>
                  )}
                </div>
              )}
              {stepBookNanny === 3 && !loading && (
                <div>
                  <input
                    type="number"
                    placeholder="Number of children"
                    value={formData.childrenCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        childrenCount: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.childrenCount && (
                    <p className="text-red-500">{errors.childrenCount}</p>
                  )}
                </div>
              )}
              {stepBookNanny === 4 && !loading && (
                <div className="max-h-[150px] overflow-y-scroll pe-2">
                  {errors.childrenAges && (
                    <p className="text-red-500">{errors.childrenAges}</p>
                  )}
                  {Array.from({ length: formData.childrenCount }, (_, i) => (
                    <input
                      key={i}
                      type="number"
                      placeholder={`Age of child ${i + 1}`}
                      onChange={(e) => {
                        const ages = [...formData.childrenAges];
                        ages[i] = e.target.value;
                        setFormData({ ...formData, childrenAges: ages });
                      }}
                      className="flex h-10 w-full mb-2 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                    />
                  ))}
                </div>
              )}
              {stepBookNanny === 5 && !loading && (
                <div>
                  {/* Day Selection Buttons */}
                  <div className="flex flex-wrap gap-1 mb-1">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <span
                        key={index}
                        onClick={() => handleDaySelection(day)}
                        className={`py-1 px-3 border rounded-full text-gray-700 cursor-pointer text-sm ${
                          formData.selectedDays.includes(day)
                            ? "border-red-600 text-red-800"
                            : ""
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Timing Selection Dropdown */}
                  <select
                    value={formData.timing}
                    onChange={handleTimingSelection}
                    className="bg-transparent mt-0 mb-3 px-6 py-2 rounded-[5px] border-gray-200 border text-gray-900 text-sm block w-full focus:outline-none"
                  >
                    <option value="">Select Timing</option>
                    <option value="Morning (8 AM - 12 PM)">
                      Morning (8 AM - 12 PM)
                    </option>
                    <option value="Afternoon (12 PM - 4 PM)">
                      Afternoon (12 PM - 4 PM)
                    </option>
                    <option value="Evening (4 PM - 8 PM)">
                      Evening (4 PM - 8 PM)
                    </option>
                    <option value="Night (8 PM - 12 AM)">
                      Night (8 PM - 12 AM)
                    </option>
                  </select>

                  {/* Display the current schedule */}
                  <div>
                    <h3 className="text-sm font-semibold">
                      Selected Schedule:
                    </h3>
                    <p className="text-sm">
                      {schedule ? schedule : "No schedule selected"}
                    </p>
                  </div>
                  {/* <input
                    type="text"
                    placeholder="Schedule (e.g., 'Monday 9am-5pm')"
                    value={formData.schedule}
                    onChange={(e) =>
                      setFormData({ ...formData, schedule: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  /> */}
                  {errors.schedule && (
                    <p className="text-red-500">{errors.schedule}</p>
                  )}
                </div>
              )}
              {stepBookNanny === 6 && !loading && (
                <div>
                  <input
                    type="text"
                    placeholder="Your budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm"
                  />
                  {errors.budget && (
                    <p className="text-red-500">{errors.budget}</p>
                  )}
                </div>
              )}

              {/* Registered as Nanny */}
              {stepRegsteredNanny === 2 && !loading && (
                <div className="flex flex-col">
                  <p>
                    Bot: We're excited to have you on board! To get started, can
                    you tell me if you already have an account with us?
                  </p>
                  <button
                    className="bg-gray-200 rounded-md p-2 w-12/12 mb-2 border focus:border-red-400 hover:border-red-400"
                    onClick={() => setStepRegsteredNanny(3)}
                  >
                    Yes, I have an account
                  </button>
                  <button
                    className="bg-gray-200 rounded-md p-2 w-12/12 mb-2 border focus:border-red-400 hover:border-red-400"
                    onClick={() => setStepRegsteredNanny(4)}
                  >
                    No, I need to create an account.
                  </button>
                  {errors.location && (
                    <p className="text-red-500">{errors.location}</p>
                  )}
                </div>
              )}
              {stepRegsteredNanny === 3 && !loading && (
                <div className="flex flex-col">
                  <p>
                    Please log in using our secure
                    <span className="font-semibold">login page.</span>
                  </p>
                  <button
                    className="bg-gray-950 rounded-md p-2 w-12/12 mb-2 border focus:bg-gray-900 hover:bg-gray-900 text-white mt-2"
                    onClick={() => navigate("/auth/sign-in")}
                  >
                    Yes, I have an account
                  </button>
                </div>
              )}
              {stepRegsteredNanny === 4 && !loading && (
                <div className="flex flex-col">
                  <p>
                    You can register directly on our website or email us at
                    <a
                      href="mailto:info@topnannysitter.com"
                      onClick={resetChatbotState}
                      className="underline font-bold"
                    >
                      info@topnannysitter.com
                    </a>
                    for assistance.
                  </p>
                  <button
                    className="bg-gray-950 rounded-md p-2 w-12/12 mb-2 border focus:bg-gray-900 hover:bg-gray-900 text-white mt-2"
                    onClick={() => navigate("/auth/sign-up")}
                  >
                    Yes, I have an account
                  </button>
                </div>
              )}

              {/* Account Question */}
              {stepAccountQuestion === 2 && !loading && (
                <div className="flex flex-col">
                  <p>
                    Bot: I’m here to help! What issue are you experiencing with
                    your account?
                  </p>
                  <button
                    className="bg-gray-950 rounded-md p-2 w-12/12 mb-1 border focus:bg-gray-900 hover:bg-gray-900 text-white mt-2"
                    // onClick={() => navigate("/auth/sign-up")}
                  >
                    I forgot my password.
                  </button>
                  <button
                    className="bg-gray-950 rounded-md p-2 w-12/12 mb-1 border focus:bg-gray-900 hover:bg-gray-900 text-white mt-2"
                    // onClick={() => navigate("/auth/sign-up")}
                  >
                    I want to update my account details.
                  </button>
                  <button
                    className="bg-gray-950 rounded-md p-2 w-12/12 mb-1 border focus:bg-gray-900 hover:bg-gray-900 text-white mt-2"
                    onClick={() => setStepAccountQuestion(3)}
                  >
                    Other issues.
                  </button>
                </div>
              )}
              {stepAccountQuestion === 3 && !loading && (
                <div className="flex flex-col">
                  <p>
                    Bot: Provide specific guidance for each issue and the option
                    to contact via email if the problem persists.
                  </p>
                  <a
                    className="text-center bg-red-700 rounded-md p-2 w-12/12 mb-1 border focus:bg-red-500 hover:bg-red-500 text-white mt-2"
                    href="mailto:info@topnannysitter.com"
                    onClick={resetChatbotState}
                  >
                    <span className="font-semibold">Support:</span>{" "}
                    info@topnannysitter.com
                  </a>
                </div>
              )}

              {/* Help Question */}
              {stepHelpQuestion === 2 && (
                <div className="flex flex-col">
                  <p>
                    Bot: I'm here to assist! Please describe your issue, and
                    I'll do my best to help you.
                  </p>
                  <div className="mb-3 mt-6">
                    <textarea
                      disabled={loading ? true : false}
                      type="text"
                      placeholder="Enter your message here..."
                      value={request.message || ""}
                      onChange={(e) => fillModel("message", e.target.value)}
                      rows={5}
                      className="flex w-full border rounded-md px-3 py-2 text-sm"
                    />
                    {/* Show error message */}
                    {errors.message && (
                      <p className="text-red-500">{errors.message}</p>
                    )}
                  </div>
                  <button
                    className={`bg-gray-950 rounded-md p-2 w-full border text-white mt-2 ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-900 focus:bg-gray-900"
                    }`}
                    onClick={handleHelp}
                    disabled={loading} // Disable the button during loading
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              )}

              {stepBookNanny == 1 ||
              stepRegsteredNanny ||
              stepAccountQuestion ? null : (
                <button
                  onClick={nextStepBookNanny}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
                  disabled={loading} // Disable the button when loading
                >
                  {stepBookNanny === 7 ? "Submit" : "Next"}
                </button>
              )}
            </div>
          </div>

          <div className="absolute top-[-45px] right-[-3px] bg-gray-950 rounded-full p-2">
            <CgClose
              size={24}
              color="#fff"
              onClick={() => {
                setIsOpen(false);
              }}
            />
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
