import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Zap, Shield, Grid, Camera, Users, Trophy, Target, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCollageOpen, setIsCollageOpen] = useState(false);

  const galleryCategories = [
    {
      id: 'training',
      title: 'Training Sessions',
      icon: Target,
      color: 'from-blue-500 to-cyan-600',
      coverImage: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Intense training sessions and skill development',
      images: [
        {
          src: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Youth players developing their skills'
        },
        {
          src: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Training session at our main facility'
        },
        {
          src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Individual skill development'
        },
        {
          src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Coaching session with professional guidance'
        },
        {
          src: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Team strategy discussion'
        },
        {
          src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Advanced training techniques'
        }
      ]
    },
    {
      id: 'matches',
      title: 'Match Highlights',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      coverImage: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Epic moments from our championship games',
      images: [
        {
          src: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Championship celebration'
        },
        {
          src: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Goalkeeper making a crucial save'
        },
        {
          src: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Intense match action'
        },
        {
          src: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Victory celebration'
        },
        {
          src: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Team coordination in action'
        }
      ]
    },
    {
      id: 'team',
      title: 'Team Spirit',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Unity, friendship, and team bonding moments',
      images: [
        {
          src: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Female players showing team spirit'
        },
        {
          src: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Team huddle before the match'
        },
        {
          src: 'https://images.pexels.com/photos/1756013/pexels-photo-1756013.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Celebrating together as one team'
        },
        {
          src: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Team bonding activities'
        }
      ]
    },
    {
      id: 'achievements',
      title: 'Championships',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      coverImage: 'https://images.pexels.com/photos/1756013/pexels-photo-1756013.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      description: 'Our proudest moments and trophy collections',
      images: [
        {
          src: 'https://images.pexels.com/photos/1756013/pexels-photo-1756013.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Championship trophy presentation'
        },
        {
          src: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Victory parade celebration'
        },
        {
          src: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          caption: 'Medal ceremony'
        }
      ]
    }
  ];

  const openCollage = (category, imageIndex = 0) => {
    setSelectedCategory(category);
    setCurrentImageIndex(imageIndex);
    setIsCollageOpen(true);
  };

  const closeCollage = () => {
    setIsCollageOpen(false);
    setSelectedCategory(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    if (!selectedCategory) return;
    
    const totalImages = selectedCategory.images.length;
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const CategoryCard = ({ category, index }) => (
    <ScrollReveal direction="up" delay={200 + index * 100}>
      <div 
        className="group relative bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700 hover:border-orange-400/50 dark:hover:border-cyan-400/50 hover:shadow-orange-500/20 dark:hover:shadow-cyan-500/20 cursor-pointer"
        onClick={() => openCollage(category)}
      >
        <div className="relative h-80 overflow-hidden">
          <img 
            src={category.coverImage}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Category icon */}
          <div className="absolute top-4 left-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg border border-white/20`}>
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
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-cyan-400 transition-colors">
            {category.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
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

  const CollageModal = () => {
    if (!isCollageOpen || !selectedCategory) return null;

    const currentImage = selectedCategory.images[currentImageIndex];

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-900/80 to-transparent p-6 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${selectedCategory.color} rounded-full flex items-center justify-center`}>
                <selectedCategory.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCategory.title}</h3>
                <p className="text-gray-400 text-sm">{currentImageIndex + 1} of {selectedCategory.images.length}</p>
              </div>
            </div>
            <button 
              onClick={closeCollage}
              className="text-white p-2 hover:bg-red-500/20 rounded-full transition-colors border border-gray-600 hover:border-red-400"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={() => navigateImage('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-orange-500/20 dark:hover:bg-cyan-500/20 rounded-full transition-colors border border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => navigateImage('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-orange-500/20 dark:hover:bg-cyan-500/20 rounded-full transition-colors border border-gray-600 hover:border-orange-400 dark:hover:border-cyan-400 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Main content area */}
        <div className="flex items-center justify-center w-full h-full p-20">
          <div className="grid grid-cols-12 gap-6 max-w-7xl w-full h-full">
            {/* Main image */}
            <div className="col-span-8 h-full flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                <img 
                  src={currentImage.src}
                  alt={currentImage.caption}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4 rounded-b-lg">
                  <p className="text-white font-medium">{currentImage.caption}</p>
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
                        ? 'ring-2 ring-orange-400 dark:ring-cyan-400 scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover"
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-gray-300">
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
                        index === currentImageIndex ? 'bg-orange-400 dark:bg-cyan-400' : 'bg-gray-600'
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
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-red-50/20 to-yellow-50/10 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10" />
      
      <ParallaxSection speed={0.2}>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </ParallaxSection>
      <ParallaxSection speed={0.3}>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <Camera className="w-6 h-6 text-orange-500 dark:text-cyan-400" />
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full border border-orange-400/30 dark:border-cyan-400/30 shadow-2xl shadow-orange-400/20 dark:shadow-cyan-400/20 relative group">
                <Shield className="w-8 h-8 text-orange-500 dark:text-cyan-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-600/20 dark:from-cyan-400/20 dark:to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our journey through 
              <span className="text-orange-500 dark:text-cyan-400 font-semibold"> memorable moments</span>, 
              <span className="text-red-500 dark:text-blue-400 font-semibold"> epic victories</span>, and 
              <span className="text-yellow-500 dark:text-purple-400 font-semibold"> team spirit</span>. Click on any category to view the complete collection.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={600}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-white/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want to be part of our story?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">Join United FC Kodagu and create your own memorable moments on the field.</p>
              <button className="group bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25 flex items-center gap-2 mx-auto">
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Join Our Team
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Collage Modal */}
      <CollageModal />
    </section>
  );
};

export default Gallery;