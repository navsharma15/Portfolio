import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/aboutme.css';

/**
 * AboutMe — Game-Like Academic Journey & Vision
 * Progressively glows milestones and vision as the character boy moves.
 */
const AboutMe = () => {
  const containerRef = useRef(null);
  const roadmapRef = useRef(null);
  
  // Track scroll progress for the roadmap (including Vision at the end)
  const { scrollYProgress: roadmapProgress } = useScroll({
    container: containerRef,
    target: roadmapRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(roadmapProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  const roadmapData = [
    {
      id: 1,
      year: "2018-2020",
      title: "10th Standard",
      institution: "St. Arjay Public School",
      location: "Bulandshahr",
      details: "Foundation years filled with curiosity and technical exploration.",
      points: ["Academic Excellence", "Leadership"],
      icon: "🏫",
      align: "left"
    },
    {
      id: 2,
      year: "2020-2022",
      title: "12th Standard",
      institution: "PCM with CSE",
      location: "Academic Core",
      details: "Diving deeper into Science and Programming fundamentals.",
      points: ["Core Sciences", "First code lines"],
      icon: "💻",
      align: "right"
    },
    {
      id: 3,
      year: "2022-Present",
      title: "B.Tech CSE",
      institution: "GLA University",
      location: "Mathura",
      details: "Pursuing Engineering and specializing in Data & Web domains.",
      points: ["3rd Year Undergrad", "Data Enthusiast"],
      icon: "🎓",
      align: "left"
    },
    {
      id: 4,
      year: "2025 Goal",
      title: "Data Analyst",
      institution: "Professional Path",
      location: "Tech Industry",
      details: "Transforming raw data into meaningful and actionable business insights.",
      points: ["Storytelling", "Analysis"],
      icon: "📊",
      align: "right"
    },
    {
      id: 5,
      year: "VISION",
      title: "My Mission & Goal",
      institution: "Transforming Complexity",
      location: "Future Career",
      details: "To become a pioneering Data Analyst who bridges the gap between raw numbers and strategic growth.",
      points: ["Empower Decisions", "Drive Innovation", "Data Clarity"],
      icon: "🎯",
      align: "left",
      isVision: true
    }
  ];

  // Emoji Boy movement — traveling across all 5 milestones
  const characterY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const characterRotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 15, -15, 15, -15, 0]);

  return (
    <div className="aboutme-section" ref={containerRef}>
      <div className="roadmap-title-area">
        <motion.h2 
          className="roadmap-heading"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Academic <span className="highlight">Journey</span>
        </motion.h2>
        <div className="roadmap-subtitle">Tracing the path to Vision</div>
      </div>

      <div className="roadmap-container" ref={roadmapRef}>
        <div className="roadmap-path-base">
          <motion.div 
            className="roadmap-path-glow"
            style={{ height: characterY }}
          />
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <div key={i} className="path-ping" style={{ top: `${pos * 100}%` }} />
          ))}
        </div>

        {/* Emoji Boy Character */}
        <motion.div 
          className="roadmap-character"
          style={{ 
            top: characterY,
            rotate: characterRotate
          }}
        >
          <div className="character-emoji-wrap">
            <span className="character-emoji">👦</span>
            <div className="character-aura" />
          </div>
        </motion.div>

        {roadmapData.map((item, index) => (
          <Milestone 
            key={item.id} 
            data={item} 
            index={index} 
            total={roadmapData.length}
            progress={smoothProgress}
          />
        ))}

        <div className="goal-area">
          <div className="goal-particles">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="goal-particle"
                animate={{
                  y: [-20, -150],
                  x: [0, (i - 6) * 30],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Milestone = ({ data, index, total, progress }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Recalibrated Synchronized Glow 
  // Shifts target positions earlier to account for the goal area footer
  const totalSteps = total + 0.5; // Adding buffer for the goal area
  const targetPos = index / totalSteps;
  const glowRadius = 0.06; 
  
  // High-sensitivity glow for the Vision card
  let range = [targetPos - glowRadius, targetPos, targetPos + glowRadius];
  if (index === total - 1) {
    range = [targetPos - 0.1, targetPos, 1.2]; // Stays glowing as you approach the goal
  }

  const glowIntensity = useTransform(
    progress,
    range,
    [0, 1, 1]
  );

  const shadowGlow = useTransform(
    glowIntensity,
    [0, 1],
    ["rgba(0, 255, 170, 0)", "0 0 35px rgba(0, 255, 170, 0.7)"]
  );

  const borderGlow = useTransform(
    glowIntensity,
    [0, 1],
    ["rgba(0, 255, 170, 0.15)", "rgba(0, 255, 170, 1)"]
  );

  // Card opacity and reveal
  const opacity = useTransform(
    progress,
    [targetPos - 0.2, targetPos],
    [0.3, 1]
  );
  
  const scale = useTransform(
    progress,
    [targetPos - 0.1, targetPos],
    [0.9, 1.02]
  );

  return (
    <motion.div 
      className={`milestone-item ${data.align} ${data.isVision ? 'vision-milestone' : ''}`}
      style={{ opacity, scale }}
    >
      <div className="milestone-content-wrapper">
        <motion.div 
          className="milestone-icon-box"
          style={{ 
            borderColor: borderGlow, 
            boxShadow: shadowGlow 
          }}
        >
          <span className="milestone-icon">{data.icon}</span>
        </motion.div>
        
        <motion.div 
          className="milestone-card"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          animate={{ 
            rotateX: rotate.x, 
            rotateY: rotate.y,
            translateZ: 30
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          style={{ 
            transformStyle: 'preserve-3d',
            borderColor: borderGlow,
            boxShadow: shadowGlow
          }}
        >
          <div className="milestone-header" style={{ transform: 'translateZ(20px)' }}>
            <span className="milestone-year">{data.year}</span>
            <h3 className="milestone-title">{data.title}</h3>
          </div>
          
          <div className="milestone-body" style={{ transform: 'translateZ(10px)' }}>
            <h4 className="milestone-inst">{data.institution}</h4>
            <div className="milestone-loc">📍 {data.location}</div>
            <p className="milestone-desc">{data.details}</p>
            <div className="milestone-points">
              {data.points.map((pt, i) => (
                <div key={i} className="milestone-pt">
                  <span className="pt-dot" /> {pt}
                </div>
              ))}
            </div>
          </div>
          <motion.div className="card-glare" style={{ opacity: glowIntensity }} />
        </motion.div>
      </div>
      <div className="milestone-connection" />
    </motion.div>
  );
};

export default AboutMe;
