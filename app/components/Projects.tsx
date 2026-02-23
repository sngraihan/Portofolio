"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { ExternalLink, ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import robotAnimation from "../../public/animations/Robot-Bot 3D.json";
import ScrollFloat from "./animations/ScrollFloat";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import SplitText from "./animations/SplitText";
import TypingText from "./animations/TypingText";
import BlurText from "./animations/BlurText";
import ScrollStack, { ScrollStackItem } from "./animations/ScrollStack";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRobotClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Play sound
    const audio = new Audio("/sound/robotsound.mp3");
    audio.volume = 0.5;
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative transition-all duration-700
                 [&:not(.animate-in)]:opacity-0 [&:not(.animate-in)]:translate-y-8
                 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Outer Wrapper for Sticky Layout */}
      <div className="mx-auto max-w-[1400px] relative z-10 lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Left Column (Sticky Sidebar for Header & Robot) */}
        <div className="lg:col-span-5 relative h-min lg:sticky lg:top-24 max-lg:mb-12">
          
          {/* Header with animations */}
          <div className="mb-0 text-center lg:text-left">
            <BlurText
              text="what i've built."
              className="mb-2 text-lg font-light tracking-widest text-primary/70"
              delay={60}
            />
            <h2 className="text-4xl font-light tracking-tight sm:text-5xl md:text-5xl xl:text-6xl" aria-label="featured projects.">
              <TypingText
                text="featured projects."
                speed={60}
                startDelay={200}
              />
            </h2>
          </div>

          {/* Robot Animation (Sticky Below Header) */}
          {isMounted && (
            <div 
              onClick={handleRobotClick}
              className="relative mt-8 -ml-16 w-[324px] md:w-[450px] lg:w-[480px]
                         opacity-90 dark:opacity-80
                         transition-all duration-300 hover:opacity-100 dark:hover:opacity-100 hover:scale-[1.02] 
                         pointer-events-auto cursor-pointer z-20 hidden lg:block rotate-[5deg] origin-bottom-left group"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              {/* Beep Pop-up Animation */}
              <div 
                className={`absolute top-8 right-32 z-50 transition-all duration-500 pointer-events-none
                            ${isPlaying ? 'opacity-100 translate-y-0 scale-100 animate-bounce' : 'opacity-0 translate-y-4 scale-50'}`}
              >
                <div className="relative rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.6)]">
                  Beep Boop! 🤖
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-2 left-6 w-0 h-0 border-r-[8px] border-r-transparent border-t-[10px] border-t-primary border-l-[8px] border-l-transparent"></div>
                </div>
              </div>

              <Lottie animationData={robotAnimation} loop={true} className="pointer-events-none" />
            </div>
          )}
        </div>

        {/* Right Column (Scroll Stack) */}
        <div className="lg:col-span-7">


        {/* Keep spacing clean, stack goes straight out of standard layout rendering */}
        <div className="mt-0">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={120}
            itemScale={0.04}
            baseScale={0.9}
            rotationAmount={2}
            className="w-full"
          >
            {projects.filter(p => p.id).map((project, i) => (
              <ScrollStackItem key={project.id}>
                <div
                  className="group relative flex h-full w-full flex-col lg:flex-row overflow-hidden rounded-3xl border border-border
                             bg-card transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,212,255,0.15)]"
                >
                  {/* Glowing top line */}
                  <div
                    className="absolute left-0 top-0 h-1.5 w-full opacity-80"
                    style={{
                      background:
                        "linear-gradient(90deg, #00d4ff 0%, #0ea5e9 50%, #2563eb 100%)",
                    }}
                  />

                  {/* Content Section (Left) */}
                  <div className="flex w-full lg:w-1/2 xl:w-[55%] grow flex-col p-5 sm:p-8 lg:p-10">
                    {/* Header: Title & Links */}
                    <div className="mb-4 sm:mb-6 flex flex-wrap flex-col sm:flex-row items-start justify-between gap-4 border-b border-border/40 pb-4 sm:pb-6">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <div className="flex shrink-0 gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub: ${project.title}`}
                            className="flex h-10 w-10 items-center justify-center rounded-full
                                       border border-border/60 bg-secondary/50 text-muted-foreground
                                       backdrop-blur-sm transition-all duration-300
                                       hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                          >
                            <i className="devicon-github-original text-xl" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Demo: ${project.title}`}
                            className="flex h-10 w-10 items-center justify-center rounded-full
                                       border border-border/60 bg-secondary/50 text-muted-foreground
                                       backdrop-blur-sm transition-all duration-300
                                       hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Body: Description */}
                    <div className="mb-6 sm:mb-8 grow">
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer: Tags */}
                    <div className="mt-auto flex flex-wrap gap-2.5">
                      {project.tags.filter(tag => tag.trim() !== "").map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold whitespace-nowrap
                                     tracking-wide text-primary transition-all duration-300 group-hover:bg-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Section (Right) */}
                  <div className="relative w-full lg:w-1/2 xl:w-[45%] bg-secondary/10 p-4 sm:p-6 lg:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border/40">
                    <div className="group/img relative w-full h-full min-h-[150px] sm:min-h-[200px] lg:min-h-[350px] overflow-hidden rounded-2xl bg-secondary/20 border border-dashed border-primary/30 flex items-center justify-center transition-all duration-500 hover:border-primary/60 hover:bg-secondary/40">
                      {project.image && project.image !== "/" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          loading="lazy"
                          className="w-full h-full object-contain rounded-2xl transition-transform duration-500 group-hover/img:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 sm:gap-3 opacity-60 transition-opacity duration-300 group-hover/img:opacity-100">
                          <div className="rounded-full bg-primary/10 p-2 sm:p-3">
                            <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary/70" />
                          </div>
                          <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-wider uppercase text-center px-4">Project Image Placeholder</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
      </div>
    </section>
  );
}
