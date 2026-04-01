import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/bootloader.css';

const Bootloader = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Complete right after 1 cleanly finishes
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  }, [count, onComplete]);

  return (
    <div className="bootloader-container">
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div
            key={count}
            className="bootloader-number"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bootloader;
