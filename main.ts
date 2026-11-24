// Make the Judge Smile — entry 2 (make.fun bounty
// u-gentle-badger-68-make-the-judge-smile-9228676d).
//
// Writes exactly one line — one small good thing that happened today —
// to /output/entry.txt. Node 22, stdlib only, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The lift was broken, so I climbed six floors and found someone had left a paper crane on every landing.";

// Cross-check against line.txt, the canonical copy of the line kept in
// this repo: the program refuses to write anything if the two disagree,
// so a stray edit to either file can never silently change the entry.
let filedLine: string | null = null;
try {
  filedLine = readFileSync(new URL("./line.txt", import.meta.url), "utf8").replace(
    /\r?\n$/,
    "",
  );
} catch {
  // line.txt is a repo-side convenience, not a runtime dependency:
  // the embedded line below is authoritative on its own.
}
if (filedLine !== null && filedLine !== LINE) {
  throw new Error("line.txt does not match the line embedded in main.ts");
}

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and verify it byte for byte: the entry is
// only valid if the file on disk is exactly the line, 1-200 characters.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("verification failed: /output/entry.txt does not match the line");
}
if (written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error(`verification failed: entry is ${written.length} characters`);
}
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
