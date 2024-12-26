import React, { Children } from "react";

export default function Button(props) {
  const { text, onClick, className, children, disabled } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        className
          ? className
          : `w-[95%] rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold`
      }
    >
      {text}
      {children}
    </button>
  );
}
