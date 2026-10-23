# Change record

## About reference layout

- Rebuilt only the About section with reference proportions, section marker, compact typography, diagonal right-side supplied artwork, and the reference statistics row.
- Captured the rendered desktop section in artifacts/about-visual-check.png. The supplied artwork and available icon shapes differ from the reference.

## PMC-MMPRC header logo

- Updated the header to use the supplied PMC-MMPRC logo, with proportional sizing on desktop and mobile.

## Light editorial redesign

- Replaced dark surfaces with warm white, pale stone, sage, and ink typography throughout the site.
- Removed all visible hero text and buttons. The pinned opening now crossfades original mining photographs into the scrubbed company film, with eased zoom and a thin progress indicator.
- Added reduced-motion-aware image parallax to the headframe, vision, and mission photographs.
- Reworked section proportions, oversized statistics, offset vision/mission layouts, two-column community stories, lighter video presentation, and the footer.
- Retained original company imagery; no synthetic mining photos were introduced. The source film remains limited to its original resolution.

## 2026-10-23

- Initialized the empty local workspace as a React/Vite/TypeScript project and Git repository.
- Added the charcoal, orange, forest green, and warm off-white theme with local Sora and Inter fonts.
- Added responsive navigation, utility links, a mobile Sheet, and searchable page navigation.
- Added the pinned, scroll-controlled hero, compressed MP4/WebM formats, first-frame poster, and mobile/reduced-motion fallback.
- Added certification and social links, company introduction, count-up statistics, alternating vision/mission imagery, and pinned TIGER values.
- Added the SDMP story carousel, original recovered story images, report banner, featured community program grid, and archive link.
- Added featured and secondary videos in accessible dialogs, remote playback fallback, and contact/footer navigation.
- Moved text into typed content files, formatted source with Prettier, and split motion/UI dependencies into separate build chunks.
- Fixed asynchronous ScrollTrigger refresh order, tablet statistic overflow, light-section label contrast, and closing search after local navigation.
- Validated the build and inspected the four requested responsive widths. Outstanding artwork and verification limits are recorded in README.md.
- Moved the Home anchor outside the pinned hero and bounded headline sizing by viewport height to keep navigation and hero content clear on wide, short screens.
