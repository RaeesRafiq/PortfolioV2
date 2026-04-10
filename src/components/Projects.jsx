/**
 * @file Projects.jsx
 * @description Featured projects gallery with interactive 3D tilt cards
 * and mouse-tracking focus effects.
 */

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Animation variants for structured text entrance.
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
 * ProjectCard Component
 * Implements a 3D tilt effect driven by cursor proximity.
 *
 * @param {Object} props
 * @param {string} props.title - Project title.
 * @param {string} props.description - Project summary.
 * @param {string[]} props.tags - Technology stack tags.
 */
const ProjectCard = ({ title, description, tags, liveLink, sourceLink }) => {
  const cardRef = useRef(null);

  // Motion values for normalized tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-damped physics for smooth tilt transitions
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapping coordinate deltas to degree rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  return (
    <div className="perspective-1000 relative group h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-card-bg p-10 h-full flex flex-col shadow-[8px_8px_0px_0px_var(--primary)] transition-shadow duration-300 hover:shadow-[10px_10px_0px_0px_var(--primary)] border border-on-surface/15"
      >
        <h3
          className="syne-800 text-3xl text-on-surface mb-4 underline decoration-2 underline-offset-8 decoration-on-surface/10 group-hover:decoration-primary transition-colors uppercase"
          style={{ transform: "translateZ(50px)" }}
        >
          {title}
        </h3>
        <p
          className="text-on-surface/70 mb-8 leading-relaxed grow"
          style={{ transform: "translateZ(40px)" }}
        >
          {description}
        </p>

        {/* Technology stack identifiers */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          style={{ transform: "translateZ(30px)" }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-on-surface/5 text-on-surface/60 dm-mono text-[9px] px-3 py-1.5 uppercase tracking-wider border border-on-surface/15 hover:border-primary/30 hover:text-primary transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action interfaces for source and deployment links */}
        <div className="flex gap-4" style={{ transform: "translateZ(20px)" }}>
          {sourceLink && (
            <a
              href={sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-on-surface/15 bg-background px-5 py-2.5 dm-mono text-[11px] font-bold uppercase text-on-surface hover:bg-primary hover:text-background transition-all shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-none"
            >
              <span className="material-symbols-outlined text-sm">folder</span>
              Source
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-on-surface/15 bg-background px-5 py-2.5 dm-mono text-[11px] font-bold uppercase text-on-surface hover:bg-primary hover:text-background transition-all shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-none"
            >
              <span className="material-symbols-outlined text-sm">
                open_in_new
              </span>
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Projects Component
 * @returns {JSX.Element} The rendered Projects section.
 */
const Projects = () => {
  const projects = [
    {
      title: "PORTFOLIOV2",
      description:
        "A high-performance Neo-Brutalist showcase featuring interactive 3D physics, custom Framer Motion dynamics, and a signature dark-mode aesthetic. Built for speed and visual impact.",
      tags: ["React", "Framer Motion", "Tailwind CSS", "Vite", "Lucide", "V0"],
      liveLink: "https://raeesrafiq-portfolio.vercel.app",
      sourceLink: "https://github.com/RaeesRafiq/PortfolioV2",
    },
    {
      title: "SmartQuack",
      description:
        "Gamified task manager featuring a reactive duck mascot that tracks your productivity progress across multiple platforms.",
      tags: ["Flutter", "Riverpod", "Firebase", "Hive", "Dart"],
    },
    {
      title: "HyperNode",
      description:
        "Distributed infrastructure monitor built for high-performance scale, featuring real-time node health metrics and visualization.",
      tags: ["Node.js", "GraphQL", "PostgreSQL", "Socket.io", "React"],
    },
    {
      title: "Vivid UI",
      description:
        "A comprehensive design system library for modern web applications, focusing on glassmorphism and accessibility standard compliance.",
      tags: [
        "Storybook",
        "TypeScript",
        "Vanilla CSS",
        "Rollup",
        "Accessibility",
      ],
    },
  ];

  return (
    <section
      className="min-h-screen py-16 md:py-32 px-8 md:px-24 bg-surface"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <p className="dm-mono text-primary mb-4 text-xs tracking-widest uppercase">
              // CURATED WORK
            </p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={sentence}
              className="syne-800 text-5xl md:text-7xl text-on-surface"
            >
              {"Featured Projects.".split("").map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
          <div className="dm-mono text-xs text-on-surface/40 max-w-xs">
            A selection of high-performance artifacts across web and mobile.
          </div>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 md:mb-24"
        >
          {projects.map((proj) => (
            <motion.div key={proj.title} variants={itemVariants}>
              <ProjectCard {...proj} />
            </motion.div>
          ))}
        </motion.div>

        {/* Global Repository Access Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="border-t border-on-surface/15 pt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-col items-start gap-4 text-on-surface dm-mono text-sm tracking-widest pb-4"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>VIEW_ALL_PROJECTS</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary shadow-[0_0_5px_var(--primary)]" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
