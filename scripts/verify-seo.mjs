import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile("dist/index.html", "utf8");
const graph = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "null",
);
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];

test("initial HTML contains the actual homepage, headings, contact details, and links", () => {
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<html lang="en-PH">/);
  assert.match(html, /<main id="main">/);
  assert.match(html, /Social Development &amp; Management Program/);
  assert.match(html, /mailto:info@philsaga\.com/);
  assert.match(html, /tel:\+63822350045/);
  assert.ok(html.length > 20000);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");

  for (const link of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing anchor target ${link[1]}`);
  }

  for (const anchor of html.matchAll(/<a(?:\s[^>]*)?>/g)) {
    assert.match(anchor[0], /\shref="[^"]+"/, "Every link needs a real destination");
  }

  for (const image of html.matchAll(/<img(?:\s[^>]*)?>/g)) {
    assert.match(image[0], /\salt="[^"]*"/, "Every image needs an alt attribute");
  }
});

test("canonical, share metadata, and crawl files describe the same homepage", async () => {
  assert.ok(canonical);
  assert.equal(new URL(canonical).protocol, "https:");
  assert.match(html, /name="description"\s+content="[^"]+"/);
  assert.ok(html.includes(`property="og:url" content="${canonical}"`));
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="robots" content="(?:index|noindex), follow/);

  for (const uniqueTag of [
    "<title>",
    'rel="canonical"',
    'name="description"',
    'name="robots"',
    'property="og:title"',
    'property="og:url"',
    'name="twitter:card"',
    'type="application/ld+json"',
  ]) {
    assert.equal(html.split(uniqueTag).length - 1, 1, `Duplicate or missing ${uniqueTag}`);
  }

  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
});

test("JSON-LD graph has unique entity IDs and no broken internal references", () => {
  assert.equal(graph["@context"], "https://schema.org");
  const definitions = new Map();
  const references = [];

  function walk(value) {
    if (!value || typeof value !== "object") {
      return;
    }

    if (value["@id"] && value["@type"]) {
      assert.ok(!definitions.has(value["@id"]), `Duplicate entity ${value["@id"]}`);
      definitions.set(value["@id"], value);
    } else if (value["@id"]) {
      references.push(value["@id"]);
    }

    Object.values(value).forEach(walk);
  }

  walk(graph);

  for (const reference of references) {
    assert.ok(definitions.has(reference), `Missing entity ${reference}`);
  }

  const types = graph["@graph"].map((entity) => entity["@type"]);
  assert.ok(types.includes("Organization"));
  assert.ok(types.includes("WebSite"));
  assert.ok(types.includes("WebPage"));
  assert.equal(types.filter((type) => type === "ImageObject").length, 2);
  assert.equal(definitions.get(`${canonical}#organization`).url, canonical);
});

test("schema images and section IDs exist in the built page", async () => {
  for (const entity of graph["@graph"]) {
    if (entity["@type"] === "ImageObject") {
      const file = new URL(entity.url).pathname.replace(new URL(canonical).pathname, "");
      const bytes = await readFile(`dist/${file}`);
      assert.equal(entity.width, bytes.readUInt32BE(16));
      assert.equal(entity.height, bytes.readUInt32BE(20));
    }

    for (const section of entity.hasPart || []) {
      assert.ok(html.includes(`id="${new URL(section.url).hash.slice(1)}"`));
    }
  }
});

test("AI-readable files are discoverable and contain company facts", async () => {
  const summary = await readFile("dist/index.md", "utf8");
  const llms = await readFile("dist/llms.txt", "utf8");
  assert.ok(summary.includes(`Canonical website: ${canonical}`));
  assert.match(summary, /Rosario, Agusan del Sur/);
  assert.match(summary, /## Contact/);
  assert.ok(llms.includes(`${canonical}index.md`));
  assert.match(html, /rel="alternate" type="text\/markdown"/);
  assert.match(html, /rel="describedby"/);
});
