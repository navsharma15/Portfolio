import React, { useRef, useEffect } from 'react';

/**
 * Wave Component — Premium 3D Perspective Grid Wave
 *
 * Features:
 *  - Perspective-based vertical spacing (lines compress toward bottom like 3D)
 *  - Per-line horizontal gradient (dark edges → bright center)
 *  - Teal at top, deep green at bottom
 *  - A slow-moving "hot" pulse glow that sweeps through line layers
 *  - Subtle top-edge glow line for depth separation
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

        const lineCount = 28;
        const segments = 140;
        let time = 0;

        // Linear interpolation helper
        const lerp = (a, b, t) => a + (b - a) * t;

        // Calculate a wave point for line l at horizontal segment i
        const getPoint = (l, i, waveTop, waveBottom, segW, t) => {
            const x = i * segW;

            // Perspective curve: lines compress toward the bottom (like 3D grid)
            const perspT = Math.pow(l / (lineCount - 1), 1.6);
            const baseY = lerp(waveTop, waveBottom, perspT);

            // Amplitude shrinks toward the bottom (perspective foreshortening)
            const amp = lerp(52, 6, perspT);

            const w1 = Math.sin(i * 0.022 + t * 1.1)  * amp * 0.55;
            const w2 = Math.sin(i * 0.013 - t * 0.65) * amp * 0.30;
            const w3 = Math.cos(i * 0.038 + t * 0.40) * amp * 0.15;

            return { x, y: baseY + w1 + w2 + w3 };
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const segW = canvas.width / segments;
            const waveTop    = canvas.height * 0.72;  // just below the button
            const waveBottom = canvas.height * 1.01;  // past bottom edge for fill

            // Pulsing "hot" band that moves slowly through the line layers
            const pulseLine = ((Math.sin(time * 0.3) + 1) / 2) * (lineCount - 1);

            // --- Top separator glow line ---
            const sepGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
            sepGrad.addColorStop(0,   'rgba(0, 255, 200, 0)');
            sepGrad.addColorStop(0.2, 'rgba(0, 255, 200, 0.15)');
            sepGrad.addColorStop(0.5, 'rgba(0, 255, 200, 0.35)');
            sepGrad.addColorStop(0.8, 'rgba(0, 255, 200, 0.15)');
            sepGrad.addColorStop(1,   'rgba(0, 255, 200, 0)');

            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const { x, y } = getPoint(0, i, waveTop, waveBottom, segW, time);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.strokeStyle = sepGrad;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 18;
            ctx.shadowColor = 'rgba(0, 255, 200, 0.6)';
            ctx.stroke();

            // --- Main wave lines ---
            for (let l = 0; l < lineCount; l++) {
                ctx.beginPath();

                const perspT = Math.pow(l / (lineCount - 1), 1.6);

                // Color: teal (0, 220, 180) at top → deep forest green (0, 90, 50) at bottom
                const g = Math.floor(lerp(220, 90, perspT));
                const b = Math.floor(lerp(180, 50, perspT));
                const baseAlpha = lerp(0.78, 0.3, perspT);

                // Pulse glow boost for lines near the moving pulse band
                const distFromPulse = Math.abs(l - pulseLine);
                const pulseBoost = Math.max(0, 1 - distFromPulse / 4);
                const finalAlpha = Math.min(1, baseAlpha + pulseBoost * 0.45);

                // Horizontal gradient: fade at edges, bright in center
                const lineGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                lineGrad.addColorStop(0,    `rgba(0, ${g}, ${b}, 0)`);
                lineGrad.addColorStop(0.12, `rgba(0, ${g}, ${b}, ${finalAlpha * 0.55})`);
                lineGrad.addColorStop(0.5,  `rgba(0, ${g}, ${b}, ${finalAlpha})`);
                lineGrad.addColorStop(0.88, `rgba(0, ${g}, ${b}, ${finalAlpha * 0.55})`);
                lineGrad.addColorStop(1,    `rgba(0, ${g}, ${b}, 0)`);
                ctx.strokeStyle = lineGrad;

                // Thicker at the top (front), thinner compressed at the bottom
                ctx.lineWidth = lerp(2.8, 0.7, perspT);

                // Glow on top lines and pulse band
                if (perspT < 0.25 || pulseBoost > 0.5) {
                    ctx.shadowBlur = 10 + pulseBoost * 18;
                    ctx.shadowColor = `rgba(0, ${g}, ${b}, ${0.4 + pulseBoost * 0.35})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                for (let i = 0; i <= segments; i++) {
                    const { x, y } = getPoint(l, i, waveTop, waveBottom, segW, time);
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            time += 0.007;
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
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 2,
                pointerEvents: 'none',
            }}
        />
    );
};

export default Wave;
