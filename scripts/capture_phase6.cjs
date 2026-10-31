const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'D:\\PORTFOLIO\\docs\\screenshots';

const views = [
  { name: 'phase6_desktop.png', size: '1440,900', url: 'http://localhost:4173/' },
  { name: 'phase6_tablet.png', size: '820,1180', url: 'http://localhost:4173/' },
  { name: 'phase6_mobile_portrait.png', size: '390,844', url: 'http://localhost:4173/' },
  { name: 'phase6_mobile_landscape.png', size: '844,390', url: 'http://localhost:4173/' },
];

for (const v of views) {
  const dest = path.join(outDir, v.name);
  const cmd = `"${edgePath}" --headless --disable-gpu --virtual-time-budget=2500 --screenshot="${dest}" --window-size=${v.size} "${v.url}"`;
  console.log(`Capturing ${v.name}...`);
  try {
    execSync(cmd, { stdio: 'ignore' });
    const stats = fs.statSync(dest);
    console.log(`Saved ${v.name} (${stats.size} bytes)`);
  } catch (err) {
    console.error(`Failed ${v.name}:`, err.message);
  }
}
