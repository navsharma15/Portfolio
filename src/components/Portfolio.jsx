import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
 * Portfolio — Full-screen layout with vertical slip transitions
 * "Slip Up" for forward navigation, "Slip Down" for backward navigation.
 */
const Portfolio = () => {
  const [activePage, setActivePage] = useState('Home');
  const [direction, setDirection] = useState(0); // 1 = forward (up), -1 = backward (down)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);

  const handleNavClick = useCallback((label) => {
    if (label === activePage) {
      if (isMenuOpen) setIsMenuOpen(false);
      return;
    }

    const currentIndex = navItems.findIndex((n) => n.label === activePage);
    const targetIndex = navItems.findIndex((n) => n.label === label);

    setDirection(targetIndex > currentIndex ? 1 : -1);
    setActivePage(label);
    if (isMenuOpen) setIsMenuOpen(false);
  }, [activePage, isMenuOpen]);

  // Scroll to Navigate Logic
  useEffect(() => {
    const handleWheel = (e) => {
      if (isMenuOpen || isScrolling) return;

      const delta = e.deltaY;
      const currentIndex = navItems.findIndex((n) => n.label === activePage);
      const isMobile = window.innerWidth <= 1024;

      // On mobile, we only want to switch sections if we're at the very bottom/top
      // of the scrollable page. This allows users to see the full ProfileCard.
      if (isMobile && scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

        if (delta > 30 && (scrollTop + clientHeight >= scrollHeight - 10)) {
          if (currentIndex < navItems.length - 1) {
            setIsScrolling(true);
            handleNavClick(navItems[currentIndex + 1].label);
            setTimeout(() => setIsScrolling(false), 1200);
          }
        } else if (delta < -30 && scrollTop <= 10) {
          if (currentIndex > 0) {
            setIsScrolling(true);
            handleNavClick(navItems[currentIndex - 1].label);
            setTimeout(() => setIsScrolling(false), 1200);
          }
        }
        return; // Exit here for mobile
      }

      // Desktop logic (Fullscreen sections)
      if (Math.abs(delta) > 40) {
        if (delta > 0 && currentIndex < navItems.length - 1) {
          // Scroll Down -> Next Page
          setIsScrolling(true);
          handleNavClick(navItems[currentIndex + 1].label);
          setTimeout(() => setIsScrolling(false), 1200);
        } else if (delta < 0 && currentIndex > 0) {
          // Scroll Up -> Previous Page
          setIsScrolling(true);
          handleNavClick(navItems[currentIndex - 1].label);
          setTimeout(() => setIsScrolling(false), 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activePage, isMenuOpen, isScrolling, handleNavClick]);

  const activeIndex = navItems.findIndex((n) => n.label === activePage);

  // Transition variants
  const variants = {
    initial: (dir) => ({
      y: dir === 1 ? '100vh' : '-100vh',
      opacity: 0
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: (dir) => ({
      y: dir === 1 ? '-100vh' : '100vh',
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    })
  };

  return (
    <div className="portfolio-bg" ref={scrollRef}>
      <DNAAnimation />

      {/* Hamburger Toggle */}
      <button 
        className="hamburger-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        )}
      </button>

      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">DAP</span>
        </div>
        <div className="sidebar-divider" />

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

        <div className="sidebar-footer">
          <div className="sidebar-footer-label">Status</div>
          <div className="sidebar-footer-status">Available for Work</div>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="portfolio-content">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activePage}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mobile-stack"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              gap: '20px',
              width: '100%',
              height: '100%',
              pointerEvents: 'auto'
            }}
          >
            {activePage === 'Home' && (
              <>
                <div className="center-content">
                  <HeroCard />
                  <div className="bottom-buttons white-cutout">
                    <button className="cutout-btn contact-btn">Contact us</button>
                    <button 
                      className="cutout-btn cv-btn"
                      onClick={() => window.open('https://drive.google.com/your-resume-link-here', '_blank')}
                    >
                      Download CV
                    </button>
                  </div>
                </div>
                <ProfileCard />
              </>
            )}

            {activePage === 'About Me' && (
              <div style={{ flex: 1, height: '100%', borderRadius: '28px', overflow: 'hidden' }}>
                <AboutMe />
              </div>
            )}

            {activePage !== 'Home' && activePage !== 'About Me' && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '28px', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ fontSize: '3rem', color: '#00ffaa' }}>{activePage} Coming Soon</h2>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;
