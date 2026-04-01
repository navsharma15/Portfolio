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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >


      {/* Welcome text */}
      <div className="hero-welcome">
        <p className="hero-welcome-sub">
          <span style={{ color: "#ff2d55", fontWeight: "bold" }}>&gt;_ </span> NAV SHARMA // DATA ANALYST
        </p>
        <h1 className="hero-welcome-title">Decoding Noise.<br />Driving Decisions.</h1>
        <div className="hero-welcome-line" />
        <p className="hero-welcome-desc">
          Transforming complex datasets into clear, actionable intelligence. Enter the dashboard to see the data in motion.
        </p>
      </div>
    </motion.div>
  );
};

export default HeroCard;
