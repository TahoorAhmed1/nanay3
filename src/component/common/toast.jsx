import React from 'react'

const toastTypes = {
    success: {
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        message: 'Action was successful!',
    },
    error: {
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        message: 'An error occurred!',
    },
    info: {
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        message: 'This is an info message.',
    },
    warning: {
        iconColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        message: 'This is a warning message.',
    },
};

export default function Toast({ message, type, isVisible, onClose }) {
    if (!isVisible) return null;

    const { iconColor, bgColor, textColor } = toastTypes[type] || toastTypes.success;

    

    return (
        <div className={`absolute z-50 mx-auto top-[15px] md:left-[35%] md:right-[35%] left-7 right-10 flex items-center w-full max-w-xs p-4 mb-4 ${textColor} ${bgColor} rounded-lg shadow`} role="alert">
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor} ${bgColor} rounded-lg`}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
            </div>
            <div className="ms-3 text-sm font-normal">{message || toastTypes[type].message}</div>
            <button type="button" className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100`} onClick={onClose} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    );
}
