import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { usePerformance } from '../../hooks/usePerformance';
import { globalScrollState, initScrollProgressSync } from '../../utils/scrollState';
import { interpolateWaypoint } from '../../utils/cameraWaypoints';

export interface CameraControllerProps {
  basePosition?: [number, number, number];
}

export const CameraController: React.FC<CameraControllerProps> = () => {
  const { camera } = useThree();
  const { deviceTier, reducedMotion, isPageVisible } = usePerformance();

  // Mouse normalized coordinates: [-1, 1]
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const entranceProgressRef = useRef(reducedMotion ? 1.0 : 0.0);
  const currentTargetRef = useRef(new THREE.Vector3(0.35, 0, 0));

  // Initialize passive scroll synchronization
  useEffect(() => {
    const cleanupScroll = initScrollProgressSync();
    return () => cleanupScroll();
  }, []);

  // Initial camera setup for cinematic entrance
  useEffect(() => {
    if (reducedMotion) {
      camera.position.set(0, 0, 7.5);
      entranceProgressRef.current = 1.0;
      return;
    }

    // Set initial position in deep space for cinematic glide
    camera.position.set(0, 1.8, 13.5);
    entranceProgressRef.current = 0.0;
  }, [camera, reducedMotion]);

  // Window-level mouse & pointer listener for smooth parallax
  useEffect(() => {
    if (reducedMotion || deviceTier === 'mobile') return;

    const handlePointerMove = (e: PointerEvent) => {
      // Discard touch and pen inputs to prevent accidental parallax jumping during touch scrolling
      if (e.pointerType === 'touch' || e.pointerType === 'pen') return;

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
    if (!isPageVisible) return;

    // 1. Cinematic Entrance Interpolation
    if (entranceProgressRef.current < 1.0 && !reducedMotion) {
      entranceProgressRef.current = Math.min(1.0, entranceProgressRef.current + delta * 0.45);
    }

    const t = entranceProgressRef.current;
    const easeT = reducedMotion ? 1.0 : 1 - Math.pow(1 - t, 3);

    // 2. Query Scroll Waypoint for current progress
    const currentProgress = globalScrollState.progress;
    const waypoint = interpolateWaypoint(currentProgress, reducedMotion, deviceTier);

    // Initial glide blends from deep space (13.5) into the waypoint position
    const currentBaseX = THREE.MathUtils.lerp(0, waypoint.position[0], easeT);
    const currentBaseY = THREE.MathUtils.lerp(1.8, waypoint.position[1], easeT);
    const currentBaseZ = THREE.MathUtils.lerp(13.5, waypoint.position[2], easeT);

    // 3. Parallax Intensity Governed by Device Tier & Motion Preference
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
    const targetCameraZ = currentBaseZ;

    // Apply linear interpolation to camera position for smooth, floaty feel
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, 0.06);

    // Smoothly interpolate lookAt target
    currentTargetRef.current.x = THREE.MathUtils.lerp(currentTargetRef.current.x, waypoint.target[0], 0.05);
    currentTargetRef.current.y = THREE.MathUtils.lerp(currentTargetRef.current.y, waypoint.target[1], 0.05);
    currentTargetRef.current.z = THREE.MathUtils.lerp(currentTargetRef.current.z, waypoint.target[2], 0.05);

    camera.lookAt(currentTargetRef.current);
  });

  return null;
};
