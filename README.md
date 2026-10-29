# Portfolio: Operations & Data Analyst

A guide to my work. Four systems built in production for a multi-site contact
centre operation, each solving a version of the same problem: an operational
decision being made on information that was incomplete, stale, or counted wrong.

Most of this work runs on internal data and cannot be published. Where code
can be anonymised, it is linked. Where it cannot, the write-up explains the
architecture and the reasoning in full. This repository is also the source of
the portfolio site itself.

---

## 1. BPO Performance Console

**Rebuilt a partner performance review from SQL to dashboard, and found an ETL
pipeline that had been frozen for eight months.**

Weekly performance reviews with outsourced partners ran on a generic dashboard
that could not show who was repeatedly off target. I rebuilt the whole chain:
the SQL extraction, a purpose-built data layer, and a custom web application.

- Grain of analysis defined as site × agent × week × KPI, which is what makes
  streak detection and multi-KPI crossing possible
- Repeat offenders counted over weeks that carry data, not calendar weeks: a
  naive calendar walk resets every streak when an upstream job skips a week,
  hiding exactly the chronic cases the view exists to reveal
- Caught and documented my own miscalculation: averaging only the agents above
  target is not the site average. 12.5% versus 8.2%. The gap between the two
  became a metric of its own: a small gap means a diffuse problem, a large gap
  means a concentrated one

`SQL` `BigQuery` `Google Apps Script` `JavaScript`

---

## 2. Saturday Slots Automation

**Automated a weekly process that only worked as long as someone remembered it,
and measured that one miscounted person costs eight customer slots.**

Saturday callback slots were opened by hand every week against a hard deadline,
with one person at the head of the chain. A forgotten week meant customers could
not book. I automated it end to end as six orchestrated scenarios.

- Measured the model's sensitivity: ±1 person in the headcount is ±8 customer
  slots. In this system, an "approximately right" manual count does not exist
- Failure detection treated as a first-order requirement. Five conditions in
  AND before any success announcement, including two row counters, because an
  import can return a success status on an empty file
- Separated "nothing to chase" from "nothing was read". Both produced the same
  reassuring message before the fix

`Make` `Google Sheets API` `REST API` `Slack API`

---

## 3. WFM Assistant

**A governed data dictionary, and a Slack assistant that is structurally unable
to state an unvalidated definition.**

The same metric was being calculated three different ways depending on who ran
it. The problem was not missing documentation: it was unverified definitions
circulating as if they were verified.

- A three-state status model gates the sync: only validated entries ever reach
  the model's context. The constraint is mechanical, not a convention people
  have to remember
- Context injection rather than vector retrieval. At this corpus size the whole
  lexicon fits in the context window, which removes retrieval misses entirely.
  The switching threshold is identified and the data is already shaped for it
- Sync decoupled from serving through a cache, so the dictionary source can
  fail without the assistant failing

`Notion` `Make` `Google Gemini` `Slack API`

---

## 4. Training Scheduling Engine

**A scheduling engine that decides how many sessions to run, and explains every
slot it turns down.**

Training requests arrived through three unstructured channels, and nothing
prevented two sessions from pulling the same skill group out of production at
the same time: a drop in service nobody could anticipate or explain.

- Two constraints that are usually conflated: composition (how many of one
  skill group in a single session) and concurrency (how many absent at once,
  across all sessions). The first drives session count, the second placement
- Greedy first-fit rather than an optimiser, explicability over optimality. An
  optimiser might produce a tighter schedule but could not explain why a slot
  was rejected, and the rejection reason is what makes the tool usable
- Created a metric that did not exist: the lag between a session ending and
  being declared, which separates teams declaring in real time from teams
  reconciling after the fact

`Google Apps Script` `JavaScript` `Google Sheets` `Calendar API`

---

## A recurring theme

Three of these four projects involve the same failure mode: **a system that
fails without raising an error.** A frozen pipeline still serving numbers. A
mirrored sheet that only refreshes when a person opens the file. An import
returning a success status on an empty file.

I found the first two by accident. By the third project, failure detection was
a design requirement rather than a discovery.

---

## Contact

alexandre.burhan@edhec.com | [LinkedIn](https://www.linkedin.com/in/alexandre-burhan-901007164/)

---

## About this repository

The portfolio site is a static Next.js export. All copy lives in `content/`;
components hold none.

```bash
npm install
npm run dev     # local preview at http://localhost:3000
npm run build   # static export to out/
npm run check   # writing and confidentiality checks on content and build
```
