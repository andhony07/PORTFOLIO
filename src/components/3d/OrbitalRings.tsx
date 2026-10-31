import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePerformance } from '../../hooks/usePerformance';

export interface OrbitalRingsProps {
  position?: [number, number, number];
}

export const OrbitalRings: React.FC<OrbitalRingsProps> = ({
  position = [1.8, -0.2, -1.2],
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const { enableRings, reducedMotion, deviceTier, isPageVisible } = usePerformance();

  const effectivePosition: [number, number, number] =
    deviceTier === 'mobile' ? [0, 0.4, -3.2] : deviceTier === 'tablet' ? [1.0, 0, -2.0] : position;

  const effectiveScale = deviceTier === 'mobile' ? 0.75 : deviceTier === 'tablet' ? 0.88 : 1.0;

  useFrame((_state, delta) => {
    if (reducedMotion || !isPageVisible) return;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.01;
    if (outerRingRef.current) outerRingRef.current.rotation.z -= delta * 0.007;
  });

  useEffect(() => {
    const ring = ringRef.current;
    const outer = outerRingRef.current;
    return () => {
      ring?.geometry.dispose();
      if (ring?.material) {
        (ring.material as THREE.Material).dispose();
      }
      outer?.geometry.dispose();
      if (outer?.material) {
        (outer.material as THREE.Material).dispose();
      }
    };
  }, []);

  if (!enableRings) return null;

  return (
    <group position={effectivePosition} scale={effectiveScale} rotation={[1.1, 0.3, -0.4]}>
      {/* Primary Inner Orbital Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[3.2, 4.4, 64]} />
        <meshBasicMaterial
          color="#3678E5"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary Outer Subtle Trace Ring */}
      <mesh ref={outerRingRef}>
        <ringGeometry args={[4.8, 5.0, 64]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
