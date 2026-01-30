"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isQuizPage = pathname === "/quiz";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-black/50 backdrop-blur-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-lg md:text-xl font-bold transition-all duration-300 text-white hover:text-white/80"
          >
            Creator Conservatory
          </a>

          {/* Nav Links - only show on non-quiz pages */}
          {!isQuizPage && (
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#about"
                className="font-sans text-sm text-white/80 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="font-sans text-sm text-white/80 hover:text-white transition-colors"
              >
                What&apos;s Inside
              </a>
              <a
                href="#success-stories"
                className="font-sans text-sm text-white/80 hover:text-white transition-colors"
              >
                Success Stories
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {!isQuizPage && (
              <a
                href="/quiz"
                className="font-sans text-sm font-medium px-5 py-2 text-white border border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
              >
                Take the Creator Quiz
              </a>
            )}
            <a
              href="https://www.skool.com/the-creator-conservatory-3365"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium px-5 py-2 transition-all duration-300 rounded-full bg-white text-black hover:bg-white/90"
            >
              Join Free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
