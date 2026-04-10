/**
 * @file Experience.jsx
 * @description Professional experience component. Displays a structured
 * timeline of career milestones and technical contributions.
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * Experience Component
 * @returns {JSX.Element} The rendered Experience section.
 */
const Experience = () => {
  /**
   * Framer Motion variants for staggered entrance and blurred fade-ins.
   */
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

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

  return (
    <section
      className="min-h-screen py-16 md:py-32 px-8 md:px-24 bg-surface"
      id="experience"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Staggered Designation text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 gap-8"
        >
          <div>
            <p className="dm-mono text-primary mb-4 text-xs tracking-widest uppercase">
              // EVOLUTION
            </p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={sentence}
              className="syne-800 text-5xl md:text-6xl text-on-surface"
            >
              {"Experience.".split("").map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
          <div className="dm-mono text-xs text-on-surface/40 max-w-xs">
            A curated timeline of professional engagements and technical
            contributions.
          </div>
        </motion.div>

        {/* Experience Timeline Structure */}
        <div className="space-y-12 relative">
          {/* Central spine for the timeline layout on desktop viewports */}
          <div className="absolute left-50 top-0 bottom-0 w-px bg-on-surface/15 hidden md:block"></div>

          {/* Professional Milestone: Current/Latest Role */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={itemVariants}
            className="relative grid md:grid-cols-[200px_1fr] gap-8 md:gap-20 group"
          >
            <div className="dm-mono text-primary text-sm pt-2">
              Jan 2026 — PRESENT
            </div>
            <div className="pb-12 border-b border-on-surface/15">
              <div className="absolute left-49 top-3 w-2 h-2 bg-primary rounded-full hidden md:block group-hover:scale-150 transition-transform"></div>
              <h3 className="syne-800 text-3xl text-on-surface mb-2 uppercase">
                Front-End Developer
              </h3>
              <p className="dm-mono text-xs text-on-surface/40 mb-6 tracking-widest uppercase">
                @ Aseef IT Holding Co.
              </p>
              <ul className="space-y-3 text-on-surface/70 max-w-2xl">
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">01</span> Built
                  responsive and visually appealing web interfaces using React,
                  Tailwind CSS, and modern JavaScript.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">02</span> Translated
                  design mockups into functional UI components while ensuring
                  cross-browser and mobile responsiveness.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">03</span> Collaborated
                  on debugging and performance optimization to enhance the
                  overall user experience and clean code standards.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Professional Milestone: Previous Role */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={itemVariants}
            className="relative grid md:grid-cols-[200px_1fr] gap-8 md:gap-20 group"
          >
            <div className="dm-mono text-on-surface/40 text-sm pt-2">
              Aug 2024 — Jan 2025
            </div>
            <div className="pb-12 border-b border-on-surface/15">
              <div className="absolute left-49 top-3 w-2 h-2 bg-on-surface/20 rounded-full hidden md:block group-hover:bg-primary transition-colors"></div>
              <h3 className="syne-800 text-3xl text-on-surface mb-2 uppercase">
                Data Analyst
              </h3>
              <p className="dm-mono text-xs text-on-surface/40 mb-6 tracking-widest uppercase">
                @ Tellus International, Remote
              </p>
              <ul className="space-y-3 text-on-surface/70 max-w-2xl">
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">01</span> Analyzed and
                  interpreted large datasets of user queries to uncover
                  patterns, trends, and key insights.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">02</span> Delivered
                  actionable recommendations that improved decision-making and
                  streamlined business processes.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary dm-mono">03</span> Proactively
                  identified opportunities to enhance customer experience
                  through data-driven strategies.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
