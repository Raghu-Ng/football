import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "../../assets/images/image23.jpeg";

const Merch = () => {
  return (
    <>
      <div  className="mt-28 w-full  h-fit min-h-[60vh]  relative">
        <div className="w-full px-[5vw] py-12 bg-gradient-to-r from-primary via-primary to-transparent h-full absolute flex flex-wrap flex-col z-20 overflow-hidden">
          <div className="w-1/2 flex flex-col h-full">
            <div className="text-4xl text-white font-bold">
              Club merchandise now available!
            </div>
            <div className="mt-10 text-white text-xl flex-wrap">
              The official merchandise for Kodagu FC is now available on this
              website!
            </div>
            <button className="mt-auto text-white flex gap-2 p-4 hover:bg-white/5 group font-bold text-xl items-center">
              Shop Now{" "}
              <ArrowRight className="translate-y-[-1px] group-hover:translate-x-4 transition-all"></ArrowRight>
            </button>
          </div>
        </div>
        <div className="absolute right-0 h-full w-full overflow-hidden top-0">
          <img src={Image} className="size-full object-cover"></img>
        </div>
      </div>
    </>
  );
};

export default Merch;
