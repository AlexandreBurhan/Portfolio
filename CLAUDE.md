# Working on this repository

Alexandre Burhan's portfolio site. Audience: data managers hiring for Data Analyst,
Operations Analyst and Automation roles (recruiters second). Site language: English.

## Architecture

- Next.js 15, `output: 'export'`. No API routes, server actions, middleware or
  anything that needs a server. Hosting: GitHub Pages under `/Portfolio/`, deployed by
  `.github/workflows/deploy.yml`; local paths go through `components/asset.js`.
- All copy lives in `content/site.js` and `content/projects.js`. Components hold
  no copy. Adding a project, an impact line, the CV or a demo link must be a
  content-only change.
- `hero: true` on a project puts it in the home-page rooms; `false` puts it in
  "Also built". Switching is a one-value change.
- Empty `links.demo` / `links.code`, empty `impact`, empty `site.cv`: nothing
  renders. Never ship a dead button.
- No web fonts on the site, no Google Fonts calls. The `@fontsource-variable`
  packages stay installed for the CV only.

## Design: Apple-style, after the Human Interface Guidelines

- Every project carries the same label: title, then `year | stack`, then the
  headline in bold. Always that order.
- One family: the system font (`-apple-system`, SF Pro on Apple devices,
  Helvetica Neue or Arial elsewhere). No web fonts are loaded on the site.
  Inter, Space Grotesk and Source Serif 4 stay out. The CV keeps its own
  fonts (`cv/cv.html`).
- Palette (kept from the first design): one pale blue paper (`--page`), white
  tiles, near-black ink, night blue `#13233a` for the bands, navigation,
  footer and screenshot mats, and one ink-blue accent (`--link`, 8.4:1) for
  links, the name, the disciplines, labels, service titles, the portrait ring
  and the one filled "See my work" button. Other buttons are outlined pills.
  Light and dark modes: dark tokens under `:root[data-theme='dark']` in
  `globals.css`, a sun/moon button at the end of the navigation
  (`components/ThemeToggle.js`), the device setting by default, the visitor's
  choice kept in localStorage.
- Navigation: a sticky translucent night-blue bar (the only glass on the site),
  links centred, no name in it. Opaque under reduced transparency.
- Hero: round portrait on the left, name, disciplines, tagline, short tool
  list, experience line and the button on the right.
- Night-blue rounded tiles (`.band`) hold the intro with the resume card, the
  recurring theme and contact. Inside a band, colour tokens are redefined, so
  components need no dark variant.
- "What I do" (`site.services`, nav "Services") is a two-column grid of white
  tiles, each linked to the projects that show it (`projects: [slugs]`). Keep each line factual
  and backed by a project or the CV.
- Selected work: one white tile per project, screenshot on the left in a
  night-blue rounded mat, label, headline, summary and a "Read the case" pill on the
  right. A project whose cover is a diagram names a `thumb` image, or shows
  the diagram itself in the mat. Contact is two columns.
- Text links that lead somewhere carry Apple's chevron (CSS, not copy).
- Videos are screen recordings in `public/videos/`, with a poster image,
  played on click only. Never autoplay.
- Banned: entry animations, scroll reveals, page transitions, custom cursor,
  horizontal scroll, skill bars, logo walls, badges, drop shadows, glass on
  content. Exception: the "Education and certifications" list may show a
  small image of each certificate next to its name, issuer and year
  (`site.credentials`).
- Phones get an iOS-style tab bar at the bottom (`components/MobileTabBar.js`):
  floating glass, a highlight that slides to the active tab or follows a finger
  dragged along the bar, the tab following
  the section in view on the home page. It replaces the top links on phones;
  the top keeps only the light / dark switch.
- Figures and certificate images open full screen on click
  (`components/ZoomImage.js`), growing from where they sit. These two, hover
  and press feedback are the only motion; all of it respects reduced motion.
- Phones: pages scroll one way only. The first screen is centred: a small portrait
  above the name, the availability line and both buttons (short texts from
  `availabilityShort` / `experienceShort`). Work comes before the intro.
  Project cards read name, headline, first result, then a short image. What I
  do is a short list, Tools and Background are hidden, and case-study sections
  after the first two fold under their heading (`components/Fold.js`). The tab
  bar holds Home, Work, What I do, CV and Contact.
- Diagrams are HTML components (`components/diagrams/`), not images, so they
  reflow at phone width.

## Writing rules

- No em dashes anywhere. Use commas, colons, or split the sentence.
- Separator inside a line: ` | ` via `components/Separated.js`.
- Plain first person. No marketing adjectives.
- Never present planned work as done. Never invent a number.

## Confidentiality: hard rules

Allowed: Alexandre's name; employers Canal+, Air France KLM, papernest.

Never, in copy, alt text, captions, file names or commit messages: partner
company names, team names, agent or colleague names, spreadsheet or script IDs,
calendar addresses, API hostnames, internal URLs, UUIDs, service accounts,
workspace or channel IDs, real skill group names (use "Aggregate A", "B"...).

Inspect every screenshot before adding it. If in doubt, leave it out and ask.

The public CV (`public/Alexandre-Burhan-CV.pdf`) is printed from `cv/cv.html`
with headless Chrome (command at the top of that file). It is not the CV sent
to employers: no phone number, and client names are replaced by a generic
description. Former employers Barfield and Strime may appear in it. After any
edit, reprint it and check it is still one page.

## Before every commit

```bash
npm run build && npm run check
```

`check` fails on em dashes and internal identifiers. Organisation-specific
terms are read from `scripts/forbidden.local.txt`, which is git-ignored on
purpose: the list itself must never be published.

## Waiting on Alexandre

- More impact figures per project. The current `impact` lines only restate
  numbers already written in each case study; never add one that is not.
- BPO repo republished under `AlexandreBurhan`, then set its `links.code`
- Fuller BPO demo dataset and regenerated screenshot
- Slot-sizing model, fifth project
