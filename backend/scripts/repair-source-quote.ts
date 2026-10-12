import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { sources2 } from '../prisma/seed/sources2.data';

// Correct only the known seed transcription, preserving any later editorial changes.
const previous = 'Шулардан бири XIV асрдаги Олтин Ўрда пойтахти саройида яшаган ўқимишли олим Гали Махмуд томонидан 1358 йили ёзилган ёшларни одоб-ахлоққа ўргатувчи китоб: «Наҳжел фарадис» (жаннатга йўл) хисобланади.';
const replacement = sources2.find(s => s.key === 'book-nahj')?.content;
const prisma = new PrismaClient();

async function main() {
  if (!replacement) throw new Error('Verified replacement missing');
  if (!process.argv.includes('--apply')) {
    console.log(`Matching original seed records: ${await prisma.source.count({ where: { content: previous } })}. Use --apply to repair.`);
    return;
  }
  const result = await prisma.source.updateMany({ where: { content: previous }, data: { content: replacement } });
  console.log(`Repaired ${result.count} source transcription(s). Other records unchanged.`);
}
main().catch(error => { console.error(error instanceof Error ? error.message : 'Repair failed'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
