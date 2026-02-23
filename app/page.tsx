import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MouseFollowBackground from "./components/MouseFollowBackground";
import TargetCursor from "./components/animations/TargetCursor";

export default function Home() {
  return (
    <main>
      <TargetCursor targetSelector=".cursor-target" />
      <MouseFollowBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
