# Working on this repository

Alexandre Burhan's portfolio site. Audience: recruiters and hiring managers for
Data Analyst, Operations Analyst and Automation roles. Site language: English.

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
- Palette: white page, `#f5f5f7` grey tiles, near-black `#1d1d1f` ink and dark
  tiles, one blue: `--link` for links, `--blue` for the one filled button
  ("See my work"). Other buttons are outlined pills. Light and dark
  appearance both come from the tokens in `globals.css`.
- Navigation: a sticky translucent dark bar (the only glass on the site),
  links centred, no name in it. Opaque under reduced transparency.
- Hero: round portrait on the left, name, disciplines, tagline, short tool
  list, experience line and the button on the right.
- Dark rounded tiles (`.band`) hold the intro with the resume card, the
  recurring theme and contact. Inside a band, colour tokens are redefined, so
  components need no dark variant.
- "What I do" (`site.services`, nav "Services") is a two-column grid of grey
  tiles, each linked to the project that shows it. Keep each line factual
  and backed by a project or the CV.
- Selected work: one grey tile per project, screenshot on the left in a dark
  rounded mat, label, headline, summary and a "Read the case" pill on the
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

- Impact figures per project (until supplied, the impact block stays hidden)
- BPO repo republished under `AlexandreBurhan`, then set its `links.code`
- Fuller BPO demo dataset and regenerated screenshot
- Slot-sizing model, fifth project
