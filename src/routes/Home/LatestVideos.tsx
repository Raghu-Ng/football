import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import VideoSample from "../../assets/Football Animation.mp4";
import { AnimatePresence, motion } from "framer-motion";

const dummyVideos = [
  {
    id: 1,
    title: "Match Highlights: United FC vs Rivals",
    video_url: VideoSample,
    thumbnail: "https://placehold.co/600x400/222/fff?text=Video+1",
  },
  {
    id: 2,
    title: "Training Day: Behind the Scenes",
    video_url: VideoSample,
    thumbnail: "https://placehold.co/600x400/333/fff?text=Video+2",
  },
  {
    id: 3,
    title: "Fan Reactions: Post-Match",
    video_url: VideoSample,
    thumbnail: "https://placehold.co/600x400/444/fff?text=Video+3",
  },
];

const LatestVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<number | null>(null);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Replace with supabase fetch if needed
    setVideos(dummyVideos);
    setLoading(false);
  }, []);

  // Pause all videos except the one being hovered
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (playing === idx) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [playing]);

  return (
    <div className="h-fit px-4 sm:px-8 md:px-[5vw] py-8 md:py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl flex items-center gap-4 text-center">
          Latest Videos <ArrowRight className="translate-y-1" size={32} />
        </div>
      </div>
      <div className="min-h-[300px] md:min-h-[350px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          videos.map((item, idx) => (
            <div
              key={item.id}
              className="size-full h-[300px] flex flex-col gap-8 group cursor-pointer"
              onMouseEnter={() => setPlaying(idx)}
              onMouseLeave={() => setPlaying(null)}
              onClick={() => setModalVideo(item.video_url)}
            >
              <div className="h-full w-full relative overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={item.video_url}
                  poster={item.thumbnail}
                  className="absolute size-full object-cover group-hover:scale-110  transition-all duration-700 ease-in-out"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{ pointerEvents: "none" }}
                />
                <AnimatePresence>
                  
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="absolute left-0 bottom-0 px-4 py-2 bg-primary flex items-center justify-center text-white text-2xl font-bold m-4"
                    >
                      <Play fill="white"></Play>
                    </motion.div>
                  
                </AnimatePresence>
              </div>
              <div className="shrink-0 h-12 w-full text-xl text-primary font-medium">
                {item.title}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal Video Player */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-[2000] bg-black/80 flex items-center justify-center"
          onClick={() => setModalVideo(null)}
        >
          <video
            src={modalVideo}
            controls
            autoPlay
            className="w-[80vw] max-h-[80vh] rounded-lg shadow-2xl bg-black"
          />
        </div>
      )}
    </div>
  );
};

export default LatestVideos;
