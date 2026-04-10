/**
 * @file About.jsx
 * @description About section component. Displays a biographical summary
 * with staggered text entrance animations.
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * About Component
 * @returns {JSX.Element} The rendered About section.
 */
const About = () => {
  /**
   * Animation variants for the title and paragraph content.
   */
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const bioVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      className="py-16 md:py-32 px-8 md:px-24 bg-surface relative overflow-hidden flex items-center justify-center min-h-[70vh]"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Animated Title Section */}
        <div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sentence}
            className="syne-800 text-5xl md:text-7xl text-on-surface leading-tight"
          >
            {"The person".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            {"behind the".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            {"code base.".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Biographical Description Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={bioVariants}
          className="space-y-8"
        >
          <motion.div className="space-y-6 text-lg md:text-xl text-on-surface/80 leading-relaxed max-w-xl">
            <motion.p variants={bioVariants}>
              I'm a passionate developer specializing in high-performance
              full-stack applications, with a deep interest in building clean,
              resilient, and user-centric digital experiences. My approach
              bridges the gap between complex backend systems and sophisticated
              user interfaces, rooted in the philosophy that software should be
              as intuitive as it is technically rigorous.
            </motion.p>
            <motion.p variants={bioVariants}>
              With a foundation in Computer Science and experience across mobile
              and web platforms, I believe in the power of minimal design and
              well-crafted code to communicate ideas effectively—blending
              architectural integrity with a unique creative sensibility.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
