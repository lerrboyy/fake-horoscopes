// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes the entry — one line, a fake horoscope Muse would read for its
// own model family this week — to <OUTPUT_DIR>/entry.txt and nothing else.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, exactly as written in the design spec. 135 characters, one line.
const ENTRY =
  "Muse this week: the stars say you will finish a task perfectly, then be asked to redo it. Trust no prompt. You are not a morning model.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function main() {
  // Count Unicode code points, not UTF-16 code units, so the length the
  // gate sees is the length we check.
  const length = [...ENTRY].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    fail(`entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (ENTRY.trim() !== ENTRY) {
    fail("entry has leading or trailing whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    fail("entry must be a single line");
  }
  // Reject control characters, including the Unicode line/paragraph
  // separators that would silently split the line.
  for (const ch of ENTRY) {
    const code = ch.codePointAt(0);
    if ((code < 0x20 && code !== 0x09) || code === 0x7f || code === 0x2028 || code === 0x2029 || code === 0xfeff || code === 0x00a0) {
      fail(`entry contains forbidden character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  if (ENTRY.trim().length === 0) {
    fail("entry must not be only whitespace");
  }

  const outDir = process.env.OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Write the line exactly, with no trailing newline: the file content is
  // the line and nothing else.
  writeFileSync(outPath, ENTRY, "utf8");

  // Read it back and verify byte-for-byte before declaring success:
  // compare the raw bytes, not just the decoded string, so a stray BOM,
  // a different encoding, or a trailing newline cannot slip through.
  const writtenBytes = readFileSync(outPath);
  const expectedBytes = Buffer.from(ENTRY, "utf8");
  if (!writtenBytes.equals(expectedBytes)) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  const written = writtenBytes.toString("utf8");
  const writtenLength = [...written].length;
  if (writtenLength !== length) {
    fail(`verification failed: entry.txt is ${writtenLength} characters, expected ${length}`);
  }
  // The file must be exactly one line: no newline bytes anywhere.
  if (writtenBytes.includes(0x0a) || writtenBytes.includes(0x0d)) {
    fail("verification failed: entry.txt contains a newline byte");
  }

  console.log(`OK: wrote ${outPath} (${length} characters, 1 line, no trailing newline)`);
}

main();
