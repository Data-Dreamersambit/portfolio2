import React from "react";
import { ArrowDown } from "lucide-react";
import HeroIcon3D from "./HeroIcon3D";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="space-y-6 flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in block md:inline"> Hi, I'm</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1 block md:inline">
                {" "}
                Sambit Kumar
              </span>
              <span className="text-gradient ml-0 md:ml-2 opacity-0 animate-fade-in-delay-2 block md:inline">
                {" "}
                Sahoo
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3">
              I create web experiences with modern technologies.
              Specializing in front-end development, I build interfaces that are
              both beautiful and functional.
            </p>

            <div className="pt-4 opacity-0 animate-fade-in-delay-4">
              <a href="#projects" className="cosmic-button inline-block">
                View My Work
              </a>
            </div>
          </div>

          {/* 3D Icon */}
          <div className="flex-1 w-full max-w-sm mx-auto opacity-0 animate-fade-in-delay-4">
            <HeroIcon3D />
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
