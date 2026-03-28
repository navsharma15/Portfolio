import React from 'react';
import { motion } from 'framer-motion';
import HeroCard from './HeroCard';
import ProfileCard from './ProfileCard';
import '../styles/portfolio.css';

/* Nav items with SVG icons */
const navItems = [
  {
    label: 'Home',
    svg: <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: 'Projects',
    svg: <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  },
  {
    label: 'Dashboard',
    svg: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    label: 'About',
    svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    label: 'Contact',
    svg: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.93 19.79 19.79 0 01.29 1.27 2 2 0 012.27 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
  },
];

/**
 * Portfolio — Full-screen layout
 * [Sidebar] | [Hero Card + Buttons] | [Profile Card]
 * Sidebar replaces top navbar and left icon buttons.
 */
const Portfolio = () => {
  return (
    <div className="portfolio-bg">

      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        className="sidebar"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand / Logo at top of sidebar */}
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">DAP</span>
        </div>

        <div className="sidebar-divider" />


        {/* Navigation links */}
        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              className={`sidebar-link${i === 0 ? ' active' : ''}`}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              // stagger each link slightly
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {item.svg}
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* "Available for work" badge at bottom */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-label">Status</div>
          <div className="sidebar-footer-status">Available for Work</div>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <div className="portfolio-content">

        {/* Center: Hero + buttons */}
        <div className="center-content">
          <HeroCard />

          {/* Action buttons below hero */}
          <motion.div
            className="bottom-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button className="neu-btn neu-btn-contact">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.93 19.79 19.79 0 01.29 1.27 2 2 0 012.27 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
              </svg>
              Contact
            </button>

            <button className="neu-btn neu-btn-cv">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" stroke="currentColor"/>
              </svg>
              Download CV
            </button>
          </motion.div>
        </div>

        {/* Right: Profile card */}
        <ProfileCard />
      </div>

    </div>
  );
};

export default Portfolio;
