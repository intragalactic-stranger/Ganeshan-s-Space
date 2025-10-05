"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import { slideInFromLeft } from "@/lib/motion";

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScroll =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.scrollWidth / PROJECTS.length;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24 relative px-4 sm:px-6 lg:px-8 w-full"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromLeft(0.5)}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold py-6 md:py-10 text-center"
        >
          <span className="heading-gradient">Featured Projects</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 px-4"
        >
          Production-grade GenAI solutions deployed across healthcare, finance, insurance, and enterprise domains
        </motion.p>

        {/* Carousel Container */}
  <div className="relative w-full overflow-visible pt-4 md:pt-6">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 disabled:opacity-50 carousel-arrow"
            aria-label="Previous project"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hidden scroll-smooth snap-x snap-mandatory px-2 md:px-12"
          >
            {PROJECTS.map((project, index) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-[92%] xs:w-[88%] sm:w-[68%] md:w-[50%] lg:w-[34%] xl:w-[30%] 2xl:w-[28%] snap-center px-1"
              >
                {/* Added min-h to stabilize card height across varying content lengths */}
                <div className="h-full min-h-[360px] sm:min-h-[380px] md:min-h-[400px]">
                  <ProjectCard
                    src={project.image}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    tags={project.tags}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110 disabled:opacity-50 carousel-arrow"
            aria-label="Next project"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2 mt-6 md:mt-8 justify-center">
          {PROJECTS.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : 0}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.scrollWidth / PROJECTS.length;
                    scrollContainerRef.current.scrollTo({
                      left: cardWidth * index,
                      behavior: "smooth",
                    });
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (scrollContainerRef.current) {
                      const cardWidth = scrollContainerRef.current.scrollWidth / PROJECTS.length;
                      scrollContainerRef.current.scrollTo({
                        left: cardWidth * index,
                        behavior: 'smooth',
                      });
                    }
                  }
                }}
                className={`h-2 rounded-full carousel-dot ${isActive ? 'carousel-dot-active w-8' : 'w-2'}`}
                aria-label={`Go to project ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
