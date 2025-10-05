"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { NAV_LINKS, SOCIALS, LINKS } from "@/constants";
import { useTheme } from "@/contexts/theme-context";

export const NavbarNew = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Simple, reliable scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // Check on mount
    handleScroll();

    // Listen to scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-50 w-full"
      >
        <div className="relative">
          {/* Scroll-activated blur (no blur at top, blurred translucent after scroll) */}
          <div
            aria-hidden="true"
            data-scrolled={scrolled ? 'true' : 'false'}
            className="navbar-glass-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0,
              background: scrolled ? 'rgba(20,20,25,0.70)' : 'rgba(0,0,0,0)',
              backdropFilter: scrolled ? 'blur(60px) saturate(180%) brightness(110%)' : 'none',
              WebkitBackdropFilter: scrolled ? 'blur(60px) saturate(180%) brightness(110%)' : 'none',
              boxShadow: scrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : 'none',
              border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          
          {/* Theme-aware bottom border (explicit per theme) */}
          <div className="navbar-bottom-line" />

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo with Twinkling Effect */}
                            <Link
                href="/"
                className="flex items-center space-x-2 sm:space-x-3 pl-2 pr-1 py-1 -ml-1 rounded-md md:pl-0 md:pr-0 md:py-0 md:-ml-0 transition-colors"
                aria-label="Home"
              >
                {/* Twinkling Logo */}
                <div className="select-none logo-monogram" aria-label="G ninja star monogram">
                  <span className="logo-g">G</span><span className="logo-star" aria-hidden="true"></span>
                </div>

                {/* Name: show first name on small screens, full name on md+ */}
                <div className="flex items-center pt-0.5">
                  <span className="block md:hidden text-[17px] font-semibold tracking-wide text-white text-glow-hover leading-none">
                    Ganeshan
                  </span>
                  <span className="hidden md:block text-lg font-bold text-white text-glow-hover leading-none tracking-wide">
                    Ganeshan Arumuganainar
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links - Text glow on hover, NO backgrounds */}
              <div className="hidden lg:flex items-center space-x-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.link}
                      onClick={() => setActiveLink(link.link)}
                      className={`px-4 py-2 transition-colors ${
                        activeLink === link.link 
                          ? "text-primary text-glow-active" 
                          : "text-gray-300 text-glow-hover hover:text-white"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 }}
                >
                  <Link
                    href="https://drive.google.com/file/d/1vpyX8Vqn7iwouOgXBqUWZmqKqe_uCqLq/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-gray-300 text-glow-hover hover:text-white"
                    aria-label="Download CV (opens in new tab)"
                  >
                    Download CV
                  </Link>
                </motion.div>
              </div>

              {/* Right side actions - Icons with themed rings, sparkle only on hover */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle with themed ring */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full border-2 transition-all icon-sparkle-ring icon-glow theme-border"
                  aria-label="Toggle theme"
                >
                  {theme === "day" ? (
                    <MoonIcon className="w-5 h-5 text-primary" />
                  ) : (
                    <SunIcon className="w-5 h-5 text-primary" />
                  )}
                </motion.button>

                {/* Social Links - Desktop only with themed rings and sparkle on hover */}
                <div className="hidden lg:flex items-center space-x-2">
                  {SOCIALS.slice(0, 3).map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full border-2 transition-all icon-sparkle-ring icon-glow theme-border"
                    >
                      <social.icon className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>

                {/* Mobile/Tablet Menu Button with themed ring */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2.5 rounded-full border-2 transition-all theme-border"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <HiX className="w-6 h-6 text-accent" />
                  ) : (
                    <HiMenu className="w-6 h-6 text-accent" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <div className="relative h-full ml-auto w-full sm:w-80 bg-[#030014]/95 backdrop-blur-xl border-l-2 divider-soft">
              <div className="flex flex-col h-full p-6 pt-24">
                {/* Navigation Links with text glow, NO backgrounds */}
                <nav className="flex-1 space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.link}
                        onClick={() => {
                          setActiveLink(link.link);
                          setIsOpen(false);
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                          activeLink === link.link
                            ? "text-primary text-glow-active"
                            : "text-gray-300 text-glow-hover hover:text-white"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activeLink === link.link ? "bg-primary" : "bg-primary opacity-0"
                        } transition-opacity`} />
                        <span className="text-lg">{link.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.1 }}
                  >
                    <Link
                      href="https://drive.google.com/file/d/1vpyX8Vqn7iwouOgXBqUWZmqKqe_uCqLq/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 text-glow-hover hover:text-white"
                      aria-label="Download CV (opens in new tab)"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 transition-opacity" />
                      <span className="text-lg">Download CV</span>
                    </Link>
                  </motion.div>
                </nav>

                {/* Social Links with themed rings, sparkle only on hover */}
                <div className="pt-6 border-t divider-soft">
                  <p className="text-sm text-gray-400 mb-4">Connect with me</p>
                  <div className="flex items-center space-x-3 flex-wrap">
                    {SOCIALS.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full border-2 transition-all icon-sparkle-ring icon-glow theme-border"
                      >
                        <social.icon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
