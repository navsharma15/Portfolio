import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Bootloader from './components/Bootloader';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';
import SoundToggle from './components/SoundToggle';
import { useSoundManager } from './context/SoundContext';

function App() {
  const [bootStarted, setBootStarted] = useState(false);
  const [booted, setBooted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { playSound } = useSoundManager();

  const handleBegin = () => {
    playSound('click');
    setBootStarted(true);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#000' }}>

      {/* Browser Autoplay Interstitial */}
      <AnimatePresence>
        {!bootStarted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="bootloader-container"
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBegin}
              className="explore-btn"
              style={{ padding: '20px 50px', fontSize: '1.2rem', background: 'rgba(255, 45, 85, 0.1)', cursor: 'pointer' }}
            >
              BEGIN EXPERIENCE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio sits behind, fades in once revealed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: revealed ? 0.4 : 0 }}
        style={{ minHeight: '100%', position: 'relative' }}
      >
        <Portfolio />
      </motion.div>

      {/* Landing page slides up once user clicks the terminal button */}
      <AnimatePresence>
        {booted && !revealed && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
          >
            <Landing onExplore={() => setRevealed(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extreme Cinematic Bootloader intercepts immediately on load */}
      <AnimatePresence>
        {bootStarted && !booted && (
          <motion.div
            key="bootloader"
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50 }}
          >
            <Bootloader onComplete={() => setBooted(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
