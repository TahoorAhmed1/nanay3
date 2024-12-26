import React, { useRef, useState, useEffect } from "react";

const OTPInput = ({ length = 6, otp, onComplete }) => {
  const inputRef = useRef(Array(length).fill(null));

  // Initialize OTP state from prop if it's provided, otherwise default to empty values
  const [OTP, setOTP] = useState(Array(length).fill(""));

  useEffect(() => {
    // Update OTP state when otp prop changes (useEffect runs on prop change)
    if (otp && otp.length === length) {
      setOTP(otp.split("")); // Split the OTP string into individual digits for each input
    }
  }, [otp, length]);

  const handleTextChange = (input, index) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // Automatically focus next input after entering a digit
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    // Automatically focus previous input if current one is cleared
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // Call onComplete when OTP is fully entered
    if (newPin.every((digit) => digit !== "")) {
      onComplete(newPin.join(""));
      console.log("OTP Complete:", newPin.join("")); // For debugging
    }
  };

  return (
    <div className="flex">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref)}
          style={{
            flex: `0 0 14.66%`,
            background: "transparent",
            borderRadius: `6px`,
            height: "45px",
            width: "100%",
            border: `0.5px solid #ccc`,
            padding: "5px 15px",
            marginRight: index === length - 1 ? "0" : "2.5%",
            outline: "none",
            textAlign: "center",
          }}
          placeholder="-"
        />
      ))}
    </div>
  );
};

export default OTPInput;
