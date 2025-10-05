"use client";

import { motion } from "framer-motion";

import { ACHIEVEMENTS } from "@/constants";
import { slideInFromLeft } from "@/lib/motion";

export const Achievements = () => {
  return (
    <section
      id="achievements"
      className="flex flex-col items-center justify-center py-20 px-10 relative"
    >
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromLeft(0.5)}
  className="text-[40px] font-semibold py-10"
      >
        <span className="heading-gradient">Achievements & Recognition</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {ACHIEVEMENTS.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="panel-card rounded-lg border backdrop-blur-sm p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {achievement.title}
                  </h3>
                  <span className="text-accent text-sm font-medium">
                    {achievement.year}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
