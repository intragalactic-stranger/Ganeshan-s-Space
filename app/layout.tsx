import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { NavbarNew } from "@/components/main/navbar-new";
import { StarsCanvas } from "@/components/main/star-background";
import { ThemeProvider } from "@/contexts/theme-context";
import ChatRocket from "@/components/sub/chat-rocket";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
      </head>
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <ThemeProvider>
          <StarsCanvas />
          <NavbarNew />
          {children}
          <Footer />
          <ChatRocket />
        </ThemeProvider>
      </body>
    </html>
  );
}
