import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroCard — Welcome message, full-height center card
 */
const HeroCard = () => {
  return (
    <motion.div
      className="hero-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      {/* Decorative label */}
      <div className="hero-tag">
        <span className="hero-tag-dot" />
        Portfolio 2024
      </div>

      {/* Welcome text */}
      <div className="hero-welcome">
        <p className="hero-welcome-sub">Hello, I'm Nav Sharma</p>
        <h1 className="hero-welcome-title">Welcome to<br />My Portfolio</h1>
        <div className="hero-welcome-line" />
        <p className="hero-welcome-desc">
          Explore my work, projects, and data-driven insights below.
        </p>
      </div>
    </motion.div>
  );
};

export default HeroCard;
