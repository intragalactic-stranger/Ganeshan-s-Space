"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BLOG_POSTS } from "@/constants";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Blog = () => {
  return (
    <section
      id="blog"
      className="flex flex-col items-center justify-center py-20 px-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 mb-10"
      >
        <motion.h1
          variants={slideInFromLeft(0.5)}
    className="text-[40px] font-semibold"
        >
          <span className="heading-gradient">Blog & Articles</span>
        </motion.h1>
        <motion.p
          variants={slideInFromRight(0.5)}
          className="text-gray-400 text-center max-w-2xl"
        >
          Insights on GenAI, LLMs, and building production-ready AI systems
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="panel-card rounded-lg border backdrop-blur-sm"
          >
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="aspect-video w-full rounded-md blog-media">
                <span className="text-6xl">📝</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full blog-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-10"
      >
        <Link
          href="https://medium.com/@ganeshanarumuganainar"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 button-primary text-white rounded-lg hover:scale-105 transition-transform inline-block"
        >
          View All Articles
        </Link>
      </motion.div>
    </section>
  );
};
