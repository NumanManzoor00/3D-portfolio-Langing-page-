import { ScrambleText } from "./ScrambleText";
import React from "react";
import { VideoBackground } from "../effects/VideoBackground";
export function Footer({ paused }) {
  return (
    <footer className="cloud-footer">
      <VideoBackground paused={paused} footer />
      <div className="footer-shade" aria-hidden="true" />
      <div className="footer-content">
        <div className="footer-top">
          <div>
            <a className="brand" href="#home">
              <ScrambleText>NM</ScrambleText>
              <span> / </span>
            </a>
            <h2>
              <ScrambleText>Let us build</ScrambleText>
              <br />
              <ScrambleText>something useful.</ScrambleText>
            </h2>
            <p>
              <ScrambleText>
                Full-stack development & AI automation.
              </ScrambleText>
              <br />
              <ScrambleText>
                Thoughtful interfaces. Practical solutions.
              </ScrambleText>
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <h3>
                <ScrambleText>Explore</ScrambleText>
              </h3>
              <a href="#home">
                <ScrambleText>Back to top ↑</ScrambleText>
              </a>
              <a href="#expertise">
                <ScrambleText>Expertise</ScrambleText>
              </a>
              <a href="#connect">
                <ScrambleText>Let us talk</ScrambleText>
              </a>
            </div>
            <div>
              <h3>
                <ScrambleText>Find me online</ScrambleText>
              </h3>
              <a
                href="https://numan-manzoor-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScrambleText>Portfolio ↗</ScrambleText>
              </a>
              <a
                href="https://github.com/NumanManzoor00"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScrambleText>GitHub ↗</ScrambleText>
              </a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            <ScrambleText>{`© ${new Date().getFullYear()} Noman Manzoor`}</ScrambleText>
          </span>
          <span>
            <ScrambleText>Built with care. Made to connect.</ScrambleText>
          </span>
        </div>
      </div>
    </footer>
  );
}
