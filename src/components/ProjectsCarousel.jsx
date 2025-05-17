// src/components/ProjectsCarousel.jsx
"use client";

import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectsCarousel({ projects }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({
      left: direction * width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Left arrow: 6px outside the track */}
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-[-40px] p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scroll‐track with horizontal padding so cards never touch edges */}
      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-10"
      >
        {projects.map((proj, i) => (
          <div key={i} className="snap-center flex-shrink-0 w-full sm:w-1/2">
            <SpotlightCard spotlightColor="rgba(219,224,228,0.4)">
              <div className="space-y-4 text-white">
                <proj.Icon className="h-8 w-8" />
                <h3 className="text-xl font-bold">{proj.title}</h3>
                <p className="text-gray-300 text-sm italic font-light mt-1">
                  {proj.languages}{" "}
                </p>
                <p className="text-gray-300">{proj.description}</p>
                {/* <a
                  href={proj.link}
                  className="inline-block px-4 py-2 rounded bg-white text-black hover:bg-gray-200"
                >
                  View
                </a> */}
                <button
                  className="
                        relative z-20
                        inline-flex items-center justify-center
                        w-25
                        h-10  
                        rounded-xl
                        bg-gradient-to-b from-gray-800 via-gray-900 to-black
                        text-white font-medium
                        shadow-[0_8px_15px_rgba(0,0,0,0.7)] 
                        shadow-inner                       
                    "
                  href={proj.link}
                  onClick={() => window.open(proj.link, "_blank", "noopener")}
                >
                  <FaGithub
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    aria-hidden="true"
                  />
                  GitHub
                </button>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>

      {/* Right arrow: 6px outside the track */}
      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-[-40px] p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
