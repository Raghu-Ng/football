import React, { useEffect, useState } from "react";
import TeamImage from "../assets/images/hero_team.jpeg";
import StadiumImage from "../assets/Hero.jpg";
import News from "./Home/News";
import Gallery from "./Home/Gallery";
import Matches from "./Home/Matches";
import Merch from "./Home/Merch";
import Footer from "./Home/Footer";
import { supabase } from "../lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
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
    <div
      id="store"
      className="h-fit px-4 sm:px-8 md:px-[5vw] py-8 sm:py-12 flex flex-col"
    >
      <div className="w-full flex flex-col sm:flex-row justify-between mb-6 sm:mb-8">
        <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl flex items-center gap-4 text-center">
          Official Store
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 min-h-[300px] md:min-h-[400px]">
        {loading ? (
          <div className="col-span-full flex items-center justify-center text-lg sm:text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8 group cursor-pointer bg-white border border-gray-300 p-4 sm:p-6 hover:bg-gray-50 transition-colors rounded-lg"
              style={{ textDecoration: "none" }}
            >
              <div className="w-full aspect-[4/3] relative overflow-hidden flex-1 mb-2 sm:mb-4 rounded-md">
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
              <div className="shrink-0 h-10 sm:h-12 w-full text-lg sm:text-xl text-primary font-medium">
                {jersey.name}
              </div>
              <div className="text-base sm:text-lg text-gray-700">
                {jersey.category}
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-700">
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
    <div className="min-h-screen h-fit flex flex-col">
      <div className="h-[60vh] sm:h-[400px] md:h-[700px] w-full bg-primary relative overflow-hidden">
        {(newsItems && newsItems.length > 0) && (
          <>
            {/* Background image for the current card */}
            <AnimatePresence mode="sync">
              <motion.img
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                key={cards[current].image + "-bg-test"}
                src={newsItems[current].image_url}
                className="absolute inset-0 w-full h-full object-cover  z-10 brightness-50"
                alt=""
                // style={{ transitionProperty: "opacity" }}
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full h-1/2 sm:h-[300px] md:h-[400px] z-20 bg-gradient-to-t from-black to-transparent"></div>
            <div className="z-30 font-bold text-white w-full left-0 absolute bottom-0 px-4 sm:px-8 md:px-[5vw] py-6 sm:py-10 md:py-12 flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col w-full mb-6 sm:mb-12">
                <div className="w-full sm:w-2/3 text-2xl sm:text-4xl md:text-5xl">
                  {newsItems[current].title}
                </div>
                {/* <div className="w-full sm:w-2/3 text-lg sm:text-2xl md:text-4xl">
                  {newsItems[current].content.slice(0, 100)}...
                </div> */}
              </div>

              <div className="w-full h-fit flex-col sm:grid sm:grid-cols-3 bg-zinc-300 text-xs sm:text-sm hidden sm:flex text-primary relative overflow-x-auto">
                {newsItems.map((card, idx) => (
                  <div
                    key={idx}
                    className={`p-3 sm:p-4 pb-8 sm:pb-10 flex flex-col relative min-w-[220px] sm:min-w-0
                  ${idx === current ? "bg-white" : "bg-zinc-300"}
                  ${
                    idx !== 0
                      ? "border-t sm:border-t-0 sm:border-l border-zinc-300"
                      : ""
                  }
                  border-zinc-300`}
                    onMouseEnter={() => {
                      if (idx !== current) setCurrent(idx);
                    }}
                    style={{ cursor: idx !== current ? "pointer" : "default" }}
                  >
                    <div className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-left">
                      {card.title}
                    </div>
                    <div className="mb-2 sm:mb-4 text-left text-base sm:text-lg">
                      {card.content.slice(0, 60)}...
                    </div>
                    {/* Progress bar for each card */}
                    <motion.div
                      className="h-1 bg-primary z-20 absolute bottom-0 left-0"
                      initial={{ width: 0 }}
                      animate={{ width: idx === current ? "100%" : "0%" }}
                      transition={{
                        duration: idx === current ? SLIDE_DURATION / 1000 : 0,
                        ease: "linear",
                      }}
                      key={current + "-" + idx}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <About />
      <Matches />
      <Journey />
      <News />
      <LatestVideos />
      <Gallery />
      <Merch />
      {/* <StoreSection /> */}
      <Footer />
    </div>
  );
};

export default NewHome;
