import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { ESLint } from "eslint";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const pluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
const { globSync } = pluginRequire("fast-glob");

test("scoped glob replacement supports Next lint root directories and brace patterns", () => {
  assert.deepEqual(globSync(root.replace(/\/$/, ""), { onlyDirectories: true }), [root.replace(/\/$/, "")]);
  assert.deepEqual(globSync(`${root}src/{app,components}`, { onlyDirectories: true }).sort(), [resolve(root, "src/app"), resolve(root, "src/components")].sort());
  assert.deepEqual(globSync([`${root}src/*`, `!${root}src/content`, `!${root}src/lib`], { onlyDirectories: true }).sort(), [resolve(root, "src/app"), resolve(root, "src/components")].sort());
});

test("Next rules remain enabled with the scoped glob replacement", async () => {
  const eslint = new ESLint({
    cwd: root,
    overrideConfig: { settings: { next: { rootDir: root.replace(/\/$/, "") } } },
  });
  const [result] = await eslint.lintText("export default function Example() { return <script src=\"/blocking.js\" />; }", {
    filePath: resolve(root, "src/components/LintRegression.tsx"),
  });
  assert.ok(result.messages.some(message => message.ruleId === "@next/next/no-sync-scripts"));
});
