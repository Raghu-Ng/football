import { ArrowRight } from 'lucide-react'
import React from 'react'
import Image from "../../assets/images/image40.jpeg"

const Gallery = () => {
  return (
    <div className='h-fit px-[100px] py-12 flex flex-col '>
        <div className='w-full flex justify-between mb-8' >
            <div className='text-primary font-bold text-6xl flex items-center gap-4 text-center' >Gallery <ArrowRight className='translate-y-1' size={40}></ArrowRight></div>
        </div>
        <div className='h-[400px] w-full grid grid-cols-3 gap-12' >
            <div className='size-full  flex flex-col gap-8 group cursor-pointer' >
                <div className='h-full w-full relative overflow-hidden ' >
                    <img src={Image} className='absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover' alt="" />
                </div>
                <div className='shrink-0 h-12 w-full text-2xl text-primary font-medium' >Premier league tickets: West ham away.</div>
            </div>
            <div className='size-full  flex flex-col gap-8 group cursor-pointer' >
                <div className='h-full w-full relative overflow-hidden ' >
                    <img src={Image} className='absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover' alt="" />
                </div>
                <div className='shrink-0 h-12 w-full text-2xl text-primary font-medium' >Premier league tickets: West ham away.</div>
            </div>
            <div className='size-full  flex flex-col gap-8 group cursor-pointer' >
                <div className='h-full w-full relative overflow-hidden ' >
                    <img src={Image} className='absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover' alt="" />
                </div>
                <div className='shrink-0 h-12 w-full text-2xl text-primary font-medium' >Premier league tickets: West ham away.</div>
            </div>
        </div>
    </div>
  )
}

export default Gallery