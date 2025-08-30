import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Thumbnails only
import matchThumb from "../../assets/images/matches/1.webp";
import trainingThumb from "../../assets/images/training/DSC03519 (1).webp";
import teamThumb from "../../assets/images/team/3 (1).webp";

const GALLERY_ITEMS = [
  { title: "Matches", query: "matches", thumbnail: matchThumb },
  { title: "Training", query: "training", thumbnail: trainingThumb },
  { title: "Team", query: "team", thumbnail: teamThumb },
];

const Gallery = () => {
  const navigate = useNavigate();

  const handleNavigate = (query: string) => {
    navigate(`/gallery?query=${query}`);
  };

  return (
    <div id="gallery" className="h-fit px-[5vw] mb-12 py-12 flex flex-col ">
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
          Gallery <ArrowRight className="translate-y-1" size={40} />
        </div>
      </div>
      <div className="h-fit lg:min-h-[300px] md:min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {GALLERY_ITEMS.map((item) => (
          <div
            onClick={() => handleNavigate(item.query)}
            key={item.title}
            className="size-full flex flex-col h-fit gap-0 group cursor-pointer"
          >
            <div className="h-[240px] w-full relative overflow-hidden shrink-0 ">
              <img
                src={item.thumbnail}
                className="absolute size-full group-hover:scale-125 transition-all duration-700 ease-in-out object-cover"
                alt={item.title}
              />
            </div>
            <div className="shrink-0 mt-4 w-full text-xl text-primary font-medium">
              {item.title}
            </div>
            <div className="w-full h-[2px] mt-12 bg-zinc-300 mb-4"></div>
            <div className="text-sm font-medium text-primary flex justify-between w-full">
              <div>PHOTO</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
