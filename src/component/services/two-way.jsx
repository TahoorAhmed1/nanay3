import React from 'react';
import { H1, H5, Font2 } from '@/config/typography';



export default function TwoWay({data, list}) {
    return (
            <div className="container mx-auto">
                <div className="md:pb-12 pb-6">
                    <H1 className="font-creato md:mb-6 mb-4 text-center capitalize">{data.title}</H1>
                </div>
                <div className='grid md:grid-cols-2 md:gap-8 gap-4'>
                    {list.map((item, index) => (
                        <div key={index} className='col-span-1 text-center'>
                            <img src={item.img} alt={item.title} />
                            <p className="my-3 xl:my-5 md:text-2xl text-xl capitalize   md:font-bold font-creato">{item.title}</p>
                            <Font2 className="mx-auto font-montserrat  w-full md:text-lg font-light">{item.description}</Font2>
                        </div>
                    ))}
                </div>
            </div>
    );
}
