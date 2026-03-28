import React from 'react';
import { motion } from 'framer-motion';

/**
 * Navbar — Floating neumorphic pill navbar
 * Items: Home | Projects | Dashboard | About | Contact
 * Right: Avatar + Name + Role
 */
const Navbar = () => {
  const links = ['Home', 'Projects', 'Dashboard', 'About', 'Contact'];

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Nav Links */}
      <div className="nav-links">
        {links.map((item, i) => (
          <button
            key={item}
            className={`nav-link${i === 0 ? ' active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="nav-divider" />

      {/* Profile */}
      <div className="nav-profile">
        <div className="nav-avatar">NS</div>
        <div className="nav-profile-info">
          <div className="nav-profile-name">Nav Sharma</div>
          <div className="nav-profile-role">Data Analyst</div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
