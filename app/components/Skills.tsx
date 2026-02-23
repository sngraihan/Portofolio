"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "../data/portfolio";
import dynamic from "next/dynamic";
import neuronAnimation from "../../public/animations/Neuron Pnurple.json";
import TypingText from "./animations/TypingText";
import SplitText from "./animations/SplitText";
import BlurText from "./animations/BlurText";
import LogoWall from "./animations/LogoWall";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNeuronClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Play sound
    const audio = new Audio("/sound/gearsound.wav");
    audio.volume = 0.3;
    audio.play().catch(e => console.error("Audio play failed:", e));
    
    // Reset animation after 2.5 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 2500);
  };

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Split skills into 3 rows for LogoWall
  const itemsPerRow = Math.ceil(skills.length / 3);
  const row1 = skills.slice(0, itemsPerRow);
  const row2 = skills.slice(itemsPerRow, itemsPerRow * 2);
  const row3 = skills.slice(itemsPerRow * 2);

  const renderSkillCard = (skill: (typeof skills)[0]) => (
    <div
      key={skill.name}
      onClick={() => {
        const audio = new Audio("/sound/camerasound.wav");
        audio.volume = 0.4;
        audio.play().catch(e => console.error("Audio play failed:", e));
      }}
      className="cursor-target group flex flex-col items-center justify-center gap-3 rounded-xl border
                 border-border bg-card/50 p-5 transition-all duration-300
                 hover:border-primary/30 hover:bg-primary/5
                 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]
                 hover:-translate-y-1 h-32 w-full cursor-none"
    >
      <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
        {skill.icon.startsWith("devicon-") ? (
          <i className={`${skill.icon} colored`}></i>
        ) : skill.icon.startsWith("http") || skill.icon.endsWith(".svg") ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-[1em] h-[1em] object-contain"
          />
        ) : (
          skill.icon
        )}
      </span>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
    </div>
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative transition-all duration-700
                 [&:not(.animate-in)]:opacity-0 [&:not(.animate-in)]:translate-y-8
                 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 overflow-hidden"
    >
      {/* Outer Wrapper for Sticky Layout */}
      <div className="mx-auto max-w-[1400px] relative z-10 flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 items-start px-0 sm:px-6 lg:px-8">
        
        {/* Left Column (LogoWall scrolling content) */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1 mt-12 lg:mt-0 lg:py-24 overflow-hidden w-full">
          <LogoWall
            items={row1.map(renderSkillCard)}
            direction="left"
            duration="45s"
            pauseOnHover={true}
            size="clamp(9rem, 15vw, 13rem)"
          />
          <LogoWall
            items={row2.map(renderSkillCard)}
            direction="right"
            duration="50s"
            pauseOnHover={true}
            size="clamp(9rem, 15vw, 13rem)"
          />
          <LogoWall
            items={row3.map(renderSkillCard)}
            direction="left"
            duration="40s"
            pauseOnHover={true}
            size="clamp(9rem, 15vw, 13rem)"
          />
        </div>

        {/* Right Column (Sticky Sidebar for Header & Neuron) */}
        <div className="lg:col-span-5 relative h-min lg:sticky lg:top-32 order-1 lg:order-2 flex flex-col lg:items-end text-center lg:text-right max-lg:mb-12 px-4 sm:px-0">
          
          {/* Header with animations */}
          <div className="mb-8 w-full">
            <BlurText
              text="what i work with."
              className="mb-2 text-lg font-light tracking-widest text-primary/70"
              delay={60}
            />
            <h2 className="text-4xl font-light tracking-tight sm:text-5xl md:text-5xl xl:text-6xl flex justify-center lg:justify-end">
              <TypingText
                text="tech stack."
                speed={60}
                startDelay={200}
              />
            </h2>
          </div>

          {/* Neuron Animation */}
          {isMounted && (
            <div 
              onClick={handleNeuronClick}
              className="relative w-[220px] md:w-[300px] lg:w-[380px] xl:w-[450px]
                         opacity-70 dark:opacity-50 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]
                         transition-all duration-300 hover:opacity-100 dark:hover:opacity-100 hover:scale-[1.05]
                         pointer-events-auto cursor-pointer hidden lg:block group z-0 mt-4 mx-auto lg:mx-0 lg:-mr-16"
              style={{ animation: "float 8s ease-in-out infinite" }}
            >
              {/* Processing Pop-up Animation */}
              <div 
                className={`absolute top-10 left-12 z-50 transition-all duration-500 pointer-events-none
                            ${isPlaying ? 'opacity-100 translate-y-0 scale-100 animate-bounce' : 'opacity-0 translate-y-4 scale-50'}`}
              >
                <div className="relative rounded-2xl bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground shadow-[0_0_20px_rgba(168,85,247,0.4)] whitespace-nowrap">
                  Processing... ⚙️
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-2 lg:right-10 w-0 h-0 border-l-[8px] border-l-transparent border-t-[10px] border-t-secondary border-r-[8px] border-r-transparent"></div>
                </div>
              </div>

              <Lottie animationData={neuronAnimation} loop={true} className="pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
