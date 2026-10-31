import * as THREE from 'three';

export function createProceduralPlanetTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;

  try {
    const width = 1024;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fill ocean base (Deep Space Navy to Cobalt)
    const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
    baseGrad.addColorStop(0, '#040714');
    baseGrad.addColorStop(0.2, '#09132d');
    baseGrad.addColorStop(0.5, '#0b1c47');
    baseGrad.addColorStop(0.8, '#09132d');
    baseGrad.addColorStop(1, '#040714');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // Multi-octave procedural continents and islands
    const numContinents = 18;
    for (let i = 0; i < numContinents; i++) {
      const cx = Math.random() * width;
      const cy = height * 0.2 + Math.random() * (height * 0.6);
      const rx = 60 + Math.random() * 120;
      const ry = 40 + Math.random() * 80;

      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, rx);
      grad.addColorStop(0, 'rgba(30, 58, 110, 0.9)');
      grad.addColorStop(0.5, 'rgba(20, 42, 85, 0.7)');
      grad.addColorStop(0.85, 'rgba(12, 28, 60, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.random() * Math.PI, 0, 2 * Math.PI);
      ctx.fill();

      // Additional landmass noise / ridges
      for (let j = 0; j < 6; j++) {
        const subX = cx + (Math.random() - 0.5) * rx * 1.2;
        const subY = cy + (Math.random() - 0.5) * ry * 1.2;
        const subR = 15 + Math.random() * 35;

        ctx.fillStyle = 'rgba(54, 120, 229, 0.25)';
        ctx.beginPath();
        ctx.arc(subX, subY, subR, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Atmospheric cloud ribbons
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let c = 0; c < 8; c++) {
      const cy = height * 0.15 + (height * 0.7 * c) / 8;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      for (let x = 0; x <= width; x += 40) {
        const wave = Math.sin((x / width) * Math.PI * 4 + c) * 18 + Math.cos((x / width) * Math.PI * 8) * 8;
        ctx.lineTo(x, cy + wave);
      }
      ctx.lineTo(width, cy + 30);
      ctx.lineTo(0, cy + 30);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  } catch {
    return null;
  }
}
