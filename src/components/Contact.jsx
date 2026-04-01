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
      // AJAX Submission to FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/navsharma989@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          _subject: `New Message for 8791201989 from ${formData.name}`,
          phone_target: "8791201989"
        })
      });

      if (response.ok) {
        setFormData({ name: '', message: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReady = formData.name.trim().length > 0 && formData.message.trim().length > 0;

  const socialLinks = [
    {
      platform: 'Comm-Link',
      handle: '+91 87912 01989',
      link: 'tel:+918791201989',
      color: '#00ffaa',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
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
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
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
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      platform: 'Email',
      handle: 'navsharma989@gmail.com',
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
    <div className="contact-container">
      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="success-toast"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
          >
            <div className="toast-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#00ffaa" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="toast-content">
              <h4 style={{ color: '#fff', margin: 0 }}>Success!</h4>
              <p style={{ color: '#00ffaa', margin: '4px 0 0 0', fontSize: '0.85rem' }}>Message Sent Successfully</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="section-header-unique"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-system-tag">// SECURE UPLINK ACTIVE</div>
        <h2 className="header-main-title">Join My <span>Adda</span></h2>
        <div className="header-decoration" />
      </motion.div>

      <div className="contact-content-grid">
        <motion.div 
          className="transmission-form"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 2 }}>
            <div className="form-group">
              <label className="form-label">Identifier <span style={{color:"#ff4a4a"}}>*</span></label>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                placeholder="Enter your clearcode name..."
                required 
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Data Packet <span style={{color:"#ff4a4a"}}>*</span></label>
              <textarea 
                name="message" 
                className="form-input" 
                placeholder="Write your connection request here... Required for deployment."
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ 
                fontSize: '0.8rem', 
                color: isReady ? '#00ffaa' : 'rgba(255,255,255,0.4)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em'
              }}>
                Status: {isSubmitting ? 'Transmitting Data...' : (isReady ? 'Ready for Deployment' : 'Awaiting Inputs...')}
              </span>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!isReady || isSubmitting}
                style={{ 
                  borderColor: isReady ? '#00ffaa' : 'rgba(255,255,255,0.2)',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'DEPLOYING...' : 'ESTABLISH CONNECTION'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="social-nodes-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {socialLinks.map((node, i) => (
            <motion.a 
              key={node.platform}
              href={node.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-node-card"
              style={{
                "--hover-color": node.color,
                transitionDelay: `${i * 100}ms`
              }}
            >
              <div className="node-icon-wrapper">{node.icon}</div>
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
