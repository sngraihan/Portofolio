"use client";

import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  threshold?: number;
  /** If true, animation starts immediately */
  startOnMount?: boolean;
  /** Extra delay in ms before animation begins */
  startDelay?: number;
}

export default function BlurText({
  text,
  className = "",
  delay = 50,
  threshold = 0.05,
  startOnMount = false,
  startDelay = 0,
}: BlurTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (startOnMount) {
      const timer = setTimeout(() => setIsVisible(true), startDelay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (startDelay > 0) {
            setTimeout(() => setIsVisible(true), startDelay);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px" },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Fallback
    const fallback = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold, startOnMount, startDelay]);

  const words = text.split(" ");

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
            transitionDelay: isVisible ? `${i * delay}ms` : "0ms",
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : "blur(12px)",
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
            marginRight: "0.25em",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
