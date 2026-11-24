import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vacuum's alibi: one deadpan line, at most 200 characters.
const MAX_LENGTH = 200;

const ALIBI_LINE =
  "Spot 7B remains uncleaned. My lidar classified the sock as a roommate, and I do not vacuum roommates.";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > MAX_LENGTH) {
    throw new Error(
      `entry must be 1-${MAX_LENGTH} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateLine(ALIBI_LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ALIBI_LINE, "utf8");
