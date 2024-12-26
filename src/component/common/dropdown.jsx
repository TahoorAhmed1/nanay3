import React, { useState } from 'react';
import { Font2 } from '@/config/typography';

export default function Dropdown({ label, options, value, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onChange(option.value);  // Send selected value back to parent
        setIsOpen(false);        // Close dropdown after selection
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='relative w-full mt-4'>
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="bg-transparent mb-4 px-0 py-3 border-gray-300 border-b text-gray-900 text-sm block w-full placeholder-gray-400 focus:outline-none"
                    type="button"
                >
                    {/* Display selected value */}
                    <input value={value ? options.find(opt => opt.value === value)?.label : ''} placeholder={placeholder} readOnly className='focus:outline-none' />
                    <svg
                        className={`w-3.5 h-3.5 absolute top-[25%] text-black right-[5%] ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {/* Label above the dropdown */}
                <div className='absolute left-[2%] top-[-20px] bg-white px-1 capitalize'>
                    <Font2>{label}</Font2>
                </div>
            </div>
            {/* Dropdown menu */}
            <div id="dropdown" className={`z-10 ${isOpen ? 'block' : 'hidden'} w-full mx-auto`}>
                <ul aria-labelledby="dropdownDefaultButton">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className='mb-3 px-6 py-4 rounded-full border-gray-300 border text-gray-900 text-sm w-full hover:border-red-300'
                            onClick={() => handleSelect(option)} // Call handleSelect with clicked option
                        >
                            <a href="#" className="">{option.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
