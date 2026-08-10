#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

/**
 * @zoom/videosdk CLI.
 *
 * Currently supports a single command, `install-skill`, which ejects the bundled
 * agent skill (shipped at `<package>/skill/`) into the consuming project's agent
 * skill directory so Cursor, Claude Code, or Codex can discover and use it.
 *
 * Skill discovery directories per tool:
 *   - cursor : .cursor/skills/   (user-level: ~/.cursor/skills/)
 *   - claude : .claude/skills/   (user-level: ~/.claude/skills/)
 *   - codex  : .agents/skills/   (user-level: ~/.agents/skills/)
 *
 * Usage:
 *   npx @zoom/videosdk install-skill [--target cursor|claude|codex|all] [--global]
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_FOLDER_NAME = "video-sdk-web";
const SOURCE_SKILL_DIR = path.resolve(__dirname, "..", "skill");

// tool -> { marker (used for auto-detection), skillsSubpath }
const TOOLS = {
  cursor: { marker: ".cursor", skillsSubpath: [".cursor", "skills"] },
  claude: { marker: ".claude", skillsSubpath: [".claude", "skills"] },
  codex: { marker: ".agents", skillsSubpath: [".agents", "skills"] },
};

function parseArgs(argv) {
  const args = { command: null, target: null, global: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "install-skill" || arg === "install") {
      args.command = "install-skill";
    } else if (arg === "--target" || arg === "-t") {
      args.target = argv[++i];
    } else if (arg.startsWith("--target=")) {
      args.target = arg.slice("--target=".length);
    } else if (arg === "--global" || arg === "-g") {
      args.global = true;
    } else if (arg === "--help" || arg === "-h") {
      args.command = "help";
    }
  }
  if (!args.command) args.command = "help";
  return args;
}

function printUsage() {
  console.log(
    [
      "@zoom/videosdk — agent skill installer",
      "",
      "Usage:",
      "  npx @zoom/videosdk install-skill [--target cursor|claude|codex|all] [--global]",
      "",
      "Copies the bundled Video SDK agent skill into your project so Cursor,",
      "Claude Code, or Codex can use it.",
      "",
      "Options:",
      "  -t, --target   Which tool(s): cursor | claude | codex | all",
      "                 (comma-separated allowed, e.g. cursor,codex)",
      "                 Default: auto-detect existing .cursor/.claude/.agents,",
      "                 falling back to cursor.",
      "  -g, --global   Install into your home directory instead of the project",
      "  -h, --help     Show this help",
    ].join("\n")
  );
}

function detectTools(base) {
  const detected = Object.keys(TOOLS).filter((tool) =>
    fs.existsSync(path.join(base, TOOLS[tool].marker))
  );
  return detected.length > 0 ? detected : ["cursor"];
}

function resolveTargetTools(target, base) {
  if (!target) return detectTools(base);

  const requested = target
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (requested.includes("all")) return Object.keys(TOOLS);

  const unknown = requested.filter((t) => !TOOLS[t]);
  if (unknown.length > 0) {
    console.error(
      `Unknown --target "${unknown.join(", ")}". ` +
        "Use cursor, claude, codex, or all."
    );
    process.exit(1);
  }
  return requested;
}

function installSkill(target, global) {
  if (!fs.existsSync(SOURCE_SKILL_DIR)) {
    console.error(
      `Could not find the bundled skill at ${SOURCE_SKILL_DIR}.\n` +
        "Make sure @zoom/videosdk is installed correctly."
    );
    process.exit(1);
  }

  if (typeof fs.cpSync !== "function") {
    console.error(
      "This command requires Node.js 16.7 or newer (fs.cpSync). " +
        `Detected ${process.version}.`
    );
    process.exit(1);
  }

  const base = global ? os.homedir() : process.cwd();
  const tools = resolveTargetTools(target, base);

  for (const tool of tools) {
    const skillsDir = path.join(base, ...TOOLS[tool].skillsSubpath);
    const dest = path.join(skillsDir, SKILL_FOLDER_NAME);
    fs.mkdirSync(skillsDir, { recursive: true });
    fs.rmSync(dest, { recursive: true, force: true });
    // The published `skill/` bundle already excludes MAINTENANCE.md (stripped at
    // build time in build-scripts/plugins/pack.js), so a straight copy is enough.
    fs.cpSync(SOURCE_SKILL_DIR, dest, { recursive: true });
    console.log(`Installed Video SDK skill (${tool}) → ${dest}`);
  }
  console.log("Done. Restart Cursor / Claude Code / Codex if it is already open.");
}

const args = parseArgs(process.argv.slice(2));
if (args.command === "install-skill") {
  installSkill(args.target, args.global);
} else {
  printUsage();
}
