// Import training images
import t1 from "../../assets/images/training/DSC03519.png";
import t2 from "../../assets/images/training/DSC03521.png";
import t3 from "../../assets/images/training/DSC03541.png";
import t4 from "../../assets/images/training/DSC03545.png";
import t5 from "../../assets/images/training/DSC03574.png";
import t6 from "../../assets/images/training/DSC03582.png";
import t7 from "../../assets/images/training/DSC03603.png";
import t8 from "../../assets/images/training/DSC03610.png";
import t9 from "../../assets/images/training/DSC03638.png";
import t10 from "../../assets/images/training/DSC03649.png";
import t11 from "../../assets/images/training/DSC03651.png";
import t12 from "../../assets/images/training/DSC03673.png";
import t13 from "../../assets/images/training/DSC03693.png";
import t14 from "../../assets/images/training/DSC03788.png";
import { ArrowRight, X } from "lucide-react";
import React, { useState } from "react";

// Import match images
import match1 from "../../assets/images/matches/1.jpg";
import match2 from "../../assets/images/matches/2.jpg";
import match2_2 from "../../assets/images/matches/2_2.jpg";
import match3 from "../../assets/images/matches/3.jpg";
import match4 from "../../assets/images/matches/4.jpg";
import match5 from "../../assets/images/matches/5.jpg";
import match5_2 from "../../assets/images/matches/5_2.jpg";
import match5_3 from "../../assets/images/matches/5_3.jpg";
import match8 from "../../assets/images/matches/8.jpg";
import match9 from "../../assets/images/matches/9.jpg";
import match10 from "../../assets/images/matches/10.jpg";
import match10_2 from "../../assets/images/matches/10_2.jpg";
import match11 from "../../assets/images/matches/11.jpg";
import match13 from "../../assets/images/matches/13.jpg";
import match13_2 from "../../assets/images/matches/13_2.jpg";



const matchImages = [
  match1, match2, match2_2, match3, match4, match5, match5_2, match5_3, match8, match9, match10, match10_2, match11, match13, match13_2
];

// For now, keep the other two gallery items random as before

import img22 from "../../assets/images/image22.jpeg";

import img41 from "../../assets/images/image41.jpeg";
import imgHero from "../../assets/images/hero_team.jpeg"





const trainingImages = [
  t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14
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
    const imgs = [ imgHero,img41,img22];
    return {
      title: "Team",
      thumbnail: imgs[0],
      subimages: imgs,
    };
  })(),
];
import { AnimatePresence, motion } from "framer-motion";

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
                        className={`h-[10vw] shrink-0 w-full relative overflow-hidden border ${selectedImageIdx === idx ? 'border-primary' : 'border-transparent'} cursor-pointer`}
                        onClick={() => setSelectedImageIdx(idx)}
                      >
                        <img
                          src={img}
                          className="absolute size-full object-cover"
                          alt={galleryItem.title + ' subimage'}
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
      <div className="h-fit px-[5vw] mb-12 py-12 flex flex-col ">
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
