import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/projects.css';

// Importing images from assets
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const projectsData = [
  {
    id: 1,
    title: "EcoTrack Analytics",
    category: "Data Visualization",
    description: "A high-performance real-time carbon footprint monitoring dashboard. Visualizing global sustainability metrics with interactive 3D maps and predictive AI modeling.",
    image: project1,
    tags: ["React", "D3.js", "Python", "TensorFlow"],
    link: "#"
  },
  {
    id: 2,
    title: "NeuroCore AI",
    category: "Machine Learning",
    description: "An advanced neural network visualization tool designed for deep learning researchers. Real-time inference monitoring and dynamic architectural path tracing.",
    image: project2,
    tags: ["Next.js", "Three.js", "PyTorch", "GraphQL"],
    link: "#"
  },
  {
    id: 3,
    title: "CyberShield OS",
    category: "Cyber Security",
    description: "Military-grade network intrusion detection system with a futuristic HUD interface. Real-time packet analysis and automated threat mitigation protocols.",
    image: project3,
    tags: ["Rust", "WebAssembly", "Socket.io", "PostgreSQL"],
    link: "#"
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
              <motion.button 
                className="project-view-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                View Case Study
              </motion.button>
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
      <div className="projects-header">
        <motion.span 
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selected Works
        </motion.span>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Impactful <span className="highlight">Solutions</span>
        </motion.h2>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
