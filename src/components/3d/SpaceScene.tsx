import React from 'react';
import { StarField } from './StarField';
import { Planet } from './Planet';
import { OrbitalRings } from './OrbitalRings';
import { FloatingObjects } from './FloatingObjects';
import { CameraController } from './CameraController';

export const SpaceScene: React.FC = () => {
  return (
    <>
      {/* Interactive Damped Parallax & Entrance Camera Controller */}
      <CameraController />

      {/* Cinematic Deep Space Lighting */}
      {/* 1. Key Stellar Sun Light: Crisp white directional light */}
      <directionalLight
        position={[-6, 4, 5]}
        intensity={2.4}
        color="#F8FAFC"
      />

      {/* 2. Deep Space Ambient: Prevents completely pitch-black shadowing */}
      <ambientLight
        intensity={0.4}
        color="#080B16"
      />

      {/* 3. Subtle Cosmic Rim Accent: Electric violet specular grazing */}
      <directionalLight
        position={[6, -3, -4]}
        intensity={0.7}
        color="#8B5CF6"
      />

      {/* 4. Deep Cyan Horizon Bounce */}
      <pointLight
        position={[-3, -4, 2]}
        intensity={0.5}
        color="#06B6D4"
        distance={18}
      />

      {/* Scene Objects */}
      <StarField />
      <Planet />
      <OrbitalRings />
      <FloatingObjects />
    </>
  );
};

