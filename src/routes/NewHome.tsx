import React, { useEffect, useState } from "react";
import TeamImage from "../assets/images/hero_team.jpeg";
import StadiumImage from "../assets/Hero.jpg";
import News from "./Home/News";
import Gallery from "./Home/Gallery";
import Matches from "./Home/Matches";
import Merch from "./Home/Merch";
import Footer from "./Home/Footer";
import { supabase } from "../lib/supabase";
import {AnimatePresence, motion} from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom";
import LatestVideos from "./Home/LatestVideos";
import About from "./Home/About";
import Journey from "./Home/Journey";



// 3 cards for the bottom bar
const cards = [
  {
    title: "Win for team!",
    image: TeamImage,
    desc: "Team celebrates a big win!",
  },
  {
    title: "Team arrives at stadium",
    image: StadiumImage,
    desc: "Excitement as the team enters the stadium.",
  },
  {
    title: "Team loses tournament",
    image: TeamImage,
    desc: "Tough loss for the team, but they'll be back!",
  },
];

const StoreSection = () => {
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJerseys = async () => {
      const { data } = await supabase.from("jerseys").select("*").limit(3);
      setJerseys(data || []);
      setLoading(false);
    };
    fetchJerseys();
  }, []);

  return (
    <div id="store" className="h-fit px-[5vw] py-12 flex flex-col">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
          Official Store
        </div>
      </div>
      <div className="h-[400px] w-full grid grid-cols-3 gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className="size-full flex flex-col gap-8 group cursor-pointer bg-white border border-gray-300 p-6 hover:bg-gray-50 transition-colors"
              style={{ textDecoration: "none" }}
            >
              <div className="h-full w-full relative overflow-hidden flex-1 mb-4">
                <img
                  src={
                    jersey.image_urls && jersey.image_urls.length > 0
                      ? jersey.image_urls[0]
                      : jersey.image_url
                  }
                  className="absolute size-full group-hover:scale-110 transition-all duration-700 ease-in-out object-cover"
                  alt={jersey.name}
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div className="shrink-0 h-12 w-full text-xl text-primary font-medium">
                {jersey.name}
              </div>
              <div className="text-lg text-gray-700">{jersey.category}</div>
              <div className="text-xl font-bold text-blue-700">
                ${jersey.price}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


const SLIDE_DURATION = 4000;



const NewHome = () => {
  const [current, setCurrent] = useState(0); // which card is active
  const [searchParams] = useSearchParams();

  // Card interval for switching
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timeout);
  }, [current]);

  // Scroll to section if ?section=... is present in search params
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen h-fit flex flex-col">
      <div className="h-[calc(100vh-12vh)] w-full bg-primary relative overflow-hidden">
        {/* Background image for the current card */}
       <AnimatePresence>
         <motion.img
         initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        key={current + "-bg"}
          src={cards[current].image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100 z-10 brightness-75"
          alt=""
          style={{ transitionProperty: "opacity" }}
        />
       </AnimatePresence>
        <div className="absolute bottom-0 left-0 w-full h-[400px] z-20 bg-gradient-to-t from-black to-transparent"></div>
        <div className="text-5xl z-30 font-bold text-white w-full left-0 absolute bottom-0  px-[5vw] py-12 flex flex-col gap-6">
          <div   className="flex flex-col w-full mb-12">
            <div className="w-2/3">{cards[current].title}</div>
          <div className="w-2/3 text-4xl">{cards[current].desc}</div>
          </div>

          <div className="w-full h-fit grid grid-cols-3 bg-zinc-300 text-sm text-primary relative">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`p-4 pb-10 flex flex-col relative 
                  ${idx === current ? "bg-white" : "bg-zinc-300"}
                  ${idx !== 0 ? "border-l border-zinc-300" : ""}
                  border-zinc-300`}
                onMouseEnter={() => {
                  if (idx !== current) setCurrent(idx);
                }}
                style={{ cursor: idx !== current ? 'pointer' : 'default' }}
              >
                {/* <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded mb-2" /> */}
                <div className="text-2xl font-semibold mb-2 text-left">{card.title}</div>
                <div className="mb-4 text-left text-lg">{card.desc}</div>
                {/* Progress bar for each card */}
                <motion.div
                  className="h-1 bg-primary z-20 absolute bottom-0 left-0"
                  initial={{ width: 0 }}
                  animate={{ width: idx === current ? "100%" : "0%" }}
                  transition={{
                    duration: idx === current ? SLIDE_DURATION / 1000 : 0,
                    ease: "linear"
                  }}
                  key={current + "-" + idx}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <About />
      <Journey />
      <News />
      <LatestVideos />
      <Gallery />
      <Matches />
      <Merch />
      <StoreSection />
      <Footer />
    </div>
  );
};

export default NewHome;
