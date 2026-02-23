"use client";

import { useRef, useEffect, useCallback } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
}

export default function MouseFollowBackground({
  dotSize = 10,
  gap = 20,
  baseColor = "rgba(100, 116, 139, 0.045)",
  activeColor = "0, 212, 255",
  proximity = 100,
  shockRadius = 500,
  shockStrength = 10,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<
    {
      cx: number;
      cy: number;
      xOff: number;
      yOff: number;
      vx: number;
      vy: number;
    }[]
  >([]);
  const pointerRef = useRef({ x: -9999, y: -9999, speed: 0 });
  const rafRef = useRef(0);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: typeof dotsRef.current = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          cx: startX + c * cell,
          cy: startY + r * cell,
          xOff: 0,
          yOff: 0,
          vx: 0,
          vy: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const proxSq = proximity * proximity;
    const halfDot = dotSize / 2;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        // Spring return: push offsets back to 0
        dot.vx += -dot.xOff * 0.08;
        dot.vy += -dot.yOff * 0.08;
        dot.vx *= 0.85; // damping
        dot.vy *= 0.85;
        dot.xOff += dot.vx;
        dot.yOff += dot.vy;

        // Snap tiny values
        if (Math.abs(dot.xOff) < 0.01) dot.xOff = 0;
        if (Math.abs(dot.yOff) < 0.01) dot.yOff = 0;

        const ox = dot.cx + dot.xOff;
        const oy = dot.cy + dot.yOff;

        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dSq = dx * dx + dy * dy;

        let fillStyle = baseColor;

        if (dSq <= proxSq) {
          const dist = Math.sqrt(dSq);
          const t = 1 - dist / proximity;
          fillStyle = `rgba(${activeColor}, ${0.15 + t * 0.7})`;
        }

        ctx.beginPath();
        ctx.arc(
          ox,
          oy,
          halfDot + (dSq <= proxSq ? (1 - Math.sqrt(dSq) / proximity) * 2 : 0),
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [dotSize, proximity, baseColor, activeColor]);

  // Setup: resize + mouse events
  useEffect(() => {
    buildGrid();

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const dt = lastT ? now - lastT : 16;
      const speed = (Math.hypot(x - lastX, y - lastY) / dt) * 1000;

      pointerRef.current = { x, y, speed };
      lastX = x;
      lastY = y;
      lastT = now;

      // Push dots away when moving fast
      if (speed > 80) {
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - x, dot.cy - y);
          if (dist < proximity && dist > 0) {
            const force = (1 - dist / proximity) * 0.8;
            dot.vx += ((dot.cx - x) / dist) * force;
            dot.vy += ((dot.cy - y) / dist) * force;
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && dist > 0) {
          const falloff = 1 - dist / shockRadius;
          dot.vx += ((dot.cx - cx) / dist) * shockStrength * falloff;
          dot.vy += ((dot.cy - cy) / dist) * shockStrength * falloff;
        }
      }
    };

    const onResize = () => buildGrid();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [buildGrid, proximity, shockRadius, shockStrength]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
