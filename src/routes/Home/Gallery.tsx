// Import training images
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import t1 from "../../assets/images/training/DSC03519 (1).webp";
import t2 from "../../assets/images/training/DSC03521 (1).webp";
import t3 from "../../assets/images/training/DSC03541 (1).webp";
import t4 from "../../assets/images/training/DSC03545 (1).webp";
import t5 from "../../assets/images/training/DSC03574 (1).webp";
import t6 from "../../assets/images/training/DSC03582 (1).webp";
import t7 from "../../assets/images/training/DSC03603 (1).webp";
import t8 from "../../assets/images/training/DSC03610 (1).webp";
import t9 from "../../assets/images/training/DSC03638 (1).webp";
import t10 from "../../assets/images/training/DSC03649 (1).webp";
import t11 from "../../assets/images/training/DSC03651 (1).webp";
import t12 from "../../assets/images/training/DSC03673 (1).webp";
import t13 from "../../assets/images/training/DSC03693 (1).webp";
import t14 from "../../assets/images/training/DSC03788 (1).webp";


// Import match images
import match1 from "../../assets/images/matches/1.webp";
import match2 from "../../assets/images/matches/2.webp";
import match2_2 from "../../assets/images/matches/2 (1).webp";
import match3 from "../../assets/images/matches/3 (2).webp";
import match4 from "../../assets/images/matches/4.webp";
import match5 from "../../assets/images/matches/5.webp";
import match5_2 from "../../assets/images/matches/5 (1).webp";
import match5_3 from "../../assets/images/matches/5 (2).webp";
import match8 from "../../assets/images/matches/8.webp";
import match9 from "../../assets/images/matches/9.webp";
import match10 from "../../assets/images/matches/10.webp";
import match10_2 from "../../assets/images/matches/10 (1).webp";
import match11 from "../../assets/images/matches/11.webp";
import match13 from "../../assets/images/matches/13.webp";
import match13_2 from "../../assets/images/matches/13 (1).webp";

const matchImages = [
  match1,
  match2,
  match2_2,
  match3,
  match4,
  match5,
  match5_2,
  match5_3,
  match8,
  match9,
  match10,
  match10_2,
  match11,
  match13,
  match13_2,
];

// For now, keep the other two gallery items random as before

import { AnimatePresence, motion } from "framer-motion";

import team3 from "../../assets/images/team/3 (1).webp";
import team7568 from "../../assets/images/team/IMG_7568.webp";
import team7580 from "../../assets/images/team/IMG_7580.webp";
import team7589 from "../../assets/images/team/IMG_7589.webp";
import team7589_2 from "../../assets/images/team/IMG_7589 (1).webp";

const trainingImages = [
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
  t11,
  t12,
  t13,
  t14,
];

const GALLERY_ITEMS = [
  {
    title: "Match day",
    thumbnail: matchImages[0],
    subimages: matchImages,
  },
  {
    title: "Training Day",
    thumbnail: trainingImages[0],
    subimages: trainingImages,
  },
  (() => {
    const imgs = [team3, team7568, team7580, team7589, team7589_2];
    return {
      title: "Team",
      thumbnail: imgs[0],
      subimages: imgs,
    };
  })(),
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const handleOpen = (idx: number) => {
    setSelected(idx);
    setSelectedImageIdx(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setSelectedImageIdx(0);
  };

  const galleryItem = selected !== null ? GALLERY_ITEMS[selected] : null;

  return (
    <>
      <AnimatePresence>
        {open && galleryItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed z-[100] top-0 bg-black/30 size-full flex"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed z-[101] top-0 size-full flex items-center justify-center pointer-events-none p-4"
            >
              <div className="h-[90vh] pointer-events-auto p-6 overflow-hidden w-full bg-white flex flex-col">
                <div className="text-4xl mb-4 flex justify-between shrink-0 font-bold items-center text-primary">
                  {galleryItem.title}
                  <button
                    onClick={handleClose}
                    className="text-xl h-full aspect-square shrink-0 border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-75 *:!duration-75"
                  >
                    <X />
                  </button>
                </div>
                <div className="h-full flex gap-4 overflow-hidden">
                  <div className="h-full w-full relative overflow-hidden flex items-center justify-center">
                    <img
                      src={galleryItem.subimages[selectedImageIdx]}
                      className="max-h-full max-w-full object-contain"
                      alt="Gallery main"
                    />
                  </div>
                  <div className="w-[20vw] shrink-0 h-full overflow-y-auto flex flex-col gap-2">
                    {galleryItem.subimages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`h-[10vw] shrink-0 w-full relative overflow-hidden border ${
                          selectedImageIdx === idx
                            ? "border-primary"
                            : "border-transparent"
                        } cursor-pointer`}
                        onClick={() => setSelectedImageIdx(idx)}
                      >
                        <img
                          src={img}
                          className="absolute size-full object-cover"
                          alt={galleryItem.title + " subimage"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div id="gallery" className="h-fit px-[5vw] mb-12 py-12 flex flex-col ">
        <div className="w-full flex justify-between mb-8">
          <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
            Gallery{" "}
            <ArrowRight className="translate-y-1" size={40}></ArrowRight>
          </div>
        </div>
        <div className="h-fit lg:min-h-[300px] md:min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              onClick={() => handleOpen(idx)}
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
              <div className="shrink-0 mt-4  w-full text-xl text-primary font-medium">
                {item.title}
              </div>
              <div className="w-full h-[2px] mt-12 bg-zinc-300  mb-4"></div>
              <div className="text-sm font-medium  text-primary flex justify-between w-full">
                <div>PHOTO</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
