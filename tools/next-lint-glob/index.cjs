/* eslint @typescript-eslint/no-require-imports: "off" -- Next's CommonJS lint plugin requires a CommonJS adapter. */
const { isAbsolute, resolve, relative } = require("node:path");
const { statSync } = require("node:fs");
const { globSync: scan } = require("tinyglobby");

// Scoped to @next/eslint-plugin-next's getRootDirs helper, which uses globSync
// with onlyDirectories. Preserve literal directories, absolute input paths and
// directory result formatting rather than tinyglobby's recursive defaults.
exports.globSync = function globSync(patterns, options = {}) {
  const inputs = Array.isArray(patterns) ? patterns : [patterns];
  const absolute = options.absolute ?? inputs.some(pattern => isAbsolute(pattern.replace(/^!/, "")));
  const literals = [];
  const dynamic = [];
  for (const pattern of inputs) {
    if (pattern.startsWith("!") || ["*", "?", "[", "{", "("].some(token => pattern.includes(token))) {
      dynamic.push(pattern);
      continue;
    }
    const path = resolve(options.cwd ?? process.cwd(), pattern);
    try {
      const stats = statSync(path);
      if (options.onlyDirectories && !stats.isDirectory()) continue;
      if (options.onlyFiles && !stats.isFile()) continue;
      literals.push(absolute ? path : relative(options.cwd ?? process.cwd(), path) || ".");
    } catch (error) {
      if (error.code !== "ENOENT" && !options.suppressErrors) throw error;
    }
  }
  const matches = dynamic.some(pattern => !pattern.startsWith("!")) ? scan(dynamic, {
    ...options,
    expandDirectories: false,
    absolute,
  }) : [];
  return [...new Set([...literals, ...matches].map(path => path.length > 1 ? path.replace(/\/$/, "") : path))];
};
