import React, { useEffect, useState } from 'react';
import { Zap, Shield, Target, Cpu, Star, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const elements = [
    { icon: Zap, color: 'text-cyan-400', size: 'w-6 h-6', delay: 0 },
    { icon: Shield, color: 'text-blue-400', size: 'w-5 h-5', delay: 1000 },
    { icon: Target, color: 'text-purple-400', size: 'w-4 h-4', delay: 2000 },
    { icon: Cpu, color: 'text-green-400', size: 'w-5 h-5', delay: 3000 },
    { icon: Star, color: 'text-yellow-400', size: 'w-4 h-4', delay: 4000 },
    { icon: Sparkles, color: 'text-pink-400', size: 'w-6 h-6', delay: 5000 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Mouse follower */}
      <div
        className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-20 blur-sm transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        >
          <div className={`w-2 h-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-sm`} />
        </div>
      ))}

      {/* Floating icons */}
      {elements.map((Element, index) => (
        <div
          key={index}
          className="absolute animate-bounce opacity-10"
          style={{
            left: `${10 + (index * 15)}%`,
            top: `${20 + Math.sin(index) * 30}%`,
            animationDelay: `${Element.delay}ms`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          <Element.icon className={`${Element.size} ${Element.color}`} />
        </div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default FloatingElements;