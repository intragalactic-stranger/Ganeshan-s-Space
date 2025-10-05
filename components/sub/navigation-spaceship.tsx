"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  "about-me",
  "skills",
  "projects",
  "certifications",
  "achievements",
  "blog",
];

export const NavigationSpaceship = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Detect current section based on scroll position
    const handleScroll = () => {
      if (isNavigating) return;

      const sections = SECTIONS.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavigating]);

  const handleClick = async () => {
    if (isDragging || isNavigating) return;

    setIsNavigating(true);

    // Calculate next section
    const nextIndex = (currentSectionIndex + 1) % SECTIONS.length;
    const nextSectionId = SECTIONS[nextIndex];
    const nextSection = document.getElementById(nextSectionId);

    if (nextSection) {
      // Get target position
      const rect = nextSection.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - 100;

      // Animate rocket flying up and rotating
      await controls.start({
        y: -100,
        rotate: -15,
        scale: 1.2,
        transition: { duration: 0.4, ease: "easeOut" },
      });

      // Scroll to next section smoothly
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });

      // Wait for scroll to complete
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Animate rocket flying back to center
      await controls.start({
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      setCurrentSectionIndex(nextIndex);
    }

    setIsNavigating(false);
  };

  return (
    <motion.div
      drag={!isNavigating}
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover={{ scale: 1.05, cursor: isNavigating ? "default" : "grab" }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      onClick={handleClick}
      animate={controls}
      className="fixed bottom-20 right-20 z-[100] w-32 h-32 flex items-center justify-center"
      style={{ touchAction: "none" }}
    >
      {/* Spaceship container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ion trail - appears when navigating */}
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute top-[65%] left-1/2 -translate-x-1/2 w-20 h-40 origin-top"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(100, 200, 255, 0.8) 0%, rgba(80, 160, 255, 0.6) 20%, rgba(255, 140, 60, 0.4) 50%, rgba(255, 100, 50, 0.2) 70%, transparent 100%)",
              filter: "blur(12px)",
            }}
          />
        )}

        {/* Sleek futuristic spaceship */}
        <div className="relative w-24 h-28">
          {/* Main hull - streamlined design */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-24">
            {/* Nose section */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-16"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1729 100%)",
                clipPath: "polygon(50% 0%, 100% 40%, 90% 100%, 10% 100%, 0% 40%)",
                boxShadow: "0 0 20px rgba(100, 150, 255, 0.3), inset 0 0 20px rgba(100, 150, 255, 0.1)",
              }}
            />

            {/* Cockpit window */}
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[12%] left-1/2 -translate-x-1/2 w-8 h-6 z-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(100, 200, 255, 0.9) 0%, rgba(60, 140, 255, 0.7) 40%, rgba(40, 100, 200, 0.4) 80%, transparent 100%)",
                clipPath: "polygon(50% 0%, 85% 100%, 15% 100%)",
                filter: "blur(0.5px)",
                boxShadow: "0 0 15px rgba(100, 200, 255, 0.8)",
              }}
            />

            {/* Body section */}
            <div
              className="absolute top-[38%] left-1/2 -translate-x-1/2 w-14 h-16"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #0f1729 50%, #0a0e1a 100%)",
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
                boxShadow: "inset 0 0 15px rgba(100, 150, 255, 0.15)",
              }}
            />

            {/* Theme accent lines */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-12 h-[2px] theme-beam opacity-60" />
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-12 h-[2px] theme-beam-accent opacity-60" />
            
            {/* Tech panel details */}
            <div className="absolute top-[48%] left-[20%] w-2 h-2 bg-[#00d9ff] opacity-40 blur-[1px]" />
            <div className="absolute top-[48%] right-[20%] w-2 h-2 bg-[#00d9ff] opacity-40 blur-[1px]" />
          </div>

          {/* Wings - sleek angular design */}
          {/* Left wing */}
          <div
            className="absolute top-[50%] left-0 w-10 h-12 z-0"
            style={{
              background: "linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(15, 23, 41, 0.7) 100%)",
              clipPath: "polygon(100% 0%, 100% 100%, 0% 80%, 0% 20%)",
              boxShadow: "0 0 10px rgba(255, 107, 53, 0.0)",
            }}
          >
            <div
              className="absolute top-[30%] right-0 w-full h-[2px]"
              style={{
                background: "linear-gradient(to left, var(--primary), transparent)",
              }}
            />
          </div>

          {/* Right wing */}
          <div
            className="absolute top-[50%] right-0 w-10 h-12 z-0"
            style={{
              background: "linear-gradient(225deg, rgba(26, 26, 46, 0.9) 0%, rgba(15, 23, 41, 0.7) 100%)",
              clipPath: "polygon(0% 0%, 0% 100%, 100% 80%, 100% 20%)",
              boxShadow: "0 0 10px rgba(255, 107, 53, 0.0)",
            }}
          >
            <div
              className="absolute top-[30%] left-0 w-full h-[2px]"
              style={{
                background: "linear-gradient(to right, var(--primary), transparent)",
              }}
            />
          </div>

          {/* Ion thrusters */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-8 flex justify-center gap-2">
            {/* Left thruster */}
            <div
              className="relative w-4 h-8"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #0a0e1a 100%)",
                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                boxShadow: "inset 0 0 10px rgba(100, 200, 255, 0.3)",
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scaleY: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 w-full h-3"
                style={{
                  background: "radial-gradient(ellipse at top, rgba(100, 200, 255, 1) 0%, rgba(80, 160, 255, 0.8) 50%, rgba(60, 120, 200, 0.4) 100%)",
                  filter: "blur(1px)",
                }}
              />
            </div>

            {/* Center thruster */}
            <div
              className="relative w-5 h-10"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #0a0e1a 100%)",
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
                boxShadow: "inset 0 0 10px rgba(255, 140, 60, 0.4)",
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.9, 1, 0.9],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 w-full h-4"
                style={{
                  background: "radial-gradient(ellipse at top, rgba(255, 200, 100, 1) 0%, rgba(255, 140, 60, 0.9) 40%, rgba(255, 100, 50, 0.5) 100%)",
                  filter: "blur(1px)",
                }}
              />
            </div>

            {/* Right thruster */}
            <div
              className="relative w-4 h-8"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #0a0e1a 100%)",
                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                boxShadow: "inset 0 0 10px rgba(100, 200, 255, 0.3)",
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scaleY: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute bottom-0 w-full h-3"
                style={{
                  background: "radial-gradient(ellipse at top, rgba(100, 200, 255, 1) 0%, rgba(80, 160, 255, 0.8) 50%, rgba(60, 120, 200, 0.4) 100%)",
                  filter: "blur(1px)",
                }}
              />
            </div>
          </div>

          {/* Ion particles */}
          <motion.div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 flex justify-between px-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, 12, 24],
                  opacity: [0.9, 0.6, 0],
                  scale: [1, 0.8, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.15,
                }}
                className="w-2 h-2"
                style={{
                  background: i === 1 
                    ? "radial-gradient(circle, rgba(255, 180, 80, 1), rgba(255, 140, 60, 0.8), transparent)"
                    : "radial-gradient(circle, rgba(100, 200, 255, 1), rgba(80, 160, 255, 0.8), transparent)",
                  filter: "blur(1px)",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--primary) 40%, transparent) 0%, color-mix(in srgb, var(--primary) 25%, transparent) 50%, transparent 70%)",
              filter: "blur(15px)",
            }}
        />

        {/* Click hint */}
        {!isDragging && !isNavigating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: [10, 0, -5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-accent text-xs font-light pointer-events-none text-center"
          >
            Click to fly 🚀
            <br />
            <span className="text-[10px] text-gray-400">
              Section {currentSectionIndex + 1}/{SECTIONS.length}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
