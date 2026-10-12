// Local browser QA. Uses installed Chrome and the existing development servers.
// Does not create, modify, or delete database records.
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { once } from 'node:events';

const base = process.env.UI_URL ?? 'http://localhost:5173';
const artifacts = path.resolve('docs/qa');
await mkdir(artifacts, { recursive: true });
const profile = await mkdtemp(path.join(os.tmpdir(), 'meros-ui-'));
const chrome = spawn(process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--incognito', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
const endpoint = await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Chrome startup timeout')), 20000);
  chrome.once('error', reject);
  let log = '';
  chrome.stderr.on('data', chunk => {
    log += chunk;
    const found = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (found) { clearTimeout(timeout); resolve(found[1]); }
  });
});
class CDP {
  constructor(url) {
    this.ws = new WebSocket(url); this.next = 0; this.pending = new Map(); this.errors = [];
    this.ws.addEventListener('message', event => {
      const msg = JSON.parse(event.data);
      if (msg.id) {
        const pending = this.pending.get(msg.id);
        if (pending) { clearTimeout(pending.timer); this.pending.delete(msg.id); msg.error ? pending.reject(new Error(msg.error.message)) : pending.resolve(msg.result); }
      }
      if (msg.method === 'Runtime.exceptionThrown') this.errors.push(msg.params.exceptionDetails.text + ': ' + (msg.params.exceptionDetails.exception?.description ?? ''));
      if (msg.method) this.onEvent?.(msg);
    });
  }
  async ready() { if (this.ws.readyState !== 1) await once(this.ws, 'open'); }
  call(method, params = {}) {
    const id = ++this.next;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}
const root = new CDP(endpoint);
let page;
const checks = [];
function check(name, ok, details = '') {
  checks.push({ name, ok, details });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${details ? `: ${details}` : ''}`);
}
try {
  await root.ready();
  const target = await root.call('Target.createTarget', { url: 'about:blank' });
  const origin = new URL(endpoint); origin.protocol = 'http:'; origin.pathname = '/json/list';
  const targets = await (await fetch(origin)).json();
  page = new CDP(targets.find(t => t.id === target.targetId).webSocketDebuggerUrl);
  await page.ready(); await page.call('Page.enable'); await page.call('Runtime.enable');
  const evaluate = async expression => {
    const result = await page.call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? 'Page evaluation failed');
    return result.result.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await new Promise(r => setTimeout(r, 100)); }
    throw new Error(`Page condition timeout: ${expression}`);
  };
  async function visit(route) {
    await page.call('Page.navigate', { url: base + route });
    await waitFor('document.querySelector("#main h1") !== null');
    await waitFor('!document.querySelector("[aria-busy=true]")');
    await evaluate('document.fonts.ready.then(() => true)');
  }
  async function screenshot(name) {
    await new Promise(r => setTimeout(r, 400));
    const { data } = await page.call('Page.captureScreenshot', { format: 'png' });
    await writeFile(path.join(artifacts, name + '.png'), Buffer.from(data, 'base64'));
  }
  await page.call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await visit('/');
  await evaluate("localStorage.setItem('ao.lang','uz')");
  await visit('/');
  check('home has dissertation title', await evaluate('document.querySelector("h1").textContent.includes("Qoraqalpoq")'));
  check('home loads actual period links', await evaluate(`document.querySelectorAll('main a[href^="/periods/"]').length === 2`));
  await screenshot('home-desktop');
  check('student layout has no fixed sidebar', await evaluate('![...document.querySelectorAll("aside")].some(el => getComputedStyle(el).position === "fixed")'));
  await evaluate('[...document.querySelectorAll("header button")].find(b => b.textContent.includes("O\'rganish")).click()');
  await waitFor('document.querySelector(".ant-dropdown:not(.ant-dropdown-hidden)") !== null');
  check('desktop navbar opens learning links', await evaluate(`!!document.querySelector('.ant-dropdown:not(.ant-dropdown-hidden) a[href="/periods"]')`));
  await page.call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await page.call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  for (const route of ['/guide','/periods','/thinkers','/sources','/values','/timeline','/compare','/activities','/tests','/diagnostics','/login','/register']) {
    await visit(route);
    check(`desktop ${route}`, await evaluate('document.documentElement.scrollWidth <= innerWidth && !document.querySelector(".ant-result-warning")'));
  }
  const source = (await (await fetch('http://localhost:4000/api/sources')).json()).data[0];
  await visit(`/sources/${source.id}`);
  await evaluate(`document.querySelector('button[aria-label="Matnni kattalashtirish"]').click()`);
  await waitFor('document.querySelector("output").textContent === "21px"');
  check('reading size changes', await evaluate('getComputedStyle(document.querySelector("blockquote")).fontSize === "21px"'));
  await visit(`/sources/${source.id}`);
  check('reading preference survives reload', await evaluate('document.querySelector("output").textContent === "21px"'));
  await screenshot('source-desktop');
  await visit('/sources');
  await evaluate(`(() => { const el = document.querySelector('input[aria-label="Nomi, asl matni yoki havolasi bo‘yicha qidirish"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,'zzzz_no_source'); el.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await waitFor('document.querySelector("main").textContent.includes("0 ta yozuv")');
  check('source search empty state', await evaluate(`document.querySelectorAll('main a[href^="/sources/"]').length === 0`));
  await page.call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await visit('/');
  check('mobile home fits', await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await screenshot('home-mobile');
  await evaluate(`document.querySelector('button[aria-label="Menyuni ochish"]').click()`);
  await waitFor('document.querySelector(".ant-drawer-open") !== null');
  check('mobile navigation opens', await evaluate('document.querySelector(".ant-drawer-body").textContent.includes("Metodik yo‘riqnoma")'));
  for (const route of ['/sources','/guide','/compare']) { await visit(route); check(`mobile ${route}`, await evaluate('document.documentElement.scrollWidth <= innerWidth')); }
  async function signIn(username, password) {
    const response = await fetch('http://localhost:4000/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const payload = await response.json();
    if (!response.ok) throw new Error(`Login failed: ${response.status}`);
    await evaluate(`localStorage.setItem('ao.token', ${JSON.stringify(payload.data.token)})`);
  }
  await signIn(process.env.QA_STUDENT_USERNAME, process.env.QA_STUDENT_PASSWORD);
  await visit('/dashboard');
  check('student dashboard fits mobile', await evaluate('document.documentElement.scrollWidth <= innerWidth && !document.querySelector(".ant-result-warning")'));
  await screenshot('student-mobile');
  await page.call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await signIn(process.env.TEACHER_USERNAME, process.env.TEACHER_PASSWORD);
  await visit('/teacher');
  check('teacher scientific review panel', await evaluate('document.querySelector("#main").textContent.includes("Ilmiy mazmun nazorati")'));
  await screenshot('admin-desktop');
  // In-browser fixture only: distinguish measured zero from missing criterion data.
  page.onEvent = msg => {
    if (msg.method === 'Fetch.requestPaused') {
      const body = { data: ['AXIOLOGICAL','COGNITIVE','ACTIVITY','REFLECTIVE'].map(criterion => ({ criterion, overall: 0 })) };
      void page.call('Fetch.fulfillRequest', { requestId: msg.params.requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'application/json' }], body: Buffer.from(JSON.stringify(body)).toString('base64') });
    }
  };
  await page.call('Fetch.enable', { patterns: [{ urlPattern: '*api/analytics/by-criterion*', requestStage: 'Request' }] });
  await visit('/teacher');
  await waitFor('document.querySelectorAll(".recharts-surface").length > 0');
  check('zero-percent criteria render a chart', await evaluate('[...document.querySelectorAll("[role=img]")].some(el => el.getAttribute("aria-label")?.includes("0%") && el.querySelector(".recharts-surface"))'));
  await page.call('Fetch.disable'); page.onEvent = null;
  await visit('/teacher/sources?issue=reference');
  check('missing-reference filter does not show unrelated rows', await evaluate('document.querySelectorAll(".ant-table-row").length === 0'));
  await visit('/teacher/sources?review=DRAFT');
  check('source draft filter', await evaluate('document.querySelectorAll(".ant-table-row").length > 0'));
  await screenshot('admin-sources');
  await evaluate(`document.querySelector('button[aria-label="Tahrirlash"]').click()`);
  await waitFor('document.querySelector(".ant-drawer-open input") !== null');
  await evaluate(`(() => { const el = document.querySelector('.ant-drawer-open input'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el, el.value + ' QA'); el.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate('document.querySelector(".ant-drawer-close").click()');
  await waitFor('document.querySelector(".ant-modal-confirm") !== null');
  check('unsaved edits prompt before drawer close', await evaluate('document.querySelector(".ant-modal-confirm").textContent.includes("Saqlanmagan")'));
  await screenshot('admin-editor');
  await evaluate('[...document.querySelectorAll(".ant-modal-confirm button")].find(b => b.textContent.includes("davom ettirish")).click()');
  await waitFor('!document.querySelector(".ant-modal-confirm")');
  check('cancel discard preserves form edits', await evaluate('document.querySelector(".ant-drawer-open input").value.endsWith(" QA")'));
  await evaluate('document.querySelector(".ant-drawer-close").click()');
  await waitFor('document.querySelector(".ant-modal-confirm") !== null');
  await evaluate('[...document.querySelectorAll(".ant-modal-confirm button")].find(b => b.textContent.includes("Saqlamasdan")).click()');
  for (const route of ['/teacher/periods','/teacher/thinkers','/teacher/values','/teacher/activities','/teacher/tests','/teacher/diagnostics','/teacher/timeline','/teacher/comparisons','/teacher/students','/teacher/analytics','/teacher/settings']) {
    await visit(route); check(`admin ${route}`, await evaluate('document.documentElement.scrollWidth <= innerWidth && !document.querySelector(".ant-result-warning")'));
  }
  await page.call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await visit('/teacher');
  check('admin mobile fits', await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await screenshot('admin-mobile');
  await visit('/teacher/sources');
  check('admin source table fits mobile viewport', await evaluate('document.documentElement.scrollWidth <= innerWidth'));
  await evaluate("localStorage.setItem('ao.lang','kaa')");
  await visit('/guide');
  check('Karakalpak guide', await evaluate('document.querySelector("h1").textContent === "Metodikalıq kórsetpe"'));
  await evaluate("localStorage.removeItem('ao.token')");
  for (const width of [320, 768, 1100, 1280, 1440]) {
    await page.call('Emulation.setDeviceMetricsOverride', { width, height: 950, deviceScaleFactor: 1, mobile: width < 600 });
    await visit('/');
    check(`Karakalpak landing fits ${width}px`, await evaluate('document.documentElement.scrollWidth <= innerWidth'));
    check(`navbar elements do not overlap at ${width}px`, await evaluate(`(() => {
      const bar = document.querySelector('header > div');
      const children = [...bar.children].filter(el => getComputedStyle(el).display !== 'none').map(el => el.getBoundingClientRect());
      return children.every((rect,i) => rect.right <= innerWidth && (!i || rect.left >= children[i-1].right));
    })()`));
    if (width === 768) await screenshot('home-tablet-kaa');
  }
  check('no browser runtime exceptions', page.errors.length === 0, page.errors.join('; '));
} catch (error) {
  check('browser workflow completed', false, error.message);
  if (page) {
    console.log('Runtime exceptions:', page.errors);
    const info = await page.call('Runtime.evaluate', { expression: 'document.body.innerText.slice(0,1500)', returnByValue: true });
    console.log('Page:', info.result.value);
    const shot = await page.call('Page.captureScreenshot', { format: 'png' });
    await writeFile(path.join(artifacts, 'failure.png'), Buffer.from(shot.data, 'base64'));
  }
}
finally {
  await writeFile(path.join(artifacts, 'checks.json'), JSON.stringify(checks, null, 2));
  try { await root.call('Browser.close'); } catch { chrome.kill(); }
  page?.ws.close(); root.ws.close();
}
if (checks.some(c => !c.ok)) process.exitCode = 1;
