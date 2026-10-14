import { ScrambleText } from "./ScrambleText";
import React from "react";
export function MotionToggle({ paused, onToggle }) {
  return (
    <button className="motion-toggle" aria-pressed={paused} onClick={onToggle}>
      <ScrambleText>{paused ? "Resume motion" : "Pause motion"}</ScrambleText>
    </button>
  );
}
