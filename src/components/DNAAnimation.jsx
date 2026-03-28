import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = ({ position, rotation, color = "#00FFAA" }) => {
  const group = useRef();
  const count = 40;
  const radius = 2;
  const twist = 0.4;
  const heightStep = 0.5;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
        const angle = i * twist;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (i - count / 2) * heightStep;
        pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [count, twist, radius, heightStep]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* First Helix Backbone */}
      {points.map((pt, i) => (
        <mesh key={`b1-${i}`} position={pt}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={10} 
            toneMapped={false} 
          />
        </mesh>
      ))}

      {/* Second Helix Backbone */}
      {points.map((pt, i) => (
        <mesh key={`b2-${i}`} position={new THREE.Vector3(-pt.x, pt.y, -pt.z)}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={10} 
            toneMapped={false} 
          />
        </mesh>
      ))}

      {/* Rungs */}
      {points.map((pt, i) => {
        if (i % 2 !== 0) return null;
        return (
          <mesh key={`rung-${i}`} position={[0, pt.y, 0]} rotation={[0, -i * twist, 0]}>
            <boxGeometry args={[radius * 2, 0.05, 0.05]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={5} 
              toneMapped={false} 
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const DNAAnimation = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: '#000000',
      pointerEvents: 'none',
    }}>
      <Canvas 
        gl={{ antialias: true, alpha: true }} 
        camera={{ position: [0, 0, 15], fov: 45 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#000504']} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FFAA" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <DNAStrand position={[0, 0, 0]} rotation={[0.5, 0, 0.5]} />
            <DNAStrand position={[-15, 10, -10]} rotation={[0.8, -0.2, 0.3]} color="#008855" />
            <DNAStrand position={[15, -10, -5]} rotation={[-0.4, 0.4, -0.2]} color="#007744" />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DNAAnimation;
