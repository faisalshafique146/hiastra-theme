// Capture the real VS Code renderer in the isolated screenshot profile.
// Requires that dedicated instance on localhost:9333; never targets other windows.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const pages = await fetch('http://127.0.0.1:9333/json/list').then(r => r.json());
  const targets = pages.filter(p => p.type === 'page' && p.title.includes('HiAstra Theme'));
  assert.equal(targets.length, 1, 'Expected exactly one isolated HiAstra window.');
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  const pending = new Map();
  let id = 0;
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    const item = pending.get(message.id);
    if (!item) return;
    pending.delete(message.id);
    clearTimeout(item.timer);
    if (message.error) item.reject(new Error(JSON.stringify(message.error)));
    else item.resolve(message.result);
  });
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const requestId = ++id;
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`Timed out: ${method}`)); }, 15000);
      pending.set(requestId, { resolve, reject, timer });
      ws.send(JSON.stringify({ id: requestId, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function key(key, code, windowsVirtualKeyCode, modifiers = 0) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode, modifiers });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode, modifiers });
  }
  async function openFile(file) {
    await key('p', 'KeyP', 80, 2);
    await delay(200);
    await send('Input.insertText', { text: file });
    await delay(500);
    await key('Enter', 'Enter', 13);
    await delay(800);
    await key('Home', 'Home', 36, 2);
    const active = await evaluate('document.querySelector(".tab.active .label-name")?.textContent');
    assert.equal(active, file, 'Unexpected active editor; refusing to capture.');
  }
  try {
    if (process.argv.includes('--close')) {
      await send('Page.close');
      console.log('Closed the isolated screenshot window.');
      return;
    }
    await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await delay(400);
    const appearance = await evaluate(`(() => {
      const el = document.querySelector('.monaco-workbench');
      const css = getComputedStyle(el);
      return { title: document.title, theme: el.getAttribute('data-vscode-theme-name'),
        editor: css.getPropertyValue('--vscode-editor-background').trim(),
        border: css.getPropertyValue('--vscode-tab-activeBorder').trim(),
        text: document.body.innerText.slice(0, 6500),
        sidebarActions: [...document.querySelectorAll('.part.auxiliarybar .action-label')]
          .map(x => ({ title: x.title, label: x.getAttribute('aria-label'), class: x.className })),
        notificationActions: [...document.querySelectorAll('.notifications-toasts .action-label')]
          .map(x => ({ title: x.title, label: x.getAttribute('aria-label'), class: x.className })) };
    })()`);
    if (process.argv.includes('--inspect')) { console.log(JSON.stringify(appearance, null, 2)); return; }
    assert.equal(appearance.editor.toLowerCase(), '#151326', 'HiAstra background is not active.');
    assert.equal(appearance.border.toLowerCase(), '#f08acb', 'Current pink tab border is not active.');
    // Use the actual UI close control, not DOM/CSS modifications, to hide
    // the empty secondary sidebar and give the code the available space.
    await evaluate(`document.querySelector('.part.auxiliarybar .codicon-auxiliarybar-close')?.click()`);
    await delay(400);
    const files = [
      ['palette.ts', 'typescript.png'], ['preview.js', 'javascript.png'],
      ['preview.py', 'python.png'], ['index.html', 'html.png'], ['styles.css', 'css.png']
    ];
    for (const [file] of files) await openFile(file);
    const output = path.resolve(__dirname, '../images/screenshots');
    fs.mkdirSync(output, { recursive: true });
    for (const [file, name] of files) {
      await openFile(file);
      await delay(800);
      const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
      fs.writeFileSync(path.join(output, name), Buffer.from(screenshot.data, 'base64'));
      console.log(`Captured ${name} from ${file}`);
    }
  } finally { ws.close(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
