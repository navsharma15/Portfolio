import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileImg from '../assets/profile.png';
import '../styles/aboutme.css';

/**
 * AboutMe — Hyper-Realistic 3D Glassmorphism Experience
 */

/* ── Wavy Background Canvas ── */
const WavyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#020d0a');
      bg.addColorStop(0.5, '#031a12');
      bg.addColorStop(1, '#010806');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

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
        for (let xNum = 0; xNum <= W; xNum += 3) {
          const yy =
            y +
            Math.sin(xNum * freq + time * speed) * amp +
            Math.cos(xNum * freq * 1.5 - time * speed * 0.7) * amp * 0.4;
          ctx.lineTo(xNum, yy);
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

  return <canvas ref={canvasRef} className="aboutme-wave-canvas" />;
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

  const bioText = `Hello everyone, my name is Nav Sharma. I am currently pursuing my B.Tech (3rd year) from GLA University, Mathura. I am passionate about Data Analytics and enjoy working with data to find meaningful insights and solve real-world problems.

I have hands-on experience with tools like SQL, Excel, and Power BI, and I’ve built projects such as an E-commerce Sales Dashboard and a Car Sales Dashboard. These projects helped me strengthen my skills in data cleaning, visualization, and storytelling through data.

Along with Data Analytics, I am also exploring Web Development, as I believe combining both skills helps in building complete, data-driven solutions. I enjoy learning new technologies and continuously improving myself.

My goal is to become a skilled Data Analyst and contribute to an organization by transforming raw data into valuable insights that support smart decision-making.

Thank you.`;

  return (
    <div className="aboutme-page">
      <WavyBackground />
      <FloatingParticles />

      {/* ── Title — Outside ── */}
      <motion.div
        className="aboutme-title-wrap"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <div className="aboutme-title-indicator">
          <span className="aboutme-title-dot" />
          <span className="aboutme-title-line" />
        </div>
        <h2 className="aboutme-title">ABOUT ME</h2>
      </motion.div>

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
        
        <div className="aboutme-ticker-container" style={{ transform: "translateZ(50px)" }}>
          <div className="aboutme-ticker-text">
            {bioText}
          </div>
        </div>

        <div className="aboutme-glass-mask-top" />
        <div className="aboutme-glass-mask-bottom" />
      </motion.div>
    </div>
  );
};



export default AboutMe;
