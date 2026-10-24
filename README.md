# Philsaga Mining Corporation

Current design: warm light editorial surfaces with a video-only cinematic hero. The hero video stays sticky across a 300vh scroll track and scrubs from its first to last frame on desktop and mobile. The only hero overlay is a small Scroll hint that fades near the start of the sequence. Reduced-motion users see the poster without scrubbing.

A local React, Vite, and TypeScript homepage redesign based on the supplied PMC brief. Tailwind CSS v4 provides all styling; `src/index.css` contains only its import and shared theme tokens. UI primitives follow the shadcn approach using locally owned components and Radix accessibility behavior.

## Run

```powershell
npm install
npm run dev
```

Open the Local URL printed by Vite, normally `http://localhost:5173`.

```powershell
npm run build
npm run preview -- --port 5174
```

The build runs TypeScript checking before producing `dist/`. Deploy `dist/` to a static host. This task implements the local project and does not modify PMC's live website.

### cPanel deployment at `/philsaga/`

When the repository is cloned directly into the folder serving `/philsaga/`, keep the root `.htaccess` alongside `dist/`. It internally routes the homepage and asset requests into `dist/` while preserving the public `/philsaga/` URL. There is no need to copy the build output into the repository root.

Run `npm install` and `npm run build` in the server checkout, or deploy the complete locally generated `dist/` directory with the repository. Pulling source changes alone does not rebuild the site. Apache must allow `.htaccess` rewrite rules and have `mod_rewrite` enabled.

The production base in `vite.config.ts` is already `/philsaga/`. After deploying the root `.htaccess` and the build output, refresh the page with Ctrl + F5. The page should request `/philsaga/assets/` JavaScript rather than `/src/main.tsx`.

## Content and components

Section content, navigation, and the footer share `--page-gutter` in `src/index.css`: `clamp(20px, 3vw, 48px)`. Use `.page-container` for full-width content wrappers and the same variable for composed section margins so the page keeps consistent, compact side spacing.

- `src/data/site.ts`: company copy, navigation, values, stories, programs, and videos.
- `src/data/ui.ts`: UI text, image descriptions, and supporting links.
- `src/components`: the eleven requested homepage components, plus shared helpers and UI primitives.
- `src/hooks`: `useLenis`, `useReducedMotion`, and `useCountUp`.
- `public/assets`: original supplied imagery, recovered SDMP imagery, and optimized hero media.

The hero uses a sticky viewport inside a 300vh wrapper and creates its ScrollTrigger after video metadata loads. It does not add a second pin. The header enters with a staggered fade and the hero fades in on page load. `useEntranceAnimations` gives section copy, value cards, community priorities, certification, and footer content one-time 750 ms fade-up reveals with 90 ms staggering as they enter the viewport. Focusing a link completes its reveal immediately. Animations clean up on unmount and revert when reduced motion is enabled.

Reduced motion disables Lenis, count-up animation, pinning, scrubbing, and translated reveals; all five values remain visible as a list.

The About statistics count from zero to 2000+, 25+, and 50M+ MT over 1.4 seconds on their first entry into view. Numeric widths remain stable, suffixes stay visible, and screen readers receive the final values. Reduced motion shows the final values immediately.

The footer keeps its light background with copyright text, legal links, navigation, and a scroll-to-top control. The arrow uses Lenis for smooth scrolling and falls back to the native home anchor when reduced motion is enabled.

## Media

Rebuild hero derivatives from the original video outside `public/assets`:

```powershell
node scripts/prepare-media.mjs 'C:\Users\rncorpuz\Downloads\pmc\intro3.mp4'
```

The source has a Renderforest watermark in the bottom corners. Scale the video to about 112%, anchored at the top center, so the bottom edge falls outside the visible frame. The script extracts a poster from frame 0 and creates silent H.264 MP4 and VP9 WebM files with every frame encoded as a keyframe for scroll seeking. Equivalent FFmpeg commands are:

```powershell
ffmpeg -i intro3-source.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
ffmpeg -i intro3-source.mp4 -c:v libx264 -g 1 -crf 23 -pix_fmt yuv420p -an -movflags +faststart intro3.mp4
ffmpeg -i intro3-source.mp4 -c:v libvpx-vp9 -g 1 -b:v 130k -deadline realtime -cpu-used 6 -an intro3.webm
```

The script enforces an 8 MB ceiling per video. Current derivatives were rebuilt from the attached source for this update.

The original is only 640 × 360. Both optimized formats retain that resolution; a higher-resolution original would improve the full-screen presentation.

## Assumptions and replacements

- The supplied brief controls the founding year, anniversary copy, video duration badges, and 2023 copyright, even where current live content differs.
- `logo@2xb.png` was copied as `logo_2xb.png`. The navbar crops the same image to its two emblems and adds accessible company text; the footer displays the complete artwork.
- Replace `pic5.png` with a transparent, higher-resolution tiger cutout. The existing image is intentionally presented on a warm light card, with a TODO in the component.
- All four featured program photos remain unavailable. Their cards deliberately show a forest gradient and leaf icon instead of unrelated photography. Add matching `image` properties to `programs` when approved images are available.
- The three SDMP story images were downloaded from the original PMC homepage. Image components also provide a fallback on load failure.
- Reports, careers, articles, archived programs, policies, and supplier links lead to PMC's existing properties. Contact uses the supplied phone and public email. There is no contact-form backend.
- Video dialogs stream original PMC media. Their servers, codecs, and network availability remain external dependencies. A failed stream provides a readable fallback and original-page link. Video source URLs responded successfully during implementation; Solidarity playback was verified in Chrome.
- This is a local implementation. No hosted Site registration, public deployment, or remote Git push was performed.

## Verification

- Production build and TypeScript checking pass.
- Desktop and mobile visual inspection at 375, 768, 1280, and 1920 pixels.
- Confirmed no page-level horizontal overflow at 375, 768, and 1920 pixels after the tablet statistic fix.
- Verified mobile Sheet navigation, local search filtering and closing, carousel controls, video Dialog opening and Escape dismissal, and Solidarity video playback.
- Verified desktop tiger pinning and progress from Teamwork to Growth after correcting refresh order.
- Verified that the mobile hero does not render a video element.
- Reviewed reduced-motion branches in source; an operating-system reduced-motion browser session was not exercised.
- Lighthouse Performance 85+ and Accessibility 95+ are targets, not measured results. Run a Lighthouse audit against the production preview or deployed site before release.
