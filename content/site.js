// Site-wide identity and home-page copy.
// Writing rules: no em dashes, ' | ' as separator, plain first person.

const site = {
  name: 'Alexandre Burhan',
  disciplines: ['Data Analysis', 'Automation', 'Operations'],
  // Hero line under the name, and the short tool list beside it.
  tagline: 'I build the tools a four-site contact centre operation runs on, and keep them running.',
  heroTools: ['SQL', 'BigQuery', 'Python', 'Make', 'Apps Script'],
  experience: [
    '3 years across France, the United States and Spain',
    'Canal+',
    'Air France KLM',
    'papernest',
  ],
  email: 'alexandre.burhan@edhec.com',
  linkedin: 'https://www.linkedin.com/in/alexandre-burhan-901007164/',
  github: 'https://github.com/AlexandreBurhan',
  location: 'Barcelona, open to relocation',
  cv: '/Alexandre-Burhan-CV.pdf', // web-safe CV, built from cv/cv.html
  // Resume card in the intro band. Shown only when `cv` is set.
  resume: {
    heading: 'My resume',
    body: 'One page with my experience, education and skills, as a PDF.',
  },
  // Portrait on the home page. Empty src: nothing renders.
  photo: {
    src: '/images/portrait.jpg',
    alt: 'Alexandre Burhan in a graduation gown and cap.',
  },

  description:
    'Data analysis, automation and operations. Tools I built and run in production for a contact centre operation across four sites.',

  intro: [
    'I like making sense of the data in front of me, and taking apart processes that look complicated and get done by hand every week.',
    'Usually the two go together. A number looks off, so I trace where it comes from. A task eats a morning every week, so I work out which part of it really needs a person.',
    "Right now that's workforce management, for a contact centre operation spread over four sites and several outsourced partners. Two things struck me when I joined. Callback slots were opened by feel every week, even though every number needed to size them was already in our tables. And the way a metric was calculated depended on who happened to be at their desk.",
    "In both cases the knowledge existed. It just wasn't written into anything. So I started building the systems, and I still work from the same idea: if a task runs the same way every week, nobody should have to remember to do it.",
  ],

  // "What I do": one line per kind of work, each pointing at the project that
  // shows it. `project` is a slug from projects.js (optional).
  services: [
    {
      title: 'Data analysis and reporting',
      body: 'SQL on BigQuery, dashboards in Looker Studio and Power BI, and checking that a number can be trusted before anyone makes a decision on it.',
      tools: ['SQL', 'BigQuery', 'Looker Studio', 'Power BI'],
      projects: ['bpo-performance-console'],
    },
    {
      title: 'Operations and workforce planning',
      body: 'Daily service performance across sites and outsourced partners, plus planning tools that lay the trade-offs out for whoever has to make the call.',
      tools: ['Workforce planning', 'BPO performance', 'Forecasting'],
      projects: ['training-scheduling-engine'],
    },
    {
      title: 'Workflow automation',
      body: 'Weekly processes rebuilt to run end to end in Make or Apps Script. When a step fails, someone gets an alert.',
      tools: ['Make', 'Apps Script', 'REST APIs'],
      projects: ['saturday-slots-automation'],
    },
    {
      title: 'AI assistants and agents',
      body: 'LLM tools that take the repetitive part of a job and leave the decision to a person. One answers questions from validated definitions only. The other scores job offers and fills in forms for me to check.',
      tools: ['LLM APIs', 'Notion', 'Make', 'Playwright'],
      projects: ['wfm-assistant', 'job-search-agent'],
    },
    {
      title: 'Python and predictive modelling',
      body: 'From pulling data out of APIs to a classification model, tested on a season it never saw and held against a simple baseline it has to beat.',
      tools: ['Python', 'pandas', 'scikit-learn', 'CatBoost'],
      projects: ['formula-1-winners-prediction'],
    },
    {
      title: 'Pricing and cost analysis',
      body: 'Cost models and pricing for aircraft repairs at Air France KLM, from historical work orders up to the bids presented to leadership.',
      tools: ['Excel', 'Power Query', 'Power BI'],
      projects: [],
    },
  ],

  tools: [
    { family: 'Data', items: ['SQL', 'BigQuery', 'Python', 'Looker Studio'] },
    { family: 'Automation', items: ['Make', 'Google Apps Script', 'JavaScript', 'REST APIs'] },
    {
      family: 'Operations',
      items: ['Workforce planning', 'BPO performance', 'Forecasting', 'KPI governance'],
    },
  ],

  background: [
    'Before this I was a data and pricing analyst at **Air France KLM E&M** in Miami, pricing aerospace repairs and presenting bids to the executive committee. Before that, subscriber analytics at **Canal+** in Paris.',
  ],

  theme: {
    heading: 'Something I keep running into',
    body: [
      'Three of these projects hit the same kind of failure, **a system that breaks without raising an error.** A frozen pipeline that kept serving numbers. A mirrored sheet that only refreshed when someone opened the file. An import that reported success on an empty file.',
      'I found the first two by accident. By the third project I was designing for it from day one.',
    ],
  },

  // Degrees and certificates, one row each. Empty list: the section is hidden.
  // { title, issuer, year, image?: { src, width, height }, link? }
  // image: a scan or screenshot of the certificate in /public/images/credentials.
  // Inspect each one first and mask birth dates, QR codes, signatures and
  // certificate IDs. Link only to verification pages that show nothing personal
  // (the EDHEC one shows the birth date, so it is not linked).
  credentials: [
    {
      title: 'MSc in Data Analytics & Artificial Intelligence',
      issuer: 'EDHEC Business School',
      year: '2023',
      // Redacted copy: birth date, QR code and signature removed.
      image: { src: '/images/credentials/edhec-msc-data-analytics.png', width: 640, height: 452 },
    },
    {
      title: 'Master in Management (Grande École programme)',
      issuer: 'EDHEC Business School',
      year: '2023',
      // Redacted copy: birth date and student number removed.
      image: { src: '/images/credentials/edhec-master-in-management.png', width: 640, height: 480 },
    },
    {
      title: 'SQL Practice: Intermediate Queries',
      issuer: 'LinkedIn Learning',
      year: '2025',
      image: { src: '/images/credentials/linkedin-sql-practice-intermediate-queries.png', width: 640, height: 482 },
      link: 'https://www.linkedin.com/learning/certificates/8dee49a362cbabd31e5c9a481e0a7ce71ef2a6b9f8549054087cb41c858c3c5c',
    },
    {
      title: 'SQL Essential Training',
      issuer: 'LinkedIn Learning',
      year: '2025',
      image: { src: '/images/credentials/linkedin-sql-essential-training.png', width: 640, height: 482 },
      link: 'https://www.linkedin.com/learning/certificates/7cf9845d383798a1e971e9e03dc475c27fbbfb7e7c022da00638ecf16d3802f9',
    },
  ],

  contact: {
    heading: 'Get in touch',
    body: ["I'm looking for Data Analyst, Operations Analyst and Automation roles, in Barcelona or elsewhere."],
  },

  about: {
    heading: 'About',
    body: [
      "I'm an operations and data analyst. I work in workforce management for a contact centre operation spread over four sites and several outsourced partners. I own daily service performance there, and I build the tools the team runs on.",
      'Before that I spent close to two years in Miami as a data and pricing analyst at Air France KLM Engineering & Maintenance, pricing aerospace repairs and presenting bids to the executive committee. Earlier, I analysed subscriber behaviour at Canal+ in Paris.',
      'I studied at EDHEC Business School, where I did the Master in Management (Grande École programme) and an MSc in Data Analytics & Artificial Intelligence.',
      'The work I enjoy most sits between the data and the floor. I check whether the numbers people decide on are true, then build whatever keeps them true.',
      'French is my first language, my English is fluent and my Spanish intermediate. I live in Barcelona and I am open to relocating.',
    ],
  },
};

export default site;
