import { ScrambleContext } from "./components/ScrambleText";
import React, { useState } from "react";
import { useReducedMotion, MotionConfig } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Sections } from "./components/Sections";
import { Footer } from "./components/Footer";
import { VideoBackground } from "./effects/VideoBackground";
import { CursorMatrix } from "./effects/cursor-matrix";
export default function App() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const quiet = Boolean(reduced || paused);
  return (
    <ScrambleContext.Provider value={quiet}>
      <MotionConfig reducedMotion="user">
        <CursorMatrix paused={quiet} />
        <VideoBackground paused={quiet} />
        <Header />
        <main id="home">
          <Hero quiet={quiet} paused={paused} setPaused={setPaused} />
          <Sections quiet={quiet} />
        </main>
        <Footer paused={quiet} />
      </MotionConfig>
    </ScrambleContext.Provider>
  );
}
