import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
export const ScrambleContext = createContext(false);
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function ScrambleText({ children }) {
  const text = String(children),
    quiet = useContext(ScrambleContext),
    host = useRef(),
    frame = useRef(),
    [display, setDisplay] = useState(text);
  const run = () => {
    cancelAnimationFrame(frame.current);
    if (quiet) {
      setDisplay(text);
      return;
    }
    let start;
    const tick = (now) => {
      start ??= now;
      const progress = Math.min(1, (now - start) / 650);
      setDisplay(
        [...text]
          .map((c, i) =>
            c === " " || i < progress * text.length
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  useEffect(() => {
    setDisplay(text);
    if (quiet) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(host.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [text, quiet]);
  return (
    <span className="scramble-text" ref={host} onMouseEnter={run}>
      <span aria-hidden="true">
        {(() => {
          let offset = 0;
          return text.split(/(\s+)/).map((word, index) => {
            const from = offset;
            offset += word.length;
            if (/^\s+$/.test(word)) return word;
            return (
              <span className="scramble-word" key={index}>
                <span className="scramble-reserve">{word}</span>
                <span className="scramble-visual">
                  {display.slice(from, offset)}
                </span>
              </span>
            );
          });
        })()}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
