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
  `year | stack`, then the headline in the serif. Always that order.
- Two families: Source Serif 4 (names, headlines, section titles) and Inter.
- One accent, used for links and the discipline line only. `--accent-text` for
  text (contrast 5.4:1), `--accent` for marks.
- The 48-bar day strip is the only recurring motif. Static.
- Banned: entry animations, scroll reveals, page transitions, custom cursor,
  horizontal scroll, skill bars, logo walls, badges, drop shadows.
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

## Before every commit

```bash
npm run build && npm run check
```

`check` fails on em dashes and internal identifiers. Organisation-specific
terms are read from `scripts/forbidden.local.txt`, which is git-ignored on
purpose: the list itself must never be published.

## Waiting on Alexandre

- Impact figures per project (until supplied, the impact block stays hidden)
- CV PDF in `public/`, then set `site.cv`
- BPO repo republished under `AlexandreBurhan`, then set its `links.code`
- Fuller BPO demo dataset and regenerated screenshot
- Slot-sizing model, fifth project
