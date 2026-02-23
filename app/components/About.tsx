"use client";

import { useEffect, useRef } from "react";
import { personalInfo, stats } from "../data/portfolio";
import ScrollFloat from "./animations/ScrollFloat";
import SplitText from "./animations/SplitText";
import TypingText from "./animations/TypingText";
import BlurText from "./animations/BlurText";
import CountUp from "./animations/CountUp";
import MagicBentoCard from "./MagicBentoCard";
import ProfileCard from "./ProfileCard";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative transition-all duration-700
                 [&:not(.animate-in)]:opacity-0 [&:not(.animate-in)]:translate-y-8
                 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <BlurText
            text="get to know me."
            className="mb-2 text-lg font-light tracking-widest text-primary/70"
            delay={60}
          />
          <h2 className="text-4xl font-light tracking-tight sm:text-5xl md:text-6xl" aria-label="about me.">
            <TypingText
              text="about me."
              speed={60}
              startDelay={200}
            />
          </h2>
        </div>

        {/* Content */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left — ReactBits ProfileCard */}
          <div className="flex justify-center overflow-hidden">
            <ProfileCard
              avatarUrl="/profile.jpg"
              miniAvatarUrl="/profile.jpg"
              name=""
              title=""
              handle="sngraihan"
              status="Online"
              contactText="Contact"
              showUserInfo={true}
              enableTilt={true}
              rotationIntensity={2.5} // Extreme tilt (2.5x original)
              behindGlowEnabled={false}
              onContactClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Right — Magic Bento Grid */}
          <ScrollFloat floatAmount={30}>
            <div className="grid grid-cols-2 gap-3">
              {/* Bio card — spans full width */}
              <MagicBentoCard className="col-span-2 p-6">
                <h3 className="mb-3 text-2xl font-bold">
                  <SplitText text={personalInfo.name} delay={30} />
                </h3>
                <p className="mb-3 text-lg font-medium text-primary">
                  {personalInfo.role}
                </p>
                <div className="leading-relaxed text-muted-foreground text-sm">
                  <BlurText text={personalInfo.bio} delay={40} />
                </div>
              </MagicBentoCard>

              {/* Stats — each in its own bento card */}
              {stats.map((stat) => (
                <MagicBentoCard key={stat.label} className="p-5 text-center">
                  <p className="text-3xl font-bold text-gradient">
                    <CountUp target={stat.value} duration={1200} />
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </MagicBentoCard>
              ))}
            </div>
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
}
