import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Portfolio sits behind, fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: revealed ? 0.4 : 0 }}
        style={{ minHeight: '100%', position: 'relative' }}
      >
        <Portfolio />
      </motion.div>

      {/* Landing slides up on reveal */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="landing"
            initial={{ y: 0 }}
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
          >
            <Landing onExplore={() => setRevealed(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
