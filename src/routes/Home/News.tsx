import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from "../../assets/images/image40.jpeg"
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'

const News = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching news items...");
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("date_posted", { ascending: false })
        .limit(3);
        console.log("Fetched news items:", data);
      setNewsItems(data || []);
      setLoading(false);
    };
    fetchNews();
    console.log("News items fetched successfully");
  }, []);

  return (
    <div className='h-fit px-[5vw] py-12 flex flex-col '>
        <div className='w-full flex justify-between mb-8' >
            <div className='text-primary font-bold text-4xl flex items-center gap-4 text-center' >Latest news <ArrowRight className='translate-y-1' size={40}></ArrowRight></div>
        </div>
  <div className='h-fit lg:min-h-[300px] md:min-h-[350px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12' >
            {loading ? (
              <div className='col-span-3 flex items-center justify-center text-xl text-gray-500'>Loading...</div>
            ) : newsItems.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id} className='size-full flex flex-col h-[300px] gap-8 group cursor-pointer' >
                    <div className='h-full w-full relative overflow-hidden ' >
                        <img 
                            src={item.image_url || Image} 
                            className='absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover' 
                            alt={item.title} 
                        />
                    </div>
                    <div className='shrink-0 h-12 w-full text-xl text-primary font-medium' >{item.title}</div>
                    {(item.team1 || item.team2) && (
                        <div className='text-lg text-gray-700' >
                            {item.team1 && <span>{item.team1}</span>}
                            {item.team1 && item.team2 && <span> vs </span>}
                            {item.team2 && <span>{item.team2}</span>}
                        </div>
                    )}
                    {item.venue && (
                        <div className='text-base text-gray-500' >Venue: {item.venue}</div>
                    )}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default News