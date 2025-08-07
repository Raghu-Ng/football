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
import { supabase } from '../lib/supabase'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const heroImages = [Image, Image1, Image2, Image3];

const StoreSection = () => {
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJerseys = async () => {
      const { data } = await supabase
        .from('jerseys')
        .select('*')
        .limit(3);
      setJerseys(data || []);
      setLoading(false);
    };
    fetchJerseys();
  }, []);

  return (
    <div id="store" className='h-fit px-[100px] py-12 flex flex-col'>
      <div className='w-full flex justify-between mb-8'>
        <div className='text-primary font-bold text-6xl flex items-center gap-4 text-center'>Official Store</div>
      </div>
      <div className='h-[400px] w-full grid grid-cols-3 gap-12'>
        {loading ? (
          <div className='col-span-3 flex items-center justify-center text-xl text-gray-500'>Loading...</div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className='size-full flex flex-col gap-8 group cursor-pointer bg-white border border-gray-300 p-6 hover:bg-gray-50 transition-colors'
              style={{ textDecoration: 'none' }}
            >
              <div className='h-full w-full relative overflow-hidden flex-1 mb-4'>
                <img
                  src={jersey.image_urls && jersey.image_urls.length > 0 ? jersey.image_urls[0] : jersey.image_url}
                  className='absolute size-full group-hover:scale-110 transition-all duration-700 ease-in-out object-cover'
                  alt={jersey.name}
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div className='shrink-0 h-12 w-full text-2xl text-primary font-medium'>{jersey.name}</div>
              <div className='text-lg text-gray-700'>{jersey.category}</div>
              <div className='text-xl font-bold text-blue-700'>${jersey.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const NewHome = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to section if ?section=... is present in search params
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setTimeout(() => {
        console.log(`Scrolling to section: ${section}`);
        const el = document.getElementById(section);
        console.log(`Element found: ${el}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [searchParams]);

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
      <StoreSection />
      <Footer></Footer>
    </div>
  )
}

export default NewHome