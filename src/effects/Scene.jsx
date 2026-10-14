import React, { useEffect, useRef } from "react";
import * as THREE from "three";
export function Scene({ quiet }) {
  const host = useRef();
  useEffect(() => {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    const el = host.current,
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 8;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1 + i * 0.3, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? 0x49ded8 : 0xb8f35b,
          transparent: true,
          opacity: 0.35,
        }),
      );
      ring.rotation.set(0.6 + i * 0.3, 0.35 + i * 0.2, i);
      group.add(ring);
    }
    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    let frame;
    function render(t) {
      if (!quiet) {
        group.rotation.y = Math.sin(t * 0.0002) * 0.3;
        group.rotation.z = t * 0.00005;
      }
      renderer.render(scene, camera);
      if (!quiet) frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      group.children.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [quiet]);
  return <div ref={host} className="scene" aria-hidden="true" />;
}
