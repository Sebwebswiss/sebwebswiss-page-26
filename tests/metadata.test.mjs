import assert from "node:assert/strict";
import test from "node:test";
import { articles } from "../src/content/articles.ts";
import { getArticleMetadata } from "../src/content/articleMetadata.ts";

test("article search snippets are unique and fit the published title template", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const article of articles) {
    const snippet = getArticleMetadata(article);
    const title = `${snippet.title} | SebWebSwiss`;
    assert.ok(title.length <= 60, `${article.slug}: title has ${title.length} characters`);
    assert.ok(snippet.description.length >= 70 && snippet.description.length <= 160, `${article.slug}: description length`);
    assert.ok(!titles.has(title), `${article.slug}: duplicate title`);
    assert.ok(!descriptions.has(snippet.description), `${article.slug}: duplicate description`);
    titles.add(title);
    descriptions.add(snippet.description);
  }
});
