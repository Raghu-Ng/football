import React, { useEffect, useState } from 'react'
import Image from "../assets/images/hero_team.jpeg"
import Image1 from "../assets/images/image39.jpeg"
import Image2 from "../assets/images/image40.jpeg"
import Image3 from "../assets/images/image41.jpeg"
import News from "./Home/News"
import Gallery from './Home/Gallery'
import Matches from './Home/Matches'
import Merch from './Home/Merch'
import Footer from './Home/Footer'

const heroImages = [Image, Image1, Image2, Image3];

const NewHome = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen h-fit flex flex-col'>
      <div className='h-[calc(100vh-120px)] w-full relative overflow-hidden'>
        {/* Slideshow */}
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'} brightness-75`}
            alt=""
            style={{ transitionProperty: 'opacity' }}
          />
        ))}
        <div className='absolute bottom-0 left-0 w-full h-[400px] z-20 bg-gradient-to-t from-black to-transparent'></div>
        <div className='text-9xl z-30 font-bold text-white absolute bottom-0 left-0 ml-[100px] py-12'>UNITED FC KODAGU</div>
      </div>
      <News></News>
      <Gallery></Gallery>
      <Matches></Matches>
      <Merch></Merch>
      <Footer></Footer>
    </div>
  )
}

export default NewHome