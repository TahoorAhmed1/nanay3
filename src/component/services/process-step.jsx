import React from 'react'
import { H2, H5, Font2 } from '@/config/typography'





export default function ProcessStep({ data, list }) {
    return (
            <div className="container mx-auto ">
                <H2 className="font-creato md:mb-10 mb-8 text-center capitalize">{data.title}</H2>

                <img src={data.img} className={`mb-4 hidden lg:block ${data.widthFull ? "w-full" : "w-[80%]"} mx-auto`}/>
                <div className="grid lg:grid-cols-3 md:gap-8 gap-4">

                    {list.map((item, index) => (
                        <div className="px-8 py-4 2xl:py-7 rounded-[30px] bg-[#fff]   text-center" key={index}>
                            <p className="mb-3 md:mb-5  md:text-2xl text-xl capitalize   md:font-bold font-creato">{item.title}</p>
                            <Font2 className="text-[#333333] font-montserrat md:text-lg font-light">{item.para}</Font2>
                        </div>
                    ))}

                </div>
            </div>
    )
}






