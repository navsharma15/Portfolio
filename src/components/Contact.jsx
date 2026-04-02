import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/navsharma989@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          _subject: `Uplink Signal from ${formData.name}`,
        })
      });

      if (response.ok) {
        setFormData({ name: '', message: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error("Transmission Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReady = formData.name.trim().length > 0 && formData.message.trim().length > 0;

  const links = [
    { 
      name: 'COMM-LINK', 
      val: '+91 87912-01989', 
      link: 'tel:+918791201989', 
      color: '#00ffaa',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.022-3.49-6.82-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.107-1.034z"/>
        </svg>
      )
    },
    { 
      name: 'LINKEDIN', 
      val: 'in/nav-sharma', 
      link: 'https://www.linkedin.com/in/nav-sharma/', 
      color: '#0a66c2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'GITHUB', 
      val: 'navsharma15', 
      link: 'https://github.com/navsharma15', 
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'CORE-EMAIL', 
      val: 'navsharma989@gmail.com', 
      link: 'mailto:navsharma989@gmail.com', 
      color: '#ea4335',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.866l5.6-6.812zm9.201-1.251l4.623-3.747v9.476l-4.623-5.729z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="contact-viewport">
      {/* SUCCESS RADIANCE */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="uplink-success-hud"
            initial={{ opacity: 0, scale: 1.5, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          >
            <div className="hud-success-orb"></div>
            <h3>TRANSMISSION COMPLETE</h3>
            <p>DATA SECURED IN CORE</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="holographic-contact-grid">
        {/* LEFT: TRANSMISSION MODULE */}
        <motion.div 
          className="transmission-module"
          initial={{ opacity: 0, x: -100, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="module-header">
            <div className="glitch-node"></div>
            <span className="module-label">UPLINK TERMINAL / SIGNAL-X7</span>
          </div>

          <form onSubmit={handleSubmit} className="terminal-form">
            <div className="input-block">
              <label>PILOT IDENTIFIER</label>
              <div className="input-bracket">
                <input 
                  type="text" 
                  name="name" 
                  autoComplete="off"
                  placeholder="INPUT ID_CODE"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-block">
              <label>ENCRYPTED FREQUENCY MESSAGE</label>
              <div className="input-bracket">
                <textarea 
                  name="message" 
                  placeholder="ENTER DATA PACKET..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`uplink-btn ${isReady ? 'ready' : ''}`}
              disabled={isSubmitting || !isReady}
            >
              <div className="btn-glow"></div>
              {isSubmitting ? 'UPLINKING...' : 'INITIATE TRANSMISSION'}
            </button>

            <div className="form-telemetry">
              <span className="tele-val">STRENGTH: 100%</span>
              <span className="tele-val">ENC: AES-2048</span>
              <span className="tele-status">STABLE</span>
            </div>
          </form>
        </motion.div>

        {/* RIGHT: FREQUENCY NODES */}
        <motion.div 
          className="frequency-nodes"
          initial={{ opacity: 0, x: 100, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="module-header">
            <span className="module-label">FREQUENCY CHANNELS</span>
          </div>

          <div className="nodes-stack">
            {links.map((node, i) => (
              <motion.a
                key={node.name}
                href={node.link}
                target="_blank"
                rel="noopener noreferrer"
                className="frequency-card"
                style={{ "--node-color": node.color }}
                whileHover={{ scale: 1.05, x: 10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="card-signal-bar"></div>
                <div className="card-icon-node">{node.icon}</div>
                <div className="card-info">
                  <span className="node-tag">{node.name}</span>
                  <span className="node-val">{node.val}</span>
                </div>
                <div className="card-visual-pulse"></div>
                <div className="card-glitch-line"></div>
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="contact-bg-glitch"></div>
    </div>
  );
};

export default Contact;
