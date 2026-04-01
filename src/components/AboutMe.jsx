import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/aboutme.css';

/**
 * AboutMe — Game-Like Academic Journey & Vision
 * Progressively glows milestones and vision as the character boy moves.
 */
const AboutMe = () => {
  const containerRef = useRef(null);
  const roadmapRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);

  useEffect(() => {
    // Dynamically find the scrollable parent container for accurate scroll tracking
    const findScrollParent = (el) => {
      if (!el) return null;
      if (el.scrollHeight > el.clientHeight && 
          (getComputedStyle(el).overflowY === 'auto' || getComputedStyle(el).overflowY === 'scroll')) {
        return el;
      }
      return findScrollParent(el.parentElement);
    };
    
    // Safety check for ref existence
    if (containerRef.current) {
      const parent = findScrollParent(containerRef.current);
      if (parent) {
        setScrollContainer(parent);
      }
    }
  }, []);
  
  // Track scroll progress for the roadmap
  const { scrollYProgress: roadmapProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined,
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
      <motion.div
        className="section-header-unique"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="header-main-title">My Academic <span>Journey</span></h2>
        <div className="header-decoration" />
      </motion.div>

      <div className="roadmap-container" ref={roadmapRef}>
        {/* Animated Glow Path */}
        <div className="roadmap-path-base">
          <motion.div 
            className="roadmap-path-glow"
            style={{ height: characterY }}
          />
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((pos, i) => (
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
    if (window.innerWidth <= 1024) return;
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

  // Improved target position calculation to center the glow on the emoji presence
  const targetPos = (index + 0.5) / total;
  const glowEdge = 0.08; 
  const plateau = 0.03;
  
  // Create a glow profile with a plateau at the center for "perfect" side-by-side glow
  let glowRange = [
    targetPos - glowEdge, 
    targetPos - plateau, 
    targetPos + plateau, 
    targetPos + glowEdge
  ];
  let glowOutputs = [0.1, 1, 1, 0.4];

  // Specific handling for the last (VISION) card to stay glowing
  if (index === total - 1) {
    glowRange = [targetPos - glowEdge*1.5, targetPos - plateau, 1, 1.2];
    glowOutputs = [0.1, 1, 1, 1];
  }
  // Handling for the first card to start glowing
  if (index === 0) {
    glowRange = [-0.1, 0, plateau, glowEdge];
    glowOutputs = [1, 1, 1, 0.4];
  }

  const glowIntensity = useTransform(progress, glowRange, glowOutputs);

  const shadowGlow = useTransform(
    glowIntensity,
    [0, 1],
    ["rgba(0, 255, 170, 0)", "0 0 45px rgba(0, 255, 170, 0.7)"]
  );

  const borderGlow = useTransform(
    glowIntensity,
    [0, 1],
    ["rgba(0, 255, 170, 0.1)", "rgba(0, 255, 170, 1)"]
  );

  const opacity = useTransform(
    progress,
    [targetPos - 0.2, targetPos - 0.05],
    [0.1, 1]
  );
  
  const scale = useTransform(
    progress,
    [targetPos - 0.2, targetPos],
    [0.85, 1]
  );

  const y = useTransform(
    progress,
    [targetPos - 0.2, targetPos],
    [50, 0]
  );

  return (
    <motion.div 
      className={`milestone-item ${data.align} ${data.isVision ? 'vision-milestone' : ''}`}
      style={{ opacity, scale, y }}
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
          <motion.div 
            className="icon-pulse"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ borderColor: borderGlow }}
          />
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
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ 
            transformStyle: 'preserve-3d',
            borderColor: borderGlow,
            boxShadow: shadowGlow
          }}
        >
          <div className="hologram-scanline" />
          
          <div className="milestone-header" style={{ transform: 'translateZ(30px)' }}>
            <span className="milestone-year">{data.year}</span>
            <h3 className="milestone-title">{data.title}</h3>
          </div>
          
          <div className="milestone-body" style={{ transform: 'translateZ(15px)' }}>
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
          <motion.div 
            className="card-glare" 
            style={{ 
              opacity: glowIntensity,
              background: 'radial-gradient(circle at center, rgba(0,255,170,0.2) 0%, transparent 70%)' 
            }} 
          />
        </motion.div>
      </div>

      {/* NEW ANIMATED WATERMARK TEXT */}
      <motion.div 
         className={`milestone-watermark ${data.align === 'left' ? 'right-side' : 'left-side'}`}
         data-text={data.title}
         style={{ 
           opacity: glowIntensity,
           y: "-50%",
           x: useTransform(progress, [targetPos - 0.12, targetPos - 0.02], [data.align === 'left' ? -60 : 60, 0]),
           scale: useTransform(progress, [targetPos - 0.12, targetPos - 0.02], [0.95, 1])
         }}
      >
        {data.title}
      </motion.div>

      <div className="milestone-connection" />
    </motion.div>
  );
};

export default AboutMe;