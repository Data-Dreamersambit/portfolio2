import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const getPrimaryColor = () => {
  if (typeof window === 'undefined') return new THREE.Color('#8b5cf6');
  const primaryVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  if (primaryVar) {
    const parts = primaryVar.split(/[\s%]+/);
    if (parts.length >= 3) {
      const hFloat = parseFloat(parts[0]) / 360;
      const sFloat = parseFloat(parts[1]) / 100;
      const lFloat = parseFloat(parts[2]) / 100;
      const color = new THREE.Color();
      color.setHSL(hFloat, sFloat, lFloat);
      return color;
    }
  }
  return new THREE.Color('#8b5cf6'); // fallback
};

const IcosahedronObject = () => {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();
  
  // Track theme changes
  const [primaryColor, setPrimaryColor] = useState(getPrimaryColor());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setPrimaryColor(getPrimaryColor());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
      
      // Subtle parallax based on mouse
      const targetX = (mouse.x * viewport.width) / 20;
      const targetY = (mouse.y * viewport.height) / 20;
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color={primaryColor} 
          wireframe 
          emissive={primaryColor}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <IcosahedronObject />
      </Canvas>
    </div>
  );
};

export default Scene3D;
