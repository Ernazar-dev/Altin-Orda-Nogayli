import fs from 'node:fs';
import { sources } from './sources.data';
import { sources2 } from './sources2.data';

const diss = fs.readFileSync(process.argv[2] ?? '', 'utf8').replace(/\s+/g, ' ');
let bad = 0;
for (const s of [...sources, ...sources2]) {
  const lines = s.content.split('\n').filter((l) => l.trim());
  for (const l of lines) {
    const n = l.replace(/\s+/g, ' ').trim();
    if (!diss.includes(n)) {
      bad += 1;
      console.log(`YO'Q [${s.key}]: ${n.slice(0, 70)}`);
    }
  }
}
console.log(bad === 0 ? 'Barcha manba satrlari dissertatsiyada topildi' : `Topilmagan satrlar: ${bad}`);
if (bad > 0) process.exitCode = 1;
