import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import HeroCard from './HeroCard';
import ProfileCard from './ProfileCard';
import AboutMe from './AboutMe';
import DNAAnimation from './DNAAnimation';
import '../styles/portfolio.css';

/* Nav items with SVG icons */
const navItems = [
  {
    label: 'Home',
    svg: <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: 'About Me',
    svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    label: 'Skills',
    svg: <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
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
    label: 'Contact',
    svg: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.93 19.79 19.79 0 01.29 1.27 2 2 0 012.27 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>,
  },
];

/**
 * Portfolio — Full-screen layout with page-flip transitions
 * Uses GSAP for realistic 3D notebook page-turning effect.
 */
const Portfolio = () => {
  const [activePage, setActivePage] = useState('Home');
  const [isFlipping, setIsFlipping] = useState(false);
  const flipPageRef = useRef(null);
  const flipShadowRef = useRef(null);

  /**
   * Perform the GSAP page flip animation
   * Flips the current page like a notebook page turning right-to-left,
   * then reveals the target page behind it.
   */
  const performPageFlip = useCallback((targetPage) => {
    if (isFlipping || targetPage === activePage) return;
    setIsFlipping(true);

    const flipEl = flipPageRef.current;
    const shadowEl = flipShadowRef.current;
    if (!flipEl || !shadowEl) return;

    // Timeline for the flip
    const tl = gsap.timeline({
      onComplete: () => {
        setActivePage(targetPage);
        setIsFlipping(false);
        // Reset flip element
        gsap.set(flipEl, { rotateY: 0, opacity: 0, zIndex: -1 });
        gsap.set(shadowEl, { opacity: 0 });
      },
    });

    // Show flip overlay (snapshot of current page)
    tl.set(flipEl, {
      opacity: 1,
      rotateY: 0,
      zIndex: 50,
      transformOrigin: 'left center',
    })
    .set(shadowEl, { opacity: 0, zIndex: 49 })

    // Animate the page curl from right to left
    .to(flipEl, {
      rotateY: -180,
      duration: 1,
      ease: 'power2.inOut',
    })
    // Shadow grows then fades during flip
    .to(
      shadowEl,
      {
        opacity: 0.7,
        duration: 0.5,
        ease: 'power2.in',
      },
      0
    )
    .to(
      shadowEl,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.5
    );
  }, [activePage, isFlipping]);

  const handleNavClick = (label) => {
    if (label === activePage || isFlipping) return;

    if (label === 'About Me' || activePage === 'About Me') {
      performPageFlip(label);
    } else {
      // For other pages, just switch directly (no flip needed yet)
      setActivePage(label);
    }
  };

  // Determine active nav index
  const activeIndex = navItems.findIndex((n) => n.label === activePage);

  return (
    <div className="portfolio-bg">
      <DNAAnimation />

      {/* ── PAGE FLIP OVERLAY (animated by GSAP) ── */}
      <div
        ref={flipPageRef}
        className="page-flip-overlay"
      >
        {/* This is a visual clone — dark gradient front, lighter back */}
        <div className="page-flip-front" />
        <div className="page-flip-back" />
      </div>

      {/* ── FLIP SHADOW ── */}
      <div ref={flipShadowRef} className="page-flip-shadow" />

      {/* ── LEFT SIDEBAR (always visible) ── */}
      <motion.aside
        className="sidebar"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">DAP</span>
        </div>
        <div className="sidebar-divider" />

        {/* Navigation links */}
        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              className={`sidebar-link${i === activeIndex ? ' active' : ''}`}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => handleNavClick(item.label)}
            >
              {item.svg}
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-label">Status</div>
          <div className="sidebar-footer-status">Available for Work</div>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="portfolio-content">
        {activePage === 'Home' && (
          <motion.div
            className="page-home"
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'contents' }}
          >
            {/* Center: Hero + buttons */}
            <div className="center-content">
              <HeroCard />
              <motion.div
                className="bottom-buttons white-cutout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <button className="cutout-btn contact-btn">Contact us</button>
                <button className="cutout-btn cv-btn">Download CV</button>
              </motion.div>
            </div>

            {/* Right: Profile card */}
            <ProfileCard />
          </motion.div>
        )}

        {activePage === 'About Me' && (
          <motion.div
            className="page-about"
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ flex: 1, height: '100%', borderRadius: '28px', overflow: 'hidden' }}
          >
            <AboutMe />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
