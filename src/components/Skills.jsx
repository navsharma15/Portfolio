import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/skills.css';

const skillCategories = [
  { 
    id: "query", 
    title: "DATA QUERYING", 
    level: 95, 
    tagline: "The backbone of robust data architecture.",
    skills: ["SQL", "PostgreSQL", "Database Ops", "Schema Design", "Joins", "Procedures"], 
    icon: "🔍", 
    color: "#ff2d55" 
  },
  { 
    id: "viz", 
    title: "VISUALIZATION", 
    level: 90, 
    tagline: "Bridging the gap between raw data & clear insights.",
    skills: ["Power BI", "Tableau", "Excel", "Dashboarding", "DAX", "Storytelling"], 
    icon: "📊", 
    color: "#ff6b8b" 
  },
  { 
    id: "script", 
    title: "SCRIPTING", 
    level: 85, 
    tagline: "Automating workflows with smart logic.",
    skills: ["Python", "Pandas", "NumPy", "Jupyter", "Web Scraping", "APIs"], 
    icon: "🐍", 
    color: "#ffb3c6" 
  },
  { 
    id: "ml", 
    title: "MACHINE LEARNING", 
    level: 85, 
    tagline: "Harnessing patterns to predict the future.",
    skills: ["Scikit-Learn", "TensorFlow", "NLP", "Neural Nets", "Clustering", "Regression"], 
    icon: "🧠", 
    color: "#ff2d55" 
  },
  { 
    id: "stat", 
    title: "STATISTICS", 
    level: 80, 
    tagline: "The mathematical truth behind every dataset.",
    skills: ["Probabilities", "Hypothesis Testing", "A/B Testing", "R", "Variance", "Distributions"], 
    icon: "📈", 
    color: "#ff6b8b" 
  }
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Perfectly rotate to the next card every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeCategory = skillCategories[activeIndex];

  // Mobile list item variants
  const mobileVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="skills-pro-container">
      <motion.div
        className="section-header-unique"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="header-main-title">Core <span>Competencies</span></h2>
        <div className="header-decoration" />
      </motion.div>

      {/* --- DESKTOP VIEW --- */}
      <div className="skills-desktop-view">
        {/* Left Big Card with Animation Fixed */}
        <div className="skills-desktop-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              className="desktop-big-card"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.3 } }}
              transition={{ duration: 0.4 }}
              style={{ borderColor: activeCategory.color }}
            >
              <div className="big-card-glow" style={{ background: `radial-gradient(circle at center, ${activeCategory.color}25, transparent 70%)` }} />
              
              {/* TOP LEFT HEADING (Perfect alignment) */}
              <motion.div 
                className="big-card-title-area-top-left"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                style={{ borderLeftColor: activeCategory.color }}
              >
                <h3 style={{ color: activeCategory.color }}>{activeCategory.title}</h3>
                <p>{activeCategory.tagline}</p>
              </motion.div>

              {/* Central Glowing Icon */}
              <motion.div 
                className="big-central-icon"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                style={{ color: activeCategory.color, textShadow: `0 0 50px ${activeCategory.color}` }}
              >
                {activeCategory.icon}
              </motion.div>

              {/* Floating Symbols/Tools */}
              <div className="floating-symbols-container">
                {activeCategory.skills.map((skill, index) => {
                  const angle = (index / activeCategory.skills.length) * Math.PI * 2;
                  // Calculate responsive radius based on viewport height to ensure it fits the card
                  const responsiveBase = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.2, 170) : 170;
                  const radius = responsiveBase + Math.random() * (responsiveBase * 0.35); 
                  const xTarget = Math.cos(angle) * radius;
                  const yTarget = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={`${activeCategory.id}-${skill}`}
                      className="floating-tool-bubble"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: xTarget, 
                        y: [yTarget, yTarget - 15, yTarget], 
                      }}
                      transition={{
                        opacity: { duration: 0.3, delay: index * 0.05 },
                        scale: { duration: 0.4, delay: index * 0.05, type: "spring" },
                        x: { duration: 0.6, delay: index * 0.05, type: "spring" },
                        y: { 
                          duration: 3 + Math.random(), // infinite loops are safe because parent handles unmount immediately
                          delay: index * 0.05, 
                          repeat: Infinity, 
                          repeatType: "mirror",
                          ease: "easeInOut"
                        }
                      }}
                      style={{ 
                        boxShadow: `0 0 20px ${activeCategory.color}35`,
                        border: `1px solid ${activeCategory.color}80`
                      }}
                    >
                      {skill}
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative scanline */}
              <div className="radar-sweep" style={{ background: `conic-gradient(from 0deg, transparent 70%, ${activeCategory.color}40 100%)` }} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Nav Cards */}
        <div className="skills-desktop-right">
          {skillCategories.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={cat.id}
                className={`desktop-nav-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                whileHover={{ scale: 1.02 }}
                style={{ 
                  borderColor: isActive ? cat.color : 'rgba(255, 45, 85, 0.15)',
                  boxShadow: isActive ? `0 0 25px ${cat.color}25` : 'none'
                }}
              >
                <div className="nav-card-icon" style={{ color: isActive ? cat.color : 'rgba(255,255,255,0.4)' }}>
                  {cat.icon}
                </div>
                <div className="nav-card-text">
                  <h4 style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>{cat.title}</h4>
                  <div className="nav-progress-bg">
                    <motion.div 
                      className="nav-progress-fill" 
                      initial={false}
                      animate={{ width: isActive ? `${cat.level}%` : '0%' }}
                      transition={{ duration: 0.5 }}
                      style={{ background: cat.color }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="skills-mobile-view">
        {skillCategories.map((cat, idx) => (
          <motion.div 
            key={cat.id} 
            className="skill-mobile-card"
            variants={mobileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="card-glass-overlay"></div>
            
            <div className="skill-card-header">
              <div className="skill-icon-mobile" style={{ color: cat.color, textShadow: `0 0 15px ${cat.color}80` }}>
                {cat.icon}
              </div>
              <div className="skill-header-text">
                <h3>{cat.title}</h3>
                <span className="proficiency-badge">PRO LEVEL  {cat.level}%</span>
              </div>
            </div>

            <div className="skill-progress-bar-bg">
               <motion.div 
                 className="skill-progress-bar-fill"
                 initial={{ width: 0 }}
                 whileInView={{ width: `${cat.level}%` }}
                 transition={{ duration: 1.5, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                 style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}` }}
               />
            </div>

            <div className="skill-tags-mobile">
              {cat.skills.map((s) => (
                <span key={s} className="mobile-tag">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
