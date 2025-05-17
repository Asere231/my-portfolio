"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ParallaxHero.css";

export default function ParallaxHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // 1) Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2) Grab all layers under #hero
    const layers = heroRef.current.querySelectorAll(".parallax");

    // 3) Build a timeline that scrubs from top→bottom of #hero
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 4) For each layer, move it by its data-depth %
    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      const movement = -layer.offsetHeight * depth;
      tl.to(layer, { y: movement, ease: "none" }, 0);
    });

    // 5) Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div id="hero" ref={heroRef}>
      <div className="layer-bg layer parallax" data-depth="0.10" />
      <div className="layer-1  layer parallax" data-depth="0.20" />
      <div className="layer-2  layer parallax" data-depth="0.50" />
      <div className="layer-3  layer parallax" data-depth="0.80" />
      <div className="layer-overlay layer parallax" data-depth="0.85" />
      <div className="layer-4  layer parallax" data-depth="1.00" />
    </div>
  );
}
