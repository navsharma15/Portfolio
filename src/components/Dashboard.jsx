import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/dashboard.css';

// --- DATA ANALYST DASHBOARD DATA ---
const dashboardData = {
  'Last 4 Weeks': {
    kpis: [
      { id: 'k1', title: 'Projects Built', value: 5, suffix: '+', trend: 20, icon: '📊' },
      { id: 'k2', title: 'Datasets Cleaned', value: 10, suffix: '+', trend: 15, icon: '🧹' },
      { id: 'k3', title: 'Rows Processed', value: 10000, suffix: '+', trend: 45, icon: '📈' },
      { id: 'k4', title: 'Tools Mastered', value: 7, suffix: '', trend: 10, icon: '🛠️' },
    ],
    learningActivity: [
      { label: 'Week 1', value: 6.5 }, 
      { label: 'Week 2', value: 9.0 }, 
      { label: 'Week 3', value: 5.5 }, 
      { label: 'Week 4', value: 8.5 }
    ],
    techSpread: [
      { name: 'SQL', value: 45, color: '#00ffaa' },
      { name: 'Power BI', value: 30, color: '#f2c811' },
      { name: 'MS Excel', value: 15, color: '#217346' },
      { name: 'Power Query', value: 10, color: '#ff3366' },
    ]
  },
  'Last 8 Weeks': {
    kpis: [
      { id: 'k1', title: 'Projects Built', value: 8, suffix: '+', trend: 12, icon: '📊' },
      { id: 'k2', title: 'Datasets Cleaned', value: 24, suffix: '+', trend: 25, icon: '🧹' },
      { id: 'k3', title: 'Rows Processed', value: 45000, suffix: '+', trend: 60, icon: '📈' },
      { id: 'k4', title: 'Tools Mastered', value: 7, suffix: '', trend: 5, icon: '🛠️' },
    ],
    learningActivity: [
      { label: 'Week 5', value: 7.0 }, { label: 'Week 6', value: 8.5 }, 
      { label: 'Week 7', value: 9.5 }, { label: 'Week 8', value: 6.0 }
    ],
    techSpread: [
      { name: 'SQL', value: 40, color: '#00ffaa' },
      { name: 'Power BI', value: 35, color: '#f2c811' },
      { name: 'MS Excel', value: 15, color: '#217346' },
      { name: 'Power Query', value: 10, color: '#ff3366' },
    ]
  },
  'All Time': {
    kpis: [
      { id: 'k1', title: 'Projects Built', value: 15, suffix: '+', trend: 35, icon: '📊' },
      { id: 'k2', title: 'Datasets Cleaned', value: 50, suffix: '+', trend: 40, icon: '🧹' },
      { id: 'k3', title: 'Rows Processed', value: 250000, suffix: '+', trend: 80, icon: '📈' },
      { id: 'k4', title: 'Tools Mastered', value: 7, suffix: '', trend: 15, icon: '🛠️' },
    ],
    learningActivity: [
      { label: 'Q1', value: 7.5 }, { label: 'Q2', value: 8.2 }, 
      { label: 'Q3', value: 9.8 }, { label: 'Q4', value: 7.0 }
    ],
    techSpread: [
      { name: 'SQL', value: 35, color: '#00ffaa' },
      { name: 'Power BI', value: 35, color: '#f2c811' },
      { name: 'MS Excel', value: 20, color: '#217346' },
      { name: 'Power Query', value: 10, color: '#ff3366' },
    ]
  }
};

// Animated Number Component with Suffix Support
const Counter = ({ from, to, suffix }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    const duration = 1500; // ms
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [to, from]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('Last 4 Weeks');
  const [data, setData] = useState(dashboardData['Last 4 Weeks']);
  
  useEffect(() => {
    setData(dashboardData[activeFilter]);
  }, [activeFilter]);

  // Calculate SVG Doughnut Chart paths
  const calculateStrokeDasharray = (value, total) => {
    const circumference = 2 * Math.PI * 45; // r=45
    return `${(value / total) * circumference} ${circumference}`;
  };

  const calculateStrokeDashoffset = (index, array, total) => {
    const circumference = 2 * Math.PI * 45;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (array[i].value / total) * circumference;
    }
    return -offset;
  };

  const totalTech = data.techSpread.reduce((acc, curr) => acc + curr.value, 0);
  
  // Max hours for the bar chart Y-Axis
  const MAX_HOURS = 10;

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <motion.div
        className="section-header-unique"
        style={{ marginBottom: '20px' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="header-main-title">Analytics <span>Core</span></h2>
        <div className="header-decoration" />
      </motion.div>

      {/* SLICERS */}
      <div className="dash-slicers" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        {Object.keys(dashboardData).map(filter => (
          <button 
            key={filter} 
            className={`slicer-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* KPI GRID */}
      <div className="kpi-container">
        {data.kpis.map((kpi, idx) => (
          <motion.div 
            key={`${kpi.id}-${activeFilter}`}
            className="kpi-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <div className="kpi-header">
              <span className="kpi-title">{kpi.title}</span>
              <span className="kpi-icon">{kpi.icon}</span>
            </div>
            
            <h3 className="kpi-value"><Counter from={0} to={kpi.value} suffix={kpi.suffix} /></h3>
            
            <div className={`kpi-trend ${kpi.trend >= 0 ? 'trend-up' : 'trend-down'}`}>
              {kpi.trend >= 0 ? '▲' : '▼'} {Math.abs(kpi.trend)}% vs pre. cycle
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        
        {/* BAR CHART: TIME SPENT LEARNING */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">DOMAIN LEARNING MATRIX (HOURS)</h3>
          </div>
          
          <div className="bar-chart-container">
            {/* Grid Lines Overlay representing Y-Axis 0, 2, 4, 6, 8, 10 */}
            <div className="grid-lines">
               <div className="grid-line" data-label="10h" style={{bottom: '100%'}}></div>
               <div className="grid-line" data-label="8h" style={{bottom: '80%'}}></div>
               <div className="grid-line" data-label="6h" style={{bottom: '60%'}}></div>
               <div className="grid-line" data-label="4h" style={{bottom: '40%'}}></div>
               <div className="grid-line" data-label="2h" style={{bottom: '20%'}}></div>
               <div className="grid-line" data-label="0h" style={{bottom: '0%'}}></div>
            </div>

            <AnimatePresence mode="popLayout">
              {data.learningActivity.map((item, idx) => (
                <div key={`${item.label}-${activeFilter}`} className="bar-wrapper">
                  <div className="bar-value-tooltip">{item.value} hrs</div>
                  <motion.div 
                    className="bar data-analyst-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / MAX_HOURS) * 100}%` }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.05 }}
                  />
                  <div className="bar-label">{item.label}</div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* DOUGHNUT CHART */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">CORE SKILL DISTRIBUTION</h3>
          </div>
          
          <div className="activity-ring-container">
            <svg viewBox="0 0 100 100" className="circular-chart">
               <circle cx="50" cy="50" r="45" className="circle-bg" />
               {data.techSpread.map((tech, i) => (
                 <motion.circle
                   key={`${tech.name}-${activeFilter}`}
                   cx="50"
                   cy="50"
                   r="45"
                   className="circle-fill"
                   style={{ stroke: tech.color }}
                   initial={{ strokeDasharray: `0 ${2 * Math.PI * 45}` }}
                   animate={{ 
                     strokeDasharray: calculateStrokeDasharray(tech.value, totalTech),
                     strokeDashoffset: calculateStrokeDashoffset(i, data.techSpread, totalTech) 
                   }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                 />
               ))}
            </svg>
            
            <div className="ring-labels">
               {data.techSpread.map(tech => (
                 <div key={tech.name} className="ring-legend-item">
                    <div className="legend-color" style={{ background: tech.color }}></div>
                    <div className="legend-name">{tech.name}</div>
                    <div className="legend-value">{Math.round((tech.value / totalTech) * 100)}%</div>
                 </div>
               ))}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
