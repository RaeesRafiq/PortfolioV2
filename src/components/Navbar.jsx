/**
 * @file Navbar.jsx
 * @description Sticky header navigation with active section tracking
 * via Intersection Observer and theme toggle functionality.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar Component
 * @param {Object} props
 * @param {string} props.theme - Current theme ('light'|'dark').
 * @param {Function} props.toggleTheme - Callback to switch theme.
 */
const Navbar = ({ theme, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Monitor scroll position and update active navigation link.
   */
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "education",
      "experience",
      "projects",
      "skills",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/15">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto">
        {/* Branding Branding & Logo */}
        <div className="flex justify-start">
          <div className="syne-800 text-xl text-on-surface tracking-tighter">
            MR<span className="text-primary">.</span>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <div className="hidden lg:flex gap-6 xl:gap-12 items-center justify-center absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveSection(link.id)}
              className={`relative transition-colors font-brand uppercase text-[11px] xl:text-[12px] tracking-[0.2em] pb-1 ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-on-surface/60 hover:text-on-surface"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute -bottom-6.5 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Actions Container */}
        <div className="flex justify-end items-center gap-4">
          {/* Theme Mode Toggle Interaction */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-10 h-10 border-2 border-on-surface bg-card-bg shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group overflow-hidden relative flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`material-symbols-outlined absolute ${
                  theme === "dark" ? "text-on-surface" : "text-primary"
                }`}
              >
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 border-2 border-on-surface bg-card-bg shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-on-surface">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-on-surface/15 bg-surface/95 backdrop-blur-xl"
          >
            <div className="px-8 py-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-brand uppercase text-sm tracking-[0.2em] transition-colors ${
                    activeSection === link.id
                      ? "text-primary"
                      : "text-on-surface/60 hover:text-on-surface"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
