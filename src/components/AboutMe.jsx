import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/aboutme.css';

/**
 * AboutMe — Premium glassmorphism About Me page
 * Features:
 *  - Animated wavy background (canvas)
 *  - Glass card with neon green border glow
 *  - Staggered text animations
 *  - Subtle parallax on mouse move
 *  - Floating particles
 */

/* ── Wavy Background Canvas ── */
const WavyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      // Deep dark-green gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#020d0a');
      bg.addColorStop(0.5, '#031a12');
      bg.addColorStop(1, '#010806');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Draw 5 subtle wave layers
      const waves = [
        { amp: 40, freq: 0.003, speed: 0.4, y: H * 0.35, alpha: 0.06 },
        { amp: 55, freq: 0.002, speed: 0.3, y: H * 0.45, alpha: 0.05 },
        { amp: 35, freq: 0.004, speed: 0.6, y: H * 0.55, alpha: 0.07 },
        { amp: 50, freq: 0.0025, speed: 0.25, y: H * 0.65, alpha: 0.04 },
        { amp: 30, freq: 0.0035, speed: 0.5, y: H * 0.78, alpha: 0.06 },
      ];

      waves.forEach(({ amp, freq, speed, y, alpha }) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const yy =
            y +
            Math.sin(x * freq + time * speed) * amp +
            Math.cos(x * freq * 1.5 - time * speed * 0.7) * amp * 0.4;
          ctx.lineTo(x, yy);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, y - amp, 0, H);
        grad.addColorStop(0, `rgba(0, 255, 170, ${alpha})`);
        grad.addColorStop(0.6, `rgba(0, 180, 110, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(0, 60, 40, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      time += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aboutme-wave-canvas"
    />
  );
};

/* ── Floating Particles ── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="aboutme-particles">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="aboutme-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ── Main AboutMe Component ── */
const AboutMe = () => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Parallax on mouse move
  const handleMouseMove = (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setMouse({
      x: ((e.clientX - cx) / cx) * 8,
      y: ((e.clientY - cy) / cy) * 8,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stagger container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const skills = [
    { name: 'SQL', level: 90 },
    { name: 'Excel', level: 85 },
    { name: 'Power BI', level: 88 },
    { name: 'Python', level: 80 },
  ];

  return (
    <div className="aboutme-page">
      <WavyBackground />
      <FloatingParticles />

      {/* ── Title — Outside the glass card ── */}
      <motion.div
        className="aboutme-title-wrap"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div className="aboutme-title-indicator">
          <span className="aboutme-title-dot" />
          <span className="aboutme-title-line" />
        </div>
        <h2 className="aboutme-title">ABOUT ME</h2>
      </motion.div>

      {/* ── Glass Card ── */}
      <motion.div
        className="aboutme-glass"
        ref={cardRef}
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        }}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="aboutme-glass-inner"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name + Role */}
          <motion.div className="aboutme-header" variants={itemVariants}>
            <h3 className="aboutme-name">Nav Sharma</h3>
            <span className="aboutme-role">Data Analyst</span>
          </motion.div>

          <motion.div className="aboutme-divider" variants={itemVariants} />

          {/* Bio */}
          <motion.p className="aboutme-bio" variants={itemVariants}>
            Passionate about transforming raw data into meaningful insights.
            I specialize in building interactive dashboards and crafting
            data-driven stories that empower smarter business decisions.
          </motion.p>

          {/* Skills */}
          <motion.div className="aboutme-skills-section" variants={itemVariants}>
            <h4 className="aboutme-skills-heading">Core Skills</h4>
            <div className="aboutme-skills-grid">
              {skills.map((s, i) => (
                <motion.div
                  className="aboutme-skill-chip"
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(0,255,170,0.35)' }}
                >
                  <span className="aboutme-skill-name">{s.name}</span>
                  <div className="aboutme-skill-bar-track">
                    <motion.div
                      className="aboutme-skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="aboutme-divider" variants={itemVariants} />

          {/* Interest */}
          <motion.div className="aboutme-interest" variants={itemVariants}>
            <span className="aboutme-interest-label">Interest</span>
            <span className="aboutme-interest-value">
              <span className="aboutme-interest-icon">🤖</span>
              AI / Machine Learning
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
