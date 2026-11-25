// Worst Fix Ever: Funniest Commit Message
// Writes one commit message for a bug fix that made everything worse.
// Deterministic, stdlib only, no network at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry line: one concrete incident, deadpan, in the voice of a tired
// engineer. The fix for a memory leak was to restart the server every
// 47 seconds, so the leak never gets a chance to grow and nobody gets
// a session longer than 47 seconds either.
const ENTRY =
  "fix: stop the memory leak by restarting the server every 47 seconds";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 100) {
    throw new Error(`entry must be 1-100 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
  console.log(line);
}

main();
