"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
        className="Welcome-box role-badge py-[8px] px-[10px] opacity-[0.92] flex items-center"
      >
        <SparklesIcon className="text-accent mr-2 h-5 w-5" />
        <h1 className="Welcome-text text-[13px] text-center tracking-wide uppercase">
          GenAI Stack & Cloud Technologies
        </h1>
      </motion.div>

      <motion.h2
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft(0.35)}
        className="mt-5 text-center font-semibold leading-tight text-2xl sm:text-3xl md:text-[2.25rem] text-white"
      >
        Building Production‑Ready GenAI Systems
      </motion.h2>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={slideInFromRight(0.55)}
        className="mt-4 max-w-2xl text-center text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed"
      >
        Focused execution across frameworks, scalable backends, cloud deployment and human‑centered interfaces.
      </motion.p>
    </div>
  );
};
