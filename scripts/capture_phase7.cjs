const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'D:\\PORTFOLIO\\docs\\screenshots';

const views = [
  { name: 'phase7_desktop_hero.png', size: '1440,900', url: 'http://localhost:4173/' },
  { name: 'phase7_desktop_certifications.png', size: '1440,900', url: 'http://localhost:4173/#certifications' },
  { name: 'phase7_desktop_projects.png', size: '1440,900', url: 'http://localhost:4173/#projects' },
  { name: 'phase7_desktop_achievements.png', size: '1440,900', url: 'http://localhost:4173/#achievements' },
  { name: 'phase7_desktop_experience.png', size: '1440,900', url: 'http://localhost:4173/#experience' },
  { name: 'phase7_tablet.png', size: '820,1180', url: 'http://localhost:4173/' },
  { name: 'phase7_mobile.png', size: '390,844', url: 'http://localhost:4173/' },
];

for (const v of views) {
  const dest = path.join(outDir, v.name);
  const cmd = `"${edgePath}" --headless --disable-gpu --virtual-time-budget=3000 --screenshot="${dest}" --window-size=${v.size} "${v.url}"`;
  console.log(`Capturing ${v.name}...`);
  try {
    execSync(cmd, { stdio: 'ignore' });
    const stats = fs.statSync(dest);
    console.log(`[OK] Saved ${v.name} (${stats.size} bytes)`);
  } catch (err) {
    console.error(`[ERR] Failed ${v.name}:`, err.message);
  }
}

