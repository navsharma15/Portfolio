import React from 'react';
import { motion } from 'framer-motion';

const Fish = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            pointerEvents: 'none',
            zIndex: -1, // Keep behind the wave at zIndex: 0
            overflow: 'hidden'
        }}>
            {/* The Goldfish */}
            <motion.div
                initial={{ x: '-15vw', y: '50vh' }}
                animate={{
                    x: ['-15vw', '115vw'],
                    y: ['50vh', '40vh', '60vh', '45vh', '55vh', '50vh']
                }}
                transition={{
                    x: {
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    y: {
                        duration: 35,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{
                    position: 'absolute',
                    width: '65px',
                    height: '65px',
                    // Glow and shadow effect fitting the premium theme
                    filter: 'drop-shadow(0 0 12px rgba(255, 170, 0, 0.7)) drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
                }}
            >
                <motion.svg 
                    viewBox="0 0 100 100" 
                    width="100%" 
                    height="100%"
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <g transform="translate(5, 0)">
                        {/* Wiggling Tail Fin */}
                        <motion.g
                            animate={{ rotateZ: [-25, 25, -25] }}
                            transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '25px', originY: '50px' }}
                        >
                            <path d="M 25 50 C 0 25, -10 35, -5 50 C -10 65, 0 75, 25 50 Z" fill="url(#finGradient)" />
                        </motion.g>

                        {/* Top Fin */}
                        <motion.path 
                            d="M 40 35 Q 55 5, 75 35 Z" 
                            fill="url(#finGradient)" 
                            animate={{ skewX: [-5, 5, -5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '55px', originY: '35px' }}
                        />
                        
                        {/* Bottom Fin */}
                        <motion.path 
                            d="M 40 65 Q 55 95, 70 60 Z" 
                            fill="url(#finGradient)" 
                            animate={{ skewX: [5, -5, 5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '55px', originY: '65px' }}
                        />
                        
                        {/* Body - Goldfish curved body */}
                        <path d="M 20 50 C 20 20, 85 20, 95 50 C 85 80, 20 80, 20 50 Z" fill="url(#goldGradient)" />
                        
                        {/* Pectoral Fin (wiggling) */}
                        <motion.path 
                            d="M 45 55 Q 35 75, 60 70 Q 55 55, 45 55 Z" 
                            fill="url(#finGradient)" 
                            animate={{ rotateZ: [-15, 15, -15], scaleY: [1, 0.8, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '45px', originY: '55px' }}
                        />
                        
                        {/* Scales - small detailing */}
                        <path d="M 45 40 Q 50 45, 45 50" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <path d="M 55 38 Q 60 45, 55 52" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <path d="M 65 40 Q 70 45, 65 48" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        
                        {/* Eye */}
                        <circle cx="78" cy="42" r="4.5" fill="#111" />
                        <circle cx="79" cy="41" r="1.5" fill="#fff" />
                    </g>
                    
                    {/* Gradients */}
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="30%" x2="100%" y2="70%">
                            <stop offset="0%" stopColor="#FFA000" />    
                            <stop offset="40%" stopColor="#FFD54F" />
                            <stop offset="80%" stopColor="#FFb300" />
                            <stop offset="100%" stopColor="#FF6F00" />
                        </linearGradient>
                        <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF8F00" stopOpacity="0.85" />    
                            <stop offset="100%" stopColor="#FFE082" stopOpacity="0.65" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </motion.div>
            
            {/* Adding a second smaller goldfish for beautiful layered effect */}
            <motion.div
                initial={{ x: '110vw', y: '20vh' }}
                animate={{
                    x: ['110vw', '-10vw'],
                    y: ['20vh', '30vh', '15vh', '25vh', '20vh']
                }}
                transition={{
                    x: {
                        duration: 45,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    y: {
                        duration: 45,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{
                    position: 'absolute',
                    width: '45px',
                    height: '45px',
                    transform: 'scaleX(-1)', // flip to face left
                    filter: 'drop-shadow(0 0 8px rgba(255, 170, 0, 0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                    opacity: 0.8
                }}
            >
                <motion.svg 
                    viewBox="0 0 100 100" 
                    width="100%" 
                    height="100%"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <g transform="translate(5, 0) scale(-1, 1) translate(-95, 0)">
                        <motion.g
                            animate={{ rotateZ: [-20, 20, -20] }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '25px', originY: '50px' }}
                        >
                            <path d="M 25 50 C 0 25, -10 35, -5 50 C -10 65, 0 75, 25 50 Z" fill="url(#finGradient2)" />
                        </motion.g>

                        <motion.path 
                            d="M 40 35 Q 55 5, 75 35 Z" 
                            fill="url(#finGradient2)" 
                            animate={{ skewX: [-5, 5, -5] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '55px', originY: '35px' }}
                        />
                        
                        <motion.path 
                            d="M 40 65 Q 55 95, 70 60 Z" 
                            fill="url(#finGradient2)" 
                            animate={{ skewX: [5, -5, 5] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '55px', originY: '65px' }}
                        />
                        
                        <path d="M 20 50 C 20 20, 85 20, 95 50 C 85 80, 20 80, 20 50 Z" fill="url(#goldGradient2)" />
                        
                        <motion.path 
                            d="M 45 55 Q 35 75, 60 70 Q 55 55, 45 55 Z" 
                            fill="url(#finGradient2)" 
                            animate={{ rotateZ: [-12, 12, -12], scaleY: [1, 0.8, 1] }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ originX: '45px', originY: '55px' }}
                        />
                        
                        <circle cx="78" cy="42" r="4.5" fill="#111" />
                        <circle cx="79" cy="41" r="1.5" fill="#fff" />
                    </g>
                    
                    <defs>
                        <linearGradient id="goldGradient2" x1="0%" y1="30%" x2="100%" y2="70%">
                            <stop offset="0%" stopColor="#FB8C00" />    
                            <stop offset="50%" stopColor="#FFCA28" />
                            <stop offset="100%" stopColor="#E65100" />
                        </linearGradient>
                        <linearGradient id="finGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F57C00" stopOpacity="0.8" />    
                            <stop offset="100%" stopColor="#FFE082" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </motion.div>
        </div>
    );
};

export default Fish;
