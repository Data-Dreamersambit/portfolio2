import React, { useEffect, useRef } from 'react';
import { Code2 } from 'lucide-react';
import gsap from 'gsap';

const GearSVG = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="gear-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
        <feDropShadow dx="-1" dy="-1" stdDeviation="2" floodColor="hsl(var(--primary))" floodOpacity="0.2"/>
      </filter>
    </defs>
    <g filter="url(#gear-shadow)" className="fill-primary/30 dark:fill-primary/20">
      <path d="M50 15 
               a35 35 0 1 0 0 70 
               a35 35 0 1 0 0 -70" 
            fillRule="evenodd" />
      {/* Teeth */
       [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
         <g key={i} transform={`rotate(${angle} 50 50)`}>
           <path d="M42 5 L58 5 L60 20 L40 20 Z" />
         </g>
       ))
      }
      <circle cx="50" cy="50" r="15" className="fill-background" />
    </g>
  </svg>
);

const HeroIcon3D = () => {
  const wrapperRef = useRef(null);
  const gearTopLeftRef = useRef(null);
  const gearBottomRightRef = useRef(null);

  useEffect(() => {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rotate top-left gear clockwise
      gsap.to(gearTopLeftRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      // Rotate bottom-right gear counter-clockwise (different speed)
      gsap.to(gearBottomRightRef.current, {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      // Slow float/bob on the whole wrapper
      gsap.to(wrapperRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, wrapperRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate tilt (range: -10 to 10 degrees)
    const rotateY = ((x / width) - 0.5) * 20;
    const rotateX = ((y / height) - 0.5) * -20;

    gsap.to(wrapperRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!wrapperRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(wrapperRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out"
    });
  };

  return (
    <div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-72 mx-auto flex items-center justify-center cursor-default" 
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Window Layer */}
      <div 
        className="window-layer absolute w-56 h-64 bg-card rounded-2xl border border-primary/20 flex flex-col overflow-hidden"
        style={{ 
          transform: 'translateZ(0px)',
          boxShadow: '10px 20px 30px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.05)',
        }}
      >
        {/* Header Bar */}
        <div className="h-8 bg-background/50 flex items-center px-3 gap-1.5 border-b border-primary/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
        </div>
        
        {/* Body */}
        <div className="flex-1 p-5 flex flex-col gap-4 relative">
          <Code2 
            size={48} 
            className="absolute top-4 right-4 text-primary/10 rotate-12 pointer-events-none"
          />
          
          {/* Code Lines matching cosmic theme (shades of primary) */}
          <div className="w-3/4 h-4 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <div className="w-full h-4 rounded-full bg-gradient-to-r from-primary/80 to-primary/60 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <div className="w-5/6 h-4 rounded-full bg-gradient-to-r from-primary/60 to-primary/40 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <div className="w-1/2 h-4 rounded-full bg-gradient-to-r from-primary/90 to-primary/70 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <div className="w-2/3 h-4 rounded-full bg-gradient-to-r from-primary/40 to-primary/20 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
        </div>
      </div>

      {/* Top Left Gear */}
      <div 
        className="gear-top-left absolute top-2 left-2 w-28 h-28 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div ref={gearTopLeftRef} className="w-full h-full">
          <GearSVG className="w-full h-full" />
        </div>
      </div>

      {/* Bottom Right Gear */}
      <div 
        className="gear-bottom-right absolute bottom-0 right-0 w-32 h-32 drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
        style={{ transform: 'translateZ(60px)' }}
      >
        <div ref={gearBottomRightRef} className="w-full h-full">
          <GearSVG className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroIcon3D;
