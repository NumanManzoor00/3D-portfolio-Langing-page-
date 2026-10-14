import { ScrambleText } from "./ScrambleText";
import React from "react";
import { motion } from "framer-motion";
export function Sections({ quiet }) {
  return (
    <>
      <div className="ticker">
        <span>
          <ScrambleText>FULL-STACK DEVELOPMENT</ScrambleText>
        </span>
        <b>✳</b>
        <span>
          <ScrambleText>AI AUTOMATION</ScrambleText>
        </span>
        <b>✳</b>
        <span>
          <ScrambleText>HUMAN-FIRST EXPERIENCES</ScrambleText>
        </span>
      </div>
      <motion.section
        id="expertise"
        className="expertise"
        initial={quiet ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="eyebrow">
            <ScrambleText>01 / WHAT I DO</ScrambleText>
          </p>
          <h2>
            <ScrambleText>Ideas into</ScrambleText>
            <br />
            <ScrambleText>working experiences.</ScrambleText>
          </h2>
        </div>
        <div className="services">
          <article>
            <span>
              <ScrambleText>01</ScrambleText>
            </span>
            <div>
              <h3>
                <ScrambleText>Web applications</ScrambleText>
              </h3>
              <p>
                <ScrambleText>
                  Responsive interfaces, backend APIs, and connected databases.
                </ScrambleText>
              </p>
            </div>
            <span>↗</span>
          </article>
          <article>
            <span>
              <ScrambleText>02</ScrambleText>
            </span>
            <div>
              <h3>
                <ScrambleText>AI & automation</ScrambleText>
              </h3>
              <p>
                <ScrambleText>
                  Practical AI features and workflows that connect your everyday
                  tools.
                </ScrambleText>
              </p>
            </div>
            <span>↗</span>
          </article>
          <article>
            <span>
              <ScrambleText>03</ScrambleText>
            </span>
            <div>
              <h3>
                <ScrambleText>API integrations</ScrambleText>
              </h3>
              <p>
                <ScrambleText>
                  Connected systems that keep information moving across your
                  business.
                </ScrambleText>
              </p>
            </div>
            <span>↗</span>
          </article>
        </div>
      </motion.section>
      <section id="connect" className="connect">
        <p className="eyebrow">
          <ScrambleText>02 / START A CONVERSATION</ScrambleText>
        </p>
        <h2>
          <ScrambleText>Have something</ScrambleText>
          <br />
          <ScrambleText>in mind?</ScrambleText>
        </h2>
        <a
          className="primary"
          href="https://numan-manzoor-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ScrambleText>Visit my portfolio ↗</ScrambleText>
        </a>
        <a
          href="https://github.com/NumanManzoor00"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ScrambleText>Explore GitHub ↗</ScrambleText>
        </a>
      </section>
    </>
  );
}
