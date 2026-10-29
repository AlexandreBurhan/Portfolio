// Pre-publish checks. Run after `npm run build`.
// 1. No em dashes in rendered text (writing rule).
// 2. Nothing that looks like an internal identifier (confidentiality rule).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const roots = ['content', 'components', 'app', 'out'];
const textExt = new Set(['.js', '.html', '.txt', '.json', '.css', '.md']);

const rules = [
  { name: 'em dash', re: /—/ },
  { name: 'company email address', re: /@[a-z0-9-]+\.(com|io|fr)\b(?<!@edhec\.com)/i },
  { name: 'internal host', re: /\.ops\.|\.internal\b|\.corp\b/i },
  { name: 'google doc/sheet link', re: /docs\.google\.com|script\.google\.com/i },
  { name: 'sheet gid', re: /gid=\d/ },
  { name: 'uuid', re: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i },
  { name: 'calendar id', re: /@group\.calendar\.google\.com/i },
];

// Organisation-specific terms (real team, skill group, partner or tool names)
// live in a local, git-ignored file so the check never publishes them itself.
// One term per line; lines starting with # are ignored.
try {
  const local = readFileSync('scripts/forbidden.local.txt', 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  for (const term of local) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    rules.push({ name: 'local forbidden term', re: new RegExp(escaped, 'i') });
  }
  if (local.length) console.log(`Loaded ${local.length} local forbidden term(s).`);
} catch {
  console.log('No scripts/forbidden.local.txt found: running generic checks only.');
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (e === 'node_modules' || e === '_next' && dir === 'out') {
        // _next holds compiled JS that mirrors content; still scan it
      }
      if (e !== 'node_modules') walk(p, out);
    } else if (textExt.has(extname(p))) out.push(p);
  }
  return out;
}

let problems = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    if (file.endsWith('check-content.mjs')) continue;
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const r of rules) {
        if (r.re.test(line)) {
          problems++;
          const snippet = line.trim().slice(0, 100);
          console.log(`${r.name.padEnd(24)} ${file}:${i + 1}  ${snippet}`);
        }
      }
    });
  }
}

if (problems) {
  console.log(`\n${problems} problem(s) found.`);
  process.exit(1);
}
console.log('Content checks passed: no em dashes, no internal identifiers.');
