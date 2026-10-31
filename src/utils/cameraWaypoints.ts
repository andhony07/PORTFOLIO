export interface CameraWaypoint {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // 1. Hero (0.0): planetary equatorial framing
  { progress: 0.0, position: [0, 0, 7.5], target: [0.35, 0, 0] },

  // 2. About (0.18): satellite orbital perspective
  { progress: 0.18, position: [1.2, 0.7, 6.2], target: [1.0, 0.1, -0.5] },

  // 3. Projects (0.36): elevated constellation perspective
  { progress: 0.36, position: [0, 2.2, 8.2], target: [0, -0.4, 0] },

  // 4. Skills (0.55): luminous star-cluster transition
  { progress: 0.55, position: [-1.4, 0.4, 6.0], target: [-0.4, 0, 0] },

  // 5. Certifications (0.72): planetary ring-plane perspective
  { progress: 0.72, position: [1.6, -0.6, 5.8], target: [1.1, -0.2, -0.5] },

  // 6. Achievements & Experience (0.86): wide orbital vantage
  { progress: 0.86, position: [0.5, 0.8, 7.2], target: [0.2, 0.1, 0] },

  // 7. Contact (1.0): stable deep-space vista
  { progress: 1.0, position: [0, 0, 7.8], target: [0, 0, 0] },
];

export function interpolateWaypoint(
  progress: number,
  reducedMotion: boolean,
  deviceTier: 'desktop' | 'tablet' | 'mobile'
): { position: [number, number, number]; target: [number, number, number] } {
  if (reducedMotion) {
    return { position: [0, 0, 7.5], target: [0.35, 0, 0] };
  }

  // Clamping progress
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding waypoints
  let i = 0;
  while (i < CAMERA_WAYPOINTS.length - 1 && CAMERA_WAYPOINTS[i + 1].progress < p) {
    i++;
  }

  const wpA = CAMERA_WAYPOINTS[i];
  const wpB = CAMERA_WAYPOINTS[Math.min(i + 1, CAMERA_WAYPOINTS.length - 1)];

  const range = wpB.progress - wpA.progress;
  const factor = range > 0 ? (p - wpA.progress) / range : 0;
  // Smooth cubic Hermite blend between waypoints: 3t^2 - 2t^3
  const smoothFactor = factor * factor * (3 - 2 * factor);

  // Position interpolation
  let posX = wpA.position[0] + (wpB.position[0] - wpA.position[0]) * smoothFactor;
  let posY = wpA.position[1] + (wpB.position[1] - wpA.position[1]) * smoothFactor;
  let posZ = wpA.position[2] + (wpB.position[2] - wpA.position[2]) * smoothFactor;

  // Target lookAt interpolation
  let tgtX = wpA.target[0] + (wpB.target[0] - wpA.target[0]) * smoothFactor;
  let tgtY = wpA.target[1] + (wpB.target[1] - wpA.target[1]) * smoothFactor;
  let tgtZ = wpA.target[2] + (wpB.target[2] - wpA.target[2]) * smoothFactor;

  // Restrain displacement on mobile and tablet to preserve readability
  if (deviceTier === 'mobile') {
    posX = posX * 0.2;
    posY = posY * 0.2;
    posZ = 8.6; // Pull back slightly on mobile for background text clearance
    tgtX = 0;
    tgtY = 0;
    tgtZ = 0;
  } else if (deviceTier === 'tablet') {
    posX = posX * 0.5;
    posY = posY * 0.5;
  }

  return {
    position: [posX, posY, posZ],
    target: [tgtX, tgtY, tgtZ],
  };
}
