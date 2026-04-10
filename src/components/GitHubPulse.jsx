/**
 * @file GitHubPulse.jsx
 * @description Real-time GitHub activity monitor. Fetches and displays
 * contribution statistics using a custom-themed calendar visualization.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar as ReactGitHubCalendar } from "react-github-calendar";

/**
 * GitHubPulse Component
 * @param {Object} props
 * @param {string} props.theme - The current application theme ('light' | 'dark').
 * @returns {JSX.Element} The rendered GitHub activity pulse section.
 */
const GitHubPulse = ({ theme }) => {
  const username = "RaeesRafiq";
  const [stats, setStats] = useState({ total: 0, lastYear: 0, loading: true });

  /**
   * Fetches real-time contribution data from a publicly available scraper API.
   * Processes the raw response to aggregate total and trailing-year metrics.
   */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`,
        );
        const data = await response.json();

        if (data && data.total && data.contributions) {
          // Aggregate cumulative contributions across all years
          const totalCount = Object.values(data.total).reduce(
            (acc, val) => acc + val,
            0,
          );

          // Filter and sum contributions from the most recent 365-day window
          const oneYearAgo = new Date();
          oneYearAgo.setDate(oneYearAgo.getDate() - 365);
          const lastYearCount = data.contributions
            .filter((day) => new Date(day.date) >= oneYearAgo)
            .reduce((acc, day) => acc + day.count, 0);

          setStats({
            total: totalCount,
            lastYear: lastYearCount,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [username]);

  /**
   * Calendar theme configurations designed to harmonize with the
   * project's primary accent (Emerald-ish #3DBA7F) and contrast levels.
   */
  const calendarTheme = {
    light: ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"],
    dark: ["#1A1A1B", "#0E4429", "#3DBA7F44", "#3DBA7F88", "#3DBA7F"],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="py-16 md:py-32 px-8 md:px-24 bg-surface overflow-hidden"
      id="github-pulse"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title with Animated Indicator */}
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary inline-block animate-pulse"></span>
            <span className="syne-800 text-xl text-on-surface tracking-widest uppercase">
              LIVE PULSE
            </span>
          </div>
          <div className="h-px grow bg-on-surface/10 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <div className="relative">
                <div className="w-4 h-4 border border-on-surface/30 bg-background flex items-center justify-center relative z-10">
                  <div className="w-1.5 h-1.5 bg-on-surface"></div>
                </div>
                <div className="absolute -right-1 -bottom-1 w-4 h-4 border border-on-surface/30 bg-background z-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Statistics Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="bg-card-bg p-8 md:p-14 border-2 border-on-surface/15 shadow-[12px_12px_0px_0px_var(--primary)] relative group"
        >
          {/* Internal structural details: Radial grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(var(--on-surface) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Activity Metadata Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
            <div>
              <h3 className="syne-800 text-4xl md:text-5xl text-on-surface tracking-tight">
                GITHUB ACTIVITY_
              </h3>
              <div className="h-0.5 w-24 bg-primary mt-4 shadow-[0_0_8px_var(--primary)]"></div>
            </div>

            <div className="flex items-center gap-3 dm-mono text-[10px] text-on-surface/40 tracking-[0.3em] uppercase">
              <span className="w-2.5 h-2.5 bg-primary inline-block"></span>
              SYNCED WITH GITHUB SERVER
            </div>
          </div>

          {/* Rendered Calendar Mesh */}
          <div className="relative z-10">
            <div className="overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
              <div className="min-w-212.5 flex justify-center">
                <ReactGitHubCalendar
                  username={username}
                  theme={calendarTheme}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  hideColorLegend
                  hideTotalCount
                  fontSize={12}
                  blockSize={13}
                  blockMargin={5}
                />
              </div>
            </div>
          </div>

          {/* Statistics Summary and Scale Indicator */}
          <div className="mt-16 pt-10 border-t border-on-surface/10 flex flex-col md:flex-row justify-between items-end gap-10 relative z-10">
            <div className="space-y-6">
              <div className="dm-mono text-sm text-on-surface/60 flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-primary">
                  trending_up
                </span>
                <span>
                  {stats.loading ? "..." : stats.lastYear.toLocaleString()}{" "}
                  contributions in the last year
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-on-surface/10 border border-on-surface/15">
                  <span className="dm-mono text-[10px] text-on-surface/40 uppercase tracking-widest leading-none">
                    TOTAL CONTRIBUTIONS:
                  </span>
                </div>
                <span className="syne-800 text-2xl text-on-surface">
                  {stats.loading
                    ? "..."
                    : stats.total >= 1000
                      ? (stats.total / 1000).toFixed(1) + "K+"
                      : stats.total}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-6">
              <div className="flex items-center gap-3">
                <span className="dm-mono text-[10px] text-on-surface/40 uppercase">
                  Less
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 border border-on-surface/15 shadow-sm"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? calendarTheme.dark[i]
                            : calendarTheme.light[i],
                      }}
                    ></div>
                  ))}
                </div>
                <span className="dm-mono text-[10px] text-on-surface/40 uppercase">
                  More
                </span>
              </div>

              <div className="dm-mono text-[11px] text-on-surface/20 tracking-widest italic">
                // REAL_TIME_CONTRIBUTIONS_LAYER
              </div>
            </div>
          </div>

          {/* Technical Corner Brackets */}
          <div className="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-primary/30 pointer-events-none group-hover:border-primary transition-colors duration-500"></div>
          <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-2 border-l-2 border-primary/30 pointer-events-none group-hover:border-primary transition-colors duration-500"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubPulse;
