import { ScrambleText } from "./ScrambleText";
import React from "react";
export function Header() {
  return (
    <header className="glass-navbar">
      <a className="brand" href="#home">
        <ScrambleText>NM</ScrambleText>
        <span> / </span>
      </a>
      <nav>
        <a href="#expertise">
          <ScrambleText>Expertise</ScrambleText>
        </a>
        <a href="#connect">
          <ScrambleText>Let us talk ↗</ScrambleText>
        </a>
      </nav>
    </header>
  );
}
