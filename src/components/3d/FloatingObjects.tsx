import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePerformance } from '../../hooks/usePerformance';

export const FloatingObjects: React.FC = () => {
  const probeRef1 = useRef<THREE.Group>(null);
  const probeRef2 = useRef<THREE.Group>(null);
  const beaconRef1 = useRef<THREE.PointLight>(null);

  const { enableFloatingObjects, reducedMotion, isPageVisible } = usePerformance();

  useFrame(({ clock }) => {
    if (reducedMotion || !isPageVisible) return;
    const t = clock.getElapsedTime();

    // Orbital trajectory for Probe 1 (inclined elliptical orbit around the planet)
    if (probeRef1.current) {
      const r1 = 5.2;
      const angle1 = t * 0.12;
      probeRef1.current.position.x = 1.8 + Math.cos(angle1) * r1;
      probeRef1.current.position.y = -0.2 + Math.sin(angle1) * (r1 * 0.45);
      probeRef1.current.position.z = -1.2 + Math.sin(angle1) * (r1 * 0.8);
      probeRef1.current.rotation.y = angle1 + Math.PI / 2;
    }

    // Trajectory for Probe 2 (counter-orbiting high-altitude satellite)
    if (probeRef2.current) {
      const r2 = 7.5;
      const angle2 = -t * 0.08 + 1.2;
      probeRef2.current.position.x = 1.8 + Math.cos(angle2) * r2;
      probeRef2.current.position.y = 0.5 + Math.sin(angle2) * (r2 * 0.3);
      probeRef2.current.position.z = -1.2 + Math.sin(angle2) * (r2 * 0.6);
      probeRef2.current.rotation.x = angle2;
    }

    // Gentle pulse on beacon light
    if (beaconRef1.current) {
      beaconRef1.current.intensity = 0.4 + Math.sin(t * 3.5) * 0.3;
    }
  });

  useEffect(() => {
    return () => {
      // Automatic Three.js cleanup
    };
  }, []);

  if (!enableFloatingObjects) return null;

  return (
    <group>
      {/* Satellite Probe 1: Scientific Observability Beacon */}
      <group ref={probeRef1} position={[4.0, 1.0, 0]}>
        {/* Core Bus */}
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.14]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Solar Arrays */}
        <mesh position={[0.16, 0, 0]}>
          <boxGeometry args={[0.2, 0.01, 0.08]} />
          <meshStandardMaterial color="#3678E5" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[-0.16, 0, 0]}>
          <boxGeometry args={[0.2, 0.01, 0.08]} />
          <meshStandardMaterial color="#3678E5" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Optical Beacon */}
        <pointLight ref={beaconRef1} color="#06B6D4" distance={2.5} intensity={0.5} />
      </group>

      {/* Satellite Probe 2: High Orbit Telemetry Relay */}
      <group ref={probeRef2} position={[-3.0, 2.0, -2]}>
        <mesh>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.09, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.04, 0.06, 8]} />
          <meshStandardMaterial color="#8B5CF6" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
};
