"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";

//  Components
import ParallaxHero from "@/components/ParallaxHero";
import "@/components/ParallaxHero.css";
import GooeyNav from "@/components/GooeyNav.jsx";
import FuzzyText from "@/components/FuzzyText.jsx";
import BlurText from "@/components/BlurText.jsx";
import GlassIcons from "@/components/GlassIcons.jsx";

// Data needed
import {
  handleAnimationComplete,
  itemsGlassIcons,
  itemsNavBar,
  projectData,
  ProjectsCarousel,
} from "@/data/siteContent";

export default function Home() {
  return (
    <>
      <div id="scroll">
        <span>SCROLL</span>

        <svg viewBox="0 0 24 24">
          <line id="st1" x1="12" y1="1" x2="12" y2="22.5" />
          <line id="st1" x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
          <line id="st1" x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
        </svg>
      </div>
      {/* 1) Your parallax hero */}
      <ParallaxHero />
      {/* 2) The content goes here */}
      <section
        id="about"
        className="bg-bronze"
        style={{ paddingBottom: "60px" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-16 text-gray-200">
          {/* Section heading */}
          <BlurText
            text="Bryan Aneyro Hernandez"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />

          {/* Multi-column text */}
          <div
            className="mt-6 text-lg leading-relaxed columns-1 md:columns-2 md:column-gap-8"
            style={{ fontFamily: "Verdana", fontSize: "20px" }}
          >
            <p className="mb-4 md:mb-0">
              Hi there! I’m a proud University of Central Florida alum with a
              B.Sc. in Computer Science (GPA 3.48). I love turning ideas into
              real-world software—whether it’s low-level systems code, robotics
              control loops, or full-stack web apps. My curiosity drives me to
              learn new technologies, solve tricky problems, and write clean,
              maintainable code that scales.
            </p>
            <p className="mb-4 md:mb-0">
              I’m actively pursuing roles as a Software Engineer, Backend
              Developer, or Full-Stack Engineer, where I can leverage Python,
              RESTful API design, cloud-native services, and React/Next.js. Feel
              free to scroll down to explore my{" "}
              <strong>
                <u>Projects</u>
              </strong>
              , grab my{" "}
              <strong>
                <u>Resume</u>
              </strong>
              , or drop me a line in the{" "}
              <strong>
                <u>Contact</u>
              </strong>{" "}
              section—I’d love to connect and discuss how I can help build your
              next great product!
            </p>
          </div>
        </div>
      </section>{" "}
      <section
        id="projects"
        style={{
          fontFamily: "Verdana",
          backgroundColor: "#130d0a",
          paddingBottom: "60px",
          // paddingTop: "60px",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-200">
          <BlurText
            text="Projects"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl mb-8"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <ProjectsCarousel projects={projectData} />
        </div>
      </section>
      <section
        id="contact"
        style={{
          fontFamily: "Verdana",
          backgroundColor: "#130d0a",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-2 text-gray-200">
          <BlurText
            text="Contact"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl"
          />
        </div>
        <div className="w-full max-w-xs sm:max-w-lg mx-auto px-4 text-gray-200">
          <GlassIcons
            items={itemsGlassIcons}
            className="justify-between gap-3"
          />
        </div>
      </section>
    </>
  );
}
