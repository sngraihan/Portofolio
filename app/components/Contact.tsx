"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import confettiAnimation from "../../public/animations/Confetti Effects Lottie Animation.json";
import { personalInfo, socialLinks } from "../data/portfolio";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import ScrollFloat from "./animations/ScrollFloat";
import TypingText from "./animations/TypingText";
import BlurText from "./animations/BlurText";
import MagneticButton from "./animations/MagneticButton";
import GlowReveal from "./animations/GlowReveal";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const iconMap: Record<string, React.ReactNode> = {
  github: <i className="devicon-github-original text-xl" />,
  linkedin: <i className="devicon-linkedin-plain text-xl" />,
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isDismissing, setIsDismissing] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: name,
          email: email,
          message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
      setIsDismissing(false);
      setName("");
      setEmail("");
      setMessage("");

      // Play pop-out animation 1s before hiding
      setTimeout(() => setIsDismissing(true), 4000);
      setTimeout(() => { setStatus("idle"); setIsDismissing(false); }, 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setIsDismissing(false);
      setTimeout(() => setIsDismissing(true), 4000);
      setTimeout(() => { setStatus("idle"); setIsDismissing(false); }, 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative z-20 bg-background transition-all duration-700
                 [&:not(.animate-in)]:opacity-0 [&:not(.animate-in)]:translate-y-8
                 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Confetti overlay — plays once on successful form submit */}
      {status === "success" && (
        <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            className="h-full w-full"
          />
        </div>
      )}

      {/* Floating toast notification */}
      {(status === "success" || status === "error") && (
        <div
          className="fixed bottom-8 left-1/2 z-[9998] w-[min(360px,90vw)]"
          style={{
            animation: isDismissing
              ? "toastOut 0.35s cubic-bezier(0.4,0,1,1) forwards"
              : "toastIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
            transform: "translateX(-50%)",
          }}
        >
          {status === "success" ? (
            <div
              className="relative overflow-hidden rounded-2xl border border-primary/30
                          bg-background/70 backdrop-blur-xl px-5 py-4
                          shadow-[0_0_40px_rgba(0,212,255,0.15),0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle cyan glow line at top */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-full bg-primary/10 border border-primary/30
                                shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                {/* Text */}
                <div>
                  <p className="font-semibold text-sm text-foreground">Message sent! 🎉</p>
                  <p className="text-xs text-muted-foreground mt-1">I'll get back to you soon.</p>
                </div>
              </div>

              {/* Progress bar draining over 5s */}
              <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full"
                  style={{ animation: "none", width: isDismissing ? "0%" : "100%",
                           transition: isDismissing ? "width 0.35s ease" : "width 5s linear" }}
                />
              </div>
            </div>
          ) : (
            <div
              className="relative overflow-hidden rounded-2xl border border-red-500/30
                          bg-background/70 backdrop-blur-xl px-5 py-4
                          shadow-[0_0_40px_rgba(239,68,68,0.1),0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-full bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Something went wrong.</p>
                  <p className="text-xs text-muted-foreground mt-1">Please email me directly.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mx-auto max-w-4xl">
        {/* Header with animations*/}
        <div className="mb-16 text-center">
          <BlurText
            text="let's connect."
            className="mb-2 text-lg font-light tracking-widest text-primary/70"
            delay={60}
          />
          <h2 className="mb-4 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
            <TypingText
              text="get in touch."
              speed={60}
              startDelay={200}
            />
          </h2>
          <div className="mx-auto max-w-md text-muted-foreground">
            <BlurText
              text="Have a project idea, collaboration opportunity, or just want to say hello? Feel free to reach out!"
              delay={30}
            />
          </div>
        </div>

        {/* Contact Card */}
        <ScrollFloat floatAmount={25}>
          <GlowReveal className="rounded-2xl border border-border bg-card/50 p-8 sm:p-12 transition-colors hover:border-primary/20">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Left — Contact Info */}
              <div>
                <h3 className="mb-6 text-xl font-bold">Contact Info</h3>

                <div className="space-y-5">
                  <MagneticButton strength={0.2} className="w-full">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="group flex w-full items-center gap-4 rounded-xl border border-border
                                 bg-secondary/30 p-4 transition-all duration-300
                                 hover:border-primary/50 hover:bg-primary/5"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center
                                      rounded-full bg-primary/10 text-primary transition-colors
                                      group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                      >
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">
                          {personalInfo.email}
                        </p>
                      </div>
                    </a>
                  </MagneticButton>

                  <MagneticButton strength={0.2} className="w-full">
                    <div
                      className="group flex w-full items-center gap-4 rounded-xl border border-border
                                 bg-secondary/30 p-4 transition-all duration-300
                                 hover:border-primary/50 hover:bg-primary/5"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center
                                      rounded-full bg-primary/10 text-primary transition-colors
                                      group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                      >
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">
                          {personalInfo.location}
                        </p>
                      </div>
                    </div>
                  </MagneticButton>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-muted-foreground">
                    Find me on
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <MagneticButton key={link.name} strength={0.4}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.name}
                          className="flex h-11 w-11 items-center justify-center rounded-full
                                   border border-border bg-secondary/50 text-muted-foreground
                                   transition-all duration-300 hover:bg-primary/10
                                   hover:text-primary hover:border-primary/30
                                   hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                        >
                          {iconMap[link.icon] ?? link.icon}
                        </a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Quick Message Form */}
              <div>
                <h3 className="mb-6 text-xl font-bold">Send a Message</h3>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <GlowReveal className="rounded-xl">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4
                                 py-3 text-sm outline-none transition-all duration-300
                                 placeholder:text-muted-foreground/50
                                 focus:border-primary disabled:opacity-50"
                    />
                  </GlowReveal>
                  <GlowReveal className="rounded-xl">
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4
                                 py-3 text-sm outline-none transition-all duration-300
                                 placeholder:text-muted-foreground/50
                                 focus:border-primary disabled:opacity-50"
                    />
                  </GlowReveal>
                  <GlowReveal className="rounded-xl">
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="w-full resize-none rounded-xl border border-border
                                 bg-secondary/30 px-4 py-3 text-sm outline-none
                                 transition-all duration-300
                                 placeholder:text-muted-foreground/50
                                 focus:border-primary disabled:opacity-50"
                    />
                  </GlowReveal>
                  <MagneticButton strength={0.15} className="mt-2 w-full">
                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl
                                 bg-primary px-8 py-4 font-bold text-primary-foreground
                                 transition-all duration-300 hover:bg-primary/90
                                 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] cursor-pointer
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : status === "success" ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          <span>Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </form>
              </div>
            </div>
          </GlowReveal>
        </ScrollFloat>
      </div>
    </section>
  );
}
