import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundManager } from '../context/SoundContext';
import '../styles/bootloader.css';

const Bootloader = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const { playSound } = useSoundManager();

  useEffect(() => {
    if (count > 0) {
      // Play cinematic tick on each number entry
      playSound('tick');
      
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Play deep impact sound on completion (transition to main)
      playSound('impact');
      
      // Complete right after 0/impact cleanly finishes
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [count, onComplete, playSound]);

  return (
    <div className="bootloader-container">
      {/* Cinematic Background Glow */}
      <div className="bootloader-glow-fx" />
      
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            key={count}
            className="bootloader-number"
            initial={{ opacity: 0, scale: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 2.5, filter: 'blur(30px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }} // Snappy sync
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bootloader;
