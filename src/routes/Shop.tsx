
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchJerseys = async () => {
      const { data } = await supabase.from("jerseys").select("*");
      setJerseys(data || []);
      setLoading(false);
    };
    fetchJerseys();
  }, []);

  // Slideshow logic
  useEffect(() => {
    if (jerseys.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(jerseys.length, 3));
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentSlide, jerseys]);

  return (
    <div className="h-fit px-4 max-w-[1200px] w-full py-12 flex flex-col">
      {/* Hero Slideshow Section - auto change, no overlay, no dots */}
      {jerseys.length > 0 && (
        <div className="w-full h-[320px] md:h-[400px] relative mb-8 rounded-lg overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.img
              key={jerseys[currentSlide].id}
              src={
                jerseys[currentSlide].image_urls && jerseys[currentSlide].image_urls.length > 0
                  ? jerseys[currentSlide].image_urls[0]
                  : jerseys[currentSlide].image_url
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full object-cover"
              alt={jerseys[currentSlide].name}
            />
          </AnimatePresence>
        </div>
      )}
      {/* Product Grid Section */}
      <div className="h-fit min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 place-items-stretch items-stretch md:gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className="size-full flex flex-col gap-0 group cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              <div className="h-[240px] w-full relative overflow-hidden shrink-0">
                <img
                  src={
                    jersey.image_urls && jersey.image_urls.length > 0
                      ? jersey.image_urls[0]
                      : jersey.image_url
                  }
                  alt={jersey.name}
                  className="absolute size-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="shrink-0 mt-4 w-full text-xl text-primary font-medium">
                {jersey.name}
              </div>
              <div className="mt-2 text-sm mb-4">₹{jersey.price}</div>
              <button className="bg-primary text-white flex items-center justify-center font-bold p-4 text-sm hover:bg-blue-800 mb-4" >BUY NOW </button>
              <div className="text-sm font-medium text-primary flex justify-between w-full">
                <div>PRODUCT</div>
                <div className="text-zinc-600 font-bold">
                  {jersey.created_at ? new Date(jersey.created_at).toLocaleDateString() : ""}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
