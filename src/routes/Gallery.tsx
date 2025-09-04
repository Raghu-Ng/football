import match1 from "../assets/images/matches/1.webp";
import match2 from "../assets/images/matches/2.webp";
import match2_2 from "../assets/images/matches/2 (1).webp";
import match3 from "../assets/images/matches/3 (2).webp";
import match4 from "../assets/images/matches/4.webp";
import match5 from "../assets/images/matches/5.webp";
import match5_2 from "../assets/images/matches/5 (1).webp";
import match5_3 from "../assets/images/matches/5 (2).webp";
import match8 from "../assets/images/matches/8.webp";
import match9 from "../assets/images/matches/9.webp";
import match10 from "../assets/images/matches/10.webp";
import match10_2 from "../assets/images/matches/10 (1).webp";
import match11 from "../assets/images/matches/11.webp";
import match13 from "../assets/images/matches/13.webp";
import match13_2 from "../assets/images/matches/13 (1).webp";

import t1 from "../assets/images/training/DSC03519 (1).webp";
import t2 from "../assets/images/training/DSC03521 (1).webp";
import t3 from "../assets/images/training/DSC03541 (1).webp";
import t4 from "../assets/images/training/DSC03545 (1).webp";
import t5 from "../assets/images/training/DSC03574 (1).webp";
import t6 from "../assets/images/training/DSC03582 (1).webp";
import t7 from "../assets/images/training/DSC03603 (1).webp";
import t8 from "../assets/images/training/DSC03610 (1).webp";
import t9 from "../assets/images/training/DSC03638 (1).webp";
import t10 from "../assets/images/training/DSC03649 (1).webp";
import t11 from "../assets/images/training/DSC03651 (1).webp";
import t12 from "../assets/images/training/DSC03673 (1).webp";
import t13 from "../assets/images/training/DSC03693 (1).webp";
import t14 from "../assets/images/training/DSC03788 (1).webp";

import team3 from "../assets/images/team/3 (1).webp";
import team7568 from "../assets/images/team/IMG_7568.webp";
import team7580 from "../assets/images/team/IMG_7580.webp";
import team7589 from "../assets/images/team/IMG_7589.webp";
import team7589_2 from "../assets/images/team/IMG_7589 (1).webp";

import { useSearchParams } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"
import { useState } from "react";

import Logo from "../assets/images/logo.png"

type GalleryProps = {
  query: "matches" | "training" | "team";
};

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

const teamImages = [team3, team7568, team7580, team7589, team7589_2];

const GALLERY = {
  matches: matchImages,
  training: trainingImages,
  team: teamImages,
};

const heights = [200, 250, 300, 350, 400];

const Gallery = () => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") as keyof typeof GALLERY;

  const images = GALLERY[query] || [];

 return (
    <div className="w-full px-[5vw] py-12">
      <h2 className="text-3xl font-bold mb-6 capitalize text-primary">
        {query || "Gallery"}
      </h2>

      {images.length > 0 ? (
        <div className="flex flex-row gap-4">
          {Array.from({ length: 3 }).map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 w-1/3">
              {images
                .filter((_, i) => i % 3 === colIdx)
                .map((img, idx) => {
                  const randomHeight =
                    heights[Math.floor(Math.random() * heights.length)];
                  return (
                    <div className="bg-primary/100 relative flex items-center justify-center">
                      <div className="absolute z-10 size-[150px]">
                        <img src={Logo} className="size-full" alt="" />
                      </div>
                        <img
                      key={`${colIdx}-${idx}`}
                      src={img}
                      alt={`${query}-col${colIdx}-${idx}`}
                      style={{ height: `${randomHeight}px` }}
                      className="w-full object-cover z-20  cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images found for "{query}"</p>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            />

            {/* Image container */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full max-h-full rounded-lg object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-black transition"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Gallery;
