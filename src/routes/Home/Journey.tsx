import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image1 from "../../assets/images/image24.jpeg"
import Image2 from "../../assets/images/image40.jpeg"

const Journey = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="h-fit px-[5vw] py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary w-full justify-between font-bold text-4xl flex items-center gap-4 text-center">
          <div className="flex flex-col gap-2 items-start">
            <span>Our Journey</span>
            <span className="text-base">
              {" "}
              A Path of Unbeaten Success and Steady Ascent
            </span>
          </div>
          {/* <ArrowRight className="translate-y-1" size={40}></ArrowRight> */}
        </div>
      </div>
      <div className="text-xl font-medium text-black">
        Our journey so far has been nothing short of remarkable, marked by
        consistent growth and impressive achievements:
      </div>

      <div className="flex flex-col mt-6 gap-2">
        <div className="w-full h-fit flex flex-col p-4 border-2 border-primary">
          <div className="text-2xl text-primary font-bold">2020-21 Season</div>
          <div className="text-xl text-black font-medium">
            We burst onto the scene in the Karnataka Women’s B Division League,
            finishing as table toppers without a single loss! This dominant
            performance secured our well-deserved qualification for the
            Karnataka Women’s A Division League.
          </div>
        </div>
        <div className="w-full h-fit flex flex-col p-4 border-2 border-primary">
          <div className="text-2xl text-primary font-bold">2023-24 Season</div>
          <div className="text-xl text-black font-medium">
            In only our third season in the highly competitive Karnataka Women’s A Division League, we once again proved our mettle. We secured the top position, earning a coveted promotion to the prestigious Karnataka Women’s Super Division League.

          </div>
        </div>
      </div>
      <div className="mt-8 font-medium text-xl text-black">As we embark on our first season in the top-tier Karnataka Women’s League, United FC Kodagu remains dedicated to our foundational principles. We invite you to join us as we continue to champion women in football, inspire the next generation, and strive for excellence on every pitch.
</div>
<div className="w-full grid grid-cols-2 h-[300px] gap-4 mt-12" >
    <div className="size-full overflow-hidden relative flex items-center justify-center group" >
        <img className="absolute size-full object-cover group-hover:scale-125 transition-all duration-700" src={Image1} alt="" />
    </div>
    <div className="size-full overflow-hidden relative flex items-center justify-center group" >
        <img className="absolute size-full object-cover group-hover:scale-125 transition-all duration-700" src={Image2} alt="" />
    </div>
</div>
    </div>
  );
};

export default Journey;
