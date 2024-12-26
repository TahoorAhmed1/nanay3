import React, { useState, useEffect } from 'react';
import { H1, H5, Font2 } from '@/config/typography'

export default function Faq({ data, list }) {
    const [openAccordion, setOpenAccordion] = useState(null);


    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };


    return (
            <div className="container mx-auto px-5 ">
                <div className="md:mb-12 mb-6">
                    <H1 className="font-creato md:mb-6 mb-3 text-center capitalize" >{data.title}</H1>
                </div>
                <div className="mx-auto max-w-7xl  ">

                    <div className="accordion-group" data-accordion="default-accordion">
                        {list.map((item, index) => (
                            <div
                                key={index}
                                className={`accordion border-b border-solid border-gray-700 p-2  transition duration-500 md:mb-8 mb-4 md:p-4`}
                            >
                                <button
                                    className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 md:pb-4 pb-2`}
                                    aria-controls={`collapse-${index}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <H5 className=" md:text-2xl text-xl capitalize   md:font-bold font-creato">{item.question}</H5>
                                    <svg
                                        className={`w-6 h-6 transition duration-500 ${openAccordion === index ? 'hidden' : 'block'}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 12H18M12 18V6"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                    <svg
                                        className={`w-6 h-6 transition duration-500 ${openAccordion === index ? 'block' : 'hidden'}  `}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 12H18"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    id={`collapse-${index}`}
                                    className="accordion-content w-full overflow-hidden pr-4 transition-all duration-500"
                                    aria-labelledby={`heading-${index}`}
                                    style={{
                                        maxHeight: openAccordion === index ? '250px' : '0',
                                        opacity: openAccordion === index ? '1' : '0',
                                        transition: 'max-height 0.5s ease, opacity 0.5s ease',
                                    }}
                                >

                                    <Font2 className="font-montserrat text-[#666666] py-2 md:text-lg md:font-light">{item.answer}</Font2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
}
