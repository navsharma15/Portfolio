import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroCard — Centered, cinematic gradient hero for Data Analyst
 */
const HeroCard = ({ onExplore }) => {
  return (
    <motion.div
      className="hero-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-welcome">
        
        {/* Top Label */}
        <motion.p 
          className="hero-welcome-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          DATA ANALYST <span className="hero-separator">|</span> PROBLEM SOLVER <span className="hero-separator">|</span> STORYTELLER
        </motion.p>
        
        {/* Main Cinematic Title */}
        <motion.h1 
          className="hero-welcome-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          style={{ letterSpacing: '-0.04em' }}
        >
          Behind every <span className="hero-highlight">number</span>,<br />
          there’s a <span className="hero-highlight" style={{ fontStyle: 'italic' }}>story</span><br />
          — I bring it to life.
        </motion.h1>
        
        {/* Minimalist divider */}
        <motion.div 
          className="hero-welcome-line"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
        
        {/* Description */}
        <motion.p 
          className="hero-welcome-desc"
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Transforming raw data into meaningful insights that drive real-world decisions and impact.
        </motion.p>

        {/* Hire Me Option */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a 
            href="mailto:navsharma989@gmail.com?subject=Hiring Inquiry&body=Hello Nav, I would like to connect with you." 
            className="btn-primary-glow" 
            style={{ display: 'inline-block', textDecoration: 'none', marginTop: '10px' }}
          >
            Hire Me
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
