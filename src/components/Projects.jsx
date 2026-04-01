import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/projects.css';

// Importing images from assets
import project1 from '../assets/credit_card_project.png';
import project2 from '../assets/car_sales_project.png';
import project3 from '../assets/fnp_sales_project.png';

const projectsData = [
  {
    id: 1,
    title: "Credit Card Financial Dashboard",
    category: "Data Visualization",
    description: "Interactive dashboard made using SQL and Power BI to monitor and analyze credit card financial transactions, revenue, and customer demographics.",
    image: project1,
    tags: ["SQL", "Power BI"],
    link: "https://github.com/navsharma15/credit-card-financial-dashboard"
  },
  {
    id: 2,
    title: "Car Sales Dashboard",
    category: "Data Analytics",
    description: "Comprehensive car sales analysis dashboard visualizing key metrics like sales by year, fuel type, branding, and transmission using SQL and Power BI.",
    image: project2,
    tags: ["SQL", "Power BI"],
    link: "#"
  },
  {
    id: 3,
    title: "FNP Sales Dashboard",
    category: "Business Intelligence",
    description: "A detailed sales analysis dashboard built with MS Excel and Power Query to track orders, revenue, occasion-based trends, and product performance over time.",
    image: project3,
    tags: ["MS Excel", "Power Query"],
    link: "https://github.com/navsharma15/FNP_Sales_Analysis_and_Dashboard"
  }
];

const ProjectCard = ({ project, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    // Increased sensitivity for a more dramatic 'projection' feel
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      className="project-card-wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <motion.div 
        className="project-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ 
          rotateX: rotate.x, 
          rotateY: rotate.y,
          translateZ: 20
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="project-card-inner">
          <div className="project-image-container">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-overlay">
              <div className="project-category">{project.category}</div>
              {project.link !== "#" ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    className="project-view-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Project
                  </motion.button>
                </a>
              ) : (
                <motion.button 
                  className="project-view-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View Project
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="project-info">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
          
          {/* Glass Reflections */}
          <div className="glass-reflection"></div>
          <div className="glass-shine"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="projects-container">
      <motion.div
        className="section-header-unique"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="header-main-title">Impactful <span>Solutions</span></h2>
        <div className="header-decoration" />
      </motion.div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
