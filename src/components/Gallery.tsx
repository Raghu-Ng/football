import React, { useState, useRef, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Zap,
  Shield,
  Grid,
  Camera,
  Users,
  Trophy,
  Target,
  Award,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ParallaxSection from "./ParallaxSection";
import image22 from "../assets/images/image22.jpeg";
import image23 from "../assets/images/image23.jpeg";
import image24 from "../assets/images/image24.jpeg";
import image39 from "../assets/images/image39.jpeg";
import image40 from "../assets/images/image40.jpeg";
import image41 from "../assets/images/image41.jpeg";
import image17 from "../assets/images/image17.png";
import image18 from "../assets/images/image18.png";
import image19 from "../assets/images/image19.jpeg";
import image20 from "../assets/images/image20.jpeg";
import image21 from "../assets/images/image21.jpeg";

const CategoryCard = ({
    category,
    index,
    galleryCategories,
    openCollage,
  revealTriggered,

  }: {
    category: (typeof galleryCategories)[0];
    index: number;
  }) => {
    console.log("Gallery render", category.id);
    return (
      <ScrollReveal
        direction="up"
        delay={200 + index * 100}
        playOnce={!revealTriggered.current}
        onReveal={() => {
          revealTriggered.current = true;
        }}
      >
        <div
          className="group relative h-full bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20 cursor-pointer"
          onClick={() => openCollage(category)}
        >
          <div className="relative h-80 overflow-hidden flex flex-col">
            <img
              src={category.coverImage}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

            {/* Category icon */}
            <div className="absolute top-4 left-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg border border-white/20`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Image count badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-gray-600 flex items-center gap-1">
                <Camera className="w-4 h-4" />
                {category.images.length}
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 dark:from-cyan-500/10 dark:to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-600/20 dark:from-cyan-500/20 dark:to-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-orange-400/30 dark:border-cyan-400/30 group-hover:scale-110 transition-transform">
                <Grid className="w-8 h-8 text-orange-500 dark:text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">
              {category.title}
            </h3>
            <p className=" dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {category.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-orange-500 dark:text-cyan-400 font-semibold text-sm flex items-center gap-1">
                <Zap className="w-4 h-4" />
                View Collection
              </span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-500 text-xs">
                <Grid className="w-3 h-3" />
                {category.images.length} photos
              </div>
            </div>
          </div>

          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 dark:from-cyan-500/5 dark:to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
      </ScrollReveal>
    );
  };

const Gallery = () => {
  // Add types for selectedCategory, direction, category, and index
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    coverImage: string;
    description: string;
    images: { src: string; caption: string }[];
  } | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCollageOpen, setIsCollageOpen] = useState(false);
  const revealTriggered = React.useRef(false);

  const galleryCategories = useMemo(
    () => [
      {
        id: "youth-soccer-programs",
        title: "YOUTH SOCCER PROGRAMS",
        icon: Users,
        color: "from-blue-500 to-cyan-600",
        coverImage: image22,
        description:
          "Youth soccer programs play a pivotal role in shaping the next generation of players.",
        images: [
          {
            src: image22,
            caption: "Team photo before the match."
          },
          {
            src: image23,
            caption: "Players walking out to the field."
          },
          {
            src: image24,
            caption: "In-game action shot."
          },
          {
            src: image39,
            caption: "Team talk and strategy session."
          },
          {
            src: image40,
            caption: "Player dribbling during a match."
          },
          {
            src: image41,
            caption: "Lineup before kickoff."
          }
        ],
      },
      {
        id: "media-coverage",
        title: "MEDIA COVERAGE",
        icon: Award,
        color: "from-yellow-500 to-orange-600",
        coverImage: image17,
        description:
          "Our journey has been featured in various newspapers and media outlets, highlighting the achievements, spirit, and progress of our team.",
        images: [
          {
            src: image17,
            caption: "English newspaper article featuring United FC Kodagu's success in the 'A Division' League."
          },
          {
            src: image18,
            caption: "Kannada media coverage celebrating the team's achievements and unity."
          },
          {
            src: image19,
            caption: "Extensive feature on United FC Kodagu's journey and impact in women's football."
          },
          {
            src: image20,
            caption: "Press article highlighting the team's championship run and community support."
          },
          {
            src: image21,
            caption: "Coverage of the team's dedication, teamwork, and memorable moments on and off the field."
          }
        ],
      },
    ],
    []
  );

  const openCollage = (
    category: (typeof galleryCategories)[0],
    imageIndex = 0
  ) => {
    setSelectedCategory(category);
    setCurrentImageIndex(imageIndex);
    setIsCollageOpen(true);
  };

  const closeCollage = () => {
    setIsCollageOpen(false);
    setSelectedCategory(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedCategory) return;

    const totalImages = selectedCategory.images.length;
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  

  const CollageModal = () => {
    if (!isCollageOpen || !selectedCategory) return null;

    const currentImage = selectedCategory.images[currentImageIndex];

    return (
      <div className="fixed inset-0 bg-white shadow-2xl shadow-black/40 border-2 border-gray-400 dark:border-gray-900 dark:bg-black/90 h-[85vh] overflow-hidden w-[80vw] rounded-2xl p-4 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b dark:from-gray-900/80 to-transparent p-6 z-10">
          <div className="flex items-center justify-between   max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${selectedCategory.color} rounded-full flex items-center justify-center`}
              >
                <selectedCategory.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold ">{selectedCategory.title}</h3>
                <p className=" text-sm">
                  {currentImageIndex + 1} of {selectedCategory.images.length}
                </p>
              </div>
            </div>
            <button
              onClick={closeCollage}
              className="p-2 text-red-800 hover:bg-red-500/20 rounded-full transition-colors border  border-red-500 hover:border-red-400"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => navigateImage("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2  p-3 hover:bg-orange-500/20 dark:hover:bg-cyan-500/20 rounded-full transition-colors border border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => navigateImage("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  p-3 hover:bg-orange-500/20 dark:hover:bg-cyan-500/20 rounded-full transition-colors border border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Main content area */}
        <div className="flex items-center p-2 px-20 justify-center w-full overflow-hidden ">
          <div className="grid grid-cols-12 gap-6 max-w-7xl w-full h-[60vh]">
            {/* Main image */}
            <div className="col-span-8 h-full flex items-center justify-center">
              <div className="relative size-full  rounded-lg shadow-2xl overflow-hidden flex flex-col justify-start">
                <img
                  src={currentImage.src}
                  alt={currentImage.caption}
                  className="object-cover absolute size-full top-0"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4 rounded-b-lg">
                  <p className="text-white font-medium">
                    {currentImage.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail grid */}
            <div className="col-span-4 h-full overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {selectedCategory.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? " border-2 dark:border-cyan-400"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover absolute size-full"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-orange-400/20 dark:bg-cyan-400/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-400 dark:bg-cyan-400 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t dark:from-gray-900/80 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">
                <p className="text-sm">{selectedCategory.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Camera className="w-4 h-4" />
                  <span>{selectedCategory.images.length} photos</span>
                </div>
                <div className="flex items-center gap-1">
                  {selectedCategory.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-orange-400 dark:bg-cyan-400"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="py-12 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-red-50/20 to-yellow-50/10 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10" />

      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </ParallaxSection>
      <ParallaxSection speed={0.3}>
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </ParallaxSection>

      {/* Floating camera elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Camera className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
          </div>
        ))}
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="flex justify-between mb-16">
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                Gallery
              </div>
              <div className="text-xl opacity-70 font-medium">
                Explore our gallery
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryCategories.map((category, index) => (
            <CategoryCard
              key={index + "gallery"}
              category={category}
              index={index}
              galleryCategories={galleryCategories}
              openCollage={openCollage}
              revealTriggered={revealTriggered}
            />
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={600}>
          <div className="text-center mt-16">
            <div className="w-full flex items-stretch">
              <div className="flex shrink-0 flex-col justify-start items-start">
                <div className="text-4xl font-bold text-gray-900 dark:text-gray-300">
                  Want to be part of our story?
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                  Join United FC Kodagu and create your own memorable moments on
                  the field.
                </div>
              </div>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border-2 border-orange-300 rounded-xl w-full hover:bg-orange-400 ml-20 text-white text-3xl bg-orange-500 font-bold"
              >
                Join Our Team
              </button>
            </div>
            {/* <div className="bg-gradient-to-r from-white/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Want to be part of our story?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">Join United FC Kodagu and create your own memorable moments on the field.</p>
              <button
                className="group bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 flex items-center gap-2 mx-auto"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Join Our Team
              </button>
            </div> */}
          </div>
        </ScrollReveal>
      </div>

      {/* Collage Modal */}
      <CollageModal />
    </section>
  );
};

export default Gallery;
