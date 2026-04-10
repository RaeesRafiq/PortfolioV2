import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiVite, SiFramer, 
  SiFlutter, SiDart, SiFirebase, SiMongodb, SiPostgresql, SiNodedotjs, 
  SiGit, SiGithub, SiFigma, SiDocker, SiVercel, SiLinux, SiPostman, 
  SiOpenai, SiSupabase, SiNextdotjs, SiRust, SiPython, SiGo, SiAppwrite
} from 'react-icons/si';

/**
 * SkillCarousel Component
 * Renders two rows of scrolling icons for technical skills.
 */
const SkillCarousel = () => {
  // Define skills for the two rows
  const row1 = [
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Vite", icon: SiVite },
    { name: "Framer Motion", icon: SiFramer },
    { name: "Flutter", icon: SiFlutter },
    { name: "Dart", icon: SiDart },
    { name: "Python", icon: SiPython },
  ];

  const row2 = [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Firebase", icon: SiFirebase },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Supabase", icon: SiSupabase },
    { name: "Appwrite", icon: SiAppwrite },
    { name: "Docker", icon: SiDocker },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Figma", icon: SiFigma },
    { name: "Vercel", icon: SiVercel },
    { name: "OpenAI", icon: SiOpenai },
    { name: "Rust", icon: SiRust },
    { name: "Go", icon: SiGo },
  ];

  // Helper to duplicate items for infinite scroll
  const duplicateItems = (items) => [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Side Masks for Fading Effect - Use explicit CSS variables for reliability */}
      <div 
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
      />

      <div className="flex flex-col gap-8">
        {/* Row 1: Right to Left */}
        <ScrollingRow items={row1} direction="rtl" speed={30} />
        
        {/* Row 2: Left to Right */}
        <ScrollingRow items={row2} direction="ltr" speed={35} />
      </div>
    </div>
  );
};

/**
 * ScrollingRow Component
 * Handles the infinite animation and hover effects for a single row.
 */
const ScrollingRow = ({ items, direction, speed }) => {
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className="flex group overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-8 py-4"
        animate={{
          x: direction === "rtl" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        // Pause animation on hover of the row container
        style={{
          display: 'flex',
          width: 'max-content'
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedItems.map((item, idx) => (
          <SkillIcon key={`${item.name}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * SkillIcon Component
 * Individual icon with pop-up effect and tooltip.
 */
const SkillIcon = ({ item }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center p-6 border rounded-xl transition-colors min-w-32 group/icon"
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--outline-variant)' 
      }}
      whileHover={{ 
        scale: 1.15, 
        y: -10,
        backgroundColor: "var(--surface-variant)",
        borderColor: "var(--primary)",
        transition: { type: "spring", stiffness: 400, damping: 10 } 
      }}
    >
      <Icon 
        className="text-4xl transition-colors duration-300" 
        style={{ color: 'var(--on-surface)', opacity: 0.6 }} 
      />
      <span className="absolute -bottom-2 opacity-0 group-hover/icon:opacity-100 group-hover/icon:bottom-2 transition-all duration-300 dm-mono text-[9px] text-primary uppercase tracking-widest whitespace-nowrap">
        {item.name}
      </span>
      
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover/icon:bg-primary/5 rounded-xl blur-lg transition-all duration-300" />
    </motion.div>
  );
};

export default SkillCarousel;
