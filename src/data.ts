export const profile = {
  name: 'Hammad Toufeeq',
  firstName: 'Hammad',
  title: 'MERN Stack Developer',
  location: 'Lahore, Pakistan',
  email: 'hammadtoufeeq02@gmail.com',
  phone: '+92 306 1694526',
  phoneHref: 'tel:+923061694526',
  whatsapp: 'https://wa.me/923061694526',
  linkedin: 'https://www.linkedin.com/in/hammad-toufeeq/',
  github: 'https://github.com/hammadtoufeeq',
  resume: '/Hammad-Toufeeq-Resume.pdf',
  roles: [
    'MERN Stack Developer',
    'React + TypeScript Engineer',
    'Node.js API Builder',
    'Full-Stack Problem Solver',
  ],
  intro:
    'I build full-stack web apps end to end: typed React frontends, secure Express APIs and MongoDB data models, shipped to production on Vercel.',
  about: [
    "I'm a Computer Science graduate from the University of Central Punjab (UCP), Lahore, currently working as a MERN Stack Developer Intern at Axcel.",
    'At Axcel I went from learning the stack to shipping a complete product: Influence Platform, a multi-role marketplace with role-based dashboards, campaigns, and digital agreements that both parties sign with a one-time email code.',
    'I care about the parts users never see but always feel: validated inputs, secure auth, clean API contracts, fast loading and interfaces that work in every language and on every screen.',
  ],
  languages: ['English', 'Urdu'],
  availability: 'Open to full-time roles · Onsite (Lahore) or Remote',
}

export const stats = [
  { value: 4, suffix: '', label: 'User roles in one platform' },
  { value: 3, suffix: '', label: 'Languages incl. RTL' },
  { value: 2, suffix: '', label: 'Internships' },
  { value: 100, suffix: '%', label: 'TypeScript, front to back' },
]

export const skillGroups = [
  {
    title: 'Frontend',
    color: 'from-fuchsia-500 to-pink-500',
    items: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'React Router', 'TanStack Query', 'i18next', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend',
    color: 'from-violet-500 to-indigo-500',
    items: ['Node.js', 'Express 5', 'REST API design', 'MongoDB', 'Mongoose', 'Zod validation', 'JWT + cookies', 'Google OAuth', 'Nodemailer', 'Multer'],
  },
  {
    title: 'Quality & Security',
    color: 'from-cyan-500 to-blue-500',
    items: ['Jest', 'Supertest', 'Playwright', 'Helmet', 'Rate limiting', 'bcrypt hashing', 'Input validation'],
  },
  {
    title: 'Tools & Delivery',
    color: 'from-amber-400 to-orange-500',
    items: ['Git & GitHub', 'Vercel', 'Vite', 'Postman', 'VS Code', 'Claude Code', 'Generative AI', 'SAP ERP (MM, FI)'],
  },
]

export const marquee = [
  'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS',
  'TanStack Query', 'Zod', 'JWT', 'Jest', 'Playwright', 'Vercel', 'Git', 'i18next', 'Vite',
]

export const experience = [
  {
    role: 'MERN Stack Developer Intern',
    company: 'Axcel',
    period: 'Jul 2026 – Present',
    location: 'Lahore, Pakistan',
    current: true,
    points: [
      'Built Influence Platform end to end: a production marketplace connecting businesses with creators, journalists, speakers and experts.',
      'Designed a typed Express 5 + MongoDB REST API in MVC style with Zod validation, JWT cookie auth, Google sign-in, rate limiting and Helmet.',
      'Implemented role-based dashboards for 4 account types (Admin, Business, Manager, Talent) with verification and approval workflows.',
      'Shipped a digital agreement flow with milestones, signed by both business and talent using a one-time code sent by email.',
      'Delivered a fully translated UI in English, Urdu and Arabic (right-to-left), with dark mode and a mobile-first layout.',
      'Wrote API tests with Jest, Supertest and an in-memory MongoDB; deployed frontend and backend on Vercel.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
  },
  {
    role: 'Information Systems Intern',
    company: 'Fauji Fertilizer Company (FFC), Commercial Tower',
    period: 'May 2026 – Jun 2026',
    location: 'Lahore, Pakistan',
    current: false,
    points: [
      'Worked hands-on in SAP ERP across the Materials Management (MM) and Finance (FI) modules, using standard SAP transaction codes (T-codes).',
      'Followed the procure-to-pay flow in SAP MM: purchase requisitions, purchase orders, goods receipt and invoice verification.',
      'Explored SAP FI postings and reports, and saw how MM transactions flow into finance and accounting.',
      "Supported the IS team in the day-to-day running of the company's business information systems.",
    ],
    tags: ['SAP ERP', 'SAP MM', 'SAP FI', 'T-codes', 'Information Systems'],
  },
]

export const influence = {
  name: 'Influence Platform',
  tagline: 'Where businesses find, hire and work with talent.',
  description:
    'A full-stack marketplace that takes a deal from the first search to a signed agreement and a final review. Businesses discover creators, journalists, speakers and experts, post campaigns, and sign milestone-based agreements, all in one place.',
  live: 'https://influencer-frontend-kappa.vercel.app',
  frontend: 'https://github.com/hammadtoufeeq/influencer_frontend',
  backend: 'https://github.com/hammadtoufeeq/influencer_backend',
  highlights: [
    {
      icon: '✍️',
      title: 'Two-party digital agreements',
      text: 'Business and talent agree on work, milestones and payments, then each signs with a one-time code emailed to them. Every step is recorded.',
    },
    {
      icon: '🛡️',
      title: '4 roles, real permissions',
      text: 'Admin, Business, Manager and Talent each get their own dashboard. Only verified businesses can hire; managers act only with talent approval.',
    },
    {
      icon: '📣',
      title: 'Campaigns & hire requests',
      text: 'Businesses post open calls with budgets and deadlines; talent apply with their profile, or get hired directly.',
    },
    {
      icon: '🔎',
      title: 'Search that scales',
      text: 'Filter by profession, industry, topic, country, city, language and follower count, with paginated, sortable results.',
    },
    {
      icon: '🌍',
      title: 'English, Urdu & Arabic',
      text: 'Every screen is translated, with full right-to-left layout, dark mode and mobile-first design.',
    },
    {
      icon: '⭐',
      title: 'Milestones & reviews',
      text: 'Talent delivers each milestone, the business approves it, and both sides leave star reviews at the end.',
    },
  ],
  stack: {
    Frontend: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'TanStack Query', 'React Router 7', 'i18next'],
    Backend: ['Node.js 22', 'Express 5', 'TypeScript', 'MongoDB', 'Mongoose', 'Zod', 'JWT', 'Google OAuth', 'Nodemailer'],
    'Security & Testing': ['Helmet', 'Rate limiting', 'bcrypt', 'Jest', 'Supertest', 'mongodb-memory-server'],
  },
  flow: ['Request', 'Routes', 'Middlewares', 'Controller', 'Model', 'Response'],
}

export const glowbot = {
  name: 'GlowBot',
  label: 'Final Year Project',
  tagline: 'Your AI skin-care assistant.',
  description:
    'An app that scans your skin from a photo, detects concerns like acne, dark circles and pigmentation, and turns the result into a personal care plan.',
  features: [
    { icon: '📸', text: 'Skin analysis from a photo: acne, dark circles, pigmentation and more' },
    { icon: '🧴', text: 'Personalised solutions, e.g. which ingredients like Vitamin C to use' },
    { icon: '🩺', text: 'Finds dermatologists nearby and books an appointment in the app' },
    { icon: '🥗', text: 'Diet plan recommendations based on your skin condition' },
  ],
}

export const education = {
  degree: 'BS Computer Science',
  school: 'University of Central Punjab (UCP)',
  location: 'Lahore, Pakistan',
  gpa: '3.29',
  fyp: 'Final Year Project: GlowBot, an AI skin analysis & care app',
}

export const certificates = [
  {
    title: 'Introduction to Generative AI',
    issuer: 'Coursera',
    link: 'https://www.coursera.org/account/accomplishments/verify/H6LBWZ58OGG2',
  },
]

export const skylure = {
  name: 'Skylure Jet',
  label: 'Client Project · Freelance',
  tagline: 'Private aircraft acquisition & sales advisory.',
  description:
    'A premium website and lead-management system for a private aviation advisory that helps corporations and high-net-worth individuals buy and sell private aircraft. Designed and built solo, from the public site to the admin CRM.',
  live: 'https://skylurejet.com',
  features: [
    { icon: '✈️', text: 'Buy / Sell tabbed inquiry form capturing aircraft category, budget, new or pre-owned, passenger capacity and mission' },
    { icon: '📊', text: 'Admin CRM to review every inquiry, track its status and send price quotes to clients' },
    { icon: '🛩️', text: 'Dedicated Aircraft Acquisition and Aircraft Sales pages with a luxury, conversion-focused design' },
    { icon: '💬', text: 'One-tap WhatsApp contact and fully responsive layout for clients on the move' },
  ],
  tags: ['React', 'Full-stack', 'Admin CRM', 'Lead management', 'Responsive UI'],
}
