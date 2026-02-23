"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";
import { personalInfo } from "../data/portfolio";
import catAnimation from "../../public/animations/Loader cat.json";

// Dynamically import Lottie to avoid SSR hydration issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCatClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Play sound
    const audio = new Audio("/sound/catsound.wav");
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed:", e));
    
    // Reset animation after 2.5 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 2500);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Diagonal gradient background — like Andris Gauracs */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(0,212,255,0.15) 60%, rgba(14,165,233,0.25) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-end text-right">
          {/* Logo with Cat Animation */}
          <div className="relative flex items-end">
            {isMounted && (
              <div 
                onClick={handleCatClick}
                className="absolute bottom-[-90px] right-0 mr-[-210px] w-[150px] md:w-[300px] 
                           opacity-80 dark:opacity-60 transition-all duration-300
                           hover:opacity-100 dark:hover:opacity-100 hover:scale-105 
                           cursor-pointer max-sm:hidden z-20 group"
              >
                {/* Meow Pop-up Animation */}
                <div 
                  className={`absolute top-3 left-18 z-50 transition-all duration-500 pointer-events-none
                              ${isPlaying ? 'opacity-100 translate-y-0 scale-100 animate-bounce' : 'opacity-0 translate-y-4 scale-50'}`}
                >
                  <div className="relative rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.6)]">
                    Meow! 🐾
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-t-[10px] border-t-primary border-r-[8px] border-r-transparent"></div>
                  </div>
                </div>

                <Lottie 
                  animationData={catAnimation} 
                  loop={true} 
                  className="h-full w-full dark:drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] pointer-events-none"
                />
              </div>
            )}
            <a
              href="#home"
              className="relative z-10 text-6xl font-bold tracking-tight transition-colors hover:text-primary sm:text-7xl -mb-1"
            >
              {personalInfo.nickname.charAt(0)}
              <span className="text-primary">.</span>
            </a>
          </div>

          {/* Divider */}
          <div
            className="mt-6 mb-4 h-[2px] w-24 rounded-full"
            style={{
              background: "linear-gradient(90deg, #00d4ff, #0ea5e9)",
            }}
          />

          {/* Credit text */}
          <p className="text-sm tracking-wide text-muted-foreground/70">
            Website design, animation and code by
          </p>
          <p className="text-sm font-semibold tracking-wide text-muted-foreground">
            {personalInfo.name}
          </p>
        </div>
      </div>

      {/* Back to top — Andris Gauracs style */}
      <a
        href="#home"
        className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-1.5
                   group transition-all duration-300 hover:-translate-y-1"
        aria-label="Back to top"
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
                     border border-primary/30 bg-card/50 backdrop-blur-sm
                     transition-all duration-300 group-hover:bg-primary/20
                     group-hover:border-primary/50 group-hover:shadow-lg
                     group-hover:shadow-primary/10"
        >
          <ArrowUp className="h-5 w-5 text-primary" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          Back
        </span>
        <span className="text-[10px] font-medium text-primary/60 -mt-1.5">
          to top
        </span>
      </a>
    </footer>
  );
}
