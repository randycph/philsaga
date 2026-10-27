import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile("dist/index.html", "utf8");
const graph = JSON.parse(
  html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1] || "null",
);
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];

test("About Us is prerendered with its own metadata and working navigation", async () => {
  const about = await readFile("dist/about.html", "utf8");
  const aboutUrl = new URL("about.html", canonical).href;
  assert.equal((about.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(about, /Building<br\s*\/?\s*>Better Futures/);
  assert.match(about, /A Stronger/);
  assert.match(about, /Our Mission/);
  assert.match(about, /Our Vision/);
  assert.match(about, /Tenement Background History/);
  assert.match(about, /Our Story, Standards/);
  assert.ok(about.includes(`rel="canonical" href="${aboutUrl}"`));
  assert.ok(about.includes(`property="og:url" content="${aboutUrl}"`));
  assert.match(about, /"@type":"AboutPage"/);
  assert.match(about, /aria-current="page"/);
  const ids = [...about.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const link of about.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing About Us anchor ${link[1]}`);
  }
});

test("Careers is prerendered with search controls, supplied assets, and its own canonical", async () => {
  const careers = await readFile("dist/careers.html", "utf8");
  const careersUrl = new URL("careers.html", canonical).href;
  assert.equal((careers.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(careers, /Build a Meaningful/);
  assert.match(careers, /id="open-positions"/);
  assert.match(careers, /Cadet Mechanical Engineer/);
  assert.match(careers, /View Details/);
  assert.match(careers, /careers-team\.png/);
  assert.match(careers, /careers-future\.png/);
  assert.match(careers, /logo-long\.png/);
  assert.ok(careers.includes(`rel="canonical" href="${careersUrl}"`));
  assert.ok(careers.includes(`property="og:url" content="${careersUrl}"`));
  assert.match(careers, /"@type":"CollectionPage"/);
  assert.ok(!careers.includes('"@type":"JobPosting"'));
  const ids = [...careers.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const link of careers.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing Careers anchor ${link[1]}`);
  }
});

test("Articles is prerendered with dated stories, category controls, and its own canonical", async () => {
  const articles = await readFile("dist/articles.html", "utf8");
  const articlesUrl = new URL("articles.html", canonical).href;
  assert.equal((articles.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(articles, /Stories that/);
  assert.match(articles, /Search articles/);
  assert.match(articles, /Filter articles by category/);
  assert.match(articles, /Manobo Heritage Preservation/);
  assert.match(articles, /article-manobo\.jpg/);
  assert.match(articles, /logo-long\.png/);
  assert.equal((articles.match(/<article class="news-card/g) || []).length, 11);
  assert.match(articles, /article-community-in-focus\.html/);
  assert.match(articles, /article-solidarity-movement\.html/);
  assert.match(articles, /article-community-photo-journal\.html/);
  assert.match(articles, /Read story/);
  assert.match(articles, /Watch film/);
  assert.equal(
    (articles.match(/<time dateTime="\d{4}-\d{2}-\d{2}"/g) || []).length,
    12,
  );
  assert.ok(articles.includes(`rel="canonical" href="${articlesUrl}"`));
  assert.ok(articles.includes(`property="og:url" content="${articlesUrl}"`));
  assert.match(articles, /"@type":"CollectionPage"/);
  const ids = [...articles.matchAll(/\sid="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal(new Set(ids).size, ids.length);
  for (const link of articles.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing Articles anchor ${link[1]}`);
  }
});

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
    assert.match(
      anchor[0],
      /\shref="[^"]+"/,
      "Every link needs a real destination",
    );
  }

  for (const image of html.matchAll(/<img(?:\s[^>]*)?>/g)) {
    assert.match(
      image[0],
      /\salt="[^"]*"/,
      "Every image needs an alt attribute",
    );
  }
});

test("Article detail has crawlable story content, section links, and NewsArticle metadata", async () => {
  const article = await readFile("dist/article-bislig-relief.html", "utf8");
  const listing = await readFile("dist/articles.html", "utf8");
  const articleUrl = new URL("article-bislig-relief.html", canonical).href;
  const schema = JSON.parse(
    article.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )[1],
  );
  const ids = [...article.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);

  assert.equal((article.match(/<h1[\s>]/g) || []).length, 1);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(article, /Supporting Families After the Fire/);
  assert.match(article, /480/);
  assert.match(article, /Editorial illustration/);
  assert.match(article, /article-bislig-relief\.png/);
  assert.match(article, /Copy article link/);
  assert.match(listing, /href="[^"]*article-bislig-relief\.html"/);
  assert.ok(article.includes(`rel="canonical" href="${articleUrl}"`));
  assert.match(article, /property="og:type" content="article"/);
  assert.equal(schema["@type"], "NewsArticle");
  assert.equal(schema.datePublished, "2026-08-18");
  assert.equal(schema.author.name, "PMC-MMPRC Foundation, Inc.");

  for (const link of article.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing article anchor ${link[1]}`);
  }
});

test("Gallery and video articles have dedicated crawlable pages and inline media", async () => {
  const gallery = await readFile(
    "dist/article-community-in-focus.html",
    "utf8",
  );
  const video = await readFile("dist/article-solidarity-movement.html", "utf8");
  const imageGallery = await readFile(
    "dist/article-community-photo-journal.html",
    "utf8",
  );
  const sitemap = await readFile("dist/sitemap.xml", "utf8");

  assert.match(gallery, /People, partnerships and progress/);
  assert.equal(
    (gallery.match(/aria-label="Open photograph /g) || []).length,
    4,
  );
  assert.match(gallery, /Open gallery/);
  assert.match(video, /<video[^>]*controls=""/);
  assert.match(video, /SOLIDARITY_MOVEMENT\.mp4/);
  assert.doesNotMatch(gallery, /role="dialog"/);
  assert.doesNotMatch(video, /role="dialog"/);
  assert.match(imageGallery, /media-story__photo-grid--images-only/);
  assert.equal(
    (imageGallery.match(/aria-label="Open photograph /g) || []).length,
    4,
  );
  assert.doesNotMatch(imageGallery, /<figcaption/);
  assert.doesNotMatch(imageGallery, /class="media-story__body"/);
  assert.doesNotMatch(imageGallery, /class="media-story__deck"/);

  for (const [html, file] of [
    [gallery, "article-community-in-focus.html"],
    [video, "article-solidarity-movement.html"],
    [imageGallery, "article-community-photo-journal.html"],
  ]) {
    const url = new URL(file, canonical).href;
    const schema = JSON.parse(
      html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )[1],
    );
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.equal(schema["@type"], "NewsArticle");
    assert.equal(schema.mainEntityOfPage, url);
  }
});

test("Hospital contains the published rate browser and its own metadata", async () => {
  const hospital = await readFile("dist/hospital.html", "utf8");
  const groups = JSON.parse(
    await readFile("src/data/hospital-rates.json", "utf8"),
  );
  const procedures = groups.flatMap((group) => group.procedures);

  assert.equal(procedures.length, 66);
  assert.equal(
    groups
      .filter((group) => group.type === "xray")
      .flatMap((group) => group.procedures).length,
    34,
  );
  assert.equal(
    procedures.find((procedure) => procedure.name === "SKULL APL").price,
    500,
  );
  assert.equal(
    procedures.find((procedure) => procedure.name === "URINALYSIS").price,
    60,
  );
  assert.equal((hospital.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(hospital, /Care That/);
  assert.match(hospital, /Search procedures/);
  assert.match(hospital, /SKULL APL/);
  assert.match(hospital, /Bunawan/);
  assert.match(hospital, /logo-long\.png/);
  assert.ok(
    hospital.includes(
      `rel="canonical" href="${new URL("hospital.html", canonical).href}"`,
    ),
  );
});

test("Contact page is prerendered with validated email preparation and office destinations", async () => {
  const contact = await readFile("dist/contact.html", "utf8");
  const contactUrl = new URL("contact.html", canonical).href;
  const ids = [...contact.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);

  assert.equal((contact.match(/<h1[\s>]/g) || []).length, 1);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(contact, /Let’s start/);
  assert.match(contact, /aria-label="Contact inquiry"/);
  const emailInput = contact.match(/<input[^>]*id="contact-email"[^>]*>/)?.[0];
  const consentInput = contact.match(
    /<input[^>]*id="contact-consent"[^>]*>/,
  )?.[0];
  assert.match(emailInput, /type="email"/);
  assert.match(emailInput, /required/);
  assert.match(consentInput, /type="checkbox"/);
  assert.match(consentInput, /required/);
  assert.match(contact, /Continue to Email/);
  assert.match(contact, /send it from your email app/);
  assert.match(contact, /C.P. Garcia Highway, Sasa/);
  assert.match(contact, /Bayugan 3, Rosario/);
  assert.match(contact, /tel:\+63822350045/);
  assert.equal((contact.match(/Get directions to /g) || []).length, 2);
  assert.ok(contact.includes(`rel="canonical" href="${contactUrl}"`));
  assert.match(contact, /"@type":"ContactPage"/);

  for (const link of contact.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(link[1]), `Missing contact anchor ${link[1]}`);
  }
});

test("Visual sitemap has six directories and valid local page destinations", async () => {
  const directory = await readFile("dist/sitemap.html", "utf8");
  const basePath = new URL(canonical).pathname;
  const runtimeBase =
    directory.match(/<script[^>]+src="([^"]+)assets\//)?.[1] || basePath;
  const ids = [...directory.matchAll(/\sid="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal((directory.match(/class="sitemap-group"/g) || []).length, 6);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(directory, /Website Sitemap/);
  assert.match(directory, /Search the sitemap/);
  assert.match(directory, /department-11/);
  assert.ok(
    directory.includes(
      `rel="canonical" href="${new URL("sitemap.html", canonical).href}"`,
    ),
  );

  for (const match of directory.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");

    if (href.startsWith("#")) {
      assert.ok(ids.includes(href.slice(1)), `Missing sitemap anchor ${href}`);
    } else if (href.startsWith(runtimeBase) && !href.startsWith("//")) {
      const url = new URL(href, "http://localhost");
      const file = url.pathname.slice(runtimeBase.length) || "index.html";

      if (file.endsWith(".html")) {
        const target = await readFile(`dist/${file}`, "utf8");

        if (url.hash) {
          assert.ok(
            target.includes(`id="${url.hash.slice(1)}"`),
            `Missing target ${href}`,
          );
        }
      }
    }
  }
});

test("Annual Reports shows unavailable recent PDFs and serves genuine archive files", async () => {
  const reports = await readFile("dist/annual-reports.html", "utf8");
  assert.equal((reports.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(reports, /2025/);
  assert.match(reports, /PDF is currently unavailable/);
  assert.match(reports, /Search reports by year/);

  for (let year = 2009; year <= 2021; year += 1) {
    const pdf = await readFile(`dist/reports/sdmp-${year}.pdf`);
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    assert.ok(reports.includes(`reports/sdmp-${year}.pdf`));
  }

  for (let year = 2022; year <= 2025; year += 1) {
    assert.ok(!reports.includes(`reports/sdmp-${year}.pdf`));
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
    assert.equal(
      html.split(uniqueTag).length - 1,
      1,
      `Duplicate or missing ${uniqueTag}`,
    );
  }

  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  assert.equal((sitemap.match(/<loc>/g) || []).length, 12);
  assert.ok(
    sitemap.includes(`<loc>${new URL("about.html", canonical).href}</loc>`),
  );
  assert.ok(
    sitemap.includes(`<loc>${new URL("careers.html", canonical).href}</loc>`),
  );
  assert.ok(
    sitemap.includes(`<loc>${new URL("articles.html", canonical).href}</loc>`),
  );
  assert.ok(
    sitemap.includes(
      `<loc>${new URL("annual-reports.html", canonical).href}</loc>`,
    ),
  );
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
      assert.ok(
        !definitions.has(value["@id"]),
        `Duplicate entity ${value["@id"]}`,
      );
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
      const file = new URL(entity.url).pathname.replace(
        new URL(canonical).pathname,
        "",
      );
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
