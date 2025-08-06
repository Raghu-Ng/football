import React from 'react'
import Logo from "../../assets/images/logo.png"

const Match = () => {
    return <><div className='bg-white size-full flex flex-col justify-center items-center'>
            <div className='font-semibold'>SUN 13 JUN 2025</div>
            <div className='grid grid-cols-3 gap-4 items-center' >
                <div className='flex flex-col size-full gap-2 items-center justify-center' >
                    <img src={Logo} alt="" className='size-[90px]' />
                    <div className='font-bold'>Kodagu fc</div>
                </div>
                <div className='border w-full border-black/70 h-[60px] flex items-center justify-center font-bold text-primary text-4xl' >
                    3 - 0
                </div>
                <div className='flex flex-col size-full gap-2 items-center justify-center' >
                    <img src={Logo} alt="" className='size-[90px]' />
                    <div className='font-bold'>Kodagu fc</div>
                </div>
            </div>
            <div>Bengaluru</div>
        </div></>
}

const Matches = () => {
  return (
    <div className='h-[400px] w-full bg-blue-700 px-[100px] py-12 grid grid-cols-3 gap-12'>
        <Match />
        <Match />
        <Match />
    </div>
  )
}

export default Matches