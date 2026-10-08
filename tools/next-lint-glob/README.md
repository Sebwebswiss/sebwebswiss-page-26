# Next lint directory adapter

This private CommonJS package adapts `tinyglobby` to the `globSync(pattern,
{ onlyDirectories: true })` calls in Next 16.3.8's `getRootDirs` lint helper.
It preserves literal directories, absolute input paths, brace patterns and
directory result formatting. It replaces the vulnerable `fast-glob` →
`micromatch` → `braces` development dependency chain.

The root development dependency uses a local file reference. The scoped npm
override references that dependency with `$fast-glob`, ensuring portable paths
and the same adapter instance for the Next plugin.

Run `npm test`, `npm run lint` and `npm audit` after upgrading the Next lint
plugin. Tests verify directory resolution and an actual Next rule violation.
