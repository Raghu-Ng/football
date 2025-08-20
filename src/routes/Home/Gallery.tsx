import { ArrowRight, X } from "lucide-react";
import React, { useState } from "react";
import img17 from "../../assets/images/image17.png";
import img18 from "../../assets/images/image18.png";
import img19 from "../../assets/images/image19.jpeg";
import img20 from "../../assets/images/image20.jpeg";
import img21 from "../../assets/images/image21.jpeg";
import img22 from "../../assets/images/image22.jpeg";
import img23 from "../../assets/images/image23.jpeg";
import img24 from "../../assets/images/image24.jpeg";
import img39 from "../../assets/images/image39.jpeg";
import img40 from "../../assets/images/image40.jpeg";
import img41 from "../../assets/images/image41.jpeg";

const allImages = [img17, img18, img19, img20, img21, img22, img23, img24, img39, img40, img41];

function getRandomImages(count: number) {
  // Shuffle a copy of the array
  const arr = [...allImages].sort(() => Math.random() - 0.5);
  return arr.slice(0, count);
}

const GALLERY_ITEMS = [
  (() => {
    const imgs = getRandomImages(4);
    return {
      title: "Premier League: West Ham Away",
      thumbnail: imgs[0],
      subimages: imgs,
    };
  })(),
  (() => {
    const imgs = getRandomImages(4);
    return {
      title: "Training Day Highlights",
      thumbnail: imgs[0],
      subimages: imgs,
    };
  })(),
  (() => {
    const imgs = getRandomImages(4);
    return {
      title: "Matchday Moments",
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
