import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "../../assets/images/image23.jpeg";
import { useNavigate } from "react-router-dom";

const Merch = () => {
  const navigate = useNavigate()
  return (
    <>
      <div  className="mt-28 w-full  h-fit min-h-[60vh]  relative">
        <div className="w-full px-[5vw] py-12 bg-gradient-to-r from-primary via-primary to-transparent h-full absolute flex flex-wrap flex-col z-20 overflow-hidden">
          <div className="w-1/2 flex flex-col h-full">
            <div className="text-4xl text-white font-bold">
              Jerseys
            </div>
            <div className="mt-10 text-white text-base flex-wrap">
              More than just a jersey, our team's colors embody our heritage, unity, and the heart we pour into every football game; it's our proud identity. 
              <br />
              Now, you can be a part of that journey too! We invite all our passionate fans to show their support and cheer us on by wearing our colors with pride.

            </div>
            <button onClick={() => navigate("/shop")} className="mt-auto text-white  flex gap-2 py-2 hover:px-4 transition-all hover:bg-white/5 group font-bold text-lg items-center">
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
