"use client";

import { useState, useEffect, useRef } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  startDelay?: number; // ms to wait before starting
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypingText({
  text,
  className = "",
  speed = 60,
  startDelay = 0,
  cursor = true,
  onComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Trigger on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!started) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setComplete(true);
          onComplete?.();
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [started, text, speed, startDelay, onComplete]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {displayedText}
      {cursor && !complete && (
        <span
          className="ml-0.5 inline-block w-[2px] bg-primary"
          style={{
            height: "1em",
            verticalAlign: "text-bottom",
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
      {cursor && complete && (
        <span
          className="ml-0.5 inline-block w-[2px] bg-primary"
          style={{
            height: "1em",
            verticalAlign: "text-bottom",
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
    </span>
  );
}
