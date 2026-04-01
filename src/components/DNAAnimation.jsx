import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = ({ position, rotation, color = "#ff2d55" }) => {
  const meshRef = useRef();
  const count = 30; // Reduced count for performance
  const radius = 2;
  const twist = 0.5;
  const heightStep = 0.6;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      let idx = 0;
      for (let i = 0; i < count; i++) {
        const angle = i * twist;
        const y = (i - count / 2) * heightStep;

        // Helix 1
        dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx++, dummy.matrix);

        // Helix 2
        dummy.position.set(-Math.cos(angle) * radius, y, -Math.sin(angle) * radius);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx++, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <instancedMesh ref={meshRef} args={[null, null, count * 2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={4} 
          toneMapped={false} 
        />
      </instancedMesh>
    </group>
  );
};

const DNAAnimation = () => {
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: '#010508',
      pointerEvents: 'none',
    }}>
      <Canvas 
        gl={{ 
          antialias: !isMobile, 
          alpha: false,
          powerPreference: "high-performance" 
        }} 
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#000504']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff2d55" />
          
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <DNAStrand position={[0, 0, 0]} rotation={[0.5, 0, 0.5]} />
            {!isMobile && (
              <>
                <DNAStrand position={[-15, 10, -10]} rotation={[0.8, -0.2, 0.3]} color="#cc2444" />
                <DNAStrand position={[15, -10, -5]} rotation={[-0.4, 0.4, -0.2]} color="#991b33" />
              </>
            )}
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DNAAnimation;
