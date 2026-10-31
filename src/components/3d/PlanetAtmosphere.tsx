import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';

const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uPower;
  uniform float uIntensity;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel glow equation
    float dotNV = dot(normal, viewDir);
    float fresnel = pow(1.0 - abs(dotNV), uPower);

    // Smooth gradient between inner atmospheric blue and outer violet rim
    vec3 glowColor = mix(uColorInner, uColorOuter, fresnel * 0.85);

    gl_FragColor = vec4(glowColor, fresnel * uIntensity);
  }
`;

export interface PlanetAtmosphereProps {
  radius?: number;
  segments?: number;
}

export const PlanetAtmosphere: React.FC<PlanetAtmosphereProps> = ({
  radius = 2.45,
  segments = 48,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uColorInner: { value: new THREE.Color('#3678E5') },
        uColorOuter: { value: new THREE.Color('#8B5CF6') },
        uPower: { value: 3.2 },
        uIntensity: { value: 0.9 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    return () => {
      atmosphereMaterial.dispose();
      mesh?.geometry.dispose();
    };
  }, [atmosphereMaterial]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 1.14, segments, segments]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
};
