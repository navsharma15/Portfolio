import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Bootloader from './components/Bootloader';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';

function App() {
  const [booted, setBooted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#000' }}>
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
        {!booted && (
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
