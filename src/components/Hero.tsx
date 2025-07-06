import React, { useEffect, useState, useRef } from 'react';
import { Play, ArrowRight, Zap, Trophy, Target, Shield, Users, Award, Star, Rocket, Crown, Handshake, Volume2, VolumeX } from 'lucide-react';
import Magnet from './Magnet';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';
import SponsorshipModal from './SponsorshipModal';
import footballVideo from '../assets/Football Animation.mp4';
import heroImage from '../assets/Hero.jpg';
// import heroImage1 from '../assets/Hero1.jpg';
import heroImage1 from '../assets/images/hero_team.jpeg';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLDivElement>(null);

  const heroImages = [heroImage, heroImage1];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Enhanced parallax for floating image
      if (floatingImageRef.current) {
        const scrollProgress = Math.min(newScrollY / (window.innerHeight * 1.5), 1);
        const scale = 1 + scrollProgress * 2; // Grows from 1x to 3x
        const opacity = Math.max(0.3, 1 - scrollProgress * 0.7); // Fades as it grows
        const translateY = -scrollProgress * 200; // Moves up
        const rotate = scrollProgress * 360; // Rotates as it grows
        
        floatingImageRef.current.style.transform = `
          translateY(${translateY}px) 
          scale(${scale}) 
          rotate(${rotate}deg)
        `;
        floatingImageRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Create floating football particles with realistic physics
  useEffect(() => {
    if (!particlesRef.current) return;

    const createFootballParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none football-particle';
      
      const size = 6 + Math.random() * 12;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '100%';
      particle.style.borderRadius = '50%';
      particle.style.background = 'linear-gradient(45deg, #ffffff 30%, #22c55e 50%, #ffffff 70%)';
      particle.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
      particle.style.animation = `football-float ${5 + Math.random() * 3}s linear forwards`;
      particle.style.opacity = '0.6';
      
      // Add simple football pattern
      const pattern = document.createElement('div');
      pattern.className = 'absolute inset-0 rounded-full opacity-40';
      pattern.style.background = `
        radial-gradient(circle at 30% 30%, #000 1px, transparent 1px),
        radial-gradient(circle at 70% 70%, #000 1px, transparent 1px)
      `;
      particle.appendChild(pattern);
      
      particlesRef.current?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 8000);
    };

    const interval = setInterval(createFootballParticle, 800);
    return () => clearInterval(interval);
  }, []);

  const StadiumField = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Football field with realistic markings */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-800/20 via-green-700/15 to-green-900/20 dark:from-green-800/20 dark:via-green-700/15 dark:to-green-900/20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          willChange: 'transform'
        }}
      />
      
      {/* Field lines - subtle and professional with parallax */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          willChange: 'transform'
        }}
      >
        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white transform -translate-y-1/2" />
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-gray-800 dark:border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Goal areas - simplified */}
        <div className="absolute top-1/3 left-8 w-16 h-24 border-2 border-gray-800 dark:border-white" />
        <div className="absolute top-1/3 right-8 w-16 h-24 border-2 border-gray-800 dark:border-white" />
      </div>
      
      {/* Stadium lights with enhanced parallax */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${i * 16.67}%`,
              top: '-10%',
              width: '2px',
              height: '120%',
              background: `linear-gradient(to bottom, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(34, 211, 238, 0.3) 30%, 
                transparent 100%)`,
              transform: `rotate(${-8 + i * 3}deg) translateY(${scrollY * (0.05 + i * 0.01)}px)`,
              animation: `stadium-lights ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>
      
      {/* Crowd silhouettes with parallax */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/60 to-transparent"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform'
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${i * 8.33}%`,
              width: '3px',
              height: `${12 + Math.random() * 8}px`,
              background: 'linear-gradient(to top, #1f2937, #374151)',
              animation: `crowd-cheer ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: '0.6',
              transform: `translateY(${scrollY * (0.1 + i * 0.005)}px)`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>
    </div>
  );

  const Football3D = () => (
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      onClick={() => setIsSoundEnabled(!isSoundEnabled)}
      style={{
        transform: `translate(-50%, -50%) translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
        willChange: 'transform'
      }}
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-xl border-2 border-gray-300 relative overflow-hidden group-hover:scale-105 transition-all duration-300">
          {/* Realistic football pattern */}
          <div className="absolute inset-0 rounded-full">
            {/* Central pentagon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-lg rotate-45 opacity-70" />
            
            {/* Surrounding hexagons */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 border-2 border-black rounded-lg opacity-60"
                style={{
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 25}%`,
                  top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 25}%`,
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                }}
              />
            ))}
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Sound indicator */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-green-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Subtle 3D shadow */}
        <div className="absolute inset-0 bg-gray-800/20 rounded-full transform translate-y-2 blur-md scale-90 opacity-50" />
      </div>
    </div>
  );

  const FloatingImage = () => (
    <div 
      ref={floatingImageRef}
      className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full overflow-hidden border-4 border-orange-400/50 dark:border-cyan-400/50 shadow-2xl shadow-orange-500/30 dark:shadow-cyan-500/30 transition-all duration-300"
      style={{
        willChange: 'transform, opacity'
      }}
    >
      <video src={footballVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
      {/* <img 
        src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
        alt="Training session"
        className="w-full h-full object-cover"
      /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent dark:from-cyan-500/20" />
    </div>
  );

  const GoalPost3D = ({ side }) => (
    <div 
      className={`absolute ${side === 'left' ? 'left-12' : 'right-12'} top-1/2 transform -translate-y-1/2 opacity-30 group cursor-pointer`}
      style={{
        transform: `translateY(-50%) translateX(${scrollY * (side === 'left' ? -0.1 : 0.1)}px)`,
        willChange: 'transform'
      }}
    >
      <div className="hover:scale-105 transition-all duration-300">
        {/* Goal post structure - simplified and professional */}
        <div className="relative">
          {/* Vertical posts */}
          <div className="w-2 h-24 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-md" />
          <div className="w-2 h-24 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-md absolute left-16" />
          
          {/* Horizontal crossbar */}
          <div className="w-16 h-2 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full shadow-md absolute top-0 left-0" />
          
          {/* Simple net indication */}
          <div className="absolute top-2 left-2 w-12 h-20 opacity-40">
            <div className="w-full h-full border border-gray-400 rounded-sm" style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, #9ca3af 0px, #9ca3af 1px, transparent 1px, transparent 6px),
                repeating-linear-gradient(90deg, #9ca3af 0px, #9ca3af 1px, transparent 1px, transparent 6px)
              `
            }} />
          </div>
        </div>
      </div>
    </div>
  );

  const ScoreBoard = () => (
    <div 
      className="absolute top-4 right-4 bg-gray-900/70 backdrop-blur-sm border border-orange-400/20 dark:border-cyan-400/20 rounded-lg p-3 z-20"
      style={{
        transform: `translateY(${scrollY * 0.08}px)`,
        willChange: 'transform'
      }}
    >
      <div className="text-center">
        <div className="text-orange-400 dark:text-cyan-400 text-xs font-semibold mb-1">United FC Kodagu</div>
        <div className="text-gray-900 dark:text-white text-xl font-bold">∞</div>
        <div className="text-gray-600 dark:text-gray-400 text-xs">CHAMPIONS</div>
      </div>
    </div>
  );

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 4 seconds per image
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-warm-light via-orange-50/20 to-red-50/15 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/15 transition-colors duration-300"
    >
      {/* Hero Image Background - Slideshow */}
      {heroImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Hero Background ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`}
          draggable="false"
          style={{ transitionProperty: 'opacity' }}
        />
      ))}
      {/* Vintage black overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
        mixBlendMode: 'multiply',
        filter: 'sepia(0.25)'
      }} />
      <div className="relative z-10 text-center text-gray-900 dark:text-white max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 dark:from-green-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent animate-gradient-x relative sports-title">
            United FC Kodagu
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button 
            onClick={() => setShowSponsorshipModal(true)}
            className="group relative bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl shadow-yellow-500/20 hover:shadow-yellow-400/30"
          >
            <Crown size={24} className="group-hover:rotate-12 transition-transform" />
            <span>SPONSOR OUR CHAMPIONS</span>
            <Handshake size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <Magnet padding={60} disabled={false} magnetStrength={40}>
            <button className="group relative border-2 border-orange-400/50 dark:border-green-400/50 text-orange-500 dark:text-green-400 hover:bg-orange-400/10 dark:hover:bg-green-400/10 hover:border-orange-400 dark:hover:border-green-400 px-10 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-3 backdrop-blur-sm">
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              <span>WATCH HIGHLIGHTS</span>
            </button>
          </Magnet>
        </div>
      </div>
      <SponsorshipModal 
        isOpen={showSponsorshipModal}
        onClose={() => setShowSponsorshipModal(false)}
      />
    </section>
  );
};

export default Hero;