import React, { useRef, useEffect, useState } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({ 
  children, 
  padding = 50, 
  disabled = false, 
  magnetStrength = 50,
  className = ''
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (disabled || !magnetRef.current) return;

    const magnet = magnetRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnet.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Check if cursor is within the magnetic field
      const magneticField = Math.max(rect.width, rect.height) / 2 + padding;
      
      if (distance < magneticField) {
        setIsHovering(true);
        
        // Calculate magnetic pull strength based on distance
        const pullStrength = Math.max(0, 1 - distance / magneticField);
        const moveX = (deltaX / distance) * pullStrength * magnetStrength;
        const moveY = (deltaY / distance) * pullStrength * magnetStrength;
        
        // Apply transform with smooth transition
        magnet.style.transform = `translate(${moveX}px, ${moveY}px)`;
        magnet.style.transition = 'transform 0.1s ease-out';
      } else {
        setIsHovering(false);
        // Reset position when outside magnetic field
        magnet.style.transform = 'translate(0px, 0px)';
        magnet.style.transition = 'transform 0.3s ease-out';
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      magnet.style.transform = 'translate(0px, 0px)';
      magnet.style.transition = 'transform 0.3s ease-out';
    };

    // Add event listeners to document for global mouse tracking
    document.addEventListener('mousemove', handleMouseMove);
    magnet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      magnet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, padding, magnetStrength]);

  return (
    <div 
      ref={magnetRef}
      className={`inline-block ${className}`}
      style={{ 
        willChange: 'transform',
        cursor: isHovering ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;