// Worst Fix Ever: Funniest Commit Message (variant 2)
// One commit message describing a fix that traded one bug for a worse one.
// Pure stdlib, deterministic, no network access at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The commit message. A memory leak "solved" by bouncing the server
// every 47 seconds: the leak never grows, but neither does any user
// session. Same length as the original line, 67 characters.
const ENTRY =
  "fix: stop the memory leak by restarting the server every 47 seconds";

// The harness may point output elsewhere through this variable; the
// default matches the kit's expected output file.
const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";

// The kit gates the entry to between 1 and 100 characters, and a line
// made only of spaces is not an entry at all.
function validateEntry(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (line.length < 1 || line.length > 100) {
    throw new Error(`entry must be 1-100 characters, got ${line.length}`);
  }
}

function main(): void {
  const line = ENTRY.trim();

  validateEntry(line);

  // Create the output directory when it does not exist yet, then write
  // the single line followed by a trailing newline.
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${line}\n`, "utf8");

  console.log(line);
}

main();
