import React from "react";

export default function FileUpload(props) {
  const { onChange, value, className, disabled, children } = props;

  const handleFileChange = (e) => {
    if (onChange) {
      onChange(e); // Pass the entire event so the parent can access `e.target.files`
    }
  };

  return (
    <>
      <label
        htmlFor="uploadFile1" // Use `htmlFor` instead of `for` in React
        className={
          className
            ? className
            : `bg-transparent px-6 py-4 rounded-full border-gray-300 border
                 text-[#666666] text-sm  block w-full dark:placeholder-gray-400 dark:text-white text-center
                  focus:outline-none`
        }
      >
        {children ? (
          children
        ) : (
          <>
            <span className="text-[#FF6F61] md:font-extrabold font-bold">Add file </span>
            <span>or drop files here</span>
          </>
        )}
        <input
          type="file"
          id="uploadFile1"
          className="hidden"
          disabled={disabled}
          onChange={handleFileChange} // Attach the onChange handler
          value={value} // Optional, depends on your use case
        />
      </label>
    </>
  );
}
