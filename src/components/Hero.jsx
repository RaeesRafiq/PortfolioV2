/**
 * @file Hero.jsx
 * @description Hero section featuring a canvas-based particle engine,
 * a dynamic typewriter effect, and magnetic interaction components.
 */

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Particle class for the background canvas animation.
 * Handles movement, mouse interaction, and rendering logic.
 */
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  /**
   * Renders the particle on the canvas.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Updates particle position and handles proximity-based repulsion from the cursor.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {Object} mouse
   */
  update(ctx, canvasWidth, canvasHeight, mouse) {
    if (this.x > canvasWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvasHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }

    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= forceDirectionX * force * 5;
        this.y -= forceDirectionY * force * 5;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

/**
 * Framer Motion variants for UI staggered entrance.
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

/**
 * Professional designations for the typewriter effect.
 */
const ROLES = [
  "<FullStack Developer/>",
  "<Flutter Developer/>",
  "<React Engineer/>",
];

/**
 * Hero Component
 * @param {Object} props
 * @param {string} props.theme - Current application theme ('light'|'dark').
 */
const Hero = ({ theme }) => {
  const canvasRef = React.useRef(null);
  const [displayText, setDisplayText] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  /**
   * Manages the typewriter animation logic including typing, pausing, and deleting.
   */
  React.useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  /**
   * Canvas Particle Engine Initialization and Animation Loop.
   */
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 200 };

    /**
     * Resolves CSS variable colors for canvas rendering.
     */
    const getThemeColor = (varName) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    };

    function init() {
      particles = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        let color = getThemeColor("--primary");
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    /**
     * Draws connecting lines between particles based on proximity.
     */
    const connect = () => {
      let opacityValue = 1;
      const primaryColor = getThemeColor("--primary");
      const onSurfaceColor = getThemeColor("--on-surface");

      for (let a = 0; a < particles.length; a++) {
        particles[a].color = primaryColor;

        for (let b = a; b < particles.length; b++) {
          let distance =
            (particles[a].x - particles[b].x) *
              (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) *
              (particles[a].y - particles[b].y);

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;

            let dx_mouse_a = particles[a].x - mouse.x;
            let dy_mouse_a = particles[a].y - mouse.y;
            let distance_mouse_a = Math.sqrt(
              dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a,
            );

            if (mouse.x && distance_mouse_a < mouse.radius) {
              const hex = onSurfaceColor;
              const r = parseInt(hex.slice(1, 3), 16) || 255;
              const g = parseInt(hex.slice(3, 5), 16) || 255;
              const b_val = parseInt(hex.slice(5, 7), 16) || 255;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b_val}, ${opacityValue})`;
            } else {
              const hex = primaryColor;
              const r = parseInt(hex.slice(1, 3), 16) || 100;
              const g = parseInt(hex.slice(3, 5), 16) || 221;
              const b_val = parseInt(hex.slice(5, 7), 16) || 158;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b_val}, ${opacityValue})`;
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(ctx, canvas.width, canvas.height, mouse);
      }
      connect();
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Magnetic interaction logic for the call-to-action button
  const magneticRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const quickX = useSpring(x, springConfig);
  const quickY = useSpring(y, springConfig);

  const handleMagneticMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      magneticRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.1);
    y.set(distanceY * 0.1);
  };

  const handleMagneticLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center md:justify-end pb-12 md:pb-20 overflow-hidden bg-surface"
      id="hero"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        className="relative z-10 text-center pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="syne-800 text-5xl md:text-[8rem] leading-[0.9] tracking-tighter text-on-surface mb-8 md:mb-16 pointer-events-auto"
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {"Mohammad".split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
          <br />
          <span
            style={{
              WebkitTextStrokeWidth: "1.5px",
              WebkitTextStrokeColor: "var(--primary)",
              color: "transparent",
            }}
          >
            {"Rayees.".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          className="mb-12 md:mb-16 h-10 flex items-center justify-center"
          variants={fadeUpVariants}
        >
          <span className="dm-mono text-lg md:text-xl text-primary tracking-wider">
            {displayText}
            <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse"></span>
          </span>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-8 items-center justify-center pointer-events-auto"
          variants={fadeUpVariants}
        >
          <motion.div
            ref={magneticRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            style={{ x: quickX, y: quickY }}
            className="group"
          >
            <a
              className="relative px-12 py-6 bg-on-surface text-background font-bold tracking-[0.2em] uppercase text-sm border-2 border-primary shadow-[8px_8px_0px_0px_var(--primary)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center gap-3"
              href="#contact"
            >
              Download Resume
              <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">
                expand_more
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
