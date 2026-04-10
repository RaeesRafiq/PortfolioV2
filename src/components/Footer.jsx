/**
 * @file Footer.jsx
 * @description Application footer component providing copyright information
 * and credits in a minimalist design.
 */

import React from "react";

/**
 * Footer Component
 * @returns {JSX.Element} The rendered footer section.
 */
const Footer = () => {
  return (
    <footer className="bg-background w-full py-12 px-8 md:px-24 border-t border-on-surface/15">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto space-y-4 md:space-y-0">
        <div className="dm-mono text-[10px] md:text-xs uppercase tracking-widest text-on-surface/30">
          © 2026 Mohammad Rayees
        </div>
        <div className="dm-mono text-[10px] md:text-xs uppercase tracking-widest text-on-surface/30 flex items-center gap-1.5">
          Designed and engineered with
          <span className="text-primary text-xs">❤</span>
          by Rayees
        </div>
      </div>
    </footer>
  );
};

export default Footer;
