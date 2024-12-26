import React from 'react'
import { H2, H5, Font2 } from '@/config/typography'
import useEmblaCarousel from 'embla-carousel-react'
import { useState } from 'react'

const OPTIONS = { align: 'center' }
const SLIDE_COUNT = 6


export default function Question({ data, list }) {
    const [isShow, setShow] = useState(null)
    const [emblaRef, emblaApi] = useEmblaCarousel()

    return (
        <div className=" md:py-[35px] py-[30px]  bg-[#FF6F61]">
            <div className="container mx-auto ">
                {/* <H2 className="font-creato mb-3 md:mb-5 text-center">Complete <span className='text-[#FF6F61] md:font-extrabold font-bold'>your nanny</span> search with <br className='hidden xl:block' /> these additional services </H2> */}
                <H2 className="font-creato mb-10 text-center font-medium text-[25px] text-white capitalize">{data.title}</H2>

                <div className="embla ">
                    <div className="embla__viewport" ref={emblaRef} options={OPTIONS}>
                        <div className="embla__container">
                            {list.map((item, index) => (
                                <div className="embla__slide group" key={index}
                                    onMouseEnter={() => {
                                        setShow(index)
                                    }}
                                    onMouseLeave={() => {
                                        setShow(null)
                                    }}
                                >
                                    <div className='px-10 py-4 2xl:py-6 rounded-[15px] bg-transparent border border-gray-200 h-[360px] group-hover:bg-white text-center flex flex-col justify-center items-center'>
                                        <div className='fill-blue-500'>
                                            <img src={isShow ===    index ? item.icon2 : item.icon1} className='h-[100px] w-[100px] mb-4' />
                                        </div>
                                        {/* <img src={item.icon} width="70px" height="70px" className='mb-4' /> */}
                                        <p className="mb-3 xl:mb-5 text-[#fff] group-hover:text-black md:text-[25px] text-[20px] font-medium  font-creato">{item.title}</p>
                                        <p className="text-[#fff] group-hover:text-black md:text-lg text-sm font-quicksand font-extralight mb-7">{item.para}</p>
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
