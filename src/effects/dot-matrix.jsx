import React, { useEffect, useRef, useState } from "react";
// Adapted from the supplied DotmTriangle17. No unavailable library helpers required.
const PATH = [
  [4, 0],
  [3, 1],
  [2, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [4, 4],
  [3, 3],
  [4, 2],
];
export function DotmTriangle17({
  size = 42,
  dotSize = 4,
  color = "currentColor",
  ariaLabel = "Animated greeting indicator",
  bloom = true,
  halo = 1,
  speed = 1,
  animated = true,
  hoverAnimated = false,
  dotShape = "circle",
  cellPadding,
  className = "",
  muted = false,
}) {
  const [phase, setPhase] = useState(0.12),
    [hovered, setHovered] = useState(false),
    [reduced, setReduced] = useState(
      () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  const root = useRef();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  const active =
    !reduced && (animated || (hoverAnimated && hovered)) && speed > 0;
  useEffect(() => {
    if (!active) {
      setPhase(0.12);
      return;
    }
    let frame, start;
    const loop = (t) => {
      start ??= t;
      setPhase((((t - start) * speed) / 1500) % 1);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active, speed]);
  const gap = cellPadding ?? Math.max(1, (size - dotSize * 7) / 6),
    actual = dotSize * 7 + gap * 6;
  return (
    <div
      ref={root}
      className={"dmx-root " + className}
      role="img"
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: actual,
        height: actual,
        color,
        opacity: muted ? 0.55 : 1,
        display: "grid",
        gap,
        gridTemplateColumns: `repeat(7,${dotSize}px)`,
        gridTemplateRows: `repeat(7,${dotSize}px)`,
      }}
    >
      {Array.from({ length: 49 }, (_, index) => {
        const row = Math.floor(index / 7),
          col = index % 7,
          idx = PATH.findIndex(([r, c]) => r === row && c === col);
        const distance = (((phase * 10 - idx) % 10) + 10) % 10,
          t = Math.max(0, Math.min(1, distance / 4.35)),
          opacity = idx < 0 ? 0 : 0.06 + (1 - t * t * (3 - 2 * t)) * 0.89;
        return (
          <span
            key={index}
            aria-hidden="true"
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotShape === "circle" ? "50%" : 1,
              background: "currentColor",
              opacity,
              boxShadow:
                bloom && idx >= 0
                  ? `0 0 ${4 + halo * 4}px currentColor`
                  : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
