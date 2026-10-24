import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer, loadEnv, resolveConfig } from "vite";

const environment = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const canonical = new URL(environment.SEO_SITE_URL || "https://www.philsaga.com/");

if (canonical.protocol !== "https:" || canonical.search || canonical.hash) {
  throw new Error("SEO_SITE_URL must be an HTTPS URL without a query or fragment.");
}

canonical.pathname = `${canonical.pathname.replace(/\/+$/, "")}/`;
const siteUrl = canonical.href;
const indexable = environment.SEO_INDEXABLE !== "false";
const config = await resolveConfig({}, "build");
const output = path.resolve(config.root, config.build.outDir);
const htmlPath = path.join(output, "index.html");
const escapeAttribute = (value) => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
};
const absoluteUrl = (relative) => {
  return new URL(relative, siteUrl).href;
};

async function pngImage(file, id, caption) {
  const bytes = await readFile(path.join(output, file));

  return {
    "@type": "ImageObject",
    "@id": absoluteUrl(id),
    url: absoluteUrl(file),
    contentUrl: absoluteUrl(file),
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    caption,
    encodingFormat: "image/png",
  };
}

// Render the same React tree used by the browser; no separate crawler-only copy.
const server = await createServer({
  base: config.base,
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  ssr: { noExternal: ["gsap", "lenis"] },
});

try {
  const { render, site, stories } = await server.ssrLoadModule("/src/entry-server.tsx");
  const body = render();
  const logo = await pngImage("assets/pmc-logo.png", "#logo", site.name);
  const image = await pngImage(
    "assets/about-fullwidth.png",
    "#primary-image",
    "Mining worker overlooking a processing plant and forested mountains",
  );
  const html = await readFile(htmlPath, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description"\s+content="([^"]+)"/)?.[1];

  if (!title || !description || !html.includes("<!-- seo-head -->")) {
    throw new Error("The HTML title, description, or SEO insertion marker is missing.");
  }

  const organizationId = absoluteUrl("#organization");
  const websiteId = absoluteUrl("#website");
  const webpageId = absoluteUrl("#webpage");
  const sections = [
    { id: "about", name: "About Philsaga Mining Corporation" },
    { id: "mission", name: "Purpose in every operation" },
    { id: "values", name: "The way of the Tiger" },
    { id: "sustainability", name: "Social Development & Management Program" },
    { id: "community", name: "Stronger communities. Shared futures." },
    { id: "videos", name: "A closer look at Philsaga" },
    { id: "contact", name: "Contact Philsaga Mining Corporation" },
  ];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: "PMC",
        url: siteUrl,
        description,
        logo: { "@id": logo["@id"] },
        image: { "@id": image["@id"] },
        telephone: site.phoneHref.replace("tel:", ""),
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rosario",
          addressRegion: "Agusan del Sur",
          addressCountry: "PH",
        },
        sameAs: [site.facebook],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        inLanguage: "en-PH",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteUrl,
        name: title,
        description,
        inLanguage: "en-PH",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
        primaryImageOfPage: { "@id": image["@id"] },
        publisher: { "@id": organizationId },
        hasPart: sections.map((section) => ({
          "@type": "WebPageElement",
          "@id": absoluteUrl(`#${section.id}`),
          name: section.name,
          url: absoluteUrl(`#${section.id}`),
          isPartOf: { "@id": webpageId },
        })),
      },
      logo,
      image,
    ],
  };
  const robots = indexable
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";
  const tags = [
    `<link rel="canonical" href="${escapeAttribute(siteUrl)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_PH" />`,
    `<meta property="og:site_name" content="${escapeAttribute(site.name)}" />`,
    `<meta property="og:title" content="${escapeAttribute(title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(siteUrl)}" />`,
    `<meta property="og:image" content="${escapeAttribute(image.url)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${image.width}" />`,
    `<meta property="og:image:height" content="${image.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttribute(image.caption)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(image.url)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttribute(image.caption)}" />`,
    `<link rel="alternate" type="text/markdown" href="${absoluteUrl("index.md")}" />`,
    `<link rel="describedby" href="${absoluteUrl("llms.txt")}" />`,
    `<script type="application/ld+json">${JSON.stringify(graph).replaceAll("<", "\\u003c")}</script>`,
  ];

  if (!html.includes('<div id="root"></div>')) {
    throw new Error("Expected an empty React root before prerendering.");
  }

  await writeFile(
    htmlPath,
    html
      .replace("<!-- seo-head -->", tags.join("\n    "))
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`),
  );
  await writeFile(
    path.join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeAttribute(siteUrl)}</loc></url>\n</urlset>\n`,
  );
  await writeFile(
    path.join(output, "robots.txt"),
    `User-agent: *\nAllow: ${canonical.pathname}\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`,
  );
  const summary = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. Based in ${site.location}, Philippines.`,
    "",
    `Canonical website: ${siteUrl}`,
    "",
    "## Company",
    "",
    site.intro,
    "",
    "## Vision",
    "",
    site.vision,
    "",
    "## Mission",
    "",
    site.mission,
    "",
    "## Values",
    "",
    site.valuesClosing,
    "",
    "## Community development",
    "",
    site.sdmp,
    "",
    ...stories.map((story) => `- [${story.title}](${story.href})`),
    "",
    "## Contact",
    "",
    `Location: ${site.location}, Philippines.`,
    `Telephone: ${site.phone}. Email: ${site.email}.`,
    "",
    "## Website sections",
    "",
    ...sections.map((section) => `- [${section.name}](${absoluteUrl(`#${section.id}`)})`),
    "",
  ].join("\n");
  await writeFile(path.join(output, "index.md"), summary);
  await writeFile(
    path.join(output, "llms.txt"),
    `# ${site.name}\n\n> ${site.tagline}. Located in ${site.location}, Philippines.\n\n## Website\n\n- [Homepage](${siteUrl}): Company overview, values, community programs, and contact information.\n- [Company information in Markdown](${absoluteUrl("index.md")}): Text version for readers and AI tools.\n- [Sitemap](${absoluteUrl("sitemap.xml")}): Canonical page URL.\n\n## Contact\n\n${site.location}, Philippines. Telephone: ${site.phone}. Email: ${site.email}.\n`,
  );
  console.log(`Prerendered homepage, metadata, JSON-LD, sitemap, robots.txt, and AI-readable text for ${siteUrl}`);
} finally {
  await server.close();
}
