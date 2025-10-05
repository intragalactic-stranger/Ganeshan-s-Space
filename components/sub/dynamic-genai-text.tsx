"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * DynamicGenAIText
 * Replaces the static "Generative AI" span with a cycling set of phrases.
 * Sequence:
 *  - Show current phrase (no animation) for displayDuration.
 *  - Trigger a left→right shooting star while text is "wiped" via clip-path.
 *  - After wipe completes, swap to next phrase and instantly reveal it.
 *  - Repeat.
 * Styling: Keeps existing gradient styling by reusing the `genai-emphasis` class.
 */
export const DynamicGenAIText: React.FC = () => {
  const phrases = ["Generative AI", "Agentic AI", "Machine Learning", "Deep Learning"]; // extendable
  const displayDuration = 2000; // ms phrase stays fully visible
  const starDuration = 900; // ms star flight & wipe
  const blankDelay = 1000; // ms blank gap AFTER star completes before showing next phrase

  type Phase = "display" | "transition" | "blank";
  const [phase, setPhase] = useState<Phase>("display");
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [width, setWidth] = useState(0);

  // Measure width based on longest phrase for layout stability
  useEffect(() => {
    if (!containerRef.current) return;
    const longest = phrases.reduce((a, b) => (a.length > b.length ? a : b));
    const temp = document.createElement("span");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.whiteSpace = "nowrap";
    temp.className = "genai-emphasis";
    temp.textContent = longest;
    containerRef.current.appendChild(temp);
    const w = temp.getBoundingClientRect().width;
    containerRef.current.removeChild(temp);
    setWidth(w);
  }, []);

  // Timers controlling phase transitions
  useEffect(() => {
    if (phase === "display") {
      const t = setTimeout(() => setPhase("transition"), displayDuration);
      return () => clearTimeout(t);
    }
    if (phase === "transition") {
      // After star flight completes, enter blank
      const t = setTimeout(() => setPhase("blank"), starDuration);
      return () => clearTimeout(t);
    }
    if (phase === "blank") {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("display");
      }, blankDelay);
      return () => clearTimeout(t);
    }
  }, [phase, displayDuration, starDuration, blankDelay, phrases.length]);

  const wiping = phase === "transition" || phase === "blank"; // text hidden when wiping/blank
  const clipTarget = wiping ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)";
  const clipDuration = phase === "transition" ? starDuration / 1000 : 0.28;

  return (
    <span
      ref={containerRef}
      className="relative inline-block align-middle"
      style={{ width: width || undefined }}
    >
      <motion.span
        key={index}
        className="genai-emphasis block will-change-[clip-path]"
        initial={{ clipPath: wiping ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)" }}
        animate={{ clipPath: clipTarget }}
        transition={{ duration: clipDuration, ease: "linear" }}
        style={{ whiteSpace: "nowrap" }}
      >
        {phrases[index]}
      </motion.span>

      <AnimatePresence>
        {phase === "transition" && (
          <motion.span
            key={`star-${index}`}
            aria-hidden
            className="shooting-star"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: (width || 0) + 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: starDuration / 1000, ease: "easeInOut" }}
            style={{ left: -40 }}
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default DynamicGenAIText;
