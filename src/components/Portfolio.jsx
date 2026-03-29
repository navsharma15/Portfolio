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
  const [direction, setDirection] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef({});

  // Unified nav click handler
  const handleNavClick = useCallback((label) => {
    const isMobile = window.innerWidth <= 1024;
    
    if (label === activePage && !isMobile) {
      if (isMenuOpen) setIsMenuOpen(false);
      return;
    }

    const currentIndex = navItems.findIndex((n) => n.label === activePage);
    const targetIndex = navItems.findIndex((n) => n.label === label);

    if (isMobile) {
      // On mobile, scroll to the section
      const targetSection = sectionRefs.current[label];
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (isMenuOpen) setIsMenuOpen(false);
      setActivePage(label);
    } else {
      // On desktop, use sectional transition
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setActivePage(label);
      if (isMenuOpen) setIsMenuOpen(false);
    }
  }, [activePage, isMenuOpen]);

  // Handle intersection for mobile scroll syncing
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      threshold: [0.2, 0.5, 0.8], // Multiple thresholds for better precision
    };

    const observerCallback = (entries) => {
      // Find the entry that is most visible in the viewport
      const mostVisible = entries.reduce((prev, current) => {
        return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
      });

      if (mostVisible && mostVisible.intersectionRatio > 0.3) {
        const sectionLabel = mostVisible.target.getAttribute('data-section');
        if (sectionLabel && sectionLabel !== activePage) {
          setActivePage(sectionLabel);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activePage]); // Re-run when activePage changes to stay in sync

  // Desktop Scroll (Wheel) to Navigate
  useEffect(() => {
    const handleWheel = (e) => {
      if (isMenuOpen || isScrolling) return;

      const delta = e.deltaY;
      const currentIndex = navItems.findIndex((n) => n.label === activePage);
      const isMobile = window.innerWidth <= 1024;

      if (isMobile) return; // Native scroll on mobile

      if (Math.abs(delta) > 50) {
        if (delta > 0 && currentIndex < navItems.length - 1) {
          setIsScrolling(true);
          handleNavClick(navItems[currentIndex + 1].label);
          setTimeout(() => setIsScrolling(false), 900);
        } else if (delta < 0 && currentIndex > 0) {
          setIsScrolling(true);
          handleNavClick(navItems[currentIndex - 1].label);
          setTimeout(() => setIsScrolling(false), 900);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activePage, isMenuOpen, isScrolling, handleNavClick]);

  const activeIndex = navItems.findIndex((n) => n.label === activePage);

  // Transition variants — Desktop Sectional transitions
  const variants = {
    initial: (dir) => ({
      y: dir === 1 ? '50vh' : '-50vh',
      opacity: 0,
      scale: 0.98
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      y: dir === 1 ? '-50vh' : '50vh',
      opacity: 0,
      scale: 0.98,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }
    })
  };

  // Close menu when clicking anywhere on the screen
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleGlobalClick = (e) => {
      // Don't close if clicking the toggle button itself (handled by its own onClick)
      const isToggleButton = e.target.closest('.hamburger-btn');
      if (!isToggleButton) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isMenuOpen]);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;

  return (
    <div className="portfolio-bg">
      <DNAAnimation />

      {/* Hamburger Toggle */}
      <button 
        className="hamburger-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the global click from firing immediately
          setIsMenuOpen(!isMenuOpen);
        }}
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
        /* The global click listener now handles this, but keeping for redundancy/z-index clarity */
      />

      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">DAP</span>
        </div>
        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              className={`sidebar-link${item.label === activePage ? ' active' : ''}`}
              onClick={() => handleNavClick(item.label)}
            >
              {item.svg}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-label">Status</div>
          <div className="sidebar-footer-status">Available for Work</div>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="portfolio-content">
        {!isMobile ? (
          /* Desktop: Section Transitions with AnimatePresence */
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activePage}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              {activePage === 'Home' && (
                <div className="desktop-page-layout">
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
                </div>
              )}

              {activePage === 'About Me' && (
                <div className="page-full-width">
                  <AboutMe />
                </div>
              )}

              {activePage !== 'Home' && activePage !== 'About Me' && (
                <div className="coming-soon-card">
                  <h2 className="coming-soon-text">{activePage} Coming Soon</h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Mobile: Vertical Continuous Scroll */
          <div className="mobile-scroll-container">
            {navItems.map((item) => (
              <section 
                key={item.label} 
                data-section={item.label}
                ref={el => sectionRefs.current[item.label] = el}
                className="mobile-section"
              >
                {item.label === 'Home' && (
                  <div className="mobile-home-stack">
                    <div className="center-content">
                      <HeroCard />
                      <div className="bottom-buttons white-cutout mobile-white-cutout">
                        <button className="cutout-btn contact-btn">Contact us</button>
                        <button className="cutout-btn cv-btn">Download CV</button>
                      </div>
                    </div>
                    <ProfileCard />
                  </div>
                )}
                
                {item.label === 'About Me' && <AboutMe />}
                
                {item.label !== 'Home' && item.label !== 'About Me' && (
                   <div className="coming-soon-card">
                     <h2 className="coming-soon-text">{item.label} Coming Soon</h2>
                   </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
