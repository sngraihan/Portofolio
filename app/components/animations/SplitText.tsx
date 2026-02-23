"use client";

import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** If true, animation starts immediately on mount */
  startOnMount?: boolean;
  /** Extra delay in ms before the animation begins */
  startDelay?: number;
  /** Range of characters to highlight with gradient (e.g., last word) */
  highlightStart?: number;
  highlightClassName?: string;
}

export default function SplitText({
  text,
  className = "",
  delay = 30,
  startOnMount = false,
  startDelay = 0,
  highlightStart,
  highlightClassName = "",
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const startAnimation = () => setAnimate(true);

    if (startOnMount) {
      if (startDelay > 0) {
        const timer = setTimeout(startAnimation, startDelay);
        return () => clearTimeout(timer);
      }
      // Use requestAnimationFrame to ensure DOM is painted first
      requestAnimationFrame(() => {
        requestAnimationFrame(startAnimation);
      });
      return;
    }

    // IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (startDelay > 0) {
            setTimeout(startAnimation, startDelay);
          } else {
            startAnimation();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "50px" },
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    // Fallback
    const fallback = setTimeout(startAnimation, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [startOnMount, startDelay]);

  const chars = text.split("");

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const isHighlighted =
          highlightStart !== undefined && i >= highlightStart;
        return (
          <span
            key={`${i}-${char}`}
            aria-hidden="true"
            className={`${isHighlighted ? highlightClassName : ""}`}
            style={{
              display: "inline-block",
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${i * delay}ms`,
              minWidth: char === " " ? "0.3em" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
