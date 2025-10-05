"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  tags?: readonly string[];
  index?: number;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  tags = [],
  index = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="relative rounded-lg shadow-lg border project-card project-card-elevate theme-surface block h-full flex flex-col overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/70 focus-visible:ring-offset-black"
      >
        {/* Media / Hero Image */}
        <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden rounded-t-lg">
          <Image
            src={src}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover opacity-85 transition duration-300 group-hover:opacity-100"
            priority={index < 2}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition" />
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-5 md:p-6 flex flex-col gap-3">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] sm:text-xs px-2 py-1 rounded-full project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-4">
            {description}
          </p>

          <div className="mt-1 sm:mt-2 project-cta text-[11px] sm:text-sm font-medium inline-flex items-center">
            <span>View Project</span>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
