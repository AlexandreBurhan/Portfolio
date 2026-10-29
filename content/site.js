// Site-wide identity and home-page copy.
// Writing rules: no em dashes, ' | ' as separator, plain first person.

const site = {
  name: 'Alexandre Burhan',
  disciplines: ['Data Analysis', 'Automation', 'Operations'],
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
  cv: '', // e.g. '/Alexandre-Burhan-CV.pdf' once the file is in /public

  description:
    'Data analysis, automation and operations. Systems built in production for a multi-site contact centre operation.',

  intro: [
    'When I joined my current team, two things struck me.',
    'Callback slots were being opened by feel every week, even though every number needed to size them properly was already sitting in our tables. And when I asked how a metric was calculated, the answer depended on who happened to be at their desk that week.',
    "Same problem, twice: the knowledge existed, it just wasn't in a system. So I started building the systems.",
    "I work in workforce management for a contact centre operation across four sites and several outsourced partners. In practice the job is two things: making sure decisions get made on numbers that are actually true, and taking the repetitive work off people's plates. If a task runs the same way every week, it shouldn't need a person to remember it.",
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
    'MSc in Management and MSc in Data Analytics & AI, EDHEC Business School.',
  ],

  theme: {
    heading: 'A recurring theme',
    body: [
      'Three of these projects involve the same failure mode: **a system that fails without raising an error.** A frozen pipeline still serving numbers. A mirrored sheet that only refreshes when a person opens the file. An import returning a success status on an empty file.',
      'I found the first two by accident. By the third project, failure detection was a design requirement rather than a discovery.',
    ],
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
