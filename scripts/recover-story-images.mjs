import { readFile, writeFile } from "node:fs/promises";

const html = await readFile("site-source.html", "utf8");
const filenames = [
  "Screenshot 2026-09-02 154700.png",
  "753361686_941706272267492_355489245643832344_n.jpg",
  "747795780_941678875603565_174123818188970041_n.jpg",
];

for (const [index, filename] of filenames.entries()) {
  const url = new URL(
    `storage/news_image/news_thumbnail/${filename}`,
    "https://www.philsaga.com/",
  );

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });

    if (
      !response.ok ||
      !response.headers.get("content-type")?.startsWith("image/")
    ) {
      console.log(`Story ${index + 1}: unavailable; fallback retained.`);
      continue;
    }

    await writeFile(
      `public/assets/story-${index + 1}.jpg`,
      Buffer.from(await response.arrayBuffer()),
    );
    console.log(`Story ${index + 1}: recovered from PMC.`);
  } catch {
    console.log(`Story ${index + 1}: download failed; fallback retained.`);
  }
}

const programLinks = [
  ...html.matchAll(/href="([^"]+)"[^>]*><img[^>]+alt="([^"]+)"/g),
];

for (const [, url, title] of programLinks) {
  if (/Medical Equipment|Coconut|Motor Parts|Libertad/i.test(title)) {
    console.log(`${title}: ${url}`);
  }
}
