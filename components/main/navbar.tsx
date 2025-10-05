'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#FF6B35]/30 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          className="flex items-center"
        >
          <div className="relative w-[50px] h-[50px] flex items-center justify-center">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFC845] animate-pulse">
              G
            </span>
          </div>
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300">Ganeshan Arumuganainar</div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#FF6B35]/40 bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[#FFC845] transition"
              >
                {link.title}
              </Link>
            ))}

            {/* Download CV */}
            <Link
              href="https://drive.google.com/file/d/1vpyX8Vqn7iwouOgXBqUWZmqKqe_uCqLq/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-[#FFC845] transition"
              aria-label="Download CV (opens in new tab)"
            >
              Download CV
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] border-t border-[#FF6B35]/30 p-5 flex flex-col items-center text-gray-300 md:hidden">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[#FFC845] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="https://drive.google.com/file/d/1vpyX8Vqn7iwouOgXBqUWZmqKqe_uCqLq/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-[#FFC845] transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Download CV (opens in new tab)"
            >
              Download CV
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};