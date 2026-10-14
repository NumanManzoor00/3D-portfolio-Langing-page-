import { useEffect, useRef, useState } from "react";
export function useGreeting(quiet) {
  const avatar = useRef();
  const [soundOn, setSoundOn] = useState(false);
  const [message, setMessage] = useState(
    "A small hello. A personal connection.",
  );
  useEffect(() => {
    const el = avatar.current;
    if (!el) return;
    if (quiet) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [quiet]);
  const playWithSound = () => {
    const el = avatar.current;
    if (!el) return;
    el.currentTime = 0;
    el.loop = true;
    el.muted = false;
    setSoundOn(true);
    el.play()
      .then(() => setMessage("Greeting sound is on."))
      .catch(() => {
        el.muted = true;
        setSoundOn(false);
        setMessage("Playback was blocked. Please try again.");
      });
  };
  const toggleSound = () => {
    const el = avatar.current;
    if (!el) return;
    if (soundOn) {
      el.muted = true;
      setSoundOn(false);
      setMessage("Greeting sound is off.");
    } else {
      playWithSound();
    }
  };
  return { avatar, soundOn, message, playWithSound, toggleSound };
}
