import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'D:\\PORTFOLIO\\docs\\screenshots';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting Edge in CDP headless mode...');
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:4173/'
  ]);

  edge.stderr.on('data', () => {});
  await wait(2500);

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
    await wait(1000);

    console.log('Triggering resume modal click...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          // Find the Resume button in header or hero
          const buttons = Array.from(document.querySelectorAll('button'));
          const resumeBtn = buttons.find(b => b.textContent && b.textContent.includes('Resume'));
          if (resumeBtn) resumeBtn.click();
        })()
      `
    });

    await wait(1000);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot && shot.data) {
      const dest = path.join(outDir, 'resume_modal_updated.png');
      fs.writeFileSync(dest, Buffer.from(shot.data, 'base64'));
      console.log(`[OK] Captured resume_modal_updated.png (${fs.statSync(dest).size} bytes)`);
    }

    ws.close();
  } catch (err) {
    console.error('CDP error:', err);
  } finally {
    edge.kill();
  }
}

run();

