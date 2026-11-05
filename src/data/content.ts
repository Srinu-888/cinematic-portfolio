/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to update text, links and contact details without touching components.
 * Resume (Srinivasa_Reddy_Mithana_Zoho_Technical_Lead_4Years_Experience.pdf) is the primary reference.
 */

export const profile = {
  name: 'Srinivasa Reddy Mithana',
  brand: 'MITHANA',
  signature: 'Mithana',
  title: 'Zoho Technical Lead',
  tagline: 'Certified Zoho Creator Developer | Business Automation & ERP Specialist',
  location: 'Riyadh, Saudi Arabia',
  email: 'mithanasrinivas888@gmail.com',
  phoneSa: { display: '+966 56 509 6318', tel: '+966565096318', wa: '966565096318' },
  phoneIn: { display: '+91 88860 69026', tel: '+918886069026' },
  resumeHref: '/resume.pdf',
  certificateHref: '/Zoho-Creator-Developer-Associate-Certificate.pdf',
} as const

export const nav = [
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'WORK', href: '#work', id: 'work' },
  { label: 'SKILLS', href: '#skills', id: 'skills' },
  { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { label: 'CREDENTIALS', href: '#credentials', id: 'credentials' },
] as const

export const heroCopy = {
  kicker: 'ZOHO TECHNICAL LEAD',
  lines: ['I AUTOMATE', 'ENTERPRISE', 'WORKFLOWS.'],
  roles: ['ERP SPECIALIST', 'API INTEGRATIONS', 'BUSINESS AUTOMATION'],
  description:
    'I turn manual, scattered processes into connected ERP systems, using Zoho Creator, CRM, Desk and Deluge across HR, finance and operations.',
  quote: ['PROCESS IS MY CRAFT.', 'EFFICIENCY IS MY GOAL.'],
  badgeRing: 'CERTIFIED ZOHO CREATOR DEVELOPER • ',
}

export const marquee = [
  'Zoho Creator',
  'Deluge Scripting',
  'ERP Solutions',
  'Workflow Automation',
  'Zoho CRM',
  'Zoho Desk',
  'REST APIs',
  'Webhooks',
  'HRMS Integration',
  'System Design',
]

export const about = {
  headline: ['FROM MANUAL CHAOS.', 'TO CONNECTED SYSTEMS.'],
  paragraphs: [
    'I am **Srinivasa Reddy Mithana**, a Zoho Technical Lead and Business Automation Specialist with 4+ years of experience designing and delivering ERP and workflow automation solutions using Zoho Creator, CRM and Desk.',
    'I build scalable systems, API integrations and end-to-end automation across HR, Finance and Operations, with a proven record of cutting manual effort by up to 40%.',
    'I am comfortable in the client-facing seat: gathering requirements, running several projects at once, and delivering reliable, high-performance solutions that match the business goal.',
  ],
  stats: [
    { value: 4, suffix: '+', label: 'Years in Zoho & automation' },
    { value: 40, suffix: '%', label: 'Manual effort reduced (up to)' },
    { value: 7, suffix: '', label: 'Professional roles' },
    { value: 1, suffix: '', label: 'Zoho Creator certification' },
  ],
  competencies: ['Teamwork and Collaboration', 'Design Thinking and Communication'],
  caption: 'Riyadh, Saudi Arabia',
}

export interface Project {
  number: string
  title: string
  category: string
  period: string
  description: string
  tech: string[]
  snapshot: { label: string; value: string }[]
  /** Short text pre-filled in the contact form when "Request a walkthrough" is used */
  ask: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Fleet & Workforce ERP',
    category: 'ERP / OPERATIONS',
    period: 'FFICO • 2026 – PRESENT',
    description:
      'A multi-department ERP for fleet and workforce management. HR, finance and operational workflows run through one system built with Zoho Creator and Deluge, integrated with the HRMS and third-party APIs for real-time data sync.',
    tech: ['Zoho Creator', 'Deluge', 'Workflow Automation', 'HRMS Integration', 'REST APIs'],
    snapshot: [
      { label: 'SCOPE', value: 'Fleet + Workforce' },
      { label: 'DEPARTMENTS', value: 'HR, Finance, Ops' },
      { label: 'IMPACT', value: 'Up to 40% less manual effort' },
    ],
    ask: 'a walkthrough of the Fleet & Workforce ERP',
  },
  {
    number: '02',
    title: 'HR & Operations Command Dashboard',
    category: 'DASHBOARD / HR OPERATIONS',
    period: 'FFICO • ZOHO CREATOR WIDGET',
    description:
      'A live, stage-by-stage view of pending Driving Card, Traffic Fine, Maintenance Deduction and Visa Extension requests. Every bar is a doorway: select a stage and jump straight to its records.',
    tech: ['Zoho Creator', 'Page Widget', 'JavaScript', 'Deluge', 'Data Visualization'],
    snapshot: [
      { label: 'WORKFLOWS', value: '4 tracked' },
      { label: 'COUNTS', value: 'Pending only' },
      { label: 'NAVIGATION', value: 'Click-through stages' },
    ],
    ask: 'a walkthrough of the HR & Operations Command Dashboard',
  },
  {
    number: '03',
    title: 'Task & SLA Intelligence Dashboard',
    category: 'ANALYTICS / SLA TRACKING',
    period: 'FFICO • ZOHO CREATOR WIDGET',
    description:
      'On-time versus exceeded SLA, status donuts, a monthly trend line and open and closed task tables, all controlled by one global filter bar. A second per-employee view adds a downloadable PDF summary.',
    tech: ['Zoho Creator', 'JavaScript', 'Charts', 'PDF Export', 'Deluge'],
    snapshot: [
      { label: 'SLA LOGIC', value: 'Formula-driven' },
      { label: 'FILTERS', value: 'Period, City, Region, Assignee' },
      { label: 'EXPORT', value: 'PDF summary' },
    ],
    ask: 'a walkthrough of the Task & SLA Intelligence Dashboard',
  },
  {
    number: '04',
    title: 'Digital E-Sign & Onboarding',
    category: 'DOCUMENT AUTOMATION',
    period: 'FFICO • ZOHO CREATOR WIDGET',
    description:
      'Employee onboarding signing, built natively in Creator. Admins upload a PDF and place fields, employees open a link, verify with an OTP, then approve or reject. The signed PDF is stored automatically with clear status messages.',
    tech: ['Zoho Creator', 'JavaScript', 'Deluge', 'Custom API', 'PDF Generation'],
    snapshot: [
      { label: 'VERIFICATION', value: 'OTP approval' },
      { label: 'FIELDS', value: 'Text, Date, Signature, Checkbox' },
      { label: 'OUTPUT', value: 'Signed PDF on record' },
    ],
    ask: 'a walkthrough of the Digital E-Sign & Onboarding system',
  },
  {
    number: '05',
    title: 'ZenHR to Zoho Integration',
    category: 'INTEGRATION / HRMS SYNC',
    period: 'FFICO • WEBHOOKS & REST APIs',
    description:
      'ZenHR pushes employee, loan and termination events as signed JWT webhooks. Zoho Creator validates and stores each payload, and Deluge functions enrich the record through ZenHR REST APIs, bank details included.',
    tech: ['Deluge', 'Custom API', 'Webhooks', 'JWT (HS256)', 'REST APIs', 'Postman'],
    snapshot: [
      { label: 'PROTOCOL', value: 'Webhooks + REST' },
      { label: 'SECURITY', value: 'Signed JWT tokens' },
      { label: 'EVENTS', value: 'Employee, Loan, Termination' },
    ],
    ask: 'a walkthrough of the ZenHR to Zoho integration',
  },
]

export const skillBlocks = [
  {
    title: 'ZOHO & AUTOMATION',
    badge: 'CORE PILLAR',
    stat: 'CERTIFIED DEVELOPER',
    description:
      'Custom applications, Deluge logic and end-to-end workflow automation, from Creator apps to CRM and Desk implementations.',
    items: [
      'Zoho Creator',
      'Deluge Scripting',
      'Workflow Automation',
      'ERP Solutions',
      'CRM & Desk',
      'Zoho Books',
      'Zoho People',
      'Zoho Analytics',
      'Zoho Recruit',
      'Zoho Projects',
    ],
    span: 'lg:col-span-7',
  },
  {
    title: 'INTEGRATION & BACKEND',
    badge: 'CONNECTED SYSTEMS',
    stat: 'REAL-TIME SYNC',
    description: 'Reliable data flow between Zoho, HRMS platforms and third-party systems.',
    items: ['API Integration', 'Webhooks', 'REST APIs', 'Postman', 'JWT Payloads'],
    span: 'lg:col-span-5',
  },
  {
    title: 'WEB & FRONTEND',
    badge: 'INTERFACES',
    stat: 'RESPONSIVE BUILDS',
    description: 'Custom widgets and dashboards that sit inside Zoho apps and feel like part of them.',
    items: ['JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    span: 'lg:col-span-5',
  },
  {
    title: 'INTERFACE & DESIGN',
    badge: 'UI / UX',
    stat: 'DESIGN-LED',
    description:
      'A UI/UX background that shapes how apps look, flow and feel, from Figma prototypes to polished screens.',
    items: ['Figma', 'Adobe Photoshop', 'Canva', 'UI/UX Design'],
    span: 'lg:col-span-7',
  },
]

export const coreSkills = ['Business Automation', 'System Design', 'Problem Solving', 'Project & Client Management']

export interface Stop {
  id: string
  period: string
  title: string
  org: string
  orgAlt?: string
  type?: string
  points: string[]
  current?: boolean
  milestone?: boolean
}

export const journey: Stop[] = [
  {
    id: 'ffico',
    period: 'FEB 2026 - PRESENT',
    title: 'ZOHO TECHNICAL LEAD',
    org: 'FFICO, Saudi Arabia',
    type: 'Business Automation & ERP • Full-time',
    current: true,
    points: [
      'Designed and implemented ERP solutions for fleet and workforce management, enabling seamless multi-department operations.',
      'Automated HR, finance and operational workflows with Zoho Creator and Deluge, reducing manual effort by up to 40%.',
      'Integrated Zoho applications with HRMS and third-party APIs for real-time data synchronization.',
      'Led end-to-end delivery: requirements, system design, development, testing and deployment.',
    ],
  },
  {
    id: 'cert',
    period: 'OCT 2025',
    title: 'ZOHO CREATOR CERTIFIED',
    org: 'Developer - Associate',
    type: 'Milestone • Certificate ID ZCCA2764',
    milestone: true,
    points: ['Officially recognised by Zoho as a Certified Creator Developer (Associate).'],
  },
  {
    id: 'hallek',
    period: 'JAN 2025 - DEC 2025',
    title: 'ZOHO TECHNICAL LEAD',
    org: 'Hallek Technologies',
    orgAlt: 'حلك للتقنيات',
    type: 'Business Automation & ERP • Full-time',
    points: [
      'Led Zoho Creator, CRM and Desk implementations for multiple client projects, delivering scalable automation.',
      'Built custom applications, workflows and webhook-based API integrations for complex business processes.',
      'Designed system architecture and optimized workflows for performance, scalability and efficiency.',
      'Managed end-to-end delivery and client communication across several projects at once.',
    ],
  },
  {
    id: 'transformhub',
    period: 'SEP 2024 - JAN 2025',
    title: 'ZOHO DEVELOPER',
    org: 'Transform Hub',
    type: 'Full-time',
    points: [
      'Developed custom Creator applications and Deluge workflows for Jio Financial Services.',
      'Ran customer support in Zoho Desk, vendor coordination in CRM and project tracking in Zoho Projects.',
      'Designed customer feedback surveys and centralized data to reduce manual effort.',
    ],
  },
  {
    id: 'luckytech',
    period: 'MAR 2024 - SEP 2024',
    title: 'ZOHO DEVELOPER',
    org: 'Lucky-Tech Membrane Pvt Ltd',
    type: 'Full-time',
    points: [
      'Developed and maintained business applications using Zoho Creator and Deluge.',
      'Supported operational workflows in Zoho CRM and Desk, automating repetitive manual tasks.',
    ],
  },
  {
    id: 'artmac',
    period: 'JUN 2023 - FEB 2024',
    title: 'ZOHO & UI/UX DEVELOPER',
    org: 'Artmac Soft',
    type: 'Full-time',
    points: [
      'Built custom solutions with Zoho Creator and Deluge across CRM, Books, Writer, People, Cliq, Recruit and Analytics.',
      'Created tailored workflows and automations to streamline processes and lift productivity.',
    ],
  },
  {
    id: 'techm',
    period: 'NOV 2022 - MAY 2023',
    title: 'UI/UX DEVELOPER TRAINEE',
    org: 'Tech Mahindra',
    type: 'Apprenticeship',
    points: ['Learned front-end development and UI/UX fundamentals, building demo applications and prototypes.'],
  },
  {
    id: 'swiggy',
    period: 'JAN 2022 - SEP 2022',
    title: 'ASSISTANT STORE MANAGER',
    org: 'Swiggy Instamart',
    type: 'Full-time',
    points: ['Managed inventory and order operations, keeping order processing and stock management running smoothly.'],
  },
]

export const credential = {
  title: 'Zoho Creator Developer - Associate',
  subtitle: 'Certificate of Accreditation',
  facts: [
    { label: 'ISSUED BY', value: 'Zoho' },
    { label: 'CERTIFICATE ID', value: 'ZCCA2764', copy: true },
    { label: 'ISSUED ON', value: '13 Oct 2025' },
    { label: 'VALIDITY', value: '2 years' },
    { label: 'SIGNED BY', value: 'Hyther Nizam, Vice President' },
  ],
}

export const education = {
  degree: 'B.Sc. Computer Science',
  school: 'Hindustan Shipyard Degree',
  years: '2019 - 2022',
  grade: 'CGPA 7.23',
}

export const languages = ['English', 'Telugu', 'Hindi']
export const interests = ['Travelling', 'Athletics']
