/**
 * @file App.jsx
 * @description Main application entry point for the portfolio.
 * Handles global state, theme management, and smooth scroll initialization.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

// Component Imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import GitHubPulse from "./components/GitHubPulse";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";

/**
 * Design system tokens mapped to light and dark themes.
 */
const themeColors = {
  dark: {
    "--surface": "#000000",
    "--on-surface": "#e7e5e8",
    "--surface-container": "#0a0a0b",
    "--surface-variant": "#121214",
    "--on-surface-variant": "#acaaae",
    "--primary": "#3dba7f",
    "--on-primary": "#000000",
    "--background": "#000000",
    "--on-background": "#ffffff",
    "--outline": "#303030",
    "--outline-variant": "#48484b",
    "--card-bg": "#0a0a0b",
  },
  light: {
    "--surface": "#f0eee8",
    "--on-surface": "#0a0a0b",
    "--surface-container": "#e7e5e0",
    "--surface-variant": "#dedcd5",
    "--on-surface-variant": "#48484b",
    "--primary": "#1b8d56",
    "--on-primary": "#ffffff",
    "--background": "#f0eee8",
    "--on-background": "#0a0a0b",
    "--outline": "#0a0a0b",
    "--outline-variant": "#a7a5a0",
    "--card-bg": "#ffffff",
  }
};

/**
 * Root Application Component
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  const [theme, setTheme] = useState("dark");

  /**
   * Sync theme state with document class list for global CSS targeting.
   */
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, [theme]);

  /**
   * Toggles between 'light' and 'dark' themes.
   */
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  /**
   * Initialize Lenis for smooth momentum scrolling.
   */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      animate={themeColors[theme]}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <GitHubPulse theme={theme} />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  );
}

export default App;

