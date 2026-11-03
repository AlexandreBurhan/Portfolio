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
    slug: "bpo-performance-console",
    title: "Partner Performance Console",
    year: "2026",
    hero: true,
    order: 1,
    headline: "A partner performance console, rebuilt from the SQL up, that exposed a pipeline frozen for eight months.",
    summary: "My weekly reviews with outsourced partners ran on a generic dashboard that couldn't show who kept missing target. So I rebuilt the chain myself: the SQL extraction, a data layer made for this review, and a small web app on top.",
    stack: ["SQL", "BigQuery", "Apps Script", "JavaScript"],
    links: {
      demo: "",
      code: "",
    },
    cover: {
      src: "/images/bpo-console.png",
      width: 1163,
      height: 795,
      alt: "Demo of the BPO Performance Console on synthetic data: five KPI cards with targets and trend lines, a ranking of agents off target, a multi-KPI profile, and a repeat-offenders table with weekly streak bars.",
      caption: "The console on synthetic demo data. Every name and figure in it is made up.",
    },
    impact: [
      "Found a source pipeline that had silently stopped updating **8 months** earlier",
      "Caught my own aggregation error, which showed **12.5%** where the real site figure was **8.2%**",
      "Built an agent-level view of **five** key performance indicators (KPIs) for outsourced partners in **three** countries",
    ],
    sections: [
      {
        heading: "Context",
        type: "prose",
        body: [
          "Every week I sit down with several outsourced contact centres, in three countries, to go through their numbers. Five auxiliary-time KPIs: break, hold, coaching, after-call work and training. Each one has a contractual target, for the site as a whole and for every agent on it.",
          "A good review answers three questions. Where does the site stand against its targets, and which way is it heading? Who is driving the gap, the whole floor or six people? And what did we agree last week, and has it moved? Most reviews fall apart on that last one.",
        ],
      },
      {
        heading: "The problem",
        type: "prose",
        body: [
          "The review ran on a Looker Studio dashboard built to cover everything at once. It carried plenty of variables that had nothing to do with auxiliary time and had no real week-on-week reading, so a trend looked the same as noise. There was no usable view per agent either. Nothing showed who kept coming back, on which KPI, or for how long.",
          "Whatever partners committed to went into a separate document that nobody checked against the data. Six weeks later the same KPI was red again and we started from scratch.",
        ],
      },
      {
        heading: "What I built",
        type: "prose",
        body: [
          "I started with the SQL. The extraction queries on BigQuery are mine, written at one grain: site × agent × week × KPI. Picking that grain was the decision that mattered most, because streak detection and crossing several KPIs both depend on it. The results land in a Google Sheets data layer I set up for this review, instead of a generic model built for something else.",
          "On top sits a web app in Apps Script and JavaScript. The backend reads three tabs that look nothing alike (a site × week pivot, a long agent × KPI × week table and a free-text meeting log) and turns them into one dataset. The frontend is a single HTML file. No framework, no build step.",
          "There's no server, no database, no deployment pipeline and no credentials to rotate. I was building and maintaining it alone, and every extra dependency would have been mine to carry.",
        ],
      },
      {
        heading: "What the console shows",
        type: "table",
        columns: ["Block", "The question it answers"],
        rows: [
          [
            "KPI cards",
            "Site result against target, week-on-week change, 10-week trend line, 104-week reference",
          ],
          [
            "Agents off target",
            "Ranked by relative gap to target, with tenure",
          ],
          [
            "Multi-KPI profiles",
            "Agents above target on two or more KPIs in the same week, who need individual follow-up",
          ],
          [
            "Repeat offenders",
            "Consecutive weeks above target per agent and per KPI, which separates an accident from an established problem",
          ],
          [
            "Meeting log",
            "What I raised, what the partner answered, the action committed, its owner and its status",
          ],
        ],
        note: [
          "The meeting log writes straight back into the source spreadsheet, so commitments sit next to the rest of the reporting instead of drifting off into a forgotten document.",
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/images/bpo-meeting-log.png",
          width: 1155,
          height: 440,
          alt: "Meeting log on synthetic data: two weekly entries, each with the analyst comment, the partner response, the action committed and a status.",
          caption: "The meeting log, where a weekly conversation becomes a commitment someone can check.",
        },
      },
      {
        heading: "What the data turned up",
        type: "prose",
        body: [
          "None of this was in the brief. It's still my favourite part.",
          "**A pipeline frozen for eight months.** While checking the chain I saw one agent with 2,351 days of tenure in one source and 2,575 in a recent export. That's 224 days, about 32 weeks. One of the pipelines feeding the agent view had stopped updating eight months earlier while the other carried on. Nothing flagged it, and the dashboard kept showing numbers. They were just old. Tenure grows by exactly one day per day, so comparing it across sources is a cheap way to catch this kind of drift.",
          "**An error I had made myself.** My first version computed the KPI cards from the agent table and showed a break rate of 12.5%. The real site figure was 8.2%. An average over the agents above target and the site average tell opposite stories. I split them into separate sources and separate parts of the screen, and the gap between them became a signal of its own. Small gap, the problem is spread across the floor. Large gap, it sits with a few people.",
          "**A false alarm I didn't raise.** A spike on a KPI can be real drift, or a new cohort in training pushing some auxiliary times up for a few weeks. Tenure tells the two apart. Blaming a partner for a change in the mix of people would have cost the review its credibility.",
        ],
      },
      {
        heading: "Decisions I'd make again",
        type: "prose",
        body: [
          "Streaks count the weeks that have data. If the upstream job skips a week, a plain calendar count resets every streak to 1 and hides exactly the chronic cases this view is for.",
          "Repeat offenders are sorted by streak length first, then by severity. Five weeks at 3× target comes before two weeks at 8×, because the first is a problem nobody has dealt with and the second might still be a bad fortnight.",
          "The server re-reads a row before writing to it. The client sends the site and week it expects on that row, and if they've changed, the write is refused. Anyone can re-sort a shared sheet, and a stale row number would otherwise overwrite someone else's note without a trace.",
          "Columns are matched by name. Part of the sheet belongs to people who don't know the app exists, and sooner or later they'll reorder it.",
        ],
      },
      {
        heading: "Data protection",
        type: "prose",
        body: [
          "The app shows individual performance data about people employed by other companies. That shaped the architecture more than any technical preference.",
          "Plenty of tutorials would publish the sheet as a public CSV. That puts personal data behind a URL with no login, no access log and no way to revoke it, so I didn't. The app is deployed as a web app restricted to the company domain. The data stays inside, sign-in is native, and access is logged.",
          "One thing worth knowing about that setup. A web app that runs as me runs every query with my permissions, so everyone who opens it reads the data as me. On personal data, deciding who gets the link is a governance decision, and I treated it as one.",
        ],
      },
      {
        heading: "What I'd do differently",
        type: "prose",
        body: [
          "Check the freshness of every source before building on it. I found the frozen pipeline by luck, by comparing two metadata fields, and a last-updated check from day one would have caught it on purpose. It's now the first thing I set up on any new data chain.",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "saturday-slots-automation",
    title: "Callback Slots Automation",
    year: "2026",
    hero: true,
    order: 3,
    headline: "A fragile weekly process automated end to end, and a sensitivity test: one miscounted person costs eight slots.",
    summary: "Every week, Saturday callback slots were opened by hand against a hard deadline, with one person at the start of the chain. I automated it end to end, then found the counting rule that had been quietly closing slots.",
    stack: ["Make", "Google Sheets API", "REST API", "Slack API"],
    links: {
      demo: "",
      code: "",
    },
    // Home-page list thumbnail: the cover is a diagram, too dense to shrink.
    thumb: {
      src: "/images/saturday-scenarios.png",
      width: 1355,
      height: 576,
    },
    cover: {
      diagram: "saturday-timeline",
      caption: "Everything has to finish before the 15:30 deadline. After that, slots can't be opened in time.",
    },
    impact: [
      "Measured the sizing model's sensitivity: one person miscounted means **eight** customer slots lost",
      "Replaced a **seven-step**, two-day manual process that took about **45 minutes** a week",
      "Added five checks that must all pass before slots are announced, leaving almost **2 hours** to react",
    ],
    sections: [
      {
        heading: "Context",
        type: "prose",
        body: [
          "Saturday callback slots don't open themselves. How many we open depends on how many people will be working that day, and that changes every week. So someone had to collect who was coming, turn the headcount into slots per half hour and push the result into the telephony tool.",
          "Two skill groups, four sites, seventeen half-hour slots between 09:00 and 17:00.",
        ],
      },
      {
        heading: "The problem",
        type: "prose",
        body: [
          "By hand it took seven steps over two days, with a wait in the middle. A request went out on Wednesday and site leads answered. Then on Thursday came the counting, the calculation, the export, the import and the announcement. About 45 minutes a week, and the time wasn't what worried me.",
          "Slots have to be open by Thursday afternoon or customers can't book. The very first step was a manual addition by one person on Wednesday morning, with nobody named as backup. And the whole thing ran on memory. Nobody was careless, but a weekly manual process misses now and then by design, and a miss here couldn't be recovered because it only showed up on Saturday, when the slots should already have been open.",
          "No slots, no appointments. No appointments, no prospects.",
        ],
      },
      {
        heading: "One number",
        type: "quote",
        body: [
          "While instrumenting the sizing model I tested how sensitive it is. Moving one skill group from 9 to 10 people takes the total of open slots from 39 to 47.",
        ],
        quote: "Roughly ×8. One person off in the headcount means eight customer slots off.",
        note: [
          "So an approximately right count doesn't exist here. Every person counted wrong ends up in the revenue.",
        ],
      },
      {
        heading: "How it is built",
        type: "prose",
        body: [
          "Six scenarios, because about twenty hours of waiting for people sit between the request and the generation. One linear scenario couldn't have held that.",
          "The target date is computed once and passed along. The generation step writes it and the import step reads it back, so two formulas can never disagree about which Saturday we're on.",
          "The business rule stays in the spreadsheet. The automation moves the data and checks it, and the calculation lives where the team can read it and change it without touching the pipeline. That's what lets someone else take the tool over.",
          "The announcement runs in the same scenario as the import. At first it was a separate scenario on a timer, and since two runs share no state, it would have said \"slots open\" even if the import had failed half an hour earlier. Now it sits behind a check on what the API calls actually returned.",
          "And it runs by default. Thursday morning's preview leaves time to step in, and if nobody does, the chain goes ahead. The deadline shouldn't depend on someone being around, which was the original problem.",
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/images/saturday-scenarios.png",
          width: 1355,
          height: 576,
          alt: "List of the six automation scenarios, from kickoff to push, with the sixth one disabled and labelled deprecated because its logic moved into the push step.",
          caption: "Five active steps and one retired. The reason is in its name, so nobody has to guess why it's off.",
        },
      },
      {
        heading: "Making failure loud",
        type: "prose",
        body: [
          "On two earlier projects I'd found data chains that were frozen and raised no error. So here the question was whether someone would find out in time if it broke.",
          "The Wednesday chase now has three outcomes. It used to have two.",
        ],
      },
      {
        type: "table",
        columns: ["Condition", "Message"],
        rows: [
          [
            "Answers are missing",
            "Reminder, naming the site lead responsible",
          ],
          ["Everything is filled in, and rows exist", "Confirmation"],
          ["**No rows found at all**", "**Anomaly alert**"],
        ],
        note: [
          "The third row is the new one. Before, \"nothing missing\" and \"nothing read\" produced the same reassuring message. It also covers the manual first step. If nobody added the Saturday rows, the alert fires on Wednesday afternoon, three days before anyone would otherwise notice.",
          "Before anything is announced, five checks have to pass together. Both imports must return success, the target date must be a Saturday, and both files must hold at least one data row. Those last two close a real hole, because an import can return success on a file that only has a header. Zero slots opened, two green lights. When a check fails, the alert names it, with almost two hours left before the deadline.",
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/images/saturday-slack.png",
          width: 1716,
          height: 916,
          alt: "Two automated Slack messages: the Wednesday request asking site leads to fill in Yes, No or Maybe before Thursday noon, and the Thursday announcement that slots are open, with skill group names redacted.",
          caption: "What the team sees: the Wednesday request, and the announcement that only goes out once every check has passed.",
        },
      },
      {
        heading: "What a Maybe means",
        type: "prose",
        body: [
          "Site leads answer Yes, No or Maybe. The count treated every Maybe as an absence, and blank cells too.",
          "A Maybe is a probability of turning up. And the same sheet already held who actually came, in a column people had filled in for months without anyone using it.",
          "Crossing the two on a first sample, **still too small to conclude**, suggests most Maybes do come to work. Counting them as zero would then under-open slots every week, and the ×8 would amplify it.",
          "So I proposed replacing the yes-or-no count with an estimate:",
        ],
      },
      {
        type: "code",
        code: "expected headcount = (Yes × site attendance rate)\n                   + (Maybe × site Maybe coefficient)",
        note: [
          "Both coefficients can be calibrated per site over eight to ten weeks, from data that's already there. The forecast error would also become measurable for the first time. This is a proposal and hasn't shipped yet.",
        ],
      },
      {
        heading: "Two rules nobody had written down",
        type: "prose",
        body: [
          "The number of slots per half hour depends on a coefficient that changes by hour and differs between the two skill groups. Both curves are stable and consistent, so someone built them on purpose, but where they come from isn't written anywhere. The column header even suggests a flat percentage that isn't applied. Whoever takes over the file next would apply it and break the sizing.",
          "One API parameter takes two values depending on the time of the slot. There was no documentation, so I worked the rule out from past imports and kept it exactly as it was, to reproduce what the manual import did.",
          "Automating a calculation whose parameters nobody can explain only makes the risk faster. Writing those two rules down will outlast the automation.",
        ],
      },
      {
        heading: "What it doesn't do yet",
        type: "prose",
        body: [
          "There's no switch for unusual weeks, so a bank holiday would produce an alert or an opening nobody wants. A skip list read at the first step would fix it. The first step is also still manual: one person adds the Saturday rows every Wednesday morning. Generating them from the scheduling tool would remove that single point of failure and give back half a day.",
          "Date filtering compares text, so a format change on the date column would match zero rows without an error. The row counters would catch it, but parsing the date is the proper fix. And slot fill rate isn't tracked yet. It's the one metric that would tell me whether the model opens too many slots or too few, and sizing them from that data is the next step.",
        ],
      },
      {
        heading: "What I took from it",
        type: "prose",
        body: [
          "Three incidents on this project had the same signature, a system reporting a success it had never checked. An API field that was always null, read as a success flag. A \"nothing to chase\" that came from counting zero rows. A safeguard whose conditions were joined with OR instead of AND, which let everything through without a single symptom. Since then I check the effect and ignore the acknowledgement, and every step I build has to tell \"all clear\" apart from \"found nothing\".",
          "I also lost a few rounds fixing things from hypotheses, re-reading the logic when the execution logs pointed straight at the broken step. Now I look at the logs first. And I ship one unknown at a time, with everything else held fixed, so any gap has a single cause.",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "wfm-assistant",
    title: "Metrics Dictionary and Assistant",
    year: "2026",
    hero: true,
    order: 2,
    headline: "One agreed definition per metric, and a Slack assistant that only quotes validated ones.",
    summary: "The same metric was being calculated three different ways depending on who ran it. I built a dictionary in Notion where every entry carries a status, then an assistant on top that only ever sees the validated entries.",
    stack: ["Notion", "Make", "Google Gemini", "Slack API"],
    links: {
      demo: "",
      code: "",
    },
    cover: {
      src: "/images/wfm-sla30.png",
      narrow: true,
      width: 760,
      height: 660,
      alt: "The WFM Assistant in Slack answering a request for the definition of SLA30: what it measures, why it matters, the formula as callbacks made within 30 minutes divided by total leads to call back, and where it is used.",
      caption: "A definition with its formula and its reason, so two people compute it the same way.",
    },
    impact: [
      "Governed about **55** entries (KPIs, skill groups, roles, and tools), each with a validation status",
      "Filtered unvalidated definitions out at every sync, so they never reach the model",
      "Skipped the vector database at this size, with the switch to retrieval set at **300–400** entries",
    ],
    sections: [
      {
        heading: "Context",
        type: "prose",
        body: [
          "When I joined, the same few problems kept coming up. One KPI was calculated differently depending on who produced it, so trade-offs were made on numbers that couldn't be compared. Nothing described what each skill group covered, which made routing and forecasting rough. And knowledge of the tools lived in people's heads and in old Slack threads. Every new joiner started from zero and ramped up depending on who had time for them.",
          "A question asked forty times is annoying. A question answered three different ways is how the wrong number ends up in a decision.",
        ],
      },
      {
        heading: "What was really wrong",
        type: "prose",
        body: [
          "Definitions existed. Some had been checked and some hadn't, and **both circulated as if they had been.**",
          "That changes the fix. Missing documentation calls for writing documentation. Unreliable content that spreads gets worse the more you write. What we needed was a way to separate what's confirmed from what's inferred, and to stop the second from travelling like the first.",
        ],
      },
      {
        heading: "Phase 1: the dictionary",
        type: "prose",
        body: [
          "Four Notion databases with about 55 entries: KPIs with definition, formula and scope, skill groups, roles and tools.",
          "Each entry is a small card with typed fields. I chose that early so the corpus can be split cleanly for semantic search if it ever gets big enough, without rewriting anything.",
          "The governance sits in one field, a status with three values:",
        ],
      },
      {
        type: "table",
        columns: ["Status", "Meaning", "Visible to the assistant"],
        rows: [
          ["`Documented`", "Confirmed on the ground, reliable", "Yes"],
          ["`To validate`", "Inferred or ambiguous", "No"],
          ["`Submitted`", "Waiting for a business owner to decide", "No"],
        ],
        note: [
          "Uncertain formulas are flagged and settled by their business owners before they move to Documented. The filter runs mechanically at sync time, so nobody has to remember a writing convention, and unvalidated content can't reach the model.",
        ],
      },
      {
        heading: "Phase 2: the assistant",
        type: "prose",
        body: [
          "The assistant answers WFM questions in the team's Slack channel, from the dictionary and nothing else. Two separate automation scenarios do the work, with a cache between them.",
          "Every night, a sync reads the four Notion databases, keeps the validated entries and writes them to the cache. When someone posts, a dedicated Slack app picks up the message, an anti-loop filter checks it, the cache is read, the whole lexicon goes into the prompt and the model answers in the thread.",
        ],
      },
      {
        heading: "Choices I made",
        type: "prose",
        body: [
          "At about 55 entries the whole lexicon fits in the model's context window, so I send all of it with every call and skip vector retrieval. That means no embeddings to maintain, no vector database, and no retrieval misses, since the model sees every entry. Past 300 to 400 entries, or once the cost per question starts to show, retrieval takes over, and the cards are already shaped for it.",
          "The assistant never calls the Notion API. It reads the cache. That keeps it clear of rate limits and of Notion's latency, and the sync can fail without taking the assistant down. For a reference dictionary, a day old is fresh enough.",
          "The shared connection in the workspace could read and write, and production automations owned by other teams already ran on it. I didn't want to put flows I don't own at risk, so I created a read-only integration for this project. It only ever needed to read.",
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/images/wfm-refusal.png",
          narrow: true,
          width: 784,
          height: 442,
          alt: "The WFM Assistant in Slack replying that a term does not exist in the WFM dictionary and asking the user to ping the WFM team so it can be clarified and added.",
          caption: "Asked about a term that isn't in the dictionary, it says so and sends the person to the WFM team.",
        },
      },
      {
        heading: "Three things that broke",
        type: "prose",
        body: [
          "Reading the cache failed with no useful message. One parameter had to be passed explicitly, and I found it by elimination.",
          "The assistant answered system messages and kept triggering itself. The fix filters on the bot's ID and on the message subtype, and it needs both. Anything that writes into the channel it listens to has to recognise its own messages.",
          "Then the event channel delivered nothing, with no error and no log. The shared event connector didn't forward channel messages on this workspace. I tested each segment of the chain on its own until I found the broken link, then set up a dedicated Slack app pointing to a webhook the project owns. Delivery has been reliable since, and the flow is still fully event-driven.",
        ],
      },
      {
        heading: "What I haven't done yet",
        type: "prose",
        body: [
          "Questions that get no answer aren't logged yet. That's the next step and the one I care about most, because the dictionary would then grow from real use instead of from me spotting gaps. Accuracy hasn't been evaluated systematically either. So far I've checked it by hand, with questions I knew the answer to.",
          "Several formulas are still waiting for a decision, and they stay hidden until they get one. The dictionary is incomplete on purpose, and what it does show has been checked.",
        ],
      },
      {
        heading: "Looking back",
        type: "prose",
        body: [
          "I treat this as a governance project with a language model as its front end. Plugging in the model was the quick part. Most of the work went into seeing that the failure was organisational, and building something where an unchecked definition has no way to circulate.",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: "training-scheduling-engine",
    title: "Training Scheduling Engine",
    year: "2026",
    hero: true,
    order: 5,
    headline: "A scheduling engine that keeps training from emptying the phones, and explains every refusal.",
    summary: "Training requests came in by chat, by email, and in person, and nothing stopped two sessions from taking the same skill group off the phones at once.",
    stack: ["Apps Script", "JavaScript", "Google Sheets", "Calendar API"],
    links: {
      demo: "",
      code: "",
    },
    cover: {
      diagram: "session-count",
      caption: "The mix of participants sets the number of sessions. The requested group size comes second.",
    },
    impact: [
      "Brought training requests for **143** people, **15** teams, and **four** sites into one entry point",
      "Capped how many people from one skill group can be away at once (**15%** by default)",
      "Created a new indicator: the lag between a session ending and being declared",
    ],
    sections: [
      {
        heading: "Context",
        type: "prose",
        body: [
          "Internal training across four sites, for 143 people in fifteen teams and eight skill groups. Each skill group answers its own queue, so pulling too many people from one group at once hurts service.",
        ],
      },
      {
        heading: "The problem",
        type: "prose",
        body: [
          "Requests came by chat, by email and in person. There was no single entry point and no format, and every request was handled in its own copy of a spreadsheet.",
          "The costly part was something nobody checked at all, **operational coverage.** Two separate trainings could take the same people from the same skill group at the same time, and nobody noticed before the day. Service level dropped, nobody saw it coming, and nobody could explain it afterwards.",
          "Around that, the staff lists were out of date. Each site kept its own copy, and at the switchover the files were still missing two new teams and still listed two that no longer existed. Informal trainings left no record, and some arrangements lived only in two people's heads.",
        ],
      },
      {
        heading: "Two constraints people mix up",
        type: "table",
        columns: ["", "The question", "Where it applies"],
        rows: [
          [
            "**Composition**",
            "How many people from the same skill group in **one session**?",
            "Building the groups",
          ],
          [
            "**Concurrency**",
            "How many people from the same skill group **absent at the same time**, across all trainings?",
            "Placing sessions in the calendar",
          ],
        ],
      },
      {
        heading: "Composition sets the number of sessions",
        type: "prose",
        body: [
          "The number of sessions comes from the most represented skill group among the participants.",
          "Seven people in groups of four looks like two sessions. But three of them share a skill group and the rule allows one per session, so the engine plans **three**.",
        ],
      },
      {
        type: "code",
        code: "sessions = max( ceil(participants / group_size),\n                ceil(largest_skill_group / max_same_group_per_session) )",
      },
      {
        heading: "Concurrency protects production",
        type: "table",
        body: [
          "By default, at most 15% of a skill group's active headcount can be away at once, with a floor of 1. It can be overridden globally, per group or per request.",
        ],
        columns: ["Skill group", "Headcount", "Allowed absent at once"],
        rows: [
          ["Aggregate A", "44", "7"],
          ["Aggregate B", "43", "6"],
          ["Aggregate C", "23", "3"],
          ["Aggregate D", "4", "1"],
          ["Aggregate E", "2", "1"],
        ],
        note: [
          "Halfway through I added a rule linking the two: the concurrency ceiling can never be lower than what composition allows. Without it, some sessions had no valid date at all, and the tool answered \"no slot available\" with no way to tell why.",
        ],
      },
      {
        heading: "What the engine refuses",
        type: "list",
        body: [
          "You learn a lot about a scheduling tool from what it refuses.",
        ],
        items: [
          "The same person in two overlapping sessions. It checks against **every** existing schedule, the current request included, and checks again on the server at validation, since someone can move a slot by hand after the calculation.",
          "A slot that would break the concurrency ceiling. The engine moves on to the next one and **writes down why it skipped it**.",
          "A request with no named team lead, or an e-learning with no link.",
          "A validation based on an old proposal. If a setting changed since the calculation, it recalculates before saving.",
          "A suspiciously small staff import. The existing list is kept instead of being overwritten with truncated data.",
        ],
        note: [
          "Some things only warn. An overlap on a training that already happened gets saved with the conflict recorded. A session that took place has to exist in the system, and hiding the anomaly would hide it from analysis too. The future gets blocked, and the past gets recorded as it happened.",
        ],
      },
      {
        heading: "Who decides what",
        type: "table",
        columns: ["Setting", "Decided by"],
        rows: [
          [
            "Participants, duration, group size, period, preferred time",
            "The requester",
          ],
          [
            "Maximum from one skill group per session",
            "Workforce management",
          ],
          ["Maximum absent at once", "Workforce management"],
          ["Allowed days and hours", "Workforce management"],
        ],
        note: [
          "The requester states a need and workforce management decides on capacity. Requesters never see the coverage rules. They get what they asked for, and the engine deals with the rest.",
        ],
      },
      {
        heading: "Keeping it explainable",
        type: "prose",
        body: [
          "The engine tries slots in order and keeps the first one that satisfies every constraint. It's a greedy first-fit, so it finds a valid schedule, which isn't always the most compact one.",
          "I chose that on purpose. An optimiser could pack sessions tighter, but it couldn't say why a given slot was turned down. This one records a reason for every rejection, so the person deciding can follow the result and push back on it. For a tool that supports a human decision, I'd make that trade again.",
        ],
      },
      {
        heading: "The metric it created",
        type: "quote",
        body: [
          "Every session records where it came from, who declared it and when. That made one indicator possible, and it ended up at the centre of the dashboard:",
        ],
        quote: "The lag between a session ending and the moment it is declared.",
        note: [
          "It shows which teams declare in real time and which ones reconcile afterwards. Nobody had measured that before, and with informal trainings leaving no trace, nobody could have.",
        ],
      },
      {
        heading: "Safeguards",
        type: "prose",
        body: [
          "Writes go through a lock, so two declarations at the same moment can't overwrite each other. Columns are matched by name, because the sheet is co-owned by people who don't know the code exists. The job never reads from mirrored tabs. A tab fed by a cross-file import formula only recalculates when someone opens the file, and the automated job had been reading frozen data with no error. There's also a full test mode that runs the whole flow without touching a single calendar.",
        ],
      },
      {
        heading: "What I learned",
        type: "prose",
        body: [
          "Trace data back to the file where it's written before trusting it. A view says nothing about how fresh it is, and this was the second time I'd met that problem, on two unrelated systems.",
          "A consolidation job failed 6 times out of 7 for a month without anyone knowing, because a monthly tab name was hard-coded. Since then I instrument failure before I build anything. A manual process at least has a person who notices when it breaks. An automation that fails quietly has nobody.",
          "A time window started out as a ban, and the first real case broke it. It's now a default you can override. When a rule forbids what the floor actually needs, people route around it with side files, and the data leaves with them.",
          "The first feedback I got was about a session count that looked wrong. The rule was right, but nothing explained it, so I added the exact reason for every rejected slot.",
        ],
      },
      {
        heading: "What it doesn't do",
        type: "prose",
        body: [
          "The engine knows nothing about skills or prerequisites, so requesters pick participants without it knowing whether the training fits them. There's no training history per person, so fairness can't be measured. Rooms aren't booked, and in theory a trainer could land in two sessions at once. Confirmation is all or nothing, so one problem session out of seven sends the whole request back.",
          "The biggest gap is that ceilings follow headcount rather than forecast workload, so a training can still land on a peak day. Crossing the ceilings with the volume forecast is the change I'd make next.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: 'job-search-agent',
    title: 'Job Search Agent',
    year: '2026',
    hero: true,
    order: 6,
    headline:
      'My job search run as a data pipeline: collect, filter, score, then track what comes back.',
    summary:
      "Every morning it collects offers from a dozen sources, filters out what doesn't fit, scores the rest against my CV, and keeps a record of every application. A results page shows the reply rate, interviews, and refusals by stage, so I can see what works and aim better.",
    stack: ['Python', 'Flask', 'Playwright', 'Gemini API', 'Claude API', 'JavaScript'],
    links: { demo: '', code: '' },
    cover: {
      src: '/images/job-agent-offers.jpg',
      width: 1600,
      height: 1000,
      alt: 'The offers page of the dashboard: a search bar, filters by status, score and date on the left, and offer cards with a match score, contract, work mode, salary and Details and Apply buttons.',
      caption: 'The offers page, on demo data. Every company and offer here is made up, and the interface is in French.',
    },
    impact: [
      "Ran free rule-based filters before any large language model (LLM) call, so only offers worth scoring get scored",
      "Updated each application automatically from replies read in the mailbox",
      "Built a results page with reply rate, interviews, and refusals by stage, by city, and by week",
    ],
    sections: [
      {
        heading: 'Why I built it',
        type: 'prose',
        body: [
          "At work I spend my days on processes shaped like this. Items come in every day, most get filtered out, the rest wait in a queue, and each one has a follow-up date somebody has to remember. My job search had exactly that shape. I was running it by hand across a handful of job boards, a spreadsheet and my inbox, so I built it the way I'd build a tool for my team.",
        ],
      },
      {
        heading: 'How it works',
        type: 'prose',
        body: [
          "It wakes up at 8:00. First stop is the companies' own career sites on Greenhouse, Lever, Ashby, Recruitee and SmartRecruiters, then Workable, Indeed, LinkedIn's public pages and a few remote boards. Anything found away from LinkedIn and Indeed gets a \"less crowded\" tag.",
          "Most offers never reach the LLM. Duplicates go first. Then anything older than a week, titles that miss the target, roles asking for far more experience than I have, and remote jobs that only hire in countries where I can't work. London employers get checked against the Home Office register of licensed visa sponsors. What's left gets a keyword score against my CV, which costs nothing, and only then does Gemini or Claude read the offer and score it out of 100, with salary, contract, work mode and the points for and against.",
          "When I decide to apply, it opens the application page and pre-fills my contact details and CV, with each field marked by where its value came from. I read every form and submit it myself. LinkedIn and Indeed are never automated.",
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/job-agent-offer.jpg',
          width: 1600,
          height: 1000,
          alt: 'An offer opened in a side panel: score 88, salary, contract, work mode, required experience, right to work, a short summary, strengths for the role and points of attention.',
          caption: 'One offer opened from the list, with its score, the facts that decide whether to apply, and what the model found for and against. Demo data.',
        },
      },
      {
        heading: 'Tracking what comes back',
        type: 'prose',
        body: [
          "Sending applications was half the problem. I also wanted to know which ones worked. So the agent reads my mailbox, read-only, and updates each application on its own. A refusal gets logged with its date and the stage it came at. An interview invitation jumps to the top of the home page.",
          "A results page adds it all up. Applications sent, reply rate, interviews, refusals, the ones still silent after three weeks, and the median salary I asked for. Under those sit the funnel from sent to interview, refusals by stage, a breakdown by city and a weekly count. If one city answers twice as often as another, this is where I see it, and where I decide what to aim at next week.",
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/job-agent-results.jpg',
          width: 1600,
          height: 1000,
          alt: 'The results page: applications sent, reply rate, interviews, refusals, applications with no reply and median salary asked, a few one-line findings, then bars for the funnel from sent to offer, refusals by stage, a table by city and the spread of salaries asked.',
          caption: 'The results page on demo data. Reply rate, interviews, refusals by stage, a breakdown by city and the salaries asked, all updated from the mailbox.',
        },
      },
      {
        heading: 'The dashboard',
        type: 'prose',
        body: [
          "Everything runs on my laptop, with a Flask API behind a single-page interface in plain JavaScript. The home page opens on what to do today, follow-ups first, and reminders come up 7 and 14 days after each application. Profile, API keys, offers and contacts stay in local files and never go into the repository.",
        ],
      },
      {
        type: 'figure',
        figure: {
          src: '/images/job-agent-today.jpg',
          width: 1600,
          height: 1000,
          alt: 'The home page: a headline saying follow-ups are waiting, a button to prepare the follow-up, a to-do list with form questions to answer and two applications to follow up, then the best offers to review.',
          caption: 'The home page on a Monday morning. Follow-ups first. Demo data.',
        },
      },
      {
        heading: 'Limits',
        type: 'prose',
        body: [
          "It won't solve a CAPTCHA and it won't sign in for me. On Workday or Taleo I log in myself, then let it fill the page. The score is a first sort, and I still read every offer before I apply.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "formula-1-winners-prediction",
    title: "Formula 1 Winners Prediction",
    year: "2025",
    hero: true,
    order: 4,
    headline: "Predicting Grand Prix winners from pre-race data, tested against the pole-sitter rule.",
    summary: "Eight seasons of race, qualifying, and standings data, features limited to what's known before the lights go out, and five models tested on a season they'd never seen. The one I kept called 12 of the 22 races of 2021. The pole sitter called 11.",
    stack: ["Python", "pandas", "scikit-learn", "CatBoost", "REST API"],
    links: {
      demo: "",
      code: "https://github.com/AlexandreBurhan/Formula-1-Winners-prediction",
    },
    cover: {
      src: "/images/f1-feature-importance.png",
      width: 1050,
      height: 675,
      alt: "Bar chart of feature importance for the Random Forest model: grid position first, then qualifying gap, recent qualifying form and championship position, with finish rate last.",
      caption: "What the kept model leans on. One-lap pace first, then how it has moved over the last few races.",
      narrow: true,
    },
    impact: [
      "Called **12 of 22** races in 2021 with the kept model, against **11** for the pole-sitter rule",
      "Reached a precision of **0.75** on the winner class, with tuning on past seasons only",
      "Found and removed the data leakage that had inflated my first version",
    ],
    sections: [
      {
        heading: "Context",
        type: "prose",
        body: [
          "Only one driver in about twenty wins each race. A model that always says \"won't win\" is right 95% of the time and tells you nothing. So I judged each model two ways. Per driver, on precision and recall for the winners. And per race, by taking the driver with the highest probability as the pick and counting how many races it got right.",
          "The bar was the pole sitter. From 2014 to 2021, the driver starting first won 53% of races.",
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/images/f1-win-rate-by-grid.png",
          width: 1200,
          height: 600,
          alt: "Bar chart of the share of races won from each of the first ten grid slots, 2014 to 2021: about half from pole, falling steeply after.",
          caption: "Share of races won from each grid slot, 2014 to 2021.",
          narrow: true,
        },
      },
      {
        heading: "Data and features",
        type: "prose",
        body: [
          "Race results, qualifying times and championship standings for 2014 to 2021 come from the Jolpica API, which took over from the Ergast API when it shut down, and are cached on disk.",
          "Every feature is something you'd know on Sunday morning. Grid slot, gap to pole in qualifying (in percent), the standings after the previous round, and the driver's average grid, qualifying gap and finishing position over their last three races. Team form replaced a hand-picked \"top team\" flag, which had been chosen by looking at the whole period, test season included.",
        ],
      },
      {
        heading: "Method",
        type: "prose",
        body: [
          "2014 to 2020 to train, 2021 to test. I tuned hyperparameters on past seasons only, with folds that move forward in time (train up to 2017 and validate on 2018, then one more season each round), and picked the model to keep the same way. 2021 was never used to choose anything. The candidates were logistic regression, Random Forest, Gradient Boosting, AdaBoost and CatBoost.",
        ],
      },
      {
        heading: "Results on 2021",
        type: "table",
        columns: ["Model", "Races called", "Precision", "Recall"],
        rows: [
          ["Pole sitter wins (baseline)", "11 of 22", "", ""],
          ["**Random Forest (kept)**", "**12 of 22**", "**0.75**", "0.27"],
          ["CatBoost", "13 of 22", "0.59", "0.45"],
          ["Logistic regression", "12 of 22", "0.62", "0.23"],
          ["Gradient Boosting", "11 of 22", "0.64", "0.32"],
        ],
        note: [
          "When the kept model gives a driver at least a 50% chance, it's right three times out of four. It only gets that confident about 6 of the 22 winners, though. CatBoost did better on 2021 but worse on validation, and keeping it would have meant choosing on the test season.",
        ],
      },
      {
        heading: "What I fixed in my first version",
        type: "prose",
        body: [
          "My first version used whether the driver finished the race, which you only know afterwards, and a win ratio computed over every season, 2021 included. Both inflated the results. The 0.69 precision it reported doesn't survive once they're gone.",
          "Qualifying times were joined on grid position, so a driver with a grid penalty got someone else's lap. They're joined by driver now. Hyperparameters had been picked on their 2021 score. And the data source had closed down, with several cells failing when run in order. The notebook now runs from top to bottom.",
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
