import React from 'react';
import './Resume.css';

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container">
      {/* Print Button - Not visible when printing */}
      <button className="resume-download-btn no-print" onClick={handlePrint}>
        Download PDF
      </button>

      <div className="resume-sheet">
        <header className="resume-header">
          <h1>NAV SHARMA</h1>
          <div className="resume-contact">
            <span>linkedin.com/in/nav-sharma</span> — 
            <span>navsharma989@gmail.com</span> — 
            <span>+91-8791201989</span> — 
            <span>Bulandshahr, India</span>
          </div>
        </header>

        <section className="resume-section">
          <h2 className="section-title">TECHNICAL SKILLS</h2>
          <ul className="resume-list">
            <li><strong>SQL:</strong> Writing queries using SELECT, WHERE, GROUP BY, ORDER BY, JOIN, and aggregate functions for data analysis.</li>
            <li><strong>MS Excel:</strong> Pivot Tables, VLOOKUP, INDEX-MATCH, data cleaning, and dashboard creation.</li>
            <li><strong>Power BI / Tableau:</strong> Interactive dashboards, KPI cards, slicers, and basic data modeling.</li>
            <li><strong>Statistics:</strong> Descriptive statistics, regression basics, clustering concepts, hypothesis testing.</li>
            <li><strong>Tools:</strong> Git, GitHub, Jupyter Notebook.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="section-title">PROJECT EXPERIENCE</h2>
          
          <div className="project-item">
            <div className="project-header">
              <h3>Credit Card Financial Dashboard using Power BI</h3>
              <span className="project-date">2026</span>
            </div>
            <ul className="resume-list sub-list">
              <li>Engineered an interactive Power BI dashboard using SQL-driven data.</li>
              <li>Transformed raw data into impactful financial insights and customer trends.</li>
              <li>Optimized data workflows to enable fast and efficient performance tracking.</li>
            </ul>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Uber Ride Analytics Dashboard — SQL & Power BI</h3>
              <span className="project-date">2026</span>
            </div>
            <ul className="resume-list sub-list">
              <li>Created consolidated master dataset using SQL joins across ride, driver, and payment tables.</li>
              <li>Analyzed revenue trends, peak booking hours, city-wise performance, and driver ratings using SQL queries.</li>
              <li>Built interactive Power BI dashboard with KPIs including Total Revenue, Total Rides, and Average Fare.</li>
              <li>Enabled dynamic filtering by city and date to support operational and pricing decisions.</li>
            </ul>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Sales Dashboard — Power BI</h3>
              <span className="project-date">2026</span>
            </div>
            <ul className="resume-list sub-list">
              <li>Designed dashboard to monitor revenue, profit, and monthly growth trends.</li>
              <li>Implemented region-wise and product-wise filtering using slicers.</li>
              <li>Created KPI cards and comparative visuals for performance tracking.</li>
            </ul>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>FNP Sales Analysis — MS Excel</h3>
              <span className="project-date">2026</span>
            </div>
            <ul className="resume-list sub-list">
              <li>Analyzed sales dataset using Excel formulas and Pivot Tables.</li>
              <li>Built dashboard identifying seasonal trends and best-selling products.</li>
              <li>Generated insights on customer purchasing patterns.</li>
            </ul>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Coffee Shop Sales Analysis — MS Excel</h3>
              <span className="project-date">2025</span>
            </div>
            <ul className="resume-list sub-list">
              <li>Evaluated transactional data to analyze daily revenue patterns.</li>
              <li>Designed KPI dashboard tracking sales and peak business hours.</li>
              <li>Identified top-selling menu items to support inventory planning.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">EDUCATION</h2>
          <div className="education-item">
            <div className="edu-header">
              <h3>GLA University, Mathura</h3>
              <span className="edu-date">2023 — 2027</span>
            </div>
            <p>Bachelor's Degree in Computer Science / Information Technology</p>
            <p className="edu-notes">Relevant Coursework: Data Structures, Database Management Systems, Statistics</p>
          </div>
          <div className="education-item">
            <div className="edu-header">
              <h3>St. Aerjay Public School, Bulandshahr</h3>
              <span className="edu-date">2022 — 2023</span>
            </div>
            <p>Intermediate (Science — Mathematics)</p>
          </div>
          <div className="education-item">
            <div className="edu-header">
              <h3>St. Aerjay Public School, Bulandshahr</h3>
              <span className="edu-date">2020 — 2021</span>
            </div>
            <p>High School</p>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">CERTIFICATIONS</h2>
          <ul className="resume-list">
            <li>Google Data Analytics Professional Certificate</li>
            <li>Microsoft Power BI Data Analyst Associate</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="section-title">SOFT SKILLS</h2>
          <p className="soft-skills-text">
            Problem Solving — Analytical Thinking — Communication — Team Collaboration — Attention to Detail
          </p>
        </section>
      </div>
    </div>
  );
};

export default Resume;
