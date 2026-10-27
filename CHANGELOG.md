# Change record

## Public court decisions notice

- Replaced the scholarship copy in the homepage announcement with the supplied court decisions notice, preserving its wording, case names, dates, quotations, and numbered rulings.
- Added a scrollable reading area with case headings, quotation blocks, an emphasized effective date, and a persistent close control. Kept both announcement actions commented out.

## Article year filter

- Added a sidebar year filter using the years present in article dates, newest first, plus All Years and matching counts.
- Year, category, and keyword filters work together; Clear filters resets all three. Valid `year` query parameters select the matching year on page load.

## Homepage announcement

- Added the supplied scholarship announcement in a 620px ivory dialog with a dark, blurred backdrop, close control, and Dismiss button.
- The dialog opens on each homepage reload without storing dismissal state. Interior pages do not mount it.
- Kept the Read Announcement action commented out until a destination is supplied.

## Gallery and video articles

- Gallery and video cards now open dedicated article pages. Optional body sections support either text with media or media alone; gallery photographs open the lightbox at the selected image.
- Fixed gallery dialog height and constrained the caption panel so slide changes keep the modal, photo area, and navigation in place.
- Added a Community in Focus photo story using four photographs from The Vein, with individual captions and links to the original coverage.
- Added a Solidarity Movement film article using Philsaga's existing MP4, with native playback controls and a source link.
- Added accessible media dialogs in the site's ivory, forest green, and gold palette. Galleries include thumbnails, previous/next controls, arrow-key navigation, and an optional five-second slideshow that pauses for interaction.
- Added shareable article links through the `media` query parameter and updated the SEO checks for the expanded article collection.

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

## Purpose, Approach and Values reference sections

- Added supplied mine, planting, seedling, mountain and tiger artwork with diagonal CSS masks and reference copy.
- Replaced the pinned values presentation with the four-card reference layout.
- Production build passed; desktop Purpose, Approach and Values visually inspected and screenshots saved in artifacts/.

## Community and video reference layout

- Replaced community story cards with the four-priority strip from the supplied reference.
- Added a dark video gallery with thumbnail selection, next-video control, and existing playback dialogs and error fallback.
- Production build passed. Browser visual verification was unavailable because the previous tab had closed.

## Footer reference update

- Moved the former footer background to the video gallery and replaced the footer with a light two-row logo, navigation, social and legal layout.
- Production build passed; desktop layout visually inspected.

## Video gallery sizing and navigation

- Reduced the gallery section height and thumbnail dimensions for a more compact layout.
- Added up and down navigation that advances or reverses the featured video and shifts the following thumbnails. The current video data contains three entries.
- Production build passed and the browser rendering and thumbnail cycling were visually checked.


## Video gallery transitions and controls

- Added the fourth official video entry so the gallery opens with one featured video and three upcoming thumbnails.
- Removed the plus control, linked Watch All Videos to the official listing, and added GSAP gallery transitions with hover and press feedback for the CTA and arrow controls.
- Verified cycling and the rendered gallery in the browser; production build passed.


## Video section eyebrow and responsive action

- Added the Our Stories eyebrow using the same style as the Vision and Mission labels.
- Corrected the Watch All Videos play control to remain circular and adjusted the mobile gallery to stack thumbnails and arrow controls cleanly.


## Our Stories eyebrow color

- Matched the eyebrow's orange color, type size, weight, spacing and uppercase treatment to the Vision and Mission labels, overriding the video paragraph styles that had taken precedence.
- Confirmed the corrected rendering in the browser and rebuilt successfully.


## SDMP story carousel

- Added responsive carousel paging with premium previous/next controls, draggable cards, a slide counter and clickable progress indicators to the SDMP stories.
- Verified arrow navigation in the browser and confirmed the production build passes.


## Section markers

- Removed the decorative section numbers and vertical marker lines from the About, Vision, Mission, Values, Community Programs and Our Stories sections.
- Production build and diff checks passed; confirmed the markers are absent in the rendered accessibility tree.

