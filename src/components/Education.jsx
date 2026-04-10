/**
 * @file Education.jsx
 * @description Education section component. Showcases academic background
 * using a structured timeline with animated entrance effects.
 */

import { motion } from "framer-motion";

/**
 * Animation variants for the section title.
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

/**
 * Education Component
 * @returns {JSX.Element} The rendered Education section.
 */
const Education = () => {
  return (
    <section
      className="min-h-screen py-16 md:py-32 px-8 md:px-24 bg-surface"
      id="education"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="dm-mono text-primary mb-4 text-xs tracking-widest uppercase">
            // FOUNDATION
          </p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sentence}
            className="syne-800 text-5xl md:text-6xl text-on-surface"
          >
            {"Academic background".split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Timeline of educational achievements */}
        <motion.div
          className="grid border-t border-on-surface/15"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {[
            {
              date: "2021 — 2025",
              title:
                "Bachelors of Technology in Computer Science and Engineering",
              sub: "Central University of Kashmir, Ganderbal",
              icon: "school",
              subjects: [
                "Web Development",
                "Object Oriented Programming",
                "Databases",
                "Discrete Maths",
                "Data Structures & Algorithms",
                "Operating Systems",
                "Computer Networks",
                "Artificial Intelligence",
                "Data Mining",
                "Computer Architecture",
              ],
            },
            {
              date: "2018 — 2020",
              title: "Higher Secondary",
              sub: "Green Valley Educational Institute, Ellahi Bagh",
              icon: "school",
              subjects: [
                "Physics",
                "Chemistry",
                "Maths",
                "Information Practices",
              ],
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="grid md:grid-cols-4 bg-surface py-12 items-start px-4 group relative overflow-hidden border-b border-on-surface/15"
            >
              <div className="dm-mono text-on-surface/40 text-sm mt-1">
                {item.date}
              </div>
              <div className="md:col-span-2">
                <h3 className="syne-800 text-2xl text-on-surface">
                  {item.title}
                </h3>
                <p className="text-on-surface/60 mt-1 mb-6">{item.sub}</p>

                {/* Categorized relevant modules/subjects */}
                <div className="flex flex-wrap gap-2">
                  {item.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="bg-on-surface/5 text-on-surface/40 dm-mono text-[9px] px-2.5 py-1.5 uppercase tracking-wider border border-on-surface/15 group-hover:border-primary/30 transition-colors"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right hidden md:block mt-1">
                <span className="material-symbols-outlined text-primary opacity-20 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
              </div>
              {/* Interaction accent for user focus */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
