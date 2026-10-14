import React, { useEffect, useRef } from "react";
import * as VantaThree from "three-vanta";
import HALO from "vanta/dist/vanta.halo.min";
export function HaloBackground({ paused }) {
  const host = useRef();
  useEffect(() => {
    if (paused) return;
    let effect;
    try {
      effect = HALO({
        el: host.current,
        THREE: VantaThree,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.5,
        scaleMobile: 2,
        backgroundColor: 0x101310,
        baseColor: 0x749c38,
        amplitudeFactor: 1,
        size: 1.2,
      });
    } catch {
      host.current.classList.add("halo-fallback");
    }
    return () => effect?.destroy();
  }, [paused]);
  return (
    <div className="halo-background" aria-hidden="true">
      <div ref={host} className="halo-effect" />
      <div className="halo-shade" />
    </div>
  );
}
