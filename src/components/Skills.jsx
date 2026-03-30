import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/skills.css';

/**
 * Cyber-Diagnostic Skills Dashboard
 * A game-style interactive hub for showcasing technical proficiencies.
 */
const skillCategories = [
  {
    id: "query",
    title: "DATA QUERYING",
    level: 95,
    tagline: "Structured logic & retrieval",
    skills: ["SQL", "PostgreSQL", "Database Ops", "Schema Design"],
    icon: "🗄️",
    color: "#00ffaa"
  },
  {
    id: "viz",
    title: "VISUALIZATION",
    level: 90,
    tagline: "Visual storytelling & insights",
    skills: ["Power BI", "Tableau", "Excel", "Dashboarding"],
    icon: "📊",
    color: "#00ccff"
  },
  {
    id: "script",
    title: "SCRIPTING",
    level: 85,
    tagline: "Automation & manipulation",
    skills: ["Python", "Pandas", "NumPy", "Jupyter"],
    icon: "🐍",
    color: "#cc00ff"
  },
  {
    id: "stat",
    title: "STATISTICS",
    level: 80,
    tagline: "Mathematical foundation",
    skills: ["Probabilities", "Hypothesis Testing", "Regression", "R"],
    icon: "📈",
    color: "#ffcc00"
  }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[0]);
  const [isCorescanning, setIsCoreScanning] = useState(false);

  const handleTabClick = (cat) => {
    setIsCoreScanning(true);
    setActiveTab(cat);
    setTimeout(() => setIsCoreScanning(false), 600);
  };

  return (
    <div className="skills-cyber-container">
      <div className="cyber-header">
        <motion.div 
          className="system-tag"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          [SYSTEM DIAGNOSTICS] v2.0
        </motion.div>
        <h2 className="cyber-title">TECHNICAL <span className="neon">CAPABILITIES</span></h2>
      </div>

      <div className="cyber-dashboard-grid">
        {/* --- LEFT NAVIGATION (LEVEL SELECTOR) --- */}
        <div className="cyber-selector-area">
          {skillCategories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              className={`cyber-tab-btn ${activeTab.id === cat.id ? 'active' : ''}`}
              onClick={() => handleTabClick(cat)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, x: 10 }}
              style={{ "--accent": cat.color }}
            >
              <div className="tab-icon">{cat.icon}</div>
              <div className="tab-info">
                <span className="tab-label">{cat.title}</span>
                <div className="tab-progress-tiny">
                  <div className="bar-fill" style={{ width: `${cat.level}%` }} />
                </div>
              </div>
              <div className="tab-indicator" />
            </motion.button>
          ))}
        </div>

        {/* --- CENTRAL CORE & DIAGNOSTICS --- */}
        <div className="cyber-main-diagnostic">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab.id}
              className="diagnostic-screen"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 0.5 }}
            >
              <div className="screen-frame">
                <div className="scanline" />
                
                {/* Header Information */}
                <div className="diag-header">
                  <div className="diag-id">CAT_ID: {activeTab.id.toUpperCase()}</div>
                  <div className="diag-status">STATUS: OPTIMIZED</div>
                </div>

                <div className="diag-content">
                  <div className="core-visualization">
                    <div className={`cyber-circle ${isCorescanning ? 'scanning' : ''}`} style={{ "--accent": activeTab.color }}>
                      <div className="inner-circle">
                         <span className="core-icon">{activeTab.icon}</span>
                      </div>
                      <svg className="progress-ring" viewBox="0 0 100 100">
                        <circle 
                          className="ring-path" 
                          cx="50" cy="50" r="45" 
                        />
                        <motion.circle 
                          className="ring-fill" 
                          cx="50" cy="50" r="45"
                          initial={{ strokeDasharray: "0 283" }}
                          animate={{ strokeDasharray: `${(activeTab.level / 100) * 283} 283` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          style={{ stroke: activeTab.color }}
                        />
                      </svg>
                      <div className="level-text">{activeTab.level}%</div>
                    </div>
                  </div>

                  <div className="skills-details">
                    <h3 className="cat-title" style={{ color: activeTab.color }}>{activeTab.title}</h3>
                    <p className="cat-tagline">{activeTab.tagline}</p>
                    
                    <div className="skill-tags-grid">
                      {activeTab.skills.map((s, i) => (
                        <motion.div 
                          key={s}
                          className="skill-tag"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                          <span className="tag-dot" style={{ background: activeTab.color }} />
                          {s}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Readout */}
                <div className="system-readout">
                   <div className="readout-bar">
                      <motion.div 
                        className="readout-fill"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ background: activeTab.color }}
                      />
                   </div>
                   <div className="readout-text">ANALYZING PROFICIENCY METRICS... SYNC COMPLETE</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- BACKGROUND DECORATION --- */}
      <div className="cyber-bg-elements">
        <div className="grid-overlay" />
        <div className="corner-target top-left" />
        <div className="corner-target top-right" />
        <div className="corner-target bottom-left" />
        <div className="corner-target bottom-right" />
      </div>
    </div>
  );
};

export default Skills;
