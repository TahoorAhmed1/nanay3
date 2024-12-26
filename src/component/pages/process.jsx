import React from 'react'
import { H2, H5, Font1 } from '@/config/typography'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from 'react-router-dom'


const OPTIONS = { align: 'center' }


export default function Process({data, list,button}) {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    return (
        <div className="py-[28px] lg:py-[48px]">
            <div className="container mx-auto  ">
                <H2 className="font-creato mb-10 text-center capitalize">{data.title}</H2>
                <div className="embla ">
                    <div className="embla__viewport" ref={emblaRef} options={OPTIONS}>
                        <div className="embla__container">
                            {list.map((item, index) => (
                                <div className="embla__slide py-2" key={index}>
                                    <div className='px-6 py-4  rounded-[30px] bg-[#fff] border border-gray-100 hover:shadow-lg shadow-[#00000040] flex flex-col justify-center h-[290px]'>
                                        <img src={item.icon} width="70px" height="70px" className='mb-4' />
                                        <H5 className="mb-2 xl:mb-3">{item.title}</H5>
                                        <Font1 className="text-[#333333]">{item.para}</Font1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
   {button &&         <div className='flex justify-center my-5'>
<Link to="/auth/sign-up">
            <button
                className="px-5 py-2 mb-4 bg-[#FF6F61] text-white font-normal rounded-[25px] me-2 hover:bg-red-500"
              >
Start Your Search              </button>
</Link>
            </div>}
            </div>
        </div>
    )
}
