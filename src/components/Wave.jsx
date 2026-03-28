import React, { useRef, useEffect } from 'react';

/**
 * Wave Component
 * Renders a futuristic, animated neon green grid wave.
 * Optimized with multiple overlapping sine waves for an organic 3D feel.
 */
const Wave = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        // Wave settings
        const lineCount = 12; // More lines for depth
        const segments = 100;
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerY = canvas.height * 0.85;
            const segmentWidth = canvas.width / segments;

            // Draw each wave line
            for (let l = 0; l < lineCount; l++) {
                ctx.beginPath();
                
                // Gradually fading lines for depth
                const alpha = (1 - l / lineCount) * 0.4;
                ctx.strokeStyle = `rgba(0, 255, 170, ${alpha})`;
                ctx.lineWidth = l === 0 ? 2 : 1;
                
                // Add soft glow to the leading line
                if (l === 0) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'rgba(0, 255, 170, 0.5)';
                } else {
                    ctx.shadowBlur = 0;
                }

                for (let i = 0; i <= segments; i++) {
                    const x = i * segmentWidth;
                    
                    // Complex organic motion using multiple frequencies
                    const freq1 = i * 0.02 + time * 1.5;
                    const freq2 = i * 0.01 - time * 0.8;
                    const freq3 = i * 0.03 + time * 0.5;
                    
                    const noise = Math.sin(freq1) * 25 + 
                                  Math.sin(freq2) * 15 + 
                                  Math.cos(freq3) * 10;
                    
                    // Offset each line slightly for the "mesh" effect
                    const yOffset = l * 8 * Math.sin(time + i * 0.02);
                    const y = centerY + noise + yOffset;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();

                // Vertical connectors for grid effect
                if (l % 2 === 0) {
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = `rgba(0, 255, 170, ${alpha * 0.3})`;
                    // Connectors are drawn every 10 segments
                }
            }

            time += 0.01;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.8
            }} 
        />
    );
};

export default Wave;
