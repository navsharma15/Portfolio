import React from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const Resume = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container">
      <motion.div 
        className="resume-header-pro"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="header-main-title">Professional <span>Profile</span></h2>
        <div className="header-decoration" />
        <div className="resume-contact-pro">
          <span>linkedin.com/in/nav-sharma</span> • 
          <span>navsharma989@gmail.com</span> • 
          <span>+91-8791201989</span> • 
          <span>Bulandshahr, India</span>
        </div>
        <button className="resume-download-btn-pro" onClick={handlePrint}>
          Download PDF
        </button>
      </motion.div>

      <motion.div 
        className="resume-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* SKILLS CARD */}
        <motion.div className="resume-card" variants={itemVariants}>
          <h3 className="resume-card-title">Technical Capabilities</h3>
          <ul className="resume-pro-list">
            <li><strong>SQL:</strong> SELECT, WHERE, GROUP BY, ORDER BY, JOIN, aggregates</li>
            <li><strong>MS Excel:</strong> Pivot Tables, VLOOKUP, INDEX-MATCH, dashboards</li>
            <li><strong>Power BI/Tableau:</strong> Interactive dashboards, KPIs, data modeling</li>
            <li><strong>Statistics:</strong> Descriptive stats, regression, clustering, hypothesis testing</li>
            <li><strong>Tools:</strong> Git, GitHub, Jupyter Notebook</li>
          </ul>
        </motion.div>

        {/* EDUCATION CARD */}
        <motion.div className="resume-card" variants={itemVariants}>
          <h3 className="resume-card-title">Education Background</h3>
          <div className="pro-timeline-item">
            <div className="pro-timeline-header">
              <h4>GLA University, Mathura</h4>
              <span>2023 — 2027</span>
            </div>
            <p>B.S. Computer Science / IT</p>
            <p className="pro-note">Coursework: DSA, DBMS, Statistics</p>
          </div>
          <div className="pro-timeline-item">
            <div className="pro-timeline-header">
              <h4>St. Aerjay Public School</h4>
              <span>2022 — 2023</span>
            </div>
            <p>Intermediate (Science — Mathematics)</p>
          </div>
           <div className="pro-timeline-item">
            <div className="pro-timeline-header">
              <h4>St. Aerjay Public School</h4>
              <span>2020 — 2021</span>
            </div>
            <p>High School</p>
          </div>
        </motion.div>

        {/* CERTIFICATIONS & SOFT SKILLS CARD - FULL WIDTH */}
        <motion.div className="resume-card full-width" variants={itemVariants}>
          <div className="card-split">
            <div className="split-section">
              <h3 className="resume-card-title">Certifications</h3>
              <ul className="resume-pro-list">
                <li>Google Data Analytics Professional Certificate</li>
                <li>Microsoft Power BI Data Analyst Associate</li>
              </ul>
            </div>
            <div className="split-section">
              <h3 className="resume-card-title">Soft Skills</h3>
              <div className="skill-tags">
                <span>Problem Solving</span>
                <span>Analytical Thinking</span>
                <span>Communication</span>
                <span>Team Collaboration</span>
                <span>Attention to Detail</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECTS CARD - FULL WIDTH */}
        <motion.div className="resume-card full-width" variants={itemVariants}>
          <h3 className="resume-card-title">Project Experience</h3>
          <div className="projects-pro-grid">
            
            <div className="pro-project-item">
              <div className="pro-project-header">
                <h4>Credit Card Financial Dashboard</h4>
                <span>Power BI • 2026</span>
              </div>
              <ul className="resume-pro-list">
                <li>Engineered interactive dashboard using SQL-driven data</li>
                <li>Transformed raw data into financial insights</li>
                <li>Optimized workflows for fast performance tracking</li>
              </ul>
            </div>

            <div className="pro-project-item">
              <div className="pro-project-header">
                <h4>Uber Ride Analytics Dashboard</h4>
                <span>SQL & Power BI • 2026</span>
              </div>
              <ul className="resume-pro-list">
                <li>Created dataset using SQL joins across multiple tables</li>
                <li>Analyzed revenue trends, booking hours, city performance</li>
                <li>Built dynamic filtering by city and date</li>
              </ul>
            </div>

            <div className="pro-project-item">
              <div className="pro-project-header">
                <h4>Sales Dashboard</h4>
                <span>Power BI • 2026</span>
              </div>
              <ul className="resume-pro-list">
                <li>Monitored revenue, profit, and monthly growth trends</li>
                <li>Implemented region/product filtering using slicers</li>
                <li>Created KPI cards for performance tracking</li>
              </ul>
            </div>

            <div className="pro-project-item">
              <div className="pro-project-header">
                <h4>FNP / Coffee Shop Analysis</h4>
                <span>MS Excel • 2025-26</span>
              </div>
              <ul className="resume-pro-list">
                <li>Analyzed daily revenue patterns and seasonal trends</li>
                <li>Built dashboard identifying best-selling menu items</li>
                <li>Generated insights on purchasing patterns</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Resume;
