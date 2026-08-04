// One-off video re-encode used to shrink the EventsGrid hover clips from
// 17-38MB (up to 14 Mbps, 60fps, full source resolution, plus an audio
// track the always-`muted` <video> never uses) down to ~1-5MB each.
//
// `ffmpeg-static` isn't a project dependency (no system ffmpeg was
// available, and there's no reason to make every `npm install` pull down a
// video encoder binary for something that only needs to run occasionally)
// — install it ad hoc before rerunning: `npm install --no-save ffmpeg-static`.
//
// SRC_DIR's originals aren't in the repo — they were moved out after this
// ran once (unoptimized 17-38MB source files have no reason to ship or sit
// in git history). To re-run against different sources, point SRC_DIR at
// wherever the raw clips live.
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import ffmpegPath from "ffmpeg-static";

const files = [
  "prompt-with-jarvis.mp4",
  "shield's-archieve.mp4",
  "where-is-gamora.mp4",
  "Debuggers-Assemble.mp4",
  "Stark-tank.mp4",
  "i-can-meme-this-all-day.mp4",
  "x-charades.mp4",
  "sacred-connections.mp4",
];

const SRC_DIR = "public/assets/original-videos";
const OUT_DIR = "public/assets";

// Muted decorative hover-loop clips shot/exported far heavier than they
// need to be for a grid tile (up to 14 Mbps, 60fps, portrait 1920px) — no
// audio track is ever used since the <video> is always `muted`, and no
// tile renders anywhere near full source resolution.
//
// Whichever dimension is larger gets capped at 960 (truncated to an even
// number — libx264 rejects odd width/height outright, which is exactly
// what a plain `min(960,ih)` produced for a 2532x1080 source: 409, odd,
// hard failure). The other dimension is `-2`, which ffmpeg always resolves
// to the nearest even value itself while preserving aspect ratio.
const SCALE_FPS =
  "scale='if(gt(iw,ih),trunc(min(960,iw)/2)*2,-2)':'if(gt(iw,ih),-2,trunc(min(960,ih)/2)*2)',fps=30";

function fmtMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
}

for (const file of files) {
  const src = `${SRC_DIR}/${file}`;
  const mp4Out = `${OUT_DIR}/${file}`;
  const webmOut = `${OUT_DIR}/${file.replace(/\.mp4$/, ".webm")}`;
  const origSize = statSync(src).size;

  console.log(`\n=== ${file} (${fmtMB(origSize)}) ===`);

  execFileSync(ffmpegPath, [
    "-y", "-i", src,
    "-an", "-vf", SCALE_FPS,
    "-c:v", "libx264", "-preset", "medium", "-crf", "28",
    "-maxrate", "1500k", "-bufsize", "3000k",
    "-movflags", "+faststart",
    mp4Out,
  ], { stdio: "ignore" });
  console.log(`  mp4:  ${fmtMB(statSync(mp4Out).size)}`);

  execFileSync(ffmpegPath, [
    "-y", "-i", src,
    "-an", "-vf", SCALE_FPS,
    "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0",
    "-deadline", "good", "-cpu-used", "2",
    webmOut,
  ], { stdio: "ignore" });
  console.log(`  webm: ${fmtMB(statSync(webmOut).size)}`);
}

console.log("\ndone");
