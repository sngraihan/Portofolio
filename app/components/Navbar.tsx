"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "../data/portfolio";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDiscOpen, setIsDiscOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsDiscOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDiscOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Ring sizes — each link sits on a ring
  const rings = [
    { size: 160, bg: "rgba(14, 120, 200, 0.95)" },
    { size: 260, bg: "rgba(14, 140, 210, 0.90)" },
    { size: 360, bg: "rgba(14, 155, 220, 0.85)" },
    { size: 460, bg: "rgba(14, 170, 230, 0.80)" },
    { size: 560, bg: "rgba(14, 180, 235, 0.75)" },
  ];

  return (
    <>
      {/* ── Standard top navbar ── */}
      <nav
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-primary/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a
            href="#home"
            className="text-lg font-bold tracking-tight transition-colors hover:text-primary"
          >
            {personalInfo.nickname}
            <span className="text-primary">.</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground
                           transition-colors hover:text-foreground
                           after:absolute after:bottom-0 after:left-1/2 after:h-[2px]
                           after:w-0 after:bg-primary after:transition-all after:duration-300
                           after:-translate-x-1/2 hover:after:w-2/3"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Floating button (stays in place, rotates on click) ── */}
      <button
        onClick={() => setIsDiscOpen(!isDiscOpen)}
        className={`fixed z-[70] flex h-12 w-12 items-center justify-center
                    rounded-full cursor-pointer transition-all duration-500
                    ${
                      isScrolled || isDiscOpen
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 pointer-events-none"
                    }
                    ${
                      isDiscOpen
                        ? "bg-primary/80 shadow-xl shadow-primary/30"
                        : "bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-110"
                    }`}
        style={{
          top: "20px",
          right: "20px",
          transform: `${isScrolled || isDiscOpen ? "scale(1)" : "scale(0)"} rotate(${isDiscOpen ? "25deg" : "0deg"})`,
        }}
        aria-label={isDiscOpen ? "Close menu" : "Open menu"}
      >
        {isDiscOpen ? (
          <X className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-primary-foreground" />
        )}
      </button>

      {/* ── Disc rings + links (expand from behind the button) ── */}
      <div
        className="fixed z-[65]"
        style={{
          top: "25px",
          right: "37px",
          pointerEvents: isDiscOpen ? "auto" : "none",
        }}
      >
        {/* Concentric rings — each ring contains its nav link */}
        {rings.map((ring, i) => {
          const link = navLinks[i];
          if (!link) return null;

          // Position of link within its ring
          const midRadii = [40, 85, 134, 180, 230];
          const calcAngle = 65 * (Math.PI / 180);
          const r = midRadii[i];
          const linkTop = r * Math.sin(calcAngle);
          const linkRight = r * Math.cos(calcAngle);

          return (
            <a
              key={i}
              href={link.href}
              onClick={handleLinkClick}
              className="group absolute cursor-pointer rounded-full border-2 border-transparent transition-all ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto hover:border-white/50 hover:scale-[1.02]"
              style={{
                width: `${ring.size}px`,
                height: `${ring.size}px`,
                top: `${-ring.size / 3}px`,
                right: `${-ring.size / 2}px`,
                background: ring.bg,
                zIndex: rings.length - i,
                transformOrigin: `${ring.size / 2}px ${ring.size / 3}px`,
                transform: isDiscOpen ? "scale(1)" : "scale(0)",
                opacity: isDiscOpen ? 1 : 0,
                transitionDuration: `${500 + i * 100}ms`,
                transitionDelay: isDiscOpen ? `${i * 50}ms` : "0ms",
              }}
            >
              {/* Link text — inside the ring so it scales together */}
              <span
                className="absolute whitespace-nowrap text-white font-semibold text-[15px] tracking-wide
                           transition-all duration-300 pointer-events-none
                           border-b-2 border-transparent group-hover:border-white"
                style={{
                  // Position relative to ring center (which is at ring.size/2, ring.size/2)
                  top: `${ring.size / 2 + Math.round(linkTop)}px`,
                  right: `${ring.size / 2 + Math.round(linkRight)}px`,
                  paddingBottom: "2px",
                  transform: "rotate(27deg)",
                }}
              >
                {link.label.toLowerCase()}
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}
