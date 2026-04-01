import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroCard from './HeroCard';
import ProfileCard from './ProfileCard';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Projects from './Projects';
import Dashboard from './Dashboard';
import Contact from './Contact';
import Wave from './Wave';
import '../styles/portfolio.css';

/* Nav items with SVG icons */
const navItems = [
  { label: 'Home', svg: <svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'About Me', svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { label: 'Skills', svg: <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
  { label: 'Projects', svg: <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> },
  { label: 'Dashboard', svg: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { label: 'Contact', svg: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.37 9.93 19.79 19.79 0 01.29 1.27 2 2 0 012.27 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> },
];

const Portfolio = () => {
  const [activePage, setActivePage] = useState('Home');
  const [direction, setDirection] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);
  const sectionRefs = useRef({});

  // Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback((label) => {
    if (label === activePage && !isMobile) return;
    const currentIndex = navItems.findIndex((n) => n.label === activePage);
    const targetIndex = navItems.findIndex((n) => n.label === label);

    if (isMobile) {
      const section = sectionRefs.current[label];
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setActivePage(label);
      setIsMenuOpen(false);
    } else {
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setActivePage(label);
    }
  }, [activePage, isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver((entries) => {
      const mostVisible = entries.reduce((prev, current) => (prev.intersectionRatio > current.intersectionRatio ? prev : current));
      if (mostVisible.intersectionRatio > 0.4) {
        const label = mostVisible.target.getAttribute('data-section');
        if (label && label !== activePage) setActivePage(label);
      }
    }, { threshold: [0.3, 0.6] });
    Object.values(sectionRefs.current).forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, [activePage, isMobile]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isMenuOpen || isScrolling || isMobile) return;
      const delta = e.deltaY;
      const activeSection = document.querySelector('.page-full-width > div');
      if (activeSection) {
        const isAtBottom = Math.ceil(activeSection.scrollTop + activeSection.clientHeight) >= activeSection.scrollHeight;
        const isAtTop = activeSection.scrollTop <= 0;
        if ((delta > 0 && !isAtBottom) || (delta < 0 && !isAtTop)) return;
      }
      if (Math.abs(delta) > 50) {
        const idx = navItems.findIndex(n => n.label === activePage);
        if (delta > 0 && idx < navItems.length - 1) {
          setIsScrolling(true);
          handleNavClick(navItems[idx + 1].label);
          setTimeout(() => setIsScrolling(false), 900);
        } else if (delta < 0 && idx > 0) {
          setIsScrolling(true);
          handleNavClick(navItems[idx - 1].label);
          setTimeout(() => setIsScrolling(false), 900);
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activePage, isMenuOpen, isScrolling, isMobile, handleNavClick]);

  const variants = {
    initial: (dir) => ({ y: dir === 1 ? '70vh' : '-70vh', opacity: 0, scale: 0.95 }),
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ y: dir === 1 ? '-70vh' : '70vh', opacity: 0, scale: 0.95, transition: { duration: 0.5 } })
  };

  return (
    <div className="portfolio-bg">
      <Wave />
      <button className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="hamburger-line"></span><span className="hamburger-line"></span><span className="hamburger-line"></span>
      </button>
      <div className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`} onClick={() => setIsMenuOpen(false)} />
      <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="vertical-brand-text">HEADER</div>
        <div className="sidebar-content-wrapper">
          <div className="sidebar-brand"><span className="sidebar-brand-text">DAP</span></div>
          <div className="sidebar-divider" />
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button key={item.label} className={`sidebar-link${item.label === activePage ? ' active' : ''}`} onClick={() => handleNavClick(item.label)}>
                {item.svg}<span className="link-text">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <div className="portfolio-content">
        {!isMobile ? (
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div key={activePage} custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="page-container">
              {activePage === 'Home' && (
                <div className="desktop-page-layout">
                  <div className="center-content">
                    <HeroCard />
                    <div className="bottom-buttons white-cutout">
                      <button className="cutout-btn contact-btn">Contact us</button>
                      <button className="cutout-btn cv-btn" onClick={() => window.open('#')}>Download CV</button>
                    </div>
                  </div>
                  <ProfileCard />
                </div>
              )}
              {activePage === 'About Me' && <div className="page-full-width"><AboutMe key={activePage} /></div>}
              {activePage === 'Skills' && <div className="page-full-width"><Skills key={activePage} /></div>}
              {activePage === 'Projects' && <div className="page-full-width"><Projects key={activePage} /></div>}
              {activePage === 'Dashboard' && <div className="page-full-width"><Dashboard key={activePage} /></div>}
              {activePage === 'Contact' && <div className="page-full-width"><Contact key={activePage} /></div>}
              {activePage !== 'Home' && activePage !== 'About Me' && activePage !== 'Skills' && activePage !== 'Projects' && activePage !== 'Dashboard' && activePage !== 'Contact' && (
                <div className="coming-soon-card"><h2 className="coming-soon-text">{activePage} Coming Soon</h2></div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="mobile-scroll-container">
            <div className="mobile-glass-pane">
              {navItems.map((item) => (
                <section key={item.label} data-section={item.label} ref={el => sectionRefs.current[item.label] = el} className="mobile-section">
                  {item.label === 'Home' && <div className="mobile-home-stack"><div className="hero-mobile-wrap"><HeroCard /></div><ProfileCard /></div>}
                  {item.label === 'About Me' && <AboutMe key={item.label} />}
                  {item.label === 'Skills' && <Skills key={item.label} />}
                  {item.label === 'Projects' && <Projects key={item.label} />}
                  {item.label === 'Dashboard' && <Dashboard key={item.label} />}
                  {item.label === 'Contact' && <Contact key={item.label} />}
                  {item.label !== 'Contact' && <div className="mobile-section-separator" />}
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
