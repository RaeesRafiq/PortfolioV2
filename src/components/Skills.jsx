/**
 * @file Skills.jsx
 * @description Technical arsenal section. Displays categorized skill cards
 * with 3D tilt interactions and a placeholder for continuous learning.
 */

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillCarousel from "./SkillCarousel";

/**
 * SkillCard Component
 * Implements a 3D tilt effect and displays a list of specific technologies.
 *
 * @param {Object} props
 * @param {string} props.icon - Material symbol name for the category icon.
 * @param {string} props.title - Skill category title.
 * @param {string[]} props.skills - List of technologies/skills.
 * @param {boolean} props.isPlaceholder - Whether to render as an 'Always Learning' card.
 */
const SkillCard = ({ icon, title, skills, isPlaceholder = false }) => {
  const cardRef = useRef(null);

  // Motion values for normalized tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-damped physics for smooth tilt transitions
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapping coordinate deltas to degree rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  /**
   * Updates motion values based on cursor position relative to the card dimensions.
   */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  /**
   * Resets card to neutral orientation on mouse exit.
   */
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isPlaceholder) {
    return (
      <div className="bg-card-bg/50 p-10 border border-on-surface/15 flex flex-col items-center justify-center min-h-75 transition-all duration-700">
        <span className="material-symbols-outlined text-primary/20 text-5xl mb-6">
          view_in_ar
        </span>
        <p className="dm-mono text-[10px] text-on-surface/20 tracking-[0.3em] uppercase transition-all duration-700">
          // ALWAYS LEARNING...
        </p>
      </div>
    );
  }

  return (
    <div
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="bg-card-bg p-10 border border-on-surface/15 shadow-[8px_8px_0px_0px_var(--primary)] transition-shadow duration-300 hover:shadow-[10px_10px_0px_0px_var(--primary)] h-full flex flex-col group"
      >
        {/* Category Header with Icon and Title */}
        <div
          className="flex items-center gap-6 mb-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="w-14 h-14 bg-background border border-on-surface/15 flex items-center justify-center group-hover:border-primary/40 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
              {icon}
            </span>
          </div>
          <h3 className="syne-800 text-xl text-on-surface uppercase tracking-wider">
            {title}
          </h3>
        </div>

        {/* Distributed Technology Tags */}
        <div
          className="flex flex-wrap gap-2"
          style={{ transform: "translateZ(30px)" }}
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-on-surface/5 text-on-surface/60 dm-mono text-[9px] px-3 py-1.5 uppercase tracking-wider border border-on-surface/15 hover:border-primary/30 hover:text-primary transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
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

/**
 * Skills Component
 * @returns {JSX.Element} The rendered Skills section.
 */
const Skills = () => {
  const categories = [
    {
      title: "Frontend Development",
      icon: "terminal",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Zustand",
        "TanStack Query",
        "Framer Motion",
        "Shadcn UI",
        "Vite",
      ],
    },
    {
      title: "Mobile Engineering",
      icon: "smartphone",
      skills: [
        "Flutter",
        "Dart",
        "Riverpod",
        "Material Design",
        "Mobile UI/UX",
        "Native Integration",
      ],
    },
    {
      title: "Backend & Database",
      icon: "database",
      skills: [
        "Node.js",
        "Firebase",
        "MongoDB",
        "Hive",
        "REST APIs",
        "PostgreSQL",
        "Auth Systems",
      ],
    },
    {
      title: "Web3 & Intelligence",
      icon: "memory",
      skills: [
        "Aptos",
        "Move Lang",
        "AI Integration",
        "Prompt Engineering",
        "Smart Contracts",
        "Web3.js",
      ],
    },
    {
      title: "Tools & Ecosystem",
      icon: "architecture",
      skills: [
        "Git",
        "GitHub",
        "Figma",
        "Vitest",
        "Vercel",
        "Docker",
        "Postman",
        "Linux CLI",
      ],
    },
  ];

  return (
    <section
      className="min-h-screen py-16 md:py-32 px-8 md:px-24 bg-surface"
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-24">
          <p className="dm-mono text-primary mb-4 text-xs tracking-widest uppercase">
            // CAPABILITIES
          </p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sentence}
            className="syne-800 text-5xl md:text-7xl text-on-surface"
          >
            {"Technical Arsenal".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Infinite Skill Carousel Teaser */}
        <div className="mb-16 md:mb-32">
          <SkillCarousel />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={itemVariants}>
              <SkillCard
                icon={cat.icon}
                title={cat.title}
                skills={cat.skills}
              />
            </motion.div>
          ))}
          {/* Always Learning placeholder for visual balance */}
          <motion.div variants={itemVariants}>
            <SkillCard isPlaceholder={true} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
