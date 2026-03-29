import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileImg from '../assets/profile.png';
import '../styles/aboutme.css';

/**
 * AboutMe — Hyper-Realistic 3D Glassmorphism Experience
 */
/* ── Main AboutMe Component ── */
const AboutMe = () => {
  const cardRef = useRef(null);

  // 3D Tilt Motion Value Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Degrees for tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bioText = `Hello everyone, my name is Nav Sharma. I am currently pursuing my B.Tech (3rd year) from GLA University, Mathura.

I am passionate about Data Analytics and enjoy working with data to find meaningful insights and solve real-world problems.

I have hands-on experience with tools like SQL, Excel, and Power BI, and I’ve built projects such as an E-commerce Sales Dashboard and a Car Sales Dashboard. These projects helped me strengthen my skills in data cleaning, visualization, and storytelling through data.

Along with Data Analytics, I am also exploring Web Development, as I believe combining both skills helps in building complete, data-driven solutions. I enjoy learning new technologies and continuously improving myself.

My goal is to become a skilled Data Analyst and contribute to an organization by transforming raw data into valuable insights that support smart decision-making.

Thank you.`;

  return (
    <div className="aboutme-page">
      {/* Background is now global from Portfolio.jsx */}

      {/* ── Realistic 3D Glass Card ── */}
      <motion.div
        className="aboutme-glass"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="aboutme-glass-pointer" />

        {/* ── Title — Now Inside ── */}
        <div className="aboutme-title-wrap">
          <div className="aboutme-title-indicator desktop-only">
            <span className="aboutme-title-dot" />
            <span className="aboutme-title-line" />
          </div>
          <h2 className="aboutme-title">ABOUT ME</h2>
        </div>
        
        {/* Mobile Top Glowing Line */}
        <div className="mobile-glowing-line top-line"></div>
        
        <div className="aboutme-ticker-container" style={{ transform: "translateZ(50px)" }}>
          <div className="aboutme-ticker-text">
            {bioText}
          </div>
        </div>

        {/* Mobile Bottom Glowing Line */}
        <div className="mobile-glowing-line bottom-line"></div>

        <div className="aboutme-glass-mask-top" />
        <div className="aboutme-glass-mask-bottom" />
      </motion.div>
    </div>
  );
};

export default AboutMe;
