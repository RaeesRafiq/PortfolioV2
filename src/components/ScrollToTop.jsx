/**
 * @file ScrollToTop.jsx
 * @description Utility component that provides a shortcut for page navigation. 
 * Features a lifecycle-aware visibility toggle based on scroll depth.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScrollToTop Component
 * @returns {JSX.Element} The rendered ScrollToTop button.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Evaluates the window's vertical scroll offset to toggle visibility.
   * Threshold set to 300px to avoid cluttering the initial viewport.
   */
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  /**
   * Triggers a smooth programmatic scroll to the top of the document.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Hooks into the window's scroll event for reactive visibility updates.
   */
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-14 h-14 bg-primary border-2 border-on-surface flex items-center justify-center shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
          style={{ zIndex: 100 }}
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined text-background text-3xl font-bold group-hover:-translate-y-1 transition-transform">
            arrow_upward
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

