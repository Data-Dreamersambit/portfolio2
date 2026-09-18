import React, { Suspense, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

// Lazy load the 3D scene so it doesn't block initial paint
const Scene3D = React.lazy(() => import("./Scene3D"));

const StaticHeroBackground = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle"></div>
  </div>
);

export const HeroSection = () => {
  const [shouldRender3D, setShouldRender3D] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowCores = (navigator.hardwareConcurrency || 4) < 4;
    const isMobile = window.innerWidth < 768;
    return !prefersReducedMotion && !isLowCores && !isMobile;
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        {shouldRender3D ? (
          <Suspense fallback={<StaticHeroBackground />}>
            <Scene3D />
          </Suspense>
        ) : (
          <StaticHeroBackground />
        )}
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10 pointer-events-none">
        <div className="space-y-6 pointer-events-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Sambit Kumar
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Sahoo
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3 drop-shadow-md">
            I create web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button shadow-lg">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-sm text-muted-foreground mb-2 drop-shadow-md"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
