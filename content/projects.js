// All project copy lives here. Components never hold copy.
//
// Writing rules: no em dashes, ' | ' as separator, plain first person,
// never present planned work as done, never invent a number.
//
// Confidentiality: no partner, team, agent or colleague names; no IDs,
// hostnames, internal URLs or UUIDs; skill groups are "Aggregate A", "B"...
//
// Section types: prose | list | table | code | quote | figure
// - body: paragraphs rendered before the block
// - note: paragraphs rendered after the block
// Inline markup in strings: **bold**, *italic*, `code`.
//
// Figures: { src, alt, caption } for an image, { video, poster, alt, caption }
// for a screen recording in /public/videos (mp4 or webm, played on click only),
// or { diagram, caption }
// for a built-in diagram ('saturday-timeline' | 'session-count').
// narrow: true caps the frame at 640px, for small screenshots that would
// otherwise be upscaled and blur.

const projects = [
  // ---------------------------------------------------------------------------
  {
    slug: 'bpo-performance-console',
    title: 'BPO Performance Console',
    year: '2026',
    hero: true,
    order: 1,
    headline:
      'Rebuilt a partner performance review from SQL to dashboard, and found an ETL pipeline that had been frozen for eight months.',
    summary:
      'Weekly reviews with outsourced partners ran on a generic dashboard that could not show who was repeatedly off target. I rebuilt the whole chain: the SQL extraction, a purpose-built data layer, and a custom web application.',
    stack: ['SQL', 'BigQuery', 'Apps Script', 'JavaScript'],
    links: { demo: '', code: '' },
    cover: {
      src: '/images/bpo-console.png',
      width: 1163,
      height: 795,
      alt: 'Demo of the BPO Performance Console on synthetic data: five KPI cards with targets and trend lines, a ranking of agents off target, a multi-KPI profile, and a repeat-offenders table with weekly streak bars.',
      caption: 'The console on synthetic demo data. Every name and figure is fabricated.',
    },
    impact: [],
    sections: [
      {
        heading: 'Context',
        type: 'prose',
        body: [
          'I run the weekly performance review with several outsourced contact centres across three countries. Each review covers five auxiliary-time KPIs (break, hold, coaching, after-call work, training), each compared with a contractual target, both for the site and for every individual agent.',
          'Every review has to answer three questions, and the third is the one most organisations struggle with:',
        ],
      },
      {
        type: 'list',
        items: [
          'Where does the site stand against its targets, and which way is it moving?',
          'Who is driving the gap? A site average does not say whether the problem is spread across the floor or concentrated on six people.',
          'What was agreed last week, and has it moved?',
        ],
      },
      {
        heading: 'The problem',
        type: 'prose',
        body: [
          'The review ran on a generic Looker Studio dashboard, built to cover a lot of ground rather than to steer anything precisely. Too many variables that had nothing to do with auxiliary time. No real week-on-week reading, so a trend was hard to tell apart from noise. And no usable agent-level view: nothing showed who kept coming back, on which KPI, or for how long.',
          'The commitments partners made in the review lived in a separate document that nobody reconciled with the data. Six weeks later the same KPI was red and the conversation started from zero.',
        ],
      },
      {
        heading: 'What I built',
        type: 'prose',
        body: [
          'I rebuilt the whole chain, from the source to the screen.',
          '**Data layer, SQL on BigQuery.** I wrote the extraction queries myself, at the right grain of analysis: site × agent × week × KPI. Choosing that grain is the structural decision of the project. It is what later makes streak detection and multi-KPI crossing possible. The extraction feeds a data layer in Google Sheets that I structured for this review specifically, instead of depending on a generic model built for other uses.',
          '**Application layer, Apps Script and JavaScript, deployed as a web app.** The backend reads three tabs with different shapes (a site × week pivot, a long agent × KPI × week table, a free-text meeting log) and normalises them into one dataset. The frontend is a single HTML file, no framework, no build step.',
          'No server, no database, no deployment pipeline, no credentials to rotate. That was a choice: I was building and maintaining this alone, and every added dependency would have been a debt I carried alone.',
        ],
      },
      {
        heading: 'What the console shows',
        type: 'table',
        columns: ['Block', 'The question it answers'],
        rows: [
          ['KPI cards', 'Site result against target, week-on-week change, 10-week trend line, 104-week reference'],
          ['Agents off target', 'Ranked by relative gap to target, with tenure'],
          ['Multi-KPI profiles', 'Agents above target on two or more KPIs in the same week: individual follow-up, not a team reminder'],
          ['Repeat offenders', 'Consecutive weeks above target per agent and per KPI: what separates an accident from an established problem'],
          ['Meeting log', 'What I raised, what the partner answered, the action committed, its owner and its status'],
        ],
        note: [
          'The meeting log writes straight back into the source spreadsheet, so the record of commitments lives where the rest of the reporting already lives, not in a parallel document that gets forgotten.',
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/bpo-meeting-log.png',
      width: 1155,
      height: 440,
          alt: 'Meeting log on synthetic data: two weekly entries, each with the analyst comment, the partner response, the action committed and a status.',
          caption: 'The meeting log turns a weekly conversation into a traceable commitment.',
        },
      },
      {
        heading: 'What the data revealed',
        type: 'prose',
        body: [
          'This was not in the brief, and it is the part I find most interesting.',
          '**A pipeline that had been frozen for eight months.** While checking the consistency of the chain, I noticed the same agent showing 2,351 days of tenure in one source and 2,575 in a recent export. A 224-day gap, about 32 weeks: one of the pipelines feeding the agent view had stopped updating eight months earlier while the other kept going. Nothing flagged it. The dashboard still showed numbers, they were just old. That kind of silent drift only shows up when you cross-check metadata that is supposed to move in a known way: tenure grows by exactly one day per day.',
          '**A calculation error I had introduced myself.** My first version computed the KPI cards from the agent table. It showed a break rate of 12.5% where the real site figure was 8.2%. Averaging only the agents above target is not the site average: two numbers, two opposite stories. I separated the two levels into distinct sources and distinct parts of the interface. The gap between them then became a signal of its own: a small gap means the problem is spread across the floor, a large gap means it sits with a few people.',
          '**A false alarm avoided.** A spike on a KPI can be a real drift or an onboarding artefact: a new cohort in training mechanically inflates some auxiliary times. Tenure is what tells the two apart. Holding a partner to account for a composition effect would have cost the review its credibility.',
        ],
      },
      {
        heading: 'Design decisions I stand by',
        type: 'list',
        items: [
          '**Streaks are counted over weeks that carry data, not calendar weeks.** If the upstream job skips a week, a naive calendar walk resets every streak to 1 and hides exactly the chronic cases this view exists to reveal.',
          '**Repeat offenders are sorted by streak length before severity.** An agent at 3× target for five weeks comes before one at 8× for two. The first is an unaddressed problem, the second may still be an accident.',
          '**Writes check the row before touching it.** The client sends the site and week it expects on that row, and the server re-reads them and refuses the write if they differ. On a shared sheet anyone can re-sort, a stale row number would overwrite the wrong note without a trace.',
          '**Columns are matched by name, never by position.** The sheet is co-owned by people who do not know the app exists. They will reorder columns.',
        ],
      },
      {
        heading: 'Data protection',
        type: 'prose',
        body: [
          'The app shows individual performance data about employees of third-party companies. That constraint shaped the architecture more than any technical choice.',
          'The obvious shortcut, publishing the sheet as a public CSV, is what most tutorials suggest and was not an option: personal data behind a URL with no authentication, no access log and no way to revoke it. The app is deployed as a web app restricted to the company domain instead. The data stays inside the perimeter, authentication is native, access is logged.',
          'One consequence worth stating: a web app deployed to *execute as me* runs every query with the deployer\'s permissions. Everyone who opens it reads the data under that identity. On personal data, deciding who can open the app is not a setting, it is a governance decision.',
        ],
      },
      {
        heading: 'What I would do differently',
        type: 'prose',
        body: [
          'I would check the freshness of every source before building anything on top of it. I found the frozen pipeline by chance, by crossing two metadata fields. A systematic last-updated check from day one would have turned a lucky find into a permanent safeguard. It is now the first thing I set up on any new data chain.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'saturday-slots-automation',
    title: 'Saturday Slots Automation',
    year: '2026',
    hero: true,
    order: 2,
    headline:
      'Automated a weekly process that only worked as long as someone remembered it, and measured that one miscounted person costs eight customer slots.',
    summary:
      'Saturday callback slots were opened by hand every week against a hard deadline, with one person at the head of the chain. I automated it end to end, then found the counting rule that was quietly closing slots.',
    stack: ['Make', 'Google Sheets API', 'REST API', 'Slack API'],
    links: { demo: '', code: '' },
    // Home-page list thumbnail: the cover is a diagram, too dense to shrink.
    thumb: { src: '/images/saturday-scenarios.png', width: 1355, height: 576 },
    cover: {
      diagram: 'saturday-timeline',
      caption:
        'Everything must complete before the 15:30 hard deadline. Past that, slots cannot be opened in time.',
    },
    impact: [],
    sections: [
      {
        heading: 'Context',
        type: 'prose',
        body: [
          'Saturday callback slots do not open by themselves. How many to open depends on how many people will actually be working, and that changes every week. So every week someone had to collect who was coming, turn that headcount into a number of slots per half hour, and push the result into the telephony tool.',
          'Two skill groups, four contributing sites, seventeen half-hour slots between 09:00 and 17:00.',
        ],
      },
      {
        heading: 'The problem',
        type: 'prose',
        body: [
          'A manual loop of seven steps spread over two days, with a human wait in the middle: a request on Wednesday, answers from site leads, counting and calculating on Thursday, exporting, importing, announcing. About 45 minutes a week, but time was not the real issue.',
          '**A hard deadline.** Slots have to be open by Thursday afternoon. After that, customers cannot book.',
          '**A single point of failure.** The first step of the chain was a manual addition by one person on Wednesday morning, with no named backup.',
          '**Reliability that depended on memory.** That is not about anyone being careless: a manual weekly process has a non-zero failure rate by construction. And a miss could not be recovered, because it surfaced on Saturday, when the slots should already have been open.',
          'The consequence needs no explanation: no slots, no appointments, no prospects.',
        ],
      },
      {
        heading: 'The number that justifies the project',
        type: 'quote',
        body: [
          'Instrumenting the sizing model, I measured its sensitivity: moving one skill group from 9 to 10 people moves the total number of open slots from 39 to 47.',
        ],
        quote:
          'An amplification factor of about ×8. An error of ±1 person in the headcount becomes ±8 customer slots.',
        note: [
          'In this system, an "approximately right" manual count does not exist. Counting precisely is not tidiness, it is a revenue variable.',
        ],
      },
      {
        heading: 'Architecture',
        type: 'prose',
        body: [
          'Six scenarios rather than one, because a human wait of about twenty hours separates the request from the generation. A single linear scenario was structurally impossible.',
          '**The target date is computed once and passed along, never recomputed.** The generation step writes it, the import step reads it back. One source of truth, so two formulas can never drift apart.',
          '**The business rule stays in the spreadsheet, not in the automation.** The automation moves data and checks it; it does not calculate the rule. The generator stays auditable and editable by the team without touching the pipeline. That is what makes the tool transferable instead of dependent on its author.',
          '**The announcement lives in the same run as the import.** It started as a separate scenario on a timer, which means it would have announced "slots open" even if the import had failed thirty minutes earlier. Two runs share no state. The logic now sits behind a condition on the actual result of the API calls.',
          '**It runs by default, not on approval.** Thursday morning\'s preview leaves time to step in; without action, the chain goes. The deadline must never depend on someone being available, which was the original problem.',
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/saturday-scenarios.png',
      width: 1355,
      height: 576,
          alt: 'List of the six automation scenarios, from kickoff to push, with the sixth one disabled and labelled deprecated because its logic moved into the push step.',
          caption:
            'Five active steps and one retired, with the reason written in its name rather than deleted.',
        },
      },
      {
        heading: 'Failure detection as a first-order requirement',
        type: 'prose',
        body: [
          'On two earlier projects I had found data chains that were frozen and raised no error. Here the question was not "does it work?" but "if it does not, will someone know in time?"',
          '**Three distinct outcomes on the Wednesday chase, where there used to be two.**',
        ],
      },
      {
        type: 'table',
        columns: ['Condition', 'Message'],
        rows: [
          ['Answers are missing', 'Reminder, naming the site lead responsible'],
          ['Everything is filled in, and rows exist', 'Confirmation'],
          ['**No rows found at all**', '**Anomaly alert**'],
        ],
        note: [
          'The third branch is the one that was missing. "Nothing missing" and "nothing read" used to produce the same reassuring message. It also covers the manual first step: if the Saturday rows were never added, the alert fires on Wednesday afternoon instead of being discovered on Saturday.',
          '**Five checks in AND before any announcement.** Both imports must return success, the target date must fall on a Saturday, and both files must contain at least one data row. Those last two close a real gap: an import can return a success status on a file that holds only a header, zero slots opened and two green lights. On any failure, the alert names the exact check that failed, with almost two hours left before the deadline.',
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/saturday-slack.png',
      width: 1716,
      height: 916,
          alt: 'Two automated Slack messages: the Wednesday request asking site leads to fill in Yes, No or Maybe before Thursday noon, and the Thursday announcement that slots are open, with skill group names redacted.',
          caption:
            'What the team actually sees: the Wednesday request, and the announcement that is only sent once every check has passed.',
        },
      },
      {
        heading: 'The analytical finding: Maybe is not No',
        type: 'prose',
        body: [
          'Site leads answer Yes, No or Maybe. The count treated every Maybe as an absence, and so did blank cells.',
          'A Maybe is not a No. It is a probability of attending. And the same sheet already held the attendance that actually happened, a column filled in for months that nobody used.',
          'Crossing expected with actual attendance suggests, **on a first sample still too small to conclude**, that most Maybes do come in to work. Counting them as zero would then produce a systematic under-opening, amplified by the model\'s ×8.',
          'The change I proposed replaces the binary count with an estimate:',
        ],
      },
      {
        type: 'code',
        code: 'expected headcount = (Yes × site attendance rate)\n                   + (Maybe × site Maybe coefficient)',
        note: [
          'Both coefficients can be calibrated per site over eight to ten weeks. The data already exists, so there is nothing to instrument, only to use. And the forecast error becomes measurable, which it is not today. This is a proposal, not something shipped yet.',
        ],
      },
      {
        heading: 'Two governance debts I found',
        type: 'prose',
        body: [
          '**An undocumented hourly coefficient curve.** The number of slots per half hour depends on a coefficient that varies by hour and differs between the two skill groups. Both curves are stable and consistent, so they were built on purpose, but their origin is written down nowhere. Worse, the column header suggests a flat percentage that is not actually applied. Anyone taking over the file would apply it and break the sizing.',
          '**A reconstructed expiry rule.** One API parameter takes two values depending on the time of the slot. No documentation existed: I reverse-engineered the rule from history and implemented it as is, to reproduce exactly what the manual import produced.',
          'Automating a calculation whose parameters nobody can justify is still a risk, just a faster one. Documenting those two rules is worth more, in the long run, than the automation itself.',
        ],
      },
      {
        heading: 'What it does not do yet',
        type: 'list',
        items: [
          '**No switch for exceptional weeks.** The pipeline runs every week; a bank holiday would produce either an alert or an unwanted opening. A skip list checked at the first step would solve it cleanly.',
          '**The first step is still manual.** The Saturday rows are added by one person every Wednesday morning. Generating them from the scheduling tool would remove the single point of failure and give back half a day.',
          '**Date filtering compares text.** A simple format change on the date column would match zero rows without an error. The row counters make that failure visible, but the proper fix is to parse the date.',
          '**Slot fill rate is not tracked.** It is the only metric that would say whether the model opens too many slots or too few. The next step is the model that sizes them from the data rather than from experience.',
        ],
      },
      {
        heading: 'What I took from it',
        type: 'list',
        items: [
          '**Check the effect, never the acknowledgement.** Three incidents on this project, one signature: a system reporting success without having checked it. An API field that was always null, read as a success flag. A "nothing to chase" produced by counting zero rows. A safeguard whose conditions were combined with OR instead of AND, which turns a check into a sieve with no visible symptom.',
          '**A check that cannot fail loudly is not a check.** Every step has to tell "all clear" apart from "found nothing".',
          '**Measure before fixing.** I lost iterations fixing on hypotheses by re-reading the logic, when the execution data pointed straight at the faulty step.',
          '**One unknown at a time.** Each step shipped with a single new element and everything known held fixed, so any gap pointed to one cause.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'wfm-assistant',
    title: 'WFM Assistant',
    year: '2026',
    hero: true,
    order: 3,
    headline:
      'A governed data dictionary, and a Slack assistant that is structurally unable to state an unvalidated definition.',
    summary:
      'The same metric was being calculated three different ways depending on who ran it. I built a governed dictionary in Notion with a three-state status model, then an assistant that answers from it, where only validated entries ever reach the model.',
    stack: ['Notion', 'Make', 'Google Gemini', 'Slack API'],
    links: { demo: '', code: '' },
    cover: {
      src: '/images/wfm-sla30.png',
      narrow: true,
      width: 760,
      height: 660,
      alt: 'The WFM Assistant in Slack answering a request for the definition of SLA30: what it measures, why it matters, the formula as callbacks made within 30 minutes divided by total leads to call back, and where it is used.',
      caption: 'A definition with its formula and its reason: something two people can compute the same way.',
    },
    impact: [],
    sections: [
      {
        heading: 'Context',
        type: 'prose',
        body: [
          'When I joined, a few things kept coming up.',
        ],
      },
      {
        type: 'list',
        items: [
          '**Diverging definitions.** The same KPI was calculated differently depending on who produced it, so operational trade-offs were being made on numbers that could not be compared.',
          '**No reference for skills and offers.** No single source describing what each skill group covers, so routing and forecasting were approximate.',
          '**Tool knowledge scattered.** It lived in people\'s heads and in dead Slack threads. Every onboarding started from zero, and ramping up depended on who happened to be available.',
        ],
        note: [
          'The real cost is not the question being asked. It is the question being asked forty times, and the answer changing depending on who replies.',
        ],
      },
      {
        heading: 'The diagnosis',
        type: 'prose',
        body: [
          'This is what shaped everything that followed: the problem was not missing definitions, it was **unverified definitions circulating as if they were verified.**',
          'That distinction changes the solution. If the problem is missing documentation, you write documentation. If the problem is unreliable content spreading, writing more makes it worse. You need a mechanism that separates what is confirmed from what is inferred, and stops the second from travelling like the first.',
        ],
      },
      {
        heading: 'Phase 1: the dictionary',
        type: 'prose',
        body: [
          'Four Notion databases, about 55 entries: KPIs (definition, formula, scope), skill groups, roles, tools.',
          '**Atomic cards, not long documents.** Each entry is a card with typed fields. Decided from the start so the corpus can be split cleanly if volume ever calls for semantic search, without rewriting anything.',
          '**A three-state status model, the core of the governance:**',
        ],
      },
      {
        type: 'table',
        columns: ['Status', 'Meaning', 'Visible to the assistant'],
        rows: [
          ['`Documented`', 'Confirmed on the ground, reliable', 'Yes'],
          ['`To validate`', 'Inferred or ambiguous', 'No'],
          ['`Submitted`', 'Waiting for a business owner to decide', 'No'],
        ],
        note: [
          'Uncertain formulas are flagged explicitly and settled by the business owners before they move to Documented. The filter is not a writing convention people can forget: it is applied mechanically at sync time, so unvalidated content cannot reach the model.',
        ],
      },
      {
        heading: 'Phase 2: the assistant',
        type: 'prose',
        body: [
          'An assistant that answers WFM questions in the team\'s Slack channel, using the dictionary and nothing else. Two decoupled automation scenarios, linked by a cache.',
          '**Sync, nightly.** Reads the four Notion databases, keeps validated entries, aggregates them and writes them into a cache.',
          '**Assistant, event-driven.** A message arrives through a dedicated Slack app, passes an anti-loop filter, the cache is read, the full lexicon is injected into the prompt, the model answers in the thread.',
        ],
      },
      {
        heading: 'Architecture decisions',
        type: 'prose',
        body: [
          '**Context injection rather than vector retrieval.** At about 55 entries, the whole lexicon fits comfortably in the model\'s context window, so I send all of it with every call instead of retrieving the most similar passages. At this size that is the better choice, not a shortcut: no embeddings to maintain, no vector database, and above all no retrieval misses. The model sees everything, so it cannot overlook the relevant entry. The switching point is identified: beyond 300 to 400 entries, or if cost per request becomes noticeable, retrieval takes over, and the atomic cards are already shaped for it.',
          '**Sync decoupled from serving.** The assistant never calls the Notion API, it reads a cache. That protects against rate limits, takes Notion\'s latency off the user\'s path, and above all lets the sync fail without taking the assistant down. A reference dictionary does not need to be fresh to the minute: next-day freshness buys a lot of robustness.',
          '**Least privilege.** The shared connection available in the workspace had read and write access and already served production automations owned by other teams. Using it meant risking flows I did not own. I created a dedicated read-only integration for this project. It only needed to read.',
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/wfm-refusal.png',
      narrow: true,
      width: 784,
      height: 442,
          alt: 'The WFM Assistant in Slack replying that a term does not exist in the WFM dictionary and asking the user to ping the WFM team so it can be clarified and added.',
          caption: 'The safeguard working: asked about a term that is not in the dictionary, it says so instead of guessing.',
        },
      },
      {
        heading: 'Three non-trivial problems',
        type: 'list',
        items: [
          '**A silent validation error** when reading the cache: one parameter had to be passed explicitly, and leaving it out failed the call with no usable message. Found by elimination.',
          '**A feedback loop.** The assistant replied to system messages and triggered itself. Fixed with a combined filter on the bot identifier and the message subtype. Both conditions are needed, neither is enough alone. Any system that writes into the channel it listens to has to tell its own writes apart from users\'.',
          '**An event channel that delivered nothing**, with no error and no log. The shared event connector did not forward channel messages on this workspace. I isolated the broken link by testing each segment of the chain separately, then set up a dedicated Slack app pointing to a webhook owned by the project. Delivery became reliable and the flow stays fully event-driven.',
        ],
      },
      {
        heading: 'What I have not done yet',
        type: 'list',
        items: [
          '**No feedback loop.** Questions that get no answer are not logged. That is the next iteration, and the real unlock: the dictionary would then improve with use instead of depending on me to spot what is missing.',
          '**No systematic evaluation** of answer accuracy. Checks so far have been manual, on questions I knew the answer to.',
          '**The dictionary is incomplete.** Several formulas are still waiting for a decision. They are not exposed: the system is designed to be incomplete without ever being wrong, which is a very different thing.',
        ],
      },
      {
        heading: 'What this project really is',
        type: 'prose',
        body: [
          'It is not an AI project. It is a governance project that uses a language model as its interface.',
          'Connecting a model has become the easy part. The hard part was recognising that the real failure was organisational, and designing a system that makes it structurally impossible for unverified knowledge to circulate.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'training-scheduling-engine',
    title: 'Training Scheduling Engine',
    year: '2026',
    hero: true,
    order: 4,
    headline:
      'A scheduling engine that decides how many sessions to run, and explains every slot it turns down.',
    summary:
      'Training requests arrived through three unstructured channels, and nothing prevented two sessions from pulling the same skill group out of production at once.',
    stack: ['Apps Script', 'JavaScript', 'Google Sheets', 'Calendar API'],
    links: { demo: '', code: '' },
    cover: {
      diagram: 'session-count',
      caption:
        'The number of sessions is driven by the composition of participants, not by the requested group size.',
    },
    impact: [],
    sections: [
      {
        heading: 'Context',
        type: 'prose',
        body: [
          'Internal training across four sites, for 143 people in fifteen teams and eight skill groups. Each skill group answers a given queue, which is why pulling too many of the same group out at once matters.',
        ],
      },
      {
        heading: 'The problem',
        type: 'prose',
        body: [
          'Requests arrived by chat, by email and in person. No single entry point, no required format, and fully manual handling in a spreadsheet duplicated for every request.',
          'But the most expensive symptom was neither duplicates nor data entry. **Nothing checked operational coverage.** Two separate trainings could take the same people from the same skill group at the same time, and nobody saw it before the day itself. The result was a drop in service level that nobody anticipated, and therefore nobody could explain.',
          'Around it: staff lists out of date (each site kept its own copy, and at the switchover the files still missed two newly created teams and still held two deleted ones), no record at all of informal trainings, and arrangements made outside any system, known to two people.',
        ],
      },
      {
        heading: 'Two constraints, usually confused',
        type: 'table',
        columns: ['', 'The question', 'Where it applies'],
        rows: [
          ['**Composition**', 'How many people from the same skill group in **one session**?', 'Building the groups'],
          ['**Concurrency**', 'How many people from the same skill group **absent at the same time**, across all trainings?', 'Placing sessions in the calendar'],
        ],
      },
      {
        heading: 'Composition decides the number of sessions',
        type: 'prose',
        body: [
          'It is not the requested group size that sets the number of sessions, it is the most represented skill group among the participants.',
          'Seven participants in groups of four: you would expect two sessions. But three of them share a skill group and the rule allows one per session, so the engine produces **three**.',
        ],
      },
      {
        type: 'code',
        code: 'sessions = max( ceil(participants / group_size),\n                ceil(largest_skill_group / max_same_group_per_session) )',
      },
      {
        heading: 'Concurrency protects production',
        type: 'table',
        body: [
          'Default ceiling: 15% of the skill group\'s active headcount, with a floor of 1. It can be overridden globally, per group, or per request.',
        ],
        columns: ['Skill group', 'Headcount', 'Allowed absent at once'],
        rows: [
          ['Aggregate A', '44', '7'],
          ['Aggregate B', '43', '6'],
          ['Aggregate C', '23', '3'],
          ['Aggregate D', '4', '1'],
          ['Aggregate E', '2', '1'],
        ],
        note: [
          '**A consistency rule between the two**, added during the project: the concurrency ceiling can never be lower than what composition allows. Without it, a session became unsolvable on every date, and the tool replied "no slot available" without anyone being able to understand why.',
        ],
      },
      {
        heading: 'What the engine refuses',
        type: 'list',
        body: [
          'What a scheduling tool forbids says more about it than what it allows.',
        ],
        items: [
          'The same person in two overlapping sessions, checked against **every** existing schedule, not only the current request, and checked again on the server at validation because a slot can be moved by hand after the calculation.',
          'A slot that would exceed the concurrency ceiling. The engine moves to the next one and **records why it skipped it**.',
          'A request with no named team lead, or an e-learning with no link.',
          'A validation based on a stale proposal: if a setting changed since the calculation, it recalculates before saving.',
          'A suspiciously small staff import. The reference list is kept rather than overwritten with truncated data.',
        ],
        note: [
          'Some things warn without blocking. An overlap on a training that already happened is saved with the conflict recorded: a session that took place has to be able to exist in the system, and hiding the anomaly would make it invisible to analysis. Block the future, record the past, even when it is irregular.',
        ],
      },
      {
        heading: 'Who decides what',
        type: 'table',
        columns: ['Setting', 'Decided by'],
        rows: [
          ['Participants, duration, group size, period, preferred time', 'The requester'],
          ['Maximum from one skill group per session', 'Workforce management'],
          ['Maximum absent at once', 'Workforce management'],
          ['Allowed days and hours', 'Workforce management'],
        ],
        note: [
          'The requester states a need, workforce management decides on capacity. Coverage constraints are invisible on the requester\'s side: they see exactly what they asked for, and the engine absorbs the complexity.',
        ],
      },
      {
        heading: 'Explicability over optimality',
        type: 'prose',
        body: [
          'The engine tests slots in order and keeps the first one that satisfies every constraint: a greedy first-fit, not an optimiser. It finds a valid schedule, not necessarily the most compact one.',
          'That was deliberate. An optimiser might produce a tighter schedule, but it could not explain why a given slot was turned down. This one records the reason for every rejection, and that is what makes it usable: the person deciding understands the result and can challenge it. On a tool that supports a human decision, being able to explain is worth more than being optimal.',
        ],
      },
      {
        heading: 'The metric it created',
        type: 'quote',
        body: [
          'Every session records its origin, who declared it and when. That made one indicator possible, and it became the centre of the dashboard:',
        ],
        quote: 'The lag between a session ending and the moment it is declared.',
        note: [
          'It separates teams that declare in real time from teams that reconcile after the fact. Nobody measured that behaviour before, and nothing made it observable: informal trainings left no trace at all.',
        ],
      },
      {
        heading: 'Engineering safeguards',
        type: 'list',
        items: [
          '**Writes serialised with a lock.** Two simultaneous declarations can no longer overwrite each other.',
          '**Columns matched by name, never by position.** The sheet is co-owned by people who do not know the code exists.',
          '**No reading from mirrored sources.** A tab fed by a cross-file import formula only recalculates when a person opens the file, so the automated job was reading frozen data with no error and no signal.',
          '**A full test mode.** The whole flow runs without touching any calendar.',
        ],
      },
      {
        heading: 'What I learned',
        type: 'list',
        items: [
          '**Do not trust a view.** Until you trace data back to the file where it is *written*, you do not know how fresh it is. This was the second time I met that failure mode, on two unrelated systems.',
          '**Instrument failure before building.** A consolidation job failed 6 times out of 7 for a month without anyone knowing, because a monthly tab name was hard-coded. An automation that fails silently is worse than a manual process.',
          '**Never impose a rule reality contradicts.** A time window was designed as a ban; the first real case already broke it. It became an overridable default. A rule that forbids what the floor allows ends up bypassed with parallel files, and the data goes with it.',
          '**Make visible any constraint that produces a surprising result.** The first user feedback was about a session count that looked wrong. It was a correct rule applied without explanation. Fixed by showing the exact reason for every rejected slot.',
        ],
      },
      {
        heading: 'What it does not do',
        type: 'list',
        items: [
          'No notion of skills or prerequisites: the requester picks participants without the engine knowing whether the training is relevant to them.',
          'No training history per person, so fairness cannot be measured.',
          'No room booking, and a trainer could in theory be placed in two sessions at once.',
          'Confirmation is all or nothing: if one session out of seven is a problem, the whole request is renegotiated.',
          '**The most important limit:** ceilings are based on headcount, not on forecast workload, so a training is still possible on a peak day. Crossing the ceilings with the volume forecast is the change that would add the most value.',
        ],
      },
    ],
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
export const heroProjects = sortedProjects.filter((p) => p.hero);
export const secondaryProjects = sortedProjects.filter((p) => !p.hero);
export const getProject = (slug) => projects.find((p) => p.slug === slug);

export default projects;
