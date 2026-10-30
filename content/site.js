// Site-wide identity and home-page copy.
// Writing rules: no em dashes, ' | ' as separator, plain first person.

const site = {
  name: 'Alexandre Burhan',
  disciplines: ['Data Analysis', 'Automation', 'Operations'],
  // Hero line under the name, and the short tool list beside it.
  tagline: 'Systems built in production for a multi-site contact centre operation.',
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
    body: 'One page: experience, education and skills, as a PDF.',
  },
  // Portrait on the home page. Empty src: nothing renders.
  photo: {
    src: '/images/portrait.jpg',
    alt: 'Alexandre Burhan in a graduation gown and cap.',
  },

  description:
    'Data analysis, automation and operations. Systems built in production for a multi-site contact centre operation.',

  intro: [
    'I like making sense of the data in front of me, and simplifying processes that look complicated and get repeated by hand.',
    'The two usually go together. A number looks off, so I trace where it comes from. A task takes a morning every week, so I look at which part of it actually needs a person.',
    'Today I do this in workforce management, for a contact centre operation across four sites and several outsourced partners. When I joined the team, two things stood out. Callback slots were opened by feel every week, even though every number needed to size them was already sitting in our tables. And how a metric was calculated depended on who happened to be at their desk that week.',
    "Same problem, twice: the knowledge existed, it just wasn't in a system. So I started building the systems. If a task runs the same way every week, it shouldn't need a person to remember it.",
  ],

  // "What I do": one line per kind of work, each pointing at the project that
  // shows it. `project` is a slug from projects.js (optional).
  services: [
    {
      title: 'Data analysis and reporting',
      body: 'SQL on BigQuery, dashboards in Looker Studio and Power BI, and the checks that tell you whether a number can be trusted before anyone decides on it.',
      tools: ['SQL', 'BigQuery', 'Looker Studio', 'Power BI'],
      project: 'bpo-performance-console',
    },
    {
      title: 'Workflow automation',
      body: 'Weekly processes rebuilt to run end to end in Make or Apps Script, with an alert when a step fails instead of a silent gap.',
      tools: ['Make', 'Apps Script', 'REST APIs'],
      project: 'saturday-slots-automation',
    },
    {
      title: 'Operations and workforce planning',
      body: 'Daily service performance across sites and outsourced partners, and planning tools that make the trade-offs visible to the people who decide.',
      tools: ['Workforce planning', 'BPO performance', 'Forecasting'],
      project: 'training-scheduling-engine',
    },
    {
      title: 'Data governance and AI assistants',
      body: 'One agreed definition per metric, and assistants that answer only from validated entries.',
      tools: ['Notion', 'Make', 'LLM APIs'],
      project: 'wfm-assistant',
    },
    {
      title: 'Pricing and cost analysis',
      body: 'Cost models and pricing for aircraft repair work at Air France KLM, from historical work orders to the bids presented to leadership.',
      tools: ['Excel', 'Power Query', 'Power BI'],
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
    'Data & pricing analyst at **Air France KLM E&M** in Miami, pricing aerospace repairs and presenting bids to the executive committee. Before that, subscriber analytics at **Canal+** in Paris.',
  ],

  theme: {
    heading: 'A recurring theme',
    body: [
      'Three of these projects involve the same failure mode: **a system that fails without raising an error.** A frozen pipeline still serving numbers. A mirrored sheet that only refreshes when a person opens the file. An import returning a success status on an empty file.',
      'I found the first two by accident. By the third project, failure detection was a design requirement rather than a discovery.',
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
    { title: 'MSc in Management', issuer: 'EDHEC Business School', year: '2023' },
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
    body: ['I am looking for Data Analyst, Operations Analyst and Automation roles, in Barcelona or elsewhere.'],
  },

  about: {
    heading: 'About',
    body: [
      'I am an operations and data analyst. I currently work in workforce management for a contact centre operation spread across four sites and several outsourced partners, where I own daily service performance and build the tools the team runs on.',
      'Before that I spent close to two years as a data and pricing analyst at Air France KLM Engineering & Maintenance in Miami, pricing aerospace repairs and presenting bids to the executive committee. Earlier, I analysed subscriber behaviour at Canal+ in Paris.',
      'I studied at EDHEC Business School: an MSc in Management and an MSc in Data Analytics & Artificial Intelligence.',
      'The work I enjoy most sits between the data and the operation: finding out whether the numbers people decide on are actually true, and then building whatever keeps them that way.',
      'French, fluent in English, intermediate Spanish. Based in Barcelona and open to relocation.',
    ],
  },
};

export default site;
