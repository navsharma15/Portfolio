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
    setIsSubmitting(true);

    try {
      // Using FormSubmit AJAX endpoint to send email seamlessly behind the scenes
      const response = await fetch("https://formsubmit.co/ajax/navsharma989@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          _subject: `New ADDA Connection Request from ${formData.name}`
        })
      });

      if (response.ok) {
        setFormData({ name: '', message: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } else {
        console.error("Transmission failed.");
      }
    } catch (error) {
      console.error("Network error during transmission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReady = formData.name.trim().length > 0 && formData.message.trim().length > 0;

  const socialLinks = [
    {
      platform: 'Comm-Link',
      handle: '+91 87912 01989',
      link: 'tel:8791201989',
      color: '#00ffaa',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.022-3.49-6.82-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.107-1.034z"/>
        </svg>
      )
    },
    {
      platform: 'LinkedIn',
      handle: 'in/nav-sharma',
      link: 'https://www.linkedin.com/in/nav-sharma/',
      color: '#0a66c2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      platform: 'GitHub',
      handle: 'navsharma15',
      link: 'https://github.com/navsharma15',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      platform: 'Direct Comms',
      handle: 'navsharma989@gmail.com',
      link: 'mailto:navsharma989@gmail.com',
      color: '#ea4335',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.866l5.6-6.812zm9.201-1.251l4.623-3.747v9.476l-4.623-5.729z"/>
        </svg>
      )
    },
    {
      platform: 'Instagram',
      handle: 'Sh_nav_',
      link: 'https://instagram.com/Sh_nav_',
      color: '#e1306c',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="contact-container">
      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="success-toast"
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="toast-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="toast-content">
              <h4>Transmission Sent!</h4>
              <p>Data packet deployed successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="contact-header">
         <motion.h2 
           className="contact-title"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1, duration: 0.6 }}
         >
           JOIN MY <span className="title-accent">ADDA</span>
         </motion.h2>
      </div>

      <div className="contact-content-grid">
        {/* LEFT: FORM TERMINAL */}
        <motion.div 
          className="transmission-form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          {/* AJAX Form Submission */}
          <form 
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', height: '100%' }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">Identifier <span style={{color:"#ff4a4a"}}>*</span></label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="form-input" 
                placeholder="Enter your clearcode name..." 
                required 
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="message" className="form-label">Data Packet <span style={{color:"#ff4a4a"}}>*</span></label>
              <textarea 
                name="message" 
                id="message" 
                className="form-input" 
                placeholder="Write your connection request here... Required for deployment." 
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: isReady ? '#00ffaa' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
                Status: {isSubmitting ? 'Transmitting Data...' : (isReady ? 'Ready for Deployment' : 'Awaiting Inputs...')}
              </span>
              <button 
                type="submit" 
                className="submit-btn" 
                style={{ 
                  borderColor: isReady ? '#00ffaa' : 'rgba(255,255,255,0.2)',
                  opacity: isSubmitting ? 0.7 : 1,
                  pointerEvents: isSubmitting ? 'none' : 'auto'
                }}
              >
                {isSubmitting ? 'DEPLOYING...' : 'ESTABLISH CONNECTION'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* RIGHT: SOCIAL NODES */}
        <motion.div 
          className="social-nodes-container"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {socialLinks.map((node) => (
            <motion.a 
              key={node.platform}
              href={node.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-node-card"
              variants={itemVariants}
              style={{"--hover-color": node.color}}
            >
              <div className="node-icon-wrapper">
                {node.icon}
              </div>
              <div className="node-info">
                <span className="node-platform">{node.platform}</span>
                <span className="node-handle">{node.handle}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Contact;
