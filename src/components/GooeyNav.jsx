// src/components/GooeyNav.jsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the plugin once
gsap.registerPlugin(ScrollToPlugin);

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Simple “noise” helper
  const noise = (n = 1) => n / 2 - Math.random() * n;

  // Compute a random point on a circle
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  // Build a particle’s values
  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  // Spawn all the particles under `element`
  const makeParticles = (element) => {
    const [d0, d1] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, [d0, d1], r);

      // reset before each burst
      element.classList.remove("active");

      setTimeout(() => {
        // create particle wrapper + point
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        point.classList.add("point");

        // set CSS variables
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", p.scale);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        // build DOM tree
        particle.appendChild(point);
        element.appendChild(particle);

        // trigger the CSS animation
        requestAnimationFrame(() => {
          element.classList.add("active");
        });

        // clean up after it finishes
        setTimeout(() => {
          if (element.contains(particle)) {
            element.removeChild(particle);
          }
        }, p.time);
      }, 30);
    }
  };

  // Position the gooey filter + text under the active <li>
  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = element.getBoundingClientRect();

    const styles = {
      left: `${eRect.x - cRect.x}px`,
      top: `${eRect.y - cRect.y}px`,
      width: `${eRect.width}px`,
      height: `${eRect.height}px`,
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  // FULL handleClick now does:
  // • preventDefault on hash links
  // • tween scroll to target
  // • then run the gooey & particle effect
  const handleClick = (e, index) => {
    const anchor =
      e.currentTarget.tagName === "A"
        ? e.currentTarget
        : e.currentTarget.querySelector("a");
    const href = anchor.getAttribute("href");

    // 1) intercept hash links for smooth scroll
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        gsap.to(window, {
          duration: 2,
          ease: "power2.inOut",
          scrollTo: { y: targetEl, offsetY: 0 },
        });
      }
    }

    // 2) if it’s already active, bail
    if (activeIndex === index) return;

    // 3) switch the active state
    setActiveIndex(index);

    // 4) position & animate the gooey filter & text
    const liEl = navRef.current.querySelectorAll("li")[index];
    updateEffectPosition(liEl);

    // 5) clear old particles
    filterRef.current
      .querySelectorAll(".particle")
      .forEach((p) => filterRef.current.removeChild(p));

    // 6) retrigger the filter text blink
    textRef.current.classList.remove("active");
    void textRef.current.offsetWidth; // force reflow
    textRef.current.classList.add("active");

    // 7) burst new particles
    makeParticles(filterRef.current);
  };

  // keyboard support
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick({ currentTarget: e.currentTarget.parentElement }, index);
    }
  };

  // on-mount & on-activeIndex change, position the initial filter & text
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const currentLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (currentLi) {
      updateEffectPosition(currentLi);
      textRef.current?.classList.add("active");
    }

    const ro = new ResizeObserver(() => {
      const updatedLi = navRef.current.querySelectorAll("li")[activeIndex];
      if (updatedLi) updateEffectPosition(updatedLi);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, i) => (
            <li key={i} className={activeIndex === i ? "active" : ""}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
