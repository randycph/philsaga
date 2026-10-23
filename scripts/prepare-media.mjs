import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { statSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const source = process.argv[2];

if (!source) {
  throw new Error("Pass the path to the original intro3.mp4.");
}

const output = resolve("public/assets");
const common = [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-i",
  resolve(source),
];

execFileSync(ffmpeg, [
  ...common,
  "-frames:v",
  "1",
  "-q:v",
  "2",
  `${output}/hero-poster.jpg`,
]);

execFileSync(ffmpeg, [
  ...common,
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "fast",
  "-crf",
  "23",
  "-g",
  "1",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  `${output}/intro3.mp4`,
]);

execFileSync(ffmpeg, [
  ...common,
  "-an",
  "-c:v",
  "libvpx-vp9",
  "-b:v",
  "130k",
  "-g",
  "1",
  "-deadline",
  "realtime",
  "-cpu-used",
  "6",
  `${output}/intro3.webm`,
]);

for (const name of ["intro3.mp4", "intro3.webm"]) {
  const size = statSync(`${output}/${name}`).size;

  if (size >= 8_000_000) {
    throw new Error(`${name} exceeds the 8 MB media budget.`);
  }

  console.log(`${name}: ${(size / 1_000_000).toFixed(2)} MB`);
}
