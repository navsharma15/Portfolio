import React from 'react';
import { motion } from 'framer-motion';
import Wave from './Wave';

/**
 * Landing Component
 * Premium, futuristic portfolio intro for Nav Sharma.
 * Props: onExplore — callback fired when "Explore Insights" is clicked
 */
const Landing = ({ onExplore }) => {
  return (
    <div className="app-container" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#000000'
    }}>
      {/* Main Content Area */}
      <div style={{ 
        textAlign: 'center', 
        zIndex: 20, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        {/* Main Title Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="neon-text"
        >
          NAV SHARMA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="subtitle"
        >
          DATA ANALYST
        </motion.p>

        {/* Explore Insights Button — triggers slide-up transition */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="explore-btn"
          onClick={onExplore}
        >
          Explore Insights
        </motion.button>
      </div>

      {/* Animated wave mesh */}
      <Wave />
    </div>
  );
};

export default Landing;
