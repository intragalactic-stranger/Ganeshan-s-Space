"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const DraggableSun = () => {
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
      className="relative w-[500px] h-[500px] flex items-center justify-center"
      style={{ touchAction: "none" }}
    >
      {/* Outermost atmospheric glow - very soft */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-full h-full rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 220, 100, 0.15) 0%, rgba(255, 150, 60, 0.1) 30%, rgba(255, 80, 40, 0.05) 60%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Second atmospheric layer */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute w-[90%] h-[90%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 200, 80, 0.25) 0%, rgba(255, 140, 60, 0.18) 40%, rgba(220, 80, 40, 0.1) 70%, transparent 100%)",
          filter: "blur(50px)",
        }}
      />

      {/* Corona layer - soft emission */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute w-[75%] h-[75%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 220, 100, 0.4) 0%, rgba(255, 160, 70, 0.3) 50%, rgba(255, 100, 50, 0.15) 80%, transparent 100%)",
          filter: "blur(35px)",
        }}
      />

      {/* Photosphere - main visible surface */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 80px 30px rgba(255, 200, 80, 0.6), 0 0 120px 50px rgba(255, 140, 60, 0.4), 0 0 180px 80px rgba(255, 100, 50, 0.2)",
            "0 0 100px 40px rgba(255, 220, 100, 0.7), 0 0 140px 60px rgba(255, 160, 70, 0.5), 0 0 200px 90px rgba(255, 120, 60, 0.25)",
            "0 0 80px 30px rgba(255, 200, 80, 0.6), 0 0 120px 50px rgba(255, 140, 60, 0.4), 0 0 180px 80px rgba(255, 100, 50, 0.2)",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-80 h-80 rounded-full overflow-hidden"
        style={{
          background: "radial-gradient(circle at 38% 35%, #FFFFF5 0%, #FFFEF0 5%, #FFFAEA 10%, #FFF5E0 15%, #FFEFD5 20%, #FFE8C8 25%, #FFDFB8 30%, #FFD5A5 35%, #FFC990 40%, #FFBC78 45%, #FFAD60 50%, #FF9D48 55%, #FF8C35 60%, #FF7A28 65%, #FF691D 70%, #F55D18 75%, #E85214 80%, #D84812 85%, #C43F10 90%, #B0360E 95%, #9C2D0C 100%)",
        }}
      >
        {/* Natural limb darkening - smooth gradient for realistic 3D sphere */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 35%, transparent 0%, transparent 20%, rgba(240, 120, 50, 0.05) 40%, rgba(220, 100, 40, 0.12) 55%, rgba(200, 80, 30, 0.22) 65%, rgba(180, 60, 25, 0.35) 75%, rgba(150, 45, 20, 0.50) 83%, rgba(120, 35, 15, 0.65) 90%, rgba(90, 25, 10, 0.78) 95%, rgba(60, 15, 8, 0.88) 98%)",
          }}
        />

        {/* Atmospheric depth layer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse 90% 92% at 38% 35%, transparent 0%, transparent 35%, rgba(255, 150, 70, 0.03) 50%, rgba(255, 120, 60, 0.08) 70%, rgba(240, 100, 50, 0.15) 85%, rgba(220, 80, 40, 0.25) 95%)",
          }}
        />

        {/* Soft highlight - natural light source */}
        <motion.div
          animate={{
            opacity: [0.7, 0.85, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            width: "180px",
            height: "180px",
            top: "12%",
            left: "18%",
            background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 254, 250, 0.32) 15%, rgba(255, 252, 245, 0.22) 30%, rgba(255, 248, 235, 0.14) 45%, rgba(255, 245, 225, 0.08) 60%, rgba(255, 240, 215, 0.04) 75%, transparent 100%)",
            filter: "blur(30px)",
            borderRadius: "50%",
          }}
        />

        {/* Subtle surface variations - very soft */}
        <motion.div
          animate={{
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 140px 160px at 28% 32%, rgba(255, 250, 240, 0.12) 0%, transparent 65%),
              radial-gradient(ellipse 120px 140px at 52% 45%, rgba(255, 245, 235, 0.09) 0%, transparent 65%),
              radial-gradient(ellipse 100px 120px at 45% 65%, rgba(255, 248, 238, 0.08) 0%, transparent 65%),
              radial-gradient(ellipse 90px 110px at 68% 55%, rgba(255, 246, 236, 0.07) 0%, transparent 65%)
            `,
            filter: "blur(35px)",
          }}
        />

        {/* Gentle energy flow */}
        <motion.div
          animate={{
            opacity: [0.08, 0.15, 0.08],
            rotate: [0, 360],
          }}
          transition={{
            opacity: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 200, repeat: Infinity, ease: "linear" },
          }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 160px 80px at 50% 30%, rgba(255, 245, 220, 0.08) 0%, transparent 70%),
              radial-gradient(ellipse 140px 70px at 50% 70%, rgba(255, 240, 215, 0.06) 0%, transparent 70%)
            `,
            filter: "blur(30px)",
          }}
        />

        {/* Chromosphere - natural atmospheric edge */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 35%, transparent 0%, transparent 85%, rgba(255, 140, 80, 0.18) 91%, rgba(255, 120, 70, 0.22) 94%, rgba(255, 100, 60, 0.20) 97%, rgba(240, 90, 50, 0.15) 99%, transparent 100%)",
          }}
        />

        {/* Subtle inner shadow for depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 60px rgba(255, 140, 70, 0.15), inset 0 0 100px rgba(255, 110, 50, 0.10)",
          }}
        />

        {/* Minimal brightness variations - ultra subtle */}
        <motion.div
          animate={{
            opacity: [0.05, 0.10, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 35% 40%, rgba(255, 255, 250, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 55% 30%, rgba(255, 252, 245, 0.06) 0%, transparent 22%),
              radial-gradient(circle at 48% 58%, rgba(255, 250, 242, 0.07) 0%, transparent 20%)
            `,
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Coronal streamers - plasma loops */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 180,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[85%] h-[85%]"
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <motion.div
            key={`streamer-${angle}`}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            className="absolute top-1/2 left-1/2 w-3 h-[120%] origin-bottom"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              background: "linear-gradient(to top, rgba(255, 180, 80, 0.4) 0%, rgba(255, 140, 60, 0.25) 30%, rgba(255, 100, 50, 0.1) 60%, transparent 100%)",
              filter: "blur(12px)",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
