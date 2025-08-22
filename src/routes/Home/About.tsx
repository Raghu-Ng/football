import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  const [showMore, setShowMore] = useState(true);
  return (
    <div className="h-fit px-[5vw] py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
          About
        </div>
      </div>
      <div className="text-xl font-medium text-black">
        Welcome to the official home of United FC Kodagu, a professional
        football club based in Bengaluru with a profound commitment to
        developing talent and empowering women in sports.
      </div>
      
      {showMore && (
        <>
          <div className="text-xl font-medium text-black flex flex-col gap-4">
            <p>
              As we gear up for the 2025/2026 Karnataka Women’s League season,
              we want to share the core values and ambitious journey that define
              us.
            </p>

            <p>
              Our vision at United FC Kodagu is grand yet simple: "To create a
              world where every girl with a passion for football has the
              opportunity, resources, and support to rise, compete, and lead
              both on and off the field." This vision drives everything we do.
            </p>

            <p>
              Complementing this vision is our unwavering mission: "Our mission
              is to empower young women through free, professional football
              training, fostering talent, discipline, and leadership. We are
              committed to building a strong platform for girls from all
              backgrounds to thrive in sports, gain exposure, and pursue their
              dreams with dignity and pride."
            </p>

            <p>
              United FC Kodagu is more than just a football team; we are a
              beacon of women’s empowerment, a testament to grassroots
              development, and a true embodiment of the spirit of sports. We
              firmly believe in nurturing young talent and providing girls and
              women with a robust platform to grow, lead, and shine, not just in
              football but in life.
            </p>

            <p>
              We are incredibly fortunate to be fostered by Nakshatra Academy,
              which provides us with essential facilities, equipment, top-tier
              coaching, and invaluable mentorship, allowing us to focus on our
              core mission.
            </p>
          </div>
          
        </>
      )}
    </div>
  );
};

export default About;
