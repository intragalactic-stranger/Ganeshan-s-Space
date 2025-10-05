"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const DraggableMoon = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="relative w-[400px] h-[400px] flex items-center justify-center"
      style={{ touchAction: "none" }}
    >
      {/* Outer glow - soft blue */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-full h-full rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180, 210, 240, 0.15) 0%, rgba(140, 180, 220, 0.1) 40%, rgba(100, 150, 200, 0.05) 70%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* Moon sphere */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 40px 15px rgba(180, 210, 240, 0.3), 0 0 80px 30px rgba(140, 180, 220, 0.2)",
            "0 0 50px 20px rgba(200, 220, 250, 0.4), 0 0 100px 40px rgba(160, 200, 240, 0.25)",
            "0 0 40px 15px rgba(180, 210, 240, 0.3), 0 0 80px 30px rgba(140, 180, 220, 0.2)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-64 h-64 rounded-full overflow-hidden"
        style={{
          background: "radial-gradient(circle at 35% 30%, #F8F9FA 0%, #E8EAF0 15%, #D8DCE8 30%, #C8CDD8 45%, #B0B5C8 60%, #989DB8 75%, #8085A0 90%, #686D88 100%)",
        }}
      >
        {/* Limb darkening */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, transparent 0%, transparent 40%, rgba(100, 105, 120, 0.2) 65%, rgba(80, 85, 100, 0.4) 80%, rgba(60, 65, 80, 0.6) 92%, rgba(40, 45, 60, 0.75) 98%)",
          }}
        />

        {/* Large craters */}
        {[
          { top: "25%", left: "45%", size: 45, depth: 0.6 },
          { top: "55%", left: "65%", size: 38, depth: 0.55 },
          { top: "42%", left: "22%", size: 35, depth: 0.5 },
          { top: "68%", left: "38%", size: 32, depth: 0.52 },
          { top: "32%", left: "72%", size: 28, depth: 0.48 },
        ].map((crater, i) => (
          <div
            key={`large-crater-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${crater.size}px`,
              height: `${crater.size}px`,
              top: crater.top,
              left: crater.left,
              background: `radial-gradient(circle at 40% 35%, 
                rgba(180, 185, 200, ${crater.depth * 0.3}) 0%, 
                rgba(130, 135, 150, ${crater.depth * 0.5}) 20%, 
                rgba(90, 95, 110, ${crater.depth * 0.7}) 50%, 
                rgba(60, 65, 80, ${crater.depth}) 80%, 
                rgba(40, 45, 60, ${crater.depth * 0.8}) 100%)`,
              boxShadow: `inset -2px -2px 8px rgba(0, 0, 0, ${crater.depth * 0.4}), inset 2px 2px 4px rgba(255, 255, 255, 0.1)`,
            }}
          >
            {/* Crater rim highlight */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 40%)",
              }}
            />
          </div>
        ))}

        {/* Medium craters */}
        {[
          { top: "18%", left: "28%", size: 22 },
          { top: "38%", left: "58%", size: 20 },
          { top: "62%", left: "52%", size: 18 },
          { top: "48%", left: "78%", size: 16 },
          { top: "72%", left: "22%", size: 19 },
          { top: "58%", left: "15%", size: 15 },
        ].map((crater, i) => (
          <div
            key={`medium-crater-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${crater.size}px`,
              height: `${crater.size}px`,
              top: crater.top,
              left: crater.left,
              background: "radial-gradient(circle, rgba(90, 95, 110, 0.6) 0%, rgba(60, 65, 80, 0.7) 60%, rgba(50, 55, 70, 0.5) 100%)",
              boxShadow: "inset -1px -1px 4px rgba(0, 0, 0, 0.4), inset 1px 1px 2px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}

        {/* Small craters - scattered */}
        {[...Array(15)].map((_, i) => {
          const positions = [
            { top: "15%", left: "52%" }, { top: "22%", left: "68%" },
            { top: "35%", left: "38%" }, { top: "48%", left: "48%" },
            { top: "52%", left: "28%" }, { top: "65%", left: "58%" },
            { top: "75%", left: "45%" }, { top: "28%", left: "82%" },
            { top: "45%", left: "12%" }, { top: "82%", left: "65%" },
            { top: "38%", left: "88%" }, { top: "58%", left: "72%" },
            { top: "68%", left: "82%" }, { top: "85%", left: "28%" },
            { top: "12%", left: "62%" },
          ];
          const pos = positions[i];
          const size = 6 + Math.random() * 8;
          
          return (
            <div
              key={`small-crater-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: pos.top,
                left: pos.left,
                background: "radial-gradient(circle, rgba(70, 75, 90, 0.5) 0%, rgba(50, 55, 70, 0.6) 70%, transparent 100%)",
                boxShadow: "inset -0.5px -0.5px 2px rgba(0, 0, 0, 0.3)",
              }}
            />
          );
        })}

        {/* Maria (dark plains) */}
        <div
          className="absolute rounded-full"
          style={{
            width: "80px",
            height: "90px",
            top: "35%",
            left: "50%",
            background: "radial-gradient(ellipse, rgba(70, 75, 90, 0.4) 0%, rgba(60, 65, 80, 0.3) 50%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />

        {/* Highlight - light reflection */}
        <motion.div
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            width: "120px",
            height: "120px",
            top: "15%",
            left: "20%",
            background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(245, 248, 255, 0.25) 20%, rgba(235, 240, 250, 0.15) 40%, rgba(225, 232, 245, 0.08) 60%, transparent 80%)",
            filter: "blur(20px)",
            borderRadius: "50%",
          }}
        />

        {/* Surface texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.1) 0%, transparent 3%),
              radial-gradient(circle at 45% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 2%),
              radial-gradient(circle at 65% 45%, rgba(255, 255, 255, 0.12) 0%, transparent 2.5%)
            `,
            filter: "blur(0.5px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
