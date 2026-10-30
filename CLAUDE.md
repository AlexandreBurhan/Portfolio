# Working on this repository

Alexandre Burhan's portfolio site. Audience: recruiters and hiring managers for
Data Analyst, Operations Analyst and Automation roles. Site language: English.

## Architecture

- Next.js 15, `output: 'export'`. No API routes, server actions, middleware or
  anything that needs a server. Hosting target: Vercel, repo root as project root.
- All copy lives in `content/site.js` and `content/projects.js`. Components hold
  no copy. Adding a project, an impact line, the CV or a demo link must be a
  content-only change.
- `hero: true` on a project puts it in the home-page rooms; `false` puts it in
  "Also built". Switching is a one-value change.
- Empty `links.demo` / `links.code`, empty `impact`, empty `site.cv`: nothing
  renders. Never ship a dead button.
- Fonts are self-hosted through `@fontsource-variable`. No Google Fonts calls.

## Design: a museum with labels

- Every project carries the same label: title in spaced capitals, then
  `year | stack`, then the headline in bold grotesque. Always that order.
- Two families: Schibsted Grotesk, bold and tightly tracked, for the name,
  headlines and section titles, and at regular weight for labels, meta lines,
  captions, navigation, tables and diagrams; Literata for body prose and pull
  quotes. Inter, Space Grotesk and Source Serif 4 are out on purpose: they read
  as template defaults.
- Calm, professional palette: one pale blue paper (`--paper`) for every light
  section, near-black ink, one ink-blue
  accent used for links, the discipline line, the name in the hero, the
  portrait ring and the one filled "See my work" button.
- Hero: round portrait in an accent ring on the left, name, disciplines,
  tagline, short tool list, experience line and the button on the right.
  Navigation sits in a dark bar, links centred, no name in it. `--accent-text` for text
  (contrast 8.4:1), `--accent` for marks.
- Full-width night-blue bands (`.band`) alternate with the paper: the intro,
  the recurring theme, contact and the footer. Projects, tools, credentials and
  background stay on paper. Inside a band, colour tokens are redefined, so
  components need no dark variant.
- "What I do" (`site.services`, nav "Services") lists kinds of work in two
  columns, each linked to the project that shows it. Keep each line factual
  and backed by a project or the CV.
- Home page lists projects as rows: screenshot left, label, headline, summary
  and a "Read the case" button right. A project whose cover is a diagram names
  a `thumb` image for its row, or, with no image at all, shows the diagram
  itself in the row's mat. Contact is two columns: a line on the left, the
  channels on the right.
- Videos are screen recordings in `public/videos/`, with a poster image, played
  on click only. Never autoplay.
- No decorative motif. Projects on the home page are separated by a hairline
  rule and space. The 48-bar day strip was removed on purpose: it read as a
  generated flourish.
- Banned: entry animations, scroll reveals, page transitions, custom cursor,
  horizontal scroll, skill bars, logo walls, badges, drop shadows.
  Exception: the "Education and certifications" list may show a small image
  of each certificate next to its name, issuer and year (`site.credentials`).
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
