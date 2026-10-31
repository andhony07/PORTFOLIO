import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'D:\\PORTFOLIO\\docs\\screenshots';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function captureDevice(device) {
  console.log(`Starting Edge for ${device.name} (${device.width}x${device.height})...`);
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    `--window-size=${device.width},${device.height}`,
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:4173/'
  ]);

  edge.stderr.on('data', () => {});
  await wait(2000);

  try {
    const listRes = await fetch('http://localhost:9222/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab) throw new Error('No page tab found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg.result);
        pending.delete(msg.id);
      }
    };

    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve) => {
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await new Promise((resolve) => { ws.onopen = resolve; });
    await send('Page.enable');
    await send('Runtime.enable');
    await wait(600);

    for (const s of device.shots) {
      if (s.selector) {
        await send('Runtime.evaluate', {
          expression: `
            (() => {
              const el = document.querySelector('${s.selector}');
              if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
            })()
          `
        });
        await wait(600);
      }

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        const dest = path.join(outDir, s.filename);
        fs.writeFileSync(dest, Buffer.from(shot.data, 'base64'));
        console.log(`[OK] Saved ${s.filename} (${fs.statSync(dest).size} bytes)`);
      }
    }

    ws.close();
  } catch (err) {
    console.error(`Error on ${device.name}:`, err.message);
  } finally {
    edge.kill();
    await wait(500);
  }
}

async function run() {
  await captureDevice({
    name: 'Tablet iPad Air',
    width: 820,
    height: 1180,
    shots: [
      { filename: 'phase7_tablet_certifications.png', selector: '#certifications' },
      { filename: 'phase7_tablet_projects.png', selector: '#projects' }
    ]
  });

  await captureDevice({
    name: 'Mobile iPhone',
    width: 390,
    height: 844,
    shots: [
      { filename: 'phase7_mobile_certifications.png', selector: '#certifications' },
      { filename: 'phase7_mobile_projects.png', selector: '#projects' }
    ]
  });

  console.log('Responsive captures complete.');
}

run();
