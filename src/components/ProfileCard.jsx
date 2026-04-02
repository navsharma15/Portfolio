import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';

/**
 * ProfileCard — Right-side neumorphic profile card
 * Large DP, name, role, stats, and data analyst intro.
 * Contact/Download buttons removed.
 */
const ProfileCard = () => {
  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      {/* Large profile photo */}
      <div className="profile-avatar-wrap">
        <div className="profile-avatar">
          <img
            src={profileImg}
            alt="Nav Sharma"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: '28px',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Name & role */}
      <h2 className="profile-name">Nav Sharma</h2>
      <p className="profile-role">Data Analyst</p>

      <div className="profile-divider" />



      {/* Data analyst intro */}
      <div className="profile-intro-container">
        <p className="profile-intro">
          Passionate about transforming raw data into meaningful insights. 
          Skilled in <strong>Python</strong>, <strong>SQL</strong>, <strong>Power BI</strong>, 
          and <strong>data visualization</strong> — helping businesses make 
          smarter, data-driven decisions.
        </p>
        
        {/* Available for Work Badge */}
        <div className="status-badge">
          <span className="status-dot-pulse" />
          <span className="status-text">Available for Work</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
