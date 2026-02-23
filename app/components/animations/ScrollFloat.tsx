"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  floatAmount?: number; // px to float up
  animationDuration?: number; // seconds
}

export default function ScrollFloat({
  children,
  className = "",
  floatAmount = 30,
  animationDuration = 0.6,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how far the element is through the viewport
      // 0 = just entering from bottom, 1 = fully past center
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1,
      );
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = floatAmount * (1 - scrollProgress);
  const opacity = Math.min(scrollProgress * 2, 1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        transition: `transform ${animationDuration}s ease-out, opacity ${animationDuration}s ease-out`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
