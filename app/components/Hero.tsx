"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import TypingText from "./animations/TypingText";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ---- Text Slide Data ----
// ... (textSlides remain unchanged here, handled via file view) ...
// Note: We are just replacing the codingRoasts part below, keeping lines 10-79 intact.
const textSlides = [
  {
    heading: "my name is",
    highlight: "Raihan Andi Saungnaga.",
    description:
      "Aspiring AI Engineer, fresh graduate from University of Lampung. Passionate about building intelligent systems and creating meaningful digital experiences through code and creativity.",
    cta: { label: "Contact Me", href: "#contact" },
  },
  {
    heading: "i am an",
    highlight: "AI Engineer.",
    description:
      "I specialize in machine learning, deep learning, and natural language processing. Building smart solutions that turn data into actionable insights.",
    cta: { label: "See My Work", href: "#projects" },
  },
  {
    heading: "i am also a",
    highlight: "Web Developer.",
    description:
      "Crafting modern, responsive web applications with React, Next.js, and TypeScript. Bringing ideas to life with clean code and stunning interfaces.",
    cta: { label: "See My Work", href: "#projects" },
  },
];

// ---- Live Clock Component ----
function LiveClock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-full border border-border/50 bg-card/30 px-4 py-2 backdrop-blur-sm">
      <div className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </div>
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-foreground font-semibold tabular-nums">
          {time}
        </span>
        <span className="text-muted-foreground/60">•</span>
        <span className="text-muted-foreground/80">{date}</span>
      </div>
    </div>
  );
}

// ---- Coding Roasts (Random Messages) ----
const codingRoasts = [
  "Brb, asking AI to fix this. 🤖",
  "My AI wrote this code. Don't blame me. 😅",
  "Ctrl+C, Ctrl+V, Ask AI... Deploy. 🚀",
  "Waiting for ChatGPT to generate the solution... ⏳",
  "I'm not a programmer, I'm an AI whisperer. 🗣️",
  "Powered by caffeine and large language models. ☕🤖",
  "Did you try asking the AI to restart? 🔄",
  "Why think when AI can do it for you? 🧠",
  "Let me ask my robotic overlords how to fix this. 🦾",
  "Prompt Engineer in the house! 🧙‍♂️",
  "Hold on, fixing what AI broke. 🛠️",
  "Is this a feature or a bug? Yes. 🐛",
  "Who wrote this? Oh wait, it was me 6 months ago. 🤦‍♂️",
  "console.log('please work') 🙏",
  "Will code for API rate limits. 💸"
];

// ---- Lottie Player (single looping animation) ----
function LottieCharacter() {
  const [animationData, setAnimationData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    fetch("/animations/Young programmers working with computer.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie:", err));
  }, []);

  const handleClick = () => {
    if (isPlaying) return;
    
    // Pick a random roast
    const randomRoast = codingRoasts[Math.floor(Math.random() * codingRoasts.length)];
    setCurrentMessage(randomRoast);
    setIsPlaying(true);
    
    // Play sound
    const audio = new Audio("/sound/keyboardsound.wav");
    audio.volume = 0.3;
    audio.play().catch(e => console.error("Audio play failed:", e));
    
    // Stop after 3 seconds maximum
    setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
    }, 1700);
  };

  if (!animationData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div 
      className="relative h-full w-full cursor-pointer group flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Pop-up Message */}
      <div 
        className={`absolute top-8 right-10 md:right-20 lg:right-32 z-50 transition-all duration-500 pointer-events-none
                    ${isPlaying ? 'opacity-100 translate-y-0 scale-100 animate-bounce' : 'opacity-0 translate-y-8 scale-50'}`}
      >
        <div className="relative flex items-center rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.6)] whitespace-nowrap">
          {currentMessage}
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[10px] border-t-primary border-r-[8px] border-r-transparent"></div>
        </div>
      </div>
      
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
        className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]"
      />
    </div>
  );
}

// ---- Hero Section ----
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const SLIDE_DURATION = 6000;

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setProgress(0);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    },
    [current],
  );

  // Auto-advance timer
  useEffect(() => {
    const tickRate = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += tickRate;
      setProgress((elapsed / SLIDE_DURATION) * 100);

      if (elapsed >= SLIDE_DURATION) {
        elapsed = 0;
        setProgress(0);
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % textSlides.length);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 300);
      }
    }, tickRate);

    return () => clearInterval(interval);
  }, [current]);

  const slide = textSlides[current];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content — two columns */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — Text Slider */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Live Clock */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <LiveClock />
            </div>

            {/* Animated Text Content */}
            <div className="min-h-[280px] sm:min-h-[260px]">
              {/* Heading line */}
              <p
                className="mb-1 text-2xl font-light tracking-tight text-muted-foreground sm:text-3xl transition-all duration-500"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning
                    ? "translateY(12px)"
                    : "translateY(0)",
                }}
              >
                {slide.heading}
              </p>

              {/* Big highlight name — typing animation, resets per slide */}
              <h1
                className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning
                    ? "translateY(16px)"
                    : "translateY(0)",
                  transition: "opacity 0.5s, transform 0.5s",
                  transitionDelay: "0.05s",
                }}
              >
                <TypingText
                  key={`highlight-${current}`}
                  text={slide.highlight}
                  className="text-gradient"
                  speed={60}
                  startDelay={300}
                  cursor
                />
              </h1>

              {/* Underline accent — acts as timer progress */}
              <div
                className="mb-5 h-1 rounded-full mx-auto lg:mx-0 transition-all duration-100"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #0ea5e9)",
                  opacity: isTransitioning ? 0 : 1,
                  width: isTransitioning
                    ? "0%"
                    : `${Math.max(1, (progress / 100) * 100)}%`,
                }}
              />

              {/* Description */}
              <p
                className="mb-8 max-w-lg text-sm text-muted-foreground/80 sm:text-base leading-relaxed mx-auto lg:mx-0 transition-all duration-500"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning
                    ? "translateY(12px)"
                    : "translateY(0)",
                  transitionDelay: "0.15s",
                }}
              >
                {slide.description}
              </p>

              {/* CTA button */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning
                    ? "translateY(12px)"
                    : "translateY(0)",
                  transitionDelay: "0.2s",
                }}
              >
                <a
                  href={slide.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5
                             text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20
                             transition-all duration-300 hover:shadow-xl hover:shadow-primary/30
                             hover:scale-105"
                >
                  {slide.cta.label}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Slide Progress Dots */}
            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              {textSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`relative h-4 w-4 rounded-full transition-all duration-300 cursor-pointer
                    ${
                      i === current
                        ? "bg-primary scale-110 shadow-md shadow-primary/30"
                        : "bg-foreground/30 hover:bg-foreground/60"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  {/* Active ring animation */}
                  {i === current && (
                    <svg
                      className="absolute -inset-1.5 h-7 w-7"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-primary/40"
                        strokeDasharray={`${(progress / 100) * 62.8} 62.8`}
                        strokeLinecap="round"
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "center",
                        }}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Single Lottie Animation (loops forever) */}
          <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[450px]">
            <LottieCharacter />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2
                   text-muted-foreground/50 transition-colors hover:text-primary"
        style={{ animation: "float 2.5s ease-in-out infinite" }}
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
}
