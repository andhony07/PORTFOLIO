import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { usePerformance } from '../../hooks/usePerformance';

export interface CameraControllerProps {
  basePosition?: [number, number, number];
}

export const CameraController: React.FC<CameraControllerProps> = ({
  basePosition = [0, 0, 7.5],
}) => {
  const { camera } = useThree();
  const { deviceTier, reducedMotion } = usePerformance();

  // Mouse normalized coordinates: [-1, 1]
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const entranceProgressRef = useRef(reducedMotion ? 1.0 : 0.0);

  // Initial camera setup for cinematic entrance
  useEffect(() => {
    if (reducedMotion) {
      camera.position.set(basePosition[0], basePosition[1], basePosition[2]);
      entranceProgressRef.current = 1.0;
      return;
    }

    // Set initial position in deep space for cinematic glide
    camera.position.set(0, 1.8, 13.5);
    entranceProgressRef.current = 0.0;
  }, [camera, basePosition, reducedMotion]);

  // Window-level mouse & pointer listener for smooth parallax
  useEffect(() => {
    if (reducedMotion || deviceTier === 'mobile') return;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [deviceTier, reducedMotion]);

  useFrame((_state, delta) => {
    // 1. Cinematic Entrance Interpolation
    if (entranceProgressRef.current < 1.0 && !reducedMotion) {
      entranceProgressRef.current = Math.min(1.0, entranceProgressRef.current + delta * 0.45);
    }

    const t = entranceProgressRef.current;
    // Cubic ease out curve for entrance
    const easeT = reducedMotion ? 1.0 : 1 - Math.pow(1 - t, 3);

    // Initial starting Z (13.5) to Target Z (7.5)
    const currentBaseZ = THREE.MathUtils.lerp(13.5, basePosition[2], easeT);
    const currentBaseY = THREE.MathUtils.lerp(1.8, basePosition[1], easeT);
    const currentBaseX = basePosition[0];

    // 2. Parallax Strength Governed by Device Tier
    let parallaxIntensityX = 0.35;
    let parallaxIntensityY = 0.22;

    if (deviceTier === 'mobile' || reducedMotion) {
      parallaxIntensityX = 0.0;
      parallaxIntensityY = 0.0;
    } else if (deviceTier === 'tablet') {
      parallaxIntensityX = 0.12;
      parallaxIntensityY = 0.08;
    }

    // Smoothly interpolate current mouse values towards target
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.04);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.04);

    const targetCameraX = currentBaseX + mouseRef.current.x * parallaxIntensityX;
    const targetCameraY = currentBaseY + mouseRef.current.y * parallaxIntensityY;

    // Apply linear interpolation to camera position for floaty feel
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, currentBaseZ, 0.08);

    // Subtle lookAt target slightly framing the planet on the right
    const lookTargetX = deviceTier === 'mobile' ? 0 : 0.35;
    camera.lookAt(lookTargetX, 0, 0);
  });

  return null;
};
