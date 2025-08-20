import React, { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";


const dummyVideos = [
  {
    id: 1,
    title: "Match Highlights: United FC vs Rivals",
    youtube_url: "https://www.youtube.com/watch?v=BXjexUz3-AI",
    thumbnail: "https://img.youtube.com/vi/BXjexUz3-AI/hqdefault.jpg"
  },
  {
    id: 2,
    title: "Training Day: Behind the Scenes",
    youtube_url: "https://www.youtube.com/watch?v=BXjexUz3-AI",
    thumbnail: "https://img.youtube.com/vi/BXjexUz3-AI/hqdefault.jpg"
  },
  {
    id: 3,
    title: "Fan Reactions: Post-Match",
    youtube_url: "https://www.youtube.com/watch?v=BXjexUz3-AI",
    thumbnail: "https://img.youtube.com/vi/BXjexUz3-AI/hqdefault.jpg"
  }
];

const LatestVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Replace with supabase fetch if needed
    setVideos(dummyVideos);
    setLoading(false);
  }, []);



  return (
    <div className="h-fit px-4 sm:px-8 md:px-[5vw] py-8 md:py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl flex items-center gap-4 text-center">
          Latest Videos <ArrowRight className="translate-y-1" size={32} />
        </div>
      </div>
      <div className="h-fit lg:min-h-[300px] md:min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          videos.map((item) => (
            <a
              key={item.id}
              href={item.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="size-full flex flex-col h-fit gap-0 group cursor-pointer"
            >
              <div className="h-[240px] w-full relative overflow-hidden shrink-0 ">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="absolute size-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                <div className="absolute left-0 bottom-0 px-4 py-2 bg-primary flex items-center justify-center text-white text-2xl font-bold m-4">
                  <Play fill="white" />
                </div>
              </div>
              <div className="shrink-0 mt-4  w-full text-xl text-primary font-medium">
                {item.title}
              </div>
              <div className="w-full h-[2px] mt-12 bg-zinc-300  mb-4"></div>
              <div className="text-sm font-medium  text-primary flex justify-between w-full">
                <div>VIDEO</div>
              </div>
            </a>
          ))
        )}
      </div>

    </div>
  );
};

export default LatestVideos;
