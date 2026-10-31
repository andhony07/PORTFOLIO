import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { usePerformance } from '../../hooks/usePerformance';

export const StarField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { starCount, reducedMotion, isPageVisible } = usePerformance();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const sz = new Float32Array(starCount);

    const colorPalette = [
      new THREE.Color('#F8FAFC'), // Stellar white (60%)
      new THREE.Color('#94A3B8'), // Muted slate (15%)
      new THREE.Color('#3678E5'), // Cosmic blue (15%)
      new THREE.Color('#8B5CF6'), // Cosmic violet (7%)
      new THREE.Color('#06B6D4'), // Cyan (3%)
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;

      // Distribute stars in spherical shell around origin
      const radius = 35 + Math.random() * 140;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      // Color selection with weighted probabilities
      const rand = Math.random();
      let selectedColor = colorPalette[0];
      if (rand > 0.60 && rand <= 0.75) selectedColor = colorPalette[1];
      else if (rand > 0.75 && rand <= 0.90) selectedColor = colorPalette[2];
      else if (rand > 0.90 && rand <= 0.97) selectedColor = colorPalette[3];
      else if (rand > 0.97) selectedColor = colorPalette[4];

      col[i3] = selectedColor.r;
      col[i3 + 1] = selectedColor.g;
      col[i3 + 2] = selectedColor.b;

      // Random particle sizes
      sz[i] = 0.6 + Math.random() * 1.8;
    }

    return [pos, col, sz];
  }, [starCount]);

  useFrame((_state, delta) => {
    if (reducedMotion || !isPageVisible || !pointsRef.current) return;
    // Ultra-slow continuous axial drift (around Y and X)
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  // Ensure GPU resource cleanup
  useEffect(() => {
    const points = pointsRef.current;
    return () => {
      if (points) {
        points.geometry.dispose();
        if (Array.isArray(points.material)) {
          points.material.forEach((m) => m.dispose());
        } else {
          points.material.dispose();
        }
      }
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
