import React from 'react';
import '../styles/skills.css';

const toolkitData = [
  { id: 1, name: "SQL", icon: <DatabaseIcon />, bgColor: "linear-gradient(135deg, #0f2027, #2c5364)" },
  { id: 2, name: "Excel", icon: <ExcelIcon />, bgColor: "linear-gradient(135deg, #11998e, #38ef7d)" },
  { id: 3, name: "Power BI", icon: <PowerBIIcon />, bgColor: "linear-gradient(135deg, #f2c94c, #f2994a)" },
  { id: 4, name: "Tableau", icon: <TableauIcon />, bgColor: "linear-gradient(135deg, #8E2DE2, #4A00E0)" },
  { id: 5, name: "Python", icon: <PythonIcon />, bgColor: "linear-gradient(135deg, #000428, #004e92)" },
  { id: 6, name: "Pandas", icon: <PandasIcon />, bgColor: "linear-gradient(135deg, #c31432, #240b36)" },
  { id: 7, name: "Jupyter", icon: <JupyterIcon />, bgColor: "linear-gradient(135deg, #fdc830, #f37335)" },
  { id: 8, name: "Statistics", icon: <StatsIcon />, bgColor: "linear-gradient(135deg, #1CB5E0, #000046)" },
  { id: 9, name: "GitHub", icon: <GithubIcon />, bgColor: "linear-gradient(135deg, #141E30, #243B55)" },
];

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

function ExcelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <path d="M9 12l6 6"></path>
      <path d="M15 12l-6 6"></path>
    </svg>
  );
}

function PowerBIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <rect x="15" y="4" width="4" height="16" rx="1"></rect>
      <rect x="9" y="8" width="4" height="12" rx="1"></rect>
      <rect x="3" y="14" width="4" height="6" rx="1"></rect>
    </svg>
  );
}

function TableauIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <circle cx="12" cy="12" r="3" fill="white"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
      <circle cx="12" cy="6" r="1.5"></circle>
      <circle cx="12" cy="18" r="1.5"></circle>
      <circle cx="8" cy="8" r="1"></circle>
      <circle cx="16" cy="16" r="1"></circle>
      <circle cx="8" cy="16" r="1"></circle>
      <circle cx="16" cy="8" r="1"></circle>
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <path d="M12 2c-4 0-4 2-4 2v3h8s0-2-4-2z"></path>
      <path d="M8 7v4s0 2 -2 2H4s-2 0 -2 -4 2 -4 2 -4"></path>
      <path d="M12 22c4 0 4-2 4-2v-3H8s0 2 4 2z"></path>
      <path d="M16 17v-4s0-2 2-2h2s2 0 2 4-2 4-2 4"></path>
      <circle cx="10" cy="4" r="0.5" fill="white"></circle>
      <circle cx="14" cy="20" r="0.5" fill="white"></circle>
    </svg>
  );
}

function PandasIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </svg>
  );
}

function JupyterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <circle cx="12" cy="12" r="3" fill="white"></circle>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <path d="M2 20h20"></path>
      <path d="M4 16c3-1 4-8 8-8s5 7 8 8" strokeWidth="2" strokeLinejoin="round"></path>
      <line x1="12" y1="20" x2="12" y2="8" strokeDasharray="2 2"></line>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app-icon-svg">
      <line x1="6" y1="3" x2="6" y2="15"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
  );
}

const labelsData = [
  { id: "lbl1", text: "Data Querying", pos: { left: "1%", top: "5%" } },
  { id: "lbl2", text: "Data Cleaning", pos: { left: "50%", top: "1%" }, transform: "translateX(-50%)" },
  { id: "lbl3", text: "Dashboards", pos: { right: "1%", top: "5%" } },
  { id: "lbl4", text: "Visualization", pos: { left: "0.5%", top: "35%" } },
  { id: "lbl5", text: "Scripting & ML", pos: { left: "14%", top: "89%" } },
  { id: "lbl6", text: "Manipulation", pos: { right: "0.5%", top: "35%" } },
  { id: "lbl7", text: "Exploration", pos: { left: "1%", top: "76%" } },
  { id: "lbl8", text: "Modeling", pos: { left: "50%", top: "92%" }, transform: "translateX(-50%)" },
  { id: "lbl9", text: "Version Control", pos: { right: "1%", top: "76%" } },
];

const pathsData = [
  "M 140 90 C 200 90, 200 186, 233 186",  /* 1: SQL center */
  "M 500 55 C 500 110, 500 150, 500 186", /* 2: Excel center */
  "M 860 90 C 800 90, 800 186, 766 186",  /* 3: Power BI center */
  "M 110 320 C 200 320, 200 400, 233 400", /* 4: Tableau center */
  "M 215 735 C 380 735, 500 580, 500 400", /* 5: Python center */
  "M 890 320 C 800 320, 800 400, 766 400", /* 6: Pandas center */
  "M 140 680 C 200 680, 200 613, 233 613", /* 7: Jupyter center */
  "M 500 765 C 380 740, 620 700, 500 613", /* 8: Stats center */
  "M 860 680 C 800 680, 800 613, 766 613"  /* 9: Github center */
];

const Skills = () => {
  return (
    <div className="skills-main-wrapper">
      {/* --- DESKTOP VIEW --- */}
      <div className="skills-desktop-view">
        <svg viewBox="0 0 1000 800" className="skills-svg-layer" preserveAspectRatio="none">
          {/* Pure Magical Snakes Without Arrowheads or Tracks */}
          {pathsData.map((d, idx) => (
            <React.Fragment key={idx}>
              {/* Bright glowing snake that moves along the exact path */}
              <path d={d} className="tech-arrow-snake" style={{ animationDelay: `${idx * 0.2}s` }} />
            </React.Fragment>
          ))}
        </svg>

        <div className="skills-diagram-content container-3d">
          {/* External Labels with Bigger Glassy Cards */}
          {labelsData.map((lbl, i) => (
            <div 
              key={lbl.id} 
              className="diagram-label-wrapper"
              style={{ 
                left: lbl.pos.left, 
                right: lbl.pos.right, 
                top: lbl.pos.top, 
                transform: lbl.transform, 
                animationDelay: `${i * 0.15}s` 
              }}
            >
              <div className="diagram-label-card">
                {lbl.text}
              </div>
            </div>
          ))}

          {/* Central Glass Box */}
          <div className="glass-grid-box">
            <div className="glass-grid-inner">
              {toolkitData.map((tool) => (
                <div key={tool.id} className="tool-app-card">
                  <div className="tool-app-icon" style={{ background: tool.bgColor }}>
                    {tool.icon}
                  </div>
                  <span className="tool-app-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="skills-mobile-view">
        <div className="mobile-tools-grid">
           {toolkitData.map((tool, index) => (
             <div key={tool.id} className="mobile-tool-card" style={{ animationDelay: `${index * 0.1}s` }}>
               <div className="mobile-tool-icon" style={{ background: tool.bgColor }}>
                 {tool.icon}
               </div>
               <div className="mobile-tool-info">
                 <h4 className="mobile-tool-name">{tool.name}</h4>
                 <p className="mobile-tool-desc">{labelsData[index].text}</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
