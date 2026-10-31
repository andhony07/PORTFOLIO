import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PlanetAtmosphere } from './PlanetAtmosphere';
import { usePerformance } from '../../hooks/usePerformance';
import { createProceduralPlanetTexture } from '../../utils/proceduralPlanetTexture';

export interface PlanetProps {
  radius?: number;
  position?: [number, number, number];
}

export const Planet: React.FC<PlanetProps> = ({
  radius = 2.4,
  position = [1.8, -0.2, -1.2],
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const surfaceMeshRef = useRef<THREE.Mesh>(null);
  const cloudMeshRef = useRef<THREE.Mesh>(null);

  const { planetSegments, reducedMotion, deviceTier } = usePerformance();

  // Adjust position and scale based on device tier
  const effectivePosition: [number, number, number] = useMemo(() => {
    if (deviceTier === 'mobile') return [0, 0.4, -3.2];
    if (deviceTier === 'tablet') return [1.0, 0, -2.0];
    return position;
  }, [deviceTier, position]);

  const effectiveScale = useMemo(() => {
    if (deviceTier === 'mobile') return 0.75;
    if (deviceTier === 'tablet') return 0.88;
    return 1.0;
  }, [deviceTier]);

  const texture = useMemo(() => {
    return createProceduralPlanetTexture();
  }, []);

  useFrame((_state, delta) => {
    if (reducedMotion) return;

    // Subtle planetary surface axial rotation
    if (surfaceMeshRef.current) {
      surfaceMeshRef.current.rotation.y += delta * 0.035;
    }

    // Outer cloud layer rotates slightly faster for realistic atmospheric slippage
    if (cloudMeshRef.current) {
      cloudMeshRef.current.rotation.y += delta * 0.055;
    }
  });

  useEffect(() => {
    const surface = surfaceMeshRef.current;
    const cloud = cloudMeshRef.current;
    return () => {
      texture?.dispose();
      surface?.geometry.dispose();
      if (surface?.material) {
        (surface.material as THREE.Material).dispose();
      }
      cloud?.geometry.dispose();
      if (cloud?.material) {
        (cloud.material as THREE.Material).dispose();
      }
    };
  }, [texture]);

  return (
    <group
      ref={planetGroupRef}
      position={effectivePosition}
      scale={effectiveScale}
      rotation={[0.1, 0, 0.41]} // 23.5-degree natural axial inclination
    >
      {/* Primary Planet Sphere Surface */}
      <mesh ref={surfaceMeshRef}>
        <sphereGeometry args={[radius, planetSegments, planetSegments]} />
        <meshStandardMaterial
          map={texture || undefined}
          color="#1E3A8A"
          roughness={0.65}
          metalness={0.25}
          emissive="#060B1E"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmospheric Cloud Layer */}
      <mesh ref={cloudMeshRef}>
        <sphereGeometry args={[radius * 1.018, planetSegments, planetSegments]} />
        <meshStandardMaterial
          color="#38BDF8"
          transparent
          opacity={0.18}
          roughness={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <PlanetAtmosphere radius={radius} segments={planetSegments} />
    </group>
  );
};
