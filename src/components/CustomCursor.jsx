/**
 * @file CustomCursor.jsx
 * @description Implements a global custom cursor with a "Lens" inversion effect.
 * Uses high-performance motion values and spring physics for smooth tracking.
 */

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor Component
 * @returns {JSX.Element|null} The cursor rendered via React Portal, or null if inactive.
 */
const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Normalized motion values for low-latency coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /**
   * Spring physics configuration for the trailing "Lens" sphere.
   * Fine-tuned for a high-tension, responsive follow effect.
   */
  const springConfig = { stiffness: 450, damping: 40, mass: 0.5 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  /**
   * Global event listeners to track system cursor position and interactive states.
   */
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLinkOrButton =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive");
      setIsHovering(!!isLinkOrButton);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  /**
   * Rendered via createPortal to document.body to ensure the cursor
   * always sits above all layout containers and bypasses stacking contexts.
   */
  return createPortal(
    <>
      {/* Precision Core: A high-contrast dot for exact interaction points */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 999999,
        }}
      />

      {/* Atmospheric Lens: An inverting sphere that scales on interactive focus */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none border border-primary/50 flex items-center justify-center cursor-lens"
        style={{
          x: lensX,
          y: lensY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          backgroundColor: "#ffffff", // White base required for the 'difference' mix-blend-mode
          zIndex: 999998,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />
    </>,
    document.body
  );
};

export default CustomCursor;

