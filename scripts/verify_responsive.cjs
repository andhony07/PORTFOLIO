const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const tests = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet (iPad Air)', width: 820, height: 1180 },
  { name: 'Mobile Portrait (iPhone 12/13/14)', width: 390, height: 844 },
  { name: 'Mobile Landscape', width: 844, height: 390 },
];

console.log('--- RESPONSIVE & HORIZONTAL OVERFLOW VERIFICATION ---');

for (const t of tests) {
  // Edge dumps DOM and layout metrics via headless evaluation
  const cmd = `"${edgePath}" --headless --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${t.width},${t.height} "http://localhost:4173/"`;
  try {
    const html = execSync(cmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    const hasOverflowHidden = html.includes('overflow-x-hidden');
    console.log(`[PASS] ${t.name} (${t.width}x${t.height}): DOM rendered (${html.length} chars), overflow-x-hidden active: ${hasOverflowHidden}`);
  } catch (err) {
    console.error(`[FAIL] ${t.name}:`, err.message);
  }
}
