import React from 'react'
import { H2, H5, Font1 } from '@/config/typography'
import useEmblaCarousel from 'embla-carousel-react'


const OPTIONS = { align: 'center' }


export default function Choice({ data, list }) {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    return (
        <div className="py-[30px] md:py-[70px] lg:py-[100px] ">
            <div className="container mx-auto ">
                <H2 className="font-creato mb-10 text-center capitalize">{data.title}</H2>
                <div className="embla2 ">
                    <div className="embla2__viewport" ref={emblaRef} options={OPTIONS}>
                        <div className="embla2__container">
                            {list.map((item, index) => (
                                <div className="embla2__slide group" key={index}>
                                    <div className='px-8 py-4 2xl:py-7 rounded-[30px] bg-[#fff] border border-gray-200 group-hover:shadow-lg group-hover:border-none group-hover:bg-[#D66563] flex flex-col justify-center items-center text-center h-[350px]'>
                                        <div className='p-6 rounded-full border border-gray-200 flex justify-center items-center mb-6 group-hover:border-none group-hover:bg-white'>
                                            <img src={item.icon} width="30px" height="30px" />
                                        </div>
                                        <H5 className="mb-2 xl:mb-3 group-hover:text-white">{item.title}</H5>
                                        <div className='min-h-[120px]'>
                                        <Font1 className="text-[#333333] group-hover:text-white">{item.para}</Font1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
