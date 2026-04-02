import React from 'react';
import { motion } from 'framer-motion';
import { useSoundManager } from '../context/SoundContext';

const SoundToggle = () => {
  const { isMuted, setIsMuted } = useSoundManager();

  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="sound-toggle-btn"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 45, 85, 0.3)',
        borderRadius: '12px',
        width: '100%',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        boxShadow: isMuted ? 'none' : '0 0 15px rgba(255, 45, 85, 0.2)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 45, 85, 0.15)', borderColor: '#ff2d55' }}
      whileTap={{ scale: 0.95 }}
      title={isMuted ? "Unmute Cinematic Experience" : "Mute Sound"}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isMuted ? (
          <>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '22px', opacity: 0.6 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 10.5H1.5v3h3L9 18V6l-2.25 2.25z" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Audio Off</span>
          </>
        ) : (
          <>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '22px', color: '#ff2d55' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff' }}>Audio On</span>
          </>
        )}
      </div>
    </motion.button>
  );
};

export default SoundToggle;
