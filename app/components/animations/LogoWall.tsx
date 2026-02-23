"use client";

import React, { useState, useEffect, useRef } from "react";

export interface LogoWallProps {
  items: React.ReactNode[];
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  size?: string;
  duration?: string;
  bgColor?: string;
  bgClass?: string;
}

export default function LogoWall({
  items = [],
  direction = "left",
  pauseOnHover = false,
  size = "14rem",
  duration = "40s",
  bgColor = "transparent",
  bgClass = "",
}: LogoWallProps) {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  // We duplicate the items a few times so that even on wide screens,
  // there are enough items to fill the whole screen multiple times.
  // Since we transform -50%, we need enough width so that 50% covers the screen.
  const duplicatedItems = [...items, ...items, ...items, ...items];

  // Set up the Web Animations API
  useEffect(() => {
    if (marqueeRef.current) {
      // Calculate duration in ms
      const durationMs = parseFloat(duration) * 1000;

      // Determine keyframes based on direction
      const keyframes =
        direction === "right"
          ? [{ transform: "translateX(-50%)" }, { transform: "translateX(0)" }]
          : [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }];

      // Start the animation
      animationRef.current = marqueeRef.current.animate(keyframes, {
        duration: durationMs,
        iterations: Infinity,
        easing: "linear",
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [direction, duration]);

  // Adjust playbackRate smoothly on hover
  useEffect(() => {
    if (animationRef.current) {
      if (pauseOnHover && isHovered) {
        animationRef.current.playbackRate = 0.25; // Slow down to 25% speed
      } else {
        animationRef.current.playbackRate = 1; // Normal speed
      }
    }
  }, [isHovered, pauseOnHover]);

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-center py-3 w-full ${bgClass}`}
      style={{
        backgroundColor: bgColor,
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={marqueeRef}
        className="flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "max-content",
          willChange: "transform",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-2 sm:px-3"
            style={{ width: size }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
