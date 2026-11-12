// Regenerates this repository from cosendhq/cosend-plugin at one commit:
//
//   node scripts/generate.mjs <40-character commit sha of cosendhq/cosend-plugin>
//
// It copies, byte for byte, the files Antigravity reads, and writes the commit into README.md.
// Nothing is written unless every file was read. Needs Node 20 or later and git.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "https://github.com/cosendhq/cosend-plugin.git";
const FILES = [".antigravity-plugin/plugin.json", "mcp_config.json", "assets/logo.svg", "LICENSE"];
const TREES = ["skills"];

const sha = process.argv[2] ?? "";
if (!/^[0-9a-f]{40}$/.test(sha)) {
  console.error("Usage: node scripts/generate.mjs <40-character commit sha of cosendhq/cosend-plugin>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "cosend-plugin-"));
const git = (...args) => execFileSync("git", ["-C", tmp, ...args], { maxBuffer: 16 * 1024 * 1024 });

const copies = new Map();
try {
  git("init", "--quiet");
  git("fetch", "--quiet", "--depth", "1", SOURCE, sha);
  const inTrees = git("ls-tree", "-r", "--name-only", sha, "--", ...TREES).toString().split("\n").filter(Boolean);
  // The committed blobs, so every byte and line ending is exactly the source's.
  for (const file of [...FILES, ...inTrees]) copies.set(file, git("cat-file", "blob", `${sha}:${file}`));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

for (const tree of TREES) rmSync(join(root, tree), { recursive: true, force: true });
for (const [file, bytes] of copies) {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), bytes);
  console.log(`copied ${file}`);
}
const readme = join(root, "README.md");
writeFileSync(readme, readFileSync(readme, "utf8").replace(/\b[0-9a-f]{40}\b/g, sha));
console.log(`Generated from cosendhq/cosend-plugin at ${sha}.`);
