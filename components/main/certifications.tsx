"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { CERTIFICATIONS } from "@/constants";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="flex flex-col items-center justify-center py-20 px-10"
    >
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromLeft(0.5)}
        className="text-[40px] font-semibold py-10"
      >
        <span className="heading-gradient">Certifications</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight(index * 0.2)}
            className="panel-card rounded-lg border backdrop-blur-sm p-6"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 relative cert-badge">
                <span className="text-4xl">🏅</span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                <p className="text-accent text-xs">{cert.date}</p>
              </div>

              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2 text-sm bg-transparent border cert-cta text-white rounded-lg"
              >
                View Credential
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
