#!/usr/bin/env node
// Marketing OS installer:  npx --yes github:cantasci/mos [--check] [--yes] [--uninstall]
//
// One command instead of the manual steps in the README. It only calls Claude Code's own commands
// (claude plugin ..., claude mcp ...) and never edits a settings file itself:
//   1. Claude Code is installed
//   2. no hand-added "marketing-os" server stands beside the plugin's own (that stops sign-in)
//   3. the plugin source (marketplace) is added or refreshed
//   4. the plugin is installed or updated
//   5. the server answers and accepts this plugin version
//   6. the one step left is printed: sign in with the access code
// --check reports the same points and changes nothing. No dependencies.
import { spawnSync } from 'child_process';
import readline from 'readline';

const MARKETPLACE = 'marketing-os';
const SOURCE = 'cantasci/mos';
const PLUGIN = `mos@${MARKETPLACE}`;
const SERVER_NAME = 'marketing-os';
const SERVER = (process.env.MOS_SERVER_URL || 'https://mos-mcp.up.railway.app/mcp').replace(/\/mcp\/?$/, '');

const flags = new Set(process.argv.slice(2));
const CHECK = flags.has('--check');
const YES = flags.has('--yes') || flags.has('-y');
const UNINSTALL = flags.has('--uninstall');
if (flags.has('--help') || flags.has('-h')) {
  console.log(`Marketing OS installer

  npx --yes github:cantasci/mos              install or update
  npx --yes github:cantasci/mos --check      report the state, change nothing
  npx --yes github:cantasci/mos --yes        do not ask before removing a hand-added server
  npx --yes github:cantasci/mos --uninstall  remove the plugin`);
  process.exit(0);
}

let problems = 0;
const ok = (s) => console.log(`  ✓ ${s}`);
const note = (s) => console.log(`  · ${s}`);
const bad = (s) => { problems += 1; console.log(`  ✗ ${s}`); };

const claude = (args, timeout = 180_000) => {
  const r = spawnSync('claude', args, { encoding: 'utf8', timeout, shell: process.platform === 'win32' });
  return { ok: !r.error && r.status === 0, missing: r.error?.code === 'ENOENT', out: `${r.stdout || ''}${r.stderr || ''}`.trim() };
};
const json = (args) => { const r = claude(args); if (!r.ok) return null; try { return JSON.parse(r.out); } catch { return null; } };
const lastLine = (s) => s.split('\n').filter(Boolean).pop() || '';
const ask = (q) => new Promise((resolve) => {
  if (YES) return resolve(true);
  if (!process.stdin.isTTY) return resolve(false);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(`  ? ${q} [y/N] `, (a) => { rl.close(); resolve(/^(y|yes|e|evet)$/i.test(a.trim())); });
});

// A server named plainly "marketing-os" is one somebody added by hand; the plugin's own is "plugin:mos:marketing-os".
const handAdded = () => {
  const r = claude(['mcp', 'get', SERVER_NAME], 60_000);
  if (!r.ok) return null;
  return { scope: r.out.match(/Scope:\s*(.+)/)?.[1]?.trim() || 'unknown', url: r.out.match(/URL:\s*(.+)/)?.[1]?.trim() || 'unknown' };
};
const installed = () => (json(['plugin', 'list', '--json']) || []).find((p) => p.id === PLUGIN) || null;
const hasMarketplace = () => (json(['plugin', 'marketplace', 'list', '--json']) || []).some((m) => m.name === MARKETPLACE);

const numbers = (v) => String(v).split('.').map((n) => parseInt(n, 10) || 0);
const older = (a, b) => { const [x, y] = [numbers(a), numbers(b)]; for (let i = 0; i < 3; i += 1) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) < (y[i] || 0); return false; };

console.log(`Marketing OS ${UNINSTALL ? 'uninstall' : CHECK ? 'check' : 'install'}\n`);

// 1. Claude Code
const version = claude(['--version'], 30_000);
if (!version.ok) {
  bad(version.missing ? 'Claude Code is not installed (the "claude" command was not found). Install it first: https://claude.com/claude-code' : `Claude Code did not answer: ${lastLine(version.out)}`);
  process.exit(1);
}
ok(`Claude Code ${version.out.split('\n')[0]}`);

if (UNINSTALL) {
  const r = installed() ? claude(['plugin', 'uninstall', PLUGIN]) : null;
  if (!r) note('The plugin was not installed.'); else if (r.ok) ok('Plugin removed.'); else bad(`The plugin could not be removed: ${lastLine(r.out)}`);
  if (hasMarketplace()) { const m = claude(['plugin', 'marketplace', 'remove', MARKETPLACE]); if (m.ok) ok('Plugin source removed.'); else bad(`The plugin source could not be removed: ${lastLine(m.out)}`); }
  process.exit(problems ? 1 : 0);
}

// 2. A hand-added server of the same name
for (let i = 0; i < 3; i += 1) {
  const extra = handAdded();
  if (!extra) { if (i === 0) ok(`No hand-added "${SERVER_NAME}" server (checked for this folder and your user settings).`); break; }
  // Run inside a copy of the plugin's own repository, its .mcp.json shows up as a project server: not a hand-added one.
  if (extra.url.includes('MOS_SERVER_URL')) { note('This folder is the plugin\'s own repository; its .mcp.json is not a hand-added server.'); break; }
  const shared = /^project config/i.test(extra.scope);
  const what = `A hand-added "${SERVER_NAME}" server stands beside the plugin's own and stops sign-in (${extra.scope}; address ${extra.url}).`;
  if (CHECK) { bad(`${what} Remove it: claude mcp remove ${SERVER_NAME}`); break; }
  console.log(`  ! ${what}`);
  // A project's shared .mcp.json belongs to everyone working in that folder: never removed without a typed yes.
  const go = shared && YES && !process.stdin.isTTY ? false : await ask('Remove it?');
  if (!go) { bad(`Left in place. Sign-in will keep failing until you run: claude mcp remove ${SERVER_NAME}`); break; }
  const r = claude(['mcp', 'remove', SERVER_NAME]);
  if (!r.ok) { bad(`It could not be removed: ${lastLine(r.out)}`); break; }
  ok('Removed.');
}

// 3. and 4. Plugin source and plugin
const before = installed();
if (CHECK) {
  if (hasMarketplace()) ok('Plugin source is added.'); else bad('Plugin source is not added.');
  if (!before) bad('Plugin is not installed.');
  else if (before.enabled === false) bad(`Plugin ${before.version} is installed but disabled. Enable it: claude plugin enable ${PLUGIN}`);
  else ok(`Plugin ${before.version} is installed.`);
} else {
  const had = hasMarketplace();
  const m = had ? claude(['plugin', 'marketplace', 'update', MARKETPLACE]) : claude(['plugin', 'marketplace', 'add', SOURCE]);
  if (m.ok) ok(had ? 'Plugin source refreshed.' : 'Plugin source added.');
  else bad(`The plugin source could not be ${had ? 'refreshed' : 'added'} (is github.com reachable?): ${lastLine(m.out)}`);
  const p = before ? claude(['plugin', 'update', PLUGIN]) : claude(['plugin', 'install', PLUGIN]);
  const after = installed();
  if (!after) bad(`The plugin could not be installed: ${lastLine(p.out)}`);
  else if (!before) ok(`Plugin ${after.version} installed.`);
  else if (after.version !== before.version) ok(`Plugin updated: ${before.version} → ${after.version}.`);
  else ok(`Plugin ${after.version} is already the newest.`);
  if (after?.enabled === false) { const e = claude(['plugin', 'enable', PLUGIN]); if (e.ok) ok('Plugin enabled.'); else bad(`The plugin is disabled. Enable it: claude plugin enable ${PLUGIN}`); }
}

// 5. The server
const now = installed();
try {
  const res = await fetch(`${SERVER}/healthz`, { signal: AbortSignal.timeout(15_000) });
  const h = await res.json();
  if (!res.ok || !h.ok) bad(`The Marketing OS server answered but is not healthy (${res.status}). Try again in a few minutes.`);
  else if (now && h.plugin?.min && older(now.version, h.plugin.min)) bad(`The server needs plugin ${h.plugin.min} or newer; ${now.version} is installed. Run this installer again to update.`);
  else ok(`Server ${h.version} is up${now ? ` and accepts plugin ${now.version}` : ''}.`);
} catch {
  bad(`The Marketing OS server could not be reached (${SERVER}). Check your connection; the plugin is installed and will work once the server answers.`);
}

// 6. What is left
console.log('');
if (CHECK) {
  console.log(problems ? `${problems} point(s) need attention. Running without --check fixes what it can.` : 'Everything is in place. If you have not signed in yet: start a new Claude Code session, run /mcp, choose plugin:mos:marketing-os and press Authenticate.');
} else if (!installed()) {
  console.log('Not installed. See the lines marked ✗ above.');
} else {
  console.log(`${problems ? 'Installed, with the points marked ✗ above still open.' : 'Installed.'} One step is left, once:
  1. Start a new Claude Code session.
  2. Run /mcp, choose plugin:mos:marketing-os and press Authenticate.
  3. Enter your access code on the page that opens.
Then try: /mos:brand:new https://yourshop.com`);
}
process.exit(problems ? 1 : 0);
