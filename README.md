# Philsaga Mining Corporation

Current design: warm light editorial surfaces with an unobstructed photographic/video hero. The hero pins for 180 viewport heights at 768px and above, crossfading underground and headframe imagery into the company video. Desktop company photographs also use restrained parallax. Mobile and reduced-motion users see a static mining photograph. Earlier dark-theme implementation details below are retained as project history where superseded by this update.

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

## Content and components

- `src/data/site.ts`: company copy, navigation, values, stories, programs, and videos.
- `src/data/ui.ts`: UI text, image descriptions, and supporting links.
- `src/components`: the eleven requested homepage components, plus shared helpers and UI primitives.
- `src/hooks`: `useLenis`, `useReducedMotion`, and `useCountUp`.
- `public/assets`: original supplied imagery, recovered SDMP imagery, and optimized hero media.

The desktop hero pins for 250 viewport heights and scrubs the introduction video. The tiger section pins for 200 viewport heights and advances through the five values. The upstream hero has a higher ScrollTrigger refresh priority so asynchronous metadata loading cannot misplace the tiger pin. Each component removes its triggers on cleanup. Other sections use one-time 600 ms fade-up reveals.

At widths below 1024px, the hero uses its poster and neither section pins. Reduced motion disables Lenis, count-up animation, pinning, scrubbing, and translated reveals; all five values remain visible as a list.

## Media

Rebuild hero derivatives from the original video outside `public/assets`:

```powershell
node scripts/prepare-media.mjs 'C:\Users\rncorpuz\Downloads\pmc\intro3.mp4'
```

The script generates a first-frame JPEG poster, a silent H.264 MP4 with fast-start metadata, and a silent VP9 WebM. Short keyframe intervals support seeking. The script enforces a 5 MB ceiling per video. Current outputs: MP4 1,507,882 bytes; WebM 1,970,268 bytes; poster 31,468 bytes.

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
