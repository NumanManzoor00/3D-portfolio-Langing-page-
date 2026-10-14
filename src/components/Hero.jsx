import { ScrambleText } from "./ScrambleText";
import React from "react";
import { motion } from "framer-motion";
import { Scene } from "../effects/Scene";
import { DotmTriangle17 } from "../effects/dot-matrix";
import { MotionToggle } from "./MotionToggle";
import { useGreeting } from "../hooks/useGreeting";
export function Hero({ quiet, paused, setPaused }) {
  const { avatar, soundOn, message, playWithSound, toggleSound } =
    useGreeting(quiet);
  const hello = true;
  const sayHello = playWithSound;
  return (
    <section className="hero">
      <div className="portrait-area">
        <Scene quiet={quiet} />
        <motion.div
          className="photo-card"
          animate={
            quiet ? { y: 0, rotate: 0 } : { y: [0, -9, 0], rotate: [-2, 0, -2] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <video
            ref={avatar}
            className="avatar-video"
            autoPlay={!quiet}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/avatar-poster.jpg"
            aria-label="Noman Manzoor greeting video"
          >
            <source src="/avatar.mp4" type="video/mp4" />
          </video>
          <button
            className="sound-control"
            onClick={toggleSound}
            aria-label={
              soundOn ? "Turn greeting sound off" : "Turn greeting sound on"
            }
            aria-pressed={soundOn}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4Z" />
              {soundOn ? (
                <>
                  <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m16 9 5 6m0-6-5 6" />
              )}
            </svg>
            <span>
              <ScrambleText>{soundOn ? "Sound on" : "Sound off"}</ScrambleText>
            </span>
          </button>
          <div className="photo-caption">
            <span className="dot" />
            <ScrambleText>Noman Manzoor</ScrambleText>
            <span>
              <ScrambleText>01 / HELLO</ScrambleText>
            </span>
          </div>
        </motion.div>
        <motion.div
          className="bubble"
          aria-live="polite"
          animate={{ scale: hello ? 1 : 0 }}
        >
          <ScrambleText>Hello, there!</ScrambleText>
        </motion.div>
        <span className="portrait-label">
          <ScrambleText>A PERSONAL HELLO, IN MOTION.</ScrambleText>
        </span>
      </div>
      <motion.div
        className="hero-copy"
        initial={quiet ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">
          <DotmTriangle17
            animated={!quiet}
            ariaLabel="Greeting triangle"
            color="#c2f769"
          />{" "}
          <ScrambleText>MEET THE PERSON BEHIND THE CODE</ScrambleText>
        </p>
        <h1>
          <ScrambleText>A little motion.</ScrambleText>
          <br />
          <ScrambleText>A big</ScrambleText>
          <em>
            <ScrambleText>hello.</ScrambleText>
          </em>
        </h1>
        <p className="intro">
          <ScrambleText>I am Noman Manzoor.</ScrambleText>
          <br />
          <ScrambleText>
            I build web experiences and AI automations that make everyday work
            easier.
          </ScrambleText>
        </p>
        <div className="actions">
          <button className="primary" onClick={sayHello}>
            <ScrambleText>Say hello</ScrambleText>
            <span>↗</span>
          </button>
          <a className="secondary" href="#expertise">
            <ScrambleText>Explore my work ↓</ScrambleText>
          </a>
        </div>
        <div className="greeting-status">
          <DotmTriangle17
            size={34}
            dotSize={3}
            animated={!quiet}
            color="#c2f769"
          />
          <p className="voice-note" role="status">
            <ScrambleText>{message}</ScrambleText>
          </p>
        </div>
        <MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} />
      </motion.div>
    </section>
  );
}
