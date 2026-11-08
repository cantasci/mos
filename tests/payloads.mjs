// The contract test that was missing (owner, 2026-11-08): plugin 0.3.16's /mos:visual described brief.figures in prose and
// the live server rejected the calls ("expected object, received string at brief.figures[0..2]"). Every example call in
// the commands (a ```json block after <!-- <tool> example -->) is validated against the input schema of the commit the
// server is running: /healthz names the commit, its pinned contract (tests/fixtures/contracts/tools.json in
// cantasci/mos-mcp, kept equal to the code by that repo's CI) is read at that commit. The server's legacy forms (a
// figure as a string or without its label, a direction in prose) are accepted there for one version only; here they fail.
//
//   node tests/payloads.mjs [--server=https://mos-mcp.up.railway.app] [--schema=<tools.json>] [--deps=<dir with ajv>]
//
// Needs gh (signed in) for the contract at the live commit, unless --schema is given; ajv from --deps (default: the
// server repo beside this one).
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const opt = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const server = opt('server', 'https://mos-mcp.up.railway.app');
const deps = opt('deps', path.join(ROOT, '..', 'mos-engine-prototype'));
const Ajv = createRequire(path.join(deps, 'package.json'))('ajv');

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail: String(detail) });

// The schema the server runs.
let tools, from;
if (opt('schema')) { tools = JSON.parse(fs.readFileSync(opt('schema'), 'utf8')); from = opt('schema'); } else {
  const health = await fetch(`${server}/healthz`).then((r) => r.json());
  const raw = execFileSync('gh', ['api', '-H', 'Accept: application/vnd.github.raw', `repos/cantasci/mos-mcp/contents/tests/fixtures/contracts/tools.json?ref=${health.commit}`], { encoding: 'utf8', maxBuffer: 1 << 24 });
  tools = JSON.parse(raw); from = `${server} at ${health.commit.slice(0, 7)}`;
}
const list = tools.tools || tools;
const schemaOf = (name) => (list.find((t) => t.name === name) || {}).inputSchema;
// Strict: the legacy alternatives (a string beside an object) are not a form the plugin may send.
const strict = (s) => {
  if (Array.isArray(s)) return s.map(strict);
  if (!s || typeof s !== 'object') return s;
  const o = Object.fromEntries(Object.entries(s).map(([k, v]) => [k, strict(v)]));
  if (Array.isArray(o.anyOf) && o.anyOf.some((x) => x.type === 'object') && o.anyOf.some((x) => x.type === 'string')) {
    const obj = o.anyOf.find((x) => x.type === 'object');
    delete o.anyOf;
    Object.assign(o, obj);
  }
  return o;
};
const ajv = new Ajv({ strict: false, allErrors: true });

// The examples in the commands.
const examples = fs.readdirSync(path.join(ROOT, 'commands')).filter((f) => f.endsWith('.md')).flatMap((f) => {
  const text = fs.readFileSync(path.join(ROOT, 'commands', f), 'utf8');
  return [...text.matchAll(/<!--\s*([a-z_]+) example\s*-->\s*```json\n([\s\S]*?)```/g)].map((m) => ({ file: f, tool: m[1], body: m[2] }));
});
check('the commands carry at least one example call (visual.md: render_visual)', examples.some((e) => e.file === 'visual.md' && e.tool === 'render_visual'), examples.map((e) => `${e.file}:${e.tool}`).join(', '));
for (const e of examples) {
  let payload = null;
  try { payload = JSON.parse(e.body); } catch (err) { check(`${e.file} ${e.tool}: the example is JSON`, false, err.message); continue; }
  const schema = schemaOf(e.tool);
  if (!schema) { check(`${e.file} ${e.tool}: the server lists the tool`, false, from); continue; }
  const validate = ajv.compile(strict(schema));
  check(`${e.file} ${e.tool}: the example matches the schema the server runs (${from}), without the legacy forms`, validate(payload), JSON.stringify(validate.errors || []).slice(0, 400));
}
// The legacy forms fail here (the check above is not vacuous).
{
  const validate = ajv.compile(strict(schemaOf('render_visual')));
  const base = { format: 'instagram_post', brief: { facts: ['x'] } };
  const bad = [['a figure as a string', { ...base, brief: { facts: ['x'], figures: ['97% forecast accuracy'] } }], ['a figure without its label', { ...base, brief: { facts: ['x'], figures: [{ value: '97%' }] } }], ['a direction in prose', { ...base, direction: 'a calm backdrop' }]];
  for (const [what, p] of bad) check(`render_visual: ${what} is refused`, !validate(p), '');
}

for (const x of results) console.log(`${x.ok ? 'PASS' : 'FAIL'}  ${x.name}  (${x.detail.slice(0, 400)})`);
console.log(`${results.filter((x) => x.ok).length}/${results.length} passed`);
process.exit(results.every((x) => x.ok) ? 0 : 1);
