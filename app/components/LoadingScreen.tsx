"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { personalInfo } from "../data/portfolio";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LoadingScreen() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const DURATION = 4000;

  // Load animation data
  useEffect(() => {
    fetch("/animations/Loading animation blue.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {});
  }, []);

  // Progress bar + auto-dismiss
  useEffect(() => {
    const tickRate = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += tickRate;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));

      if (elapsed >= DURATION) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 600);
      }
    }, tickRate);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center
                  bg-background transition-opacity duration-500
                  ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Lottie animation */}
      <div className="w-40 h-40 sm:w-48 sm:h-48">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {/* Name */}
      <div className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl" role="status" aria-label="Loading">
        {personalInfo.nickname}
        <span className="text-primary">.</span>
      </div>

      {/* Loading bar — React state-driven */}
      <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-border/30">
        <div
          className="h-full rounded-full transition-all duration-100 ease-linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00d4ff, #0ea5e9)",
          }}
        />
      </div>
    </div>
  );
}
