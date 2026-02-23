"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface CountUpProps {
  target: string; // e.g. "10+", "2025"
  className?: string;
  duration?: number; // ms
}

export default function CountUp({
  target,
  className = "",
  duration = 1500,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract numeric part and suffix
  const match = target.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericTarget);
      setValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, numericTarget, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? value : `0${suffix}`}
    </span>
  );
}
