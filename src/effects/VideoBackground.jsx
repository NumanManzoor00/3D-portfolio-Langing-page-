import React, { useEffect, useRef } from "react";
export function VideoBackground({ paused, footer = false }) {
  const video = useRef(null);
  useEffect(() => {
    const media = video.current;
    if (paused) media.pause();
    else media.play().catch(() => {});
  }, [paused]);
  return (
    <div className={footer ? "footer-video" : "page-video"} aria-hidden="true">
      <video
        ref={video}
        autoPlay={!paused}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/background-poster.jpg"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
