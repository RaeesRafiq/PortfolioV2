/**
 * @file Contact.jsx
 * @description Contact section featuring a 3D tilt-interactive form 
 * and integration with Web3Forms for inquiry handling.
 */

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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
 * Contact Component
 * @returns {JSX.Element} The rendered Contact section.
 */
const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  // Motion values for normalized tracking (used for 3D tilt effect)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-damped physics for smooth tilt transitions
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapping coordinate deltas to degree rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  /**
   * Updates motion values based on cursor position relative to the form dimensions.
   */
  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
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

  /**
   * Handles asynchronous form submission to Web3Forms API.
   * @param {React.FormEvent} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    // Integration Access Key for Web3Forms API
    formData.append("access_key", "f89d470f-951c-4674-b9ad-1173ed542fa4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      className="min-h-screen py-16 md:py-32 px-8 md:px-24 bg-surface relative"
      id="contact"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="dm-mono text-sm text-primary tracking-widest">
              // AVAILABLE_FOR_PROJECTS
            </span>
          </div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sentence}
            className="syne-800 text-5xl md:text-7xl text-on-surface mb-8 md:mb-12"
          >
            {"Let's build".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            {"something".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            {"together.".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <p className="dm-mono text-sm text-primary uppercase tracking-widest mb-6">
            // CONNECT
          </p>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex flex-wrap gap-6 text-on-surface"
          >
            <motion.a
              variants={itemVariants}
              className="w-16 h-16 bg-on-surface border-2 border-on-surface shadow-[6px_6px_0px_0px_var(--primary)] flex items-center justify-center hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all group"
              href="https://github.com/RaeesRafiq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <svg
                className="w-8 h-8 text-background transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a
              variants={itemVariants}
              className="w-16 h-16 bg-on-surface border-2 border-on-surface shadow-[6px_6px_0px_0px_var(--primary)] flex items-center justify-center hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all group"
              href="https://linkedin.com/in/raees-rafiq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="w-8 h-8 text-background transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
            <motion.a
              variants={itemVariants}
              className="w-16 h-16 bg-on-surface border-2 border-on-surface shadow-[6px_6px_0px_0px_var(--primary)] flex items-center justify-center hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all group"
              href="https://www.instagram.com/iamraeesrafiq/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="w-8 h-8 text-background transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              variants={itemVariants}
              className="w-16 h-16 bg-on-surface border-2 border-on-surface shadow-[6px_6px_0px_0px_var(--primary)] flex items-center justify-center hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all group"
              href="https://t.me/rae3s_rafiq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <svg
                className="w-8 h-8 text-background transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.52.257l.202-3.05 5.564-5.029c.241-.215-.053-.332-.37-.123L6.891 13.06l-2.957-.924c-.643-.204-.658-.643.136-.953l11.57-4.458c.538-.196 1.006.128.854.496z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={itemVariants}
          className="perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={formRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-card-bg p-12 border-2 border-primary/20 shadow-[12px_12px_0px_0px_var(--color-primary)]"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div
                className="space-y-3"
                style={{ transform: "translateZ(40px)" }}
              >
                <input
                  required
                  name="name"
                  className="w-full bg-surface border-0 border-b border-on-surface/10 focus:border-primary focus:ring-0 text-on-surface px-4 py-4 transition-colors placeholder-on-surface/30"
                  placeholder="YOUR NAME"
                  type="text"
                />
              </div>
              <div
                className="space-y-3"
                style={{ transform: "translateZ(30px)" }}
              >
                <input
                  required
                  name="email"
                  className="w-full bg-surface border-0 border-b border-on-surface/10 focus:border-primary focus:ring-0 text-on-surface px-4 py-4 transition-colors placeholder-on-surface/30"
                  placeholder="EMAIL ADDRESS"
                  type="email"
                />
              </div>
              <div
                className="space-y-3"
                style={{ transform: "translateZ(20px)" }}
              >
                <textarea
                  required
                  name="message"
                  className="w-full bg-surface border-0 border-b border-on-surface/10 focus:border-primary focus:ring-0 text-on-surface px-4 py-4 transition-colors resize-none placeholder-on-surface/30"
                  placeholder="MESSAGE"
                  rows="4"
                ></textarea>
              </div>
              <div style={{ transform: "translateZ(50px)" }}>
                <button
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full py-5 font-bold tracking-widest uppercase text-sm border-2 transition-all relative overflow-hidden group
                    ${status === "success" ? "bg-primary text-background border-on-surface" : "bg-primary text-background border-on-surface shadow-[6px_6px_0px_0px_var(--color-primary)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5"}
                    ${status === "submitting" ? "opacity-70 cursor-wait" : ""}
                  `}
                  type="submit"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Send Message
                      </motion.span>
                    )}
                    {status === "submitting" && (
                      <motion.span
                        key="submitting"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Sending...
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined font-bold">
                          check_circle
                        </span>
                        Sent Successfully
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-900"
                      >
                        Error! Try again.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

