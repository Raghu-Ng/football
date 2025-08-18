import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "../../assets/images/image40.jpeg";

const Gallery = () => {
  return (
    <div className="h-fit px-[5vw] mb-12 py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
          Gallery <ArrowRight className="translate-y-1" size={40}></ArrowRight>
        </div>
      </div>
      <div className="h-fit lg:min-h-[300px] md:min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="size-full flex flex-col h-fit gap-0 group cursor-pointer"
          >
            <div className="h-[240px] w-full relative overflow-hidden shrink-0 ">
              <img
                src={Image}
                className="absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover"
                alt="Gallery item"
              />
            </div>
            <div className="shrink-0 mt-4  w-full text-xl text-primary font-medium">
              Premier league tickets: West ham away.
            </div>
            <div className="w-full h-[2px] mt-12 bg-zinc-300  mb-4"></div>
            <div className="text-sm font-medium  text-primary flex justify-between w-full">
              <div>PHOTO</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
