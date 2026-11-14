// The installer (bin/install.mjs) against a stand-in "claude" command and a stand-in server: no real settings are
// touched and nothing is installed. The risks it covers: a hand-added server left in place (the sign-in error of
// 2026-11-13), --check changing something, a missing Claude Code not being said plainly.
//
//   node tests/install.mjs
import fs from 'fs';
import os from 'os';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mos-install-'));
const stateFile = path.join(dir, 'state.json');
const node = process.execPath;

// The stand-in keeps its state (marketplaces, plugins, hand-added server) in a JSON file and logs every call.
fs.writeFileSync(path.join(dir, 'claude'), `#!${node}
const fs = require('fs');
const s = JSON.parse(fs.readFileSync(${JSON.stringify(stateFile)}, 'utf8'));
const a = process.argv.slice(2);
const save = () => fs.writeFileSync(${JSON.stringify(stateFile)}, JSON.stringify(s));
s.calls.push(a.join(' ')); save();
const is = (...w) => w.every((x, i) => a[i] === x);
if (is('--version')) console.log('9.9.9 (Claude Code)');
else if (is('mcp', 'get')) { if (!s.server) { console.log('No MCP server named "marketing-os".'); process.exit(1); } console.log('marketing-os:\\n  Scope: ' + s.server.scope + '\\n  Type: http\\n  URL: ' + s.server.url); }
else if (is('mcp', 'remove')) { s.server = null; save(); console.log('Removed'); }
else if (is('plugin', 'marketplace', 'list')) console.log(JSON.stringify(s.marketplace ? [{ name: 'marketing-os' }] : []));
else if (is('plugin', 'marketplace', 'add') || is('plugin', 'marketplace', 'update')) { s.marketplace = true; save(); }
else if (is('plugin', 'list')) console.log(JSON.stringify(s.plugin ? [{ id: 'mos@marketing-os', version: s.plugin, enabled: true }] : []));
else if (is('plugin', 'install') || is('plugin', 'update')) { s.plugin = s.newest; save(); }
else process.exit(2);
`, { mode: 0o755 });

const server = http.createServer((req, res) => res.end(JSON.stringify({ ok: true, version: '0.5.0', plugin: { min: '0.3.14', below: '0.5.0' } })));
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/mcp`;

const run = (state, args, PATH = `${dir}${path.delimiter}${path.dirname(node)}`) => new Promise((resolve) => {
  fs.writeFileSync(stateFile, JSON.stringify({ calls: [], marketplace: false, plugin: null, newest: '0.3.18', server: null, ...state }));
  const c = spawn(node, [path.join(ROOT, 'bin/install.mjs'), ...args], { env: { PATH, MOS_SERVER_URL: url }, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = ''; c.stdout.on('data', (d) => { out += d; }); c.stderr.on('data', (d) => { out += d; });
  c.on('close', (code) => resolve({ code, out, state: JSON.parse(fs.readFileSync(stateFile, 'utf8')) }));
});

let pass = 0; let fail = 0;
const check = (name, cond, detail = '') => { if (cond) pass += 1; else { fail += 1; console.log(`FAIL ${name}${detail ? `\n${detail}` : ''}`); } };
const changed = (r) => r.state.calls.filter((c) => /(^mcp remove| add | update | install |uninstall|enable)/.test(` ${c} `));

let r = await run({}, []);
check('clean machine: source added, plugin installed, sign-in step printed', r.code === 0 && r.state.marketplace && r.state.plugin === '0.3.18' && /plugin marketplace add cantasci\/mos/.test(r.state.calls.join('\n')) && /Authenticate/.test(r.out), r.out);

r = await run({ server: { scope: 'Local config (private to you in this project)', url: 'http://localhost:8787/mcp' } }, ['--yes']);
check('hand-added server: removed with --yes, then installed', r.code === 0 && r.state.server === null && r.state.plugin === '0.3.18' && /localhost:8787/.test(r.out), r.out);

r = await run({ server: { scope: 'Local config (private to you in this project)', url: 'http://localhost:8787/mcp' } }, []);
check('hand-added server, nobody to ask: left in place, said so, exit 1, plugin still installed', r.code === 1 && r.state.server !== null && r.state.plugin === '0.3.18' && /claude mcp remove marketing-os/.test(r.out), r.out);

r = await run({ server: { scope: 'Project config (shared via .mcp.json)', url: 'http://localhost:8787/mcp' } }, ['--yes']);
check('hand-added server in a shared project file: not removed unattended', r.code === 1 && r.state.server !== null, r.out);

r = await run({ marketplace: true, plugin: '0.3.17' }, []);
check('already installed: refreshed and updated, versions named', r.code === 0 && r.state.plugin === '0.3.18' && /0\.3\.17 → 0\.3\.18/.test(r.out) && /marketplace update marketing-os/.test(r.state.calls.join('\n')), r.out);

r = await run({ marketplace: true, plugin: '0.3.13' , newest: '0.3.13' }, []);
check('plugin older than the server accepts: said, exit 1', r.code === 1 && /needs plugin 0\.3\.14/.test(r.out), r.out);

r = await run({ server: { scope: 'User config', url: 'http://localhost:8787/mcp' } }, ['--check']);
check('--check: reports the server and the missing plugin, changes nothing', r.code === 1 && changed(r).length === 0 && /not installed/.test(r.out) && /hand-added/.test(r.out), `${r.out}\n${changed(r).join('\n')}`);

r = await run({ marketplace: true, plugin: '0.3.18', server: { scope: 'Project config (shared via .mcp.json)', url: '${MOS_SERVER_URL}' } }, ['--check']);
check("the plugin's own repository folder is not a hand-added server", r.code === 0 && /own repository/.test(r.out), r.out);

r = await run({}, [], path.dirname(node) === dir ? '' : fs.mkdtempSync(path.join(os.tmpdir(), 'mos-empty-')));
check('Claude Code missing: said plainly, exit 1', r.code === 1 && /Claude Code is not installed/.test(r.out), r.out);

server.close();
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
