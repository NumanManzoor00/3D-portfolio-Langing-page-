import React, { useEffect, useRef } from "react";
export function CursorMatrix({ paused }) {
  const canvas = useRef();
  useEffect(() => {
    if (paused || !window.matchMedia("(pointer:fine)").matches) return;
    const el = canvas.current,
      ctx = el.getContext("2d");
    if (!ctx) return;
    let frame,
      points = [],
      last = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const now = performance.now();
      if (now - last < 24) return;
      last = now;
      points.push({ x: e.clientX, y: e.clientY, t: now });
      points = points.slice(-22);
    };
    const leave = () => {
      points = [];
    };
    const render = (now) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      points = points.filter((p) => now - p.t < 450);
      points.forEach((p) => {
        const fade = 1 - (now - p.t) / 450;
        ctx.fillStyle = `rgba(194,247,105,${fade * 0.55})`;
        for (let r = -1; r <= 1; r++)
          for (let c = -1; c <= 1; c++) {
            ctx.beginPath();
            ctx.arc(p.x + c * 7, p.y + r * 7, 1.4 * fade, 0, Math.PI * 2);
            ctx.fill();
          }
      });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", leave);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
  }, [paused]);
  return <canvas className="cursor-matrix" ref={canvas} aria-hidden="true" />;
}
