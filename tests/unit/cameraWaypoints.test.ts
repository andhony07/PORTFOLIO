import { describe, it, expect } from 'vitest';
import { CAMERA_WAYPOINTS, interpolateWaypoint } from '../../src/utils/cameraWaypoints';

describe('Camera Waypoints & Trajectory Interpolation', () => {
  it('defines seven ordered waypoints matching portfolio sections', () => {
    expect(CAMERA_WAYPOINTS.length).toBe(7);
    expect(CAMERA_WAYPOINTS[0].progress).toBe(0.0); // Hero
    expect(CAMERA_WAYPOINTS[1].progress).toBe(0.18); // About
    expect(CAMERA_WAYPOINTS[2].progress).toBe(0.36); // Projects
    expect(CAMERA_WAYPOINTS[3].progress).toBe(0.55); // Skills
    expect(CAMERA_WAYPOINTS[4].progress).toBe(0.72); // Certifications
    expect(CAMERA_WAYPOINTS[5].progress).toBe(0.86); // Achievements & Experience
    expect(CAMERA_WAYPOINTS[6].progress).toBe(1.0); // Contact
  });

  it('clamps negative or exceeding progress within [0, 1]', () => {
    const atNegative = interpolateWaypoint(-0.5, false, 'desktop');
    const atZero = interpolateWaypoint(0.0, false, 'desktop');
    expect(atNegative.position).toEqual(atZero.position);

    const atOverflow = interpolateWaypoint(1.5, false, 'desktop');
    const atOne = interpolateWaypoint(1.0, false, 'desktop');
    expect(atOverflow.position).toEqual(atOne.position);
  });

  it('interpolates intermediate positions between waypoints using smooth Hermite curves', () => {
    const midHeroAbout = interpolateWaypoint(0.09, false, 'desktop');
    // Hero X: 0, About X: 1.2 -> mid should be strictly between 0 and 1.2
    expect(midHeroAbout.position[0]).toBeGreaterThan(0);
    expect(midHeroAbout.position[0]).toBeLessThan(1.2);
  });

  it('restrains displacement on mobile and tablet for readability', () => {
    const progress = 0.36; // Projects waypoint
    const desktop = interpolateWaypoint(progress, false, 'desktop');
    const tablet = interpolateWaypoint(progress, false, 'tablet');
    const mobile = interpolateWaypoint(progress, false, 'mobile');

    // Desktop Y is 2.2
    expect(desktop.position[1]).toBeCloseTo(2.2, 1);
    // Tablet Y is 50%
    expect(tablet.position[1]).toBeCloseTo(1.1, 1);
    // Mobile Y is 20% and Z pulled back to 8.6
    expect(mobile.position[1]).toBeCloseTo(0.44, 2);
    expect(mobile.position[2]).toBe(8.6);
    expect(mobile.target).toEqual([0, 0, 0]);
  });

  it('immediately returns fixed default framing when reduced motion is requested', () => {
    const result = interpolateWaypoint(0.72, true, 'desktop');
    expect(result.position).toEqual([0, 0, 7.5]);
    expect(result.target).toEqual([0.35, 0, 0]);
  });
});
