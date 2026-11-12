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
  /** Call this number (Saudi Arabia) */
  phoneCall: { display: '+966 56 509 6318', tel: '+966565096318' },
  /** WhatsApp number (India) */
  whatsapp: { display: '+91 88860 69026', wa: '918886069026' },
  linkedin: 'https://www.linkedin.com/in/mithana-srinivasa-reddy-8a5097261',
  resumeHref: '/resume.pdf',
  certificateHref: '/Zoho-Creator-Developer-Associate-Certificate.pdf',
} as const

/** WhatsApp deep link with a pre-written message. */
export const waLink = (text: string) => `https://wa.me/${profile.whatsapp.wa}?text=${encodeURIComponent(text)}`

/** Section numbers in page order (single place to reorder). */
export const sectionIndex = {
  about: '01',
  services: '02',
  work: '03',
  casestudy: '04',
  skills: '05',
  experience: '06',
  credentials: '07',
  hire: '08',
  venture: '09',
} as const

export const nav = [
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'SERVICES', href: '#services', id: 'services' },
  { label: 'WORK', href: '#work', id: 'work' },
  { label: 'CASE STUDY', href: '#casestudy', id: 'casestudy' },
  { label: 'SKILLS', href: '#skills', id: 'skills' },
  { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
] as const

/** Extra links shown only in the mobile menu. */
export const navExtra = [
  { label: 'CREDENTIALS', href: '#credentials', id: 'credentials' },
  { label: 'HIRE ME', href: '#hire', id: 'hire' },
] as const

export const heroCopy = {
  kicker: 'ZOHO TECHNICAL LEAD',
  lines: ['I AUTOMATE', 'ENTERPRISE', 'WORKFLOWS.'],
  /** Second headline word cycles through the industries I have delivered for. */
  words: ['ENTERPRISE', 'FINANCE', 'FLEET', 'HR', 'FACTORY'],
  roles: ['ERP SPECIALIST', 'API INTEGRATIONS', 'BUSINESS AUTOMATION'],
  description:
    'I turn manual, scattered processes into connected ERP systems, using Zoho Creator, CRM, Desk and Deluge across HR, finance and operations.',
  availability: 'Available for Zoho projects and full-time roles',
  quote: ['PROCESS IS MY CRAFT.', 'EFFICIENCY IS MY GOAL.'],
  badgeRing: 'CERTIFIED ZOHO CREATOR DEVELOPER • ',
}

export const marquee = [
  'Zoho Creator',
  'Fleet & Logistics',
  'Deluge Scripting',
  'Financial Services',
  'ERP Solutions',
  'Manufacturing',
  'Workflow Automation',
  'IT Consulting',
  'Zoho CRM & Desk',
  'Zoho Partner Work',
  'REST APIs & Webhooks',
  'Executive Dashboards',
]

export const about = {
  headline: ['FROM MANUAL CHAOS.', 'TO CONNECTED SYSTEMS.'],
  paragraphs: [
    'I am **Srinivasa Reddy Mithana**, a Zoho Technical Lead and Business Automation Specialist with 4+ years of experience designing and delivering ERP and workflow automation solutions using Zoho Creator, CRM and Desk.',
    'I build scalable systems, API integrations and end-to-end automation across HR, Finance and Operations, with a proven record of cutting manual effort by up to 40%. I also build widget-based dashboards, more than 20 so far, that bring data from several applications into single CEO and admin views for analysis.',
    'I am comfortable in the client-facing seat: gathering requirements, running several projects at once, and delivering reliable, high-performance solutions that match the business goal.',
  ],
  stats: [
    { value: 4, suffix: '+', label: 'Years in Zoho & automation' },
    { value: 12, suffix: '', label: 'Live Zoho applications' },
    { value: 20, suffix: '+', label: 'Widget dashboards built' },
    { value: 40, suffix: '%', label: 'Manual effort reduced (up to)' },
  ],
  competencies: ['Teamwork and Collaboration', 'Design Thinking and Communication'],
  caption: 'Riyadh, Saudi Arabia',
  venturePill: 'Founder, Arcenvo Technologies • Coming soon',
}

export type StatusTone = 'done' | 'progress'

export interface Company {
  id: string
  name: string
  short: string
  industry: string
  role: string
  /** One line about the company, taken from its public website */
  blurb: string
  site?: string
}

/** Employers and clients, newest first. Used by the project filter. */
export const companies: Company[] = [
  { id: 'ffico', name: 'FFICO', short: 'FFICO', industry: 'Fleet & Workforce Operations', role: 'Zoho Technical Lead', blurb: 'Fleet and workforce operations in Saudi Arabia, run on a platform of 12 live Zoho applications that I design and maintain.' },
  {
    id: 'hallek',
    name: 'Hallek Technologies',
    short: 'Hallek',
    industry: 'Zoho Premium Partner, Saudi Arabia',
    role: 'Zoho Technical Lead',
    blurb: 'A Zoho Premium Partner in Saudi Arabia, named Zoho Partner of the Year (KSA) in 2024 and 7th worldwide in the Creator Partner Championship.',
    site: 'https://www.hallek.com.sa/home-en',
  },
  {
    id: 'jio',
    name: 'Jio Financial Services',
    short: 'Jio Financial',
    industry: 'Financial Services',
    role: 'Zoho Developer, via Transform Hub',
    blurb: 'The consumer finance brand offering credit cards, personal loans, fixed deposits, digital gold and tax filing. I worked on this client through Transform Hub.',
    site: 'https://www.jiofinance.in/',
  },
  {
    id: 'lucky',
    name: 'Lucky-Tech Membranes',
    short: 'Lucky-Tech',
    industry: 'Manufacturing',
    role: 'Zoho Developer',
    blurb: 'A Mumbai manufacturer of PVC and PVDF coated fabrics and tensile membrane structures, with its own engineering, cutting and welding factory.',
    site: 'https://luckytech.in/',
  },
  {
    id: 'artmac',
    name: 'Artmac Soft',
    short: 'Artmac',
    industry: 'IT Consulting & Staffing, USA',
    role: 'Zoho & UI/UX Developer',
    blurb: 'A US-based technology consulting and staffing company serving clients across the USA, Canada, the Middle East and India.',
    site: 'https://artmacsoft.com/',
  },
]

export interface Project {
  id: string
  company: string
  industry: string
  title: string
  summary: string
  /** Ordered process the system runs, drawn as an animated stepper */
  flow?: string[]
  tags: string[]
  status: { label: string; tone: StatusTone }
  /** One short fact line, e.g. size or scope */
  meta?: string
  featured?: boolean
  ask: string
}

/**
 * Every project once, grouped by company. Sources: work progress sheet, live application screenshots,
 * and role descriptions. Company-prefixed names are intentionally avoided in titles.
 */
export const projects: Project[] = [
  // ---- FFICO ----
  {
    id: 'fleet',
    company: 'ffico',
    industry: 'Fleet & Logistics',
    title: 'Fleet & Employee Management',
    summary:
      'The largest live application and system of record for hiring, workforce and fleet. It runs the employee lifecycle and the vehicle lifecycle in one place, with master lists for Qiwa, Iqama, Tamm, Najm and SCE records, history logs, a global search engine and an English and Arabic interface.',
    flow: ['Add employee', 'Assign vehicle', 'Quick or workshop maintenance', 'Movement and history logs', 'Reports and dashboards'],
    tags: ['Employee Lifecycle', 'Vehicle Assignment', 'Maintenance', 'Master Lists', 'English + Arabic'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '4 modules \u2022 23 features',
    featured: true,
    ask: 'a walkthrough of the Fleet & Employee Management application',
  },
  {
    id: 'zenhr',
    company: 'ffico',
    industry: 'HR Technology',
    title: 'ZenHR Two-way Integration',
    summary:
      'A two-way link between ZenHR and our HR management system. ZenHR employee, loan and termination events arrive as signed JWT webhooks, while Deluge functions call the ZenHR REST APIs to enrich and exchange data. Integration flows also update Muqeem data and pull active personal loans into Finance every day.',
    flow: ['ZenHR event', 'Signed JWT webhook', 'Creator validates and stores', 'Deluge calls ZenHR API', 'Data in sync both ways'],
    tags: ['Two-way Sync', 'Webhooks', 'JWT (HS256)', 'Custom API', 'REST APIs', 'Daily Loan Sync'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '2 integration flows + webhooks',
    featured: true,
    ask: 'a walkthrough of the two-way ZenHR integration',
  },
  {
    id: 'esign',
    company: 'ffico',
    industry: 'Document Automation',
    title: 'E-Sign',
    summary:
      'Digital signing built natively in Creator. Admins upload a PDF and place text, date, signature and checkbox fields, the employee approves or rejects with an OTP, and the signed PDF is stored on the record with clear status messages.',
    flow: ['Upload PDF', 'Place fields', 'Send signing link', 'OTP approve or reject', 'Signed PDF stored'],
    tags: ['PDF Templates', 'OTP Verification', 'Custom Widget', 'Status Tracking'],
    status: { label: 'LIVE', tone: 'done' },
    featured: true,
    ask: 'a walkthrough of the E-Sign application',
  },
  {
    id: 'task',
    company: 'ffico',
    industry: 'Operations',
    title: 'Task Management & SLA Dashboard',
    summary:
      'Tasks with priorities, deadlines, comments, attachments and reminders. A custom SLA widget shows on-time versus exceeded SLA, status donuts and a monthly trend, driven by one global filter bar, with a per-employee PDF summary.',
    tags: ['Task Operations', 'SLA Widget', 'Global Filters', 'PDF Export'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '3 modules \u2022 14 features',
    ask: 'a walkthrough of the Task Management application',
  },
  {
    id: 'finance',
    company: 'ffico',
    industry: 'Finance',
    title: 'Finance',
    summary:
      'Payment requests for suppliers, operations, maintenance and employee loans with management approval, loan repayment tracking and reporting. Active personal loans arrive daily from ZenHR.',
    tags: ['Payment Request', 'Loan Management', 'Approvals', 'Reports'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '3 modules \u2022 9 features',
    ask: 'a walkthrough of the Finance application',
  },
  {
    id: 'hrops',
    company: 'ffico',
    industry: 'HR Operations',
    title: 'HR & Operation',
    summary:
      'Driver cards, traffic fines and action-email management, with a stage dashboard that charts pending requests and opens the records behind every bar.',
    tags: ['Driver Card', 'Traffic Fines', 'Action Emails', 'Stage Dashboard'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '4 modules \u2022 5 features',
    ask: 'a walkthrough of the HR & Operation application',
  },
  {
    id: 'sales',
    company: 'ffico',
    industry: 'Sales',
    title: 'Sales Pipeline',
    summary:
      'A lead-to-contract pipeline with a live widget dashboard covering lead filters, KPIs, representative performance, activity by channel, monthly trend, sources and a city map. Quotation and contract templates are in review.',
    tags: ['Lead Management', 'Quotation', 'Contract', 'Widget Dashboard'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '4 modules \u2022 6 features',
    ask: 'a walkthrough of the Sales Pipeline application',
  },
  {
    id: 'muqeem',
    company: 'ffico',
    industry: 'Government Data',
    title: 'Muqeem Import',
    summary: 'Employee data imported from the Muqeem platform, with an overview dashboard and active and inactive employee monitoring.',
    tags: ['Data Import', 'Monitoring', 'Dashboard', 'Reports'],
    status: { label: 'LIVE', tone: 'done' },
    meta: '4 modules \u2022 5 features',
    ask: 'a walkthrough of the Muqeem Import application',
  },
  {
    id: 'assets',
    company: 'ffico',
    industry: 'Asset Tracking',
    title: 'Assets',
    summary: 'An asset dashboard showing distribution and status. SIM cards, fridges, bike boxes and food bags are next in the build queue.',
    tags: ['Dashboard', 'SIM Cards', 'Fridges', 'Bike Boxes'],
    status: { label: 'LIVE', tone: 'done' },
    ask: 'a walkthrough of the Assets application',
  },
  {
    id: 'petro',
    company: 'ffico',
    industry: 'Vehicle Data',
    title: 'Petro & TAMM Integrations',
    summary:
      'The Petro vehicle integration passed testing with all functions working and is waiting on vendor support to enable live access. The TAMM integration starts once TAMM support responds.',
    tags: ['Vehicle Integration', 'External APIs', 'Tested'],
    status: { label: 'IN PROGRESS', tone: 'progress' },
    ask: 'to discuss the Petro and TAMM integrations',
  },
  // ---- Hallek ----
  {
    id: 'hallek',
    company: 'hallek',
    industry: 'Zoho Consulting',
    title: 'Zoho Partner Implementations',
    summary:
      'As Zoho Technical Lead at a Zoho Premium Partner in Saudi Arabia, I led client Creator, CRM and Desk implementations: gathering requirements, writing the BRD, building, assigning work to the team, testing, delivering, then training and supporting the customer.',
    flow: ['Gather requirements', 'Prepare BRD', 'Implement', 'Assign tasks to team', 'Test', 'Deliver', 'Training documents', 'Post support'],
    tags: ['Zoho Creator', 'Zoho CRM', 'Zoho Desk', 'BRD', 'Team Lead', 'Training'],
    status: { label: 'DELIVERED', tone: 'done' },
    meta: 'Multiple client projects',
    featured: true,
    ask: 'to discuss Zoho implementation and technical lead work',
  },
  // ---- Jio Financial Services ----
  {
    id: 'jiodesk',
    company: 'jio',
    industry: 'Financial Services',
    title: 'Customer Support on Zoho Desk',
    summary:
      'Zoho Desk set up for customer support at Jio Financial Services, handling every customer request and assigning each ticket to the right department automatically. Feedback surveys and Zoho CRM vendor coordination supported the same operation.',
    flow: ['Customer request', 'Zoho Desk ticket', 'Auto-assigned to department', 'Resolution', 'Feedback survey'],
    tags: ['Zoho Desk', 'Auto-assignment', 'Departments', 'Feedback Surveys', 'Zoho CRM'],
    status: { label: 'DELIVERED', tone: 'done' },
    featured: true,
    ask: 'to discuss a Zoho Desk customer support setup',
  },
  {
    id: 'jiobot',
    company: 'jio',
    industry: 'Financial Services',
    title: 'Custom Support Bot',
    summary: 'A custom bot built in Zoho Creator to support customer service alongside the Zoho Desk setup, plus custom Creator applications and workflows for the same client.',
    tags: ['Zoho Creator', 'Custom Bot', 'Deluge', 'Workflows'],
    status: { label: 'DELIVERED', tone: 'done' },
    featured: true,
    ask: 'to discuss a custom bot built in Zoho Creator',
  },
  // ---- Lucky-Tech ----
  {
    id: 'lucky',
    company: 'lucky',
    industry: 'Manufacturing',
    title: 'Order-to-Delivery Manufacturing Workflow',
    summary:
      'Customer orders arrive in Zoho CRM and connect to Zoho Creator, which carries each tensile membrane order through production, from design to delivery and after-sales support.',
    flow: ['Order in CRM', 'Design', 'Cutting', 'Pasting', 'Testing', 'Packing', 'Dispatch', 'Delivery', 'Post support and maintenance'],
    tags: ['Zoho CRM', 'Zoho Creator', 'Deluge', 'Production Stages'],
    status: { label: 'DELIVERED', tone: 'done' },
    featured: true,
    ask: 'to discuss a manufacturing workflow on Zoho',
  },
  // ---- Artmac ----
  {
    id: 'artmac',
    company: 'artmac',
    industry: 'IT Consulting & Staffing',
    title: 'HRMS Application',
    summary:
      'A human resource management application built with Zoho Creator and Deluge for Artmac Soft, a US-based technology consulting and staffing company, with a UI/UX-led interface.',
    tags: ['HRMS', 'Zoho Creator', 'Deluge', 'UI/UX'],
    status: { label: 'DELIVERED', tone: 'done' },
    featured: true,
    ask: 'to discuss an HRMS application on Zoho Creator',
  },
]

export const caseStudyCopy = {
  index: sectionIndex.casestudy,
  label: 'CASE STUDY',
  silver: 'INSIDE A LIVE',
  gold: 'ZOHO PLATFORM.',
  intro: 'Twelve Zoho Creator applications and 20+ widget dashboards run together in one organisation. Here is the largest application and the executive dashboards on top of it.',
  alsoLive: ['Employee Portal', 'Facilities Management', 'Certificates'],
  fleetText:
    'Fleet & Employee Management handles hiring and employee changes, assigns and tracks every vehicle, manages maintenance and keeps the master lists and reports the whole organisation relies on. This is the live menu, in English and Arabic.',
  fleetGroups: [
    { title: 'Dashboards', count: 5, sample: 'Request, Vehicle, Employee, Assets' },
    { title: 'Master Lists', count: 10, sample: 'Qiwa, Labour, Iqama, Tamm, Najm, SCE' },
    { title: 'Report & History', count: 5, sample: 'Assigned and stopped vehicle logs, employee movement' },
    { title: 'Requests', count: 16, sample: 'Employee, vehicle and maintenance requests' },
    { title: 'Generate Report', count: 4, sample: 'Assigned days, stopped days, maintenance days' },
    { title: 'Admin', count: 2, sample: 'Quick links and data updates' },
  ],
  points: ['CEO & admin dashboards', 'Multi-application data', 'Global filters', 'Charts & KPI cards', 'Interactive maps', 'PDF export'],
  shots: [
    { id: 'overview', title: 'Filters and KPI overview', text: 'Seven lead filters plus a date range feed eight KPI cards.' },
    { id: 'reps', title: 'Sales representative performance', text: 'Every lead stage per representative, with totals.' },
    { id: 'activity', title: 'Activity overview', text: 'Calls, emails, WhatsApp, visits and meetings per channel and owner.' },
    { id: 'monthly', title: 'Monthly lead performance', text: 'Created, won and lost leads by month with a year selector.' },
    { id: 'repchart', title: 'Representative chart', text: 'Assigned versus won versus lost leads by employee.' },
    { id: 'sources', title: 'Lead creators and sources', text: 'Top lead creators and source performance side by side.' },
    { id: 'map', title: 'Lead distribution by city', text: 'An interactive map of Saudi Arabia with lead counts per city.' },
  ],
}

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
    items: ['API Integration', 'Webhooks', 'REST APIs', 'Postman', 'JWT Payloads', 'Two-way HRMS Sync'],
    span: 'lg:col-span-5',
  },
  {
    title: 'WEB & FRONTEND',
    badge: 'INTERFACES',
    stat: 'RESPONSIVE BUILDS',
    description: 'Custom widgets and dashboards that sit inside Zoho apps and feel like part of them.',
    items: ['JavaScript', 'Zoho Creator Widgets', 'Charts & Dashboards', 'Leaflet Maps', 'HTML', 'CSS', 'Bootstrap'],
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
  upcoming?: boolean
  /** Company website */
  site?: string
  /** Ids from `projects` delivered in this role */
  projects?: string[]
}

const allJourney: Stop[] = [
  {
    id: 'arcenvo',
    period: 'COMING SOON',
    title: 'FOUNDER',
    org: 'Arcenvo Technologies Private Limited',
    type: 'New venture \u2022 Simplify, Automate, Accelerate',
    upcoming: true,
    points: ['Launching soon: a company providing Zoho services and related technology services, built around one promise to simplify, automate and accelerate.'],
  },
  {
    id: 'ffico',
    period: 'FEB 2026 - PRESENT',
    title: 'ZOHO TECHNICAL LEAD',
    org: 'FFICO, Saudi Arabia',
    type: 'Business Automation & ERP \u2022 Full-time',
    current: true,
    projects: ['fleet', 'zenhr', 'esign'],
    points: [
      'Designed and run an ERP for fleet and workforce management: 12 live Zoho applications serving HR, finance, sales and operations.',
      'Built 20+ widget dashboards that bring data from several applications into single CEO and admin views.',
      'Integrated Zoho with HRMS and third-party APIs, including a live two-way ZenHR sync, cutting manual effort by up to 40%.',
    ],
  },
  {
    id: 'cert',
    period: 'OCT 2025',
    title: 'ZOHO CREATOR CERTIFIED',
    org: 'Developer - Associate',
    type: 'Milestone \u2022 Certificate ID ZCCA2764',
    milestone: true,
    points: ['Officially recognised by Zoho as a Certified Creator Developer (Associate).'],
  },
  {
    id: 'hallek',
    period: 'JAN 2025 - DEC 2025',
    title: 'ZOHO TECHNICAL LEAD',
    org: 'Hallek Technologies',
    orgAlt: 'حلك للتقنيات',
    type: 'Zoho Premium Partner, Saudi Arabia \u2022 Full-time',
    site: 'https://www.hallek.com.sa/home-en',
    projects: ['hallek'],
    points: [
      'Led client implementations from requirement gathering and the BRD through build, testing and delivery.',
      'Assigned and tracked work across the team, then produced training documents and provided post-delivery support.',
      'Built custom applications, workflows and webhook-based API integrations across Creator, CRM and Desk.',
    ],
  },
  {
    id: 'transformhub',
    period: 'SEP 2024 - JAN 2025',
    title: 'ZOHO DEVELOPER',
    org: 'Transform Hub',
    type: 'Client: Jio Financial Services \u2022 Full-time',
    site: 'https://www.jiofinance.in/',
    projects: ['jiodesk', 'jiobot'],
    points: [
      'Set up Zoho Desk for Jio Financial Services customer support, assigning tickets to the right departments automatically.',
      'Built a custom support bot and Creator workflows; coordinated vendors in Zoho CRM and tracked delivery in Zoho Projects.',
    ],
  },
  {
    id: 'luckytech',
    period: 'MAR 2024 - SEP 2024',
    title: 'ZOHO DEVELOPER',
    org: 'Lucky-Tech Membranes Pvt Ltd',
    type: 'Manufacturing, Mumbai \u2022 Full-time',
    site: 'https://luckytech.in/',
    projects: ['lucky'],
    points: [
      'Connected customer orders in Zoho CRM to Zoho Creator to drive production: design, cutting, pasting, testing, packing, dispatch, delivery and after-sales support.',
    ],
  },
  {
    id: 'artmac',
    period: 'JUN 2023 - FEB 2024',
    title: 'ZOHO & UI/UX DEVELOPER',
    org: 'Artmac Soft',
    type: 'IT consulting and staffing, USA \u2022 Full-time',
    site: 'https://artmacsoft.com/',
    projects: ['artmac'],
    points: [
      'Built an HRMS application with Zoho Creator and Deluge, working across CRM, Books, Writer, People, Cliq, Recruit and Analytics.',
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

/** Set to true once Arcenvo Technologies is registered to show the founder section, About pill and timeline entry. */
export const showVenture = false

export const venture = {
  name: 'Arcenvo Technologies Private Limited',
  short: 'ARCENVO',
  status: 'COMING SOON',
  tagline: ['Simplify', 'Automate', 'Accelerate'],
  description:
    'Arcenvo Technologies Private Limited is the company I am founding. It will provide Zoho services and related technology services, built around one promise: simplify, automate, accelerate. Details are coming soon.',
  services: ['Zoho services', 'Related services'],
  ask: 'to talk about Arcenvo Technologies',
}

export const journey: Stop[] = allJourney.filter((s) => !s.upcoming || showVenture)

export const servicesCopy = {
  silver: 'WHAT I BUILD',
  gold: 'FOR YOUR BUSINESS.',
  intro: 'Zoho solutions for companies that want fewer manual steps, cleaner data and one connected system, delivered end to end.',
  items: [
    {
      title: 'Custom Zoho Creator Apps',
      text: 'Purpose-built applications that replace spreadsheets, email chains and paper forms.',
      points: ['Forms, approvals and role-based access', 'Reports and live dashboards', 'English and Arabic interfaces'],
      ask: 'to discuss a custom Zoho Creator application',
    },
    {
      title: 'ERP & Workflow Automation',
      text: 'Multi-department systems for HR, finance and operations, with Deluge logic that removes repetitive work.',
      points: ['Fleet, workforce and asset management', 'Automated approvals and notifications', 'Manual effort cut by up to 40%'],
      ask: 'to discuss ERP and workflow automation',
    },
    {
      title: 'Zoho CRM & Desk',
      text: 'CRM and support implementations configured around how your team really sells and serves.',
      points: ['Lead, quotation and contract pipelines', 'Customer support and ticket flows', 'Feedback surveys and project tracking'],
      ask: 'to discuss a Zoho CRM or Desk implementation',
    },
    {
      title: 'API & HRMS Integrations',
      text: 'Reliable data flow between Zoho and the other systems you depend on.',
      points: ['Webhooks, REST APIs and signed JWT payloads', 'Two-way HRMS sync (ZenHR) and Muqeem import', 'Vehicle and third-party platform links'],
      ask: 'to discuss a system integration with Zoho',
    },
    {
      title: 'Executive Dashboards',
      text: 'Widget-based CEO and admin dashboards that combine data from several applications in one view.',
      points: ['20+ dashboards built', 'Global filters, KPI cards, charts and maps', 'PDF summaries for management'],
      ask: 'to discuss executive dashboards',
    },
    {
      title: 'Documents & Approvals',
      text: 'Digital signing and approval flows that keep a clear record of who did what and when.',
      points: ['OTP-verified e-signatures on PDFs', 'Payment, loan and request approvals', 'Signed documents stored on the record'],
      ask: 'to discuss digital signing and approval workflows',
    },
  ],
}

export const processCopy = {
  title: 'HOW WE WORK TOGETHER',
  steps: [
    { title: 'Discover', text: 'We map your process, pain points and the people who use it, and agree what success looks like.' },
    { title: 'Design', text: 'I design the system architecture, data model and workflows before anything is built.' },
    { title: 'Build & test', text: 'Applications, automations and integrations are developed and tested against real scenarios.' },
    { title: 'Deploy', text: 'Go-live with clear hand-over, and the system is ready for your team to run.' },
  ],
}

export const hireCopy = {
  silver: 'LET\u2019S WORK',
  gold: 'TOGETHER.',
  intro: 'Whether you need a Zoho system built or a Zoho lead on your team, here is how to start.',
  cards: [
    {
      tag: 'FOR COMPANIES & CLIENTS',
      title: 'Start a Zoho project',
      points: ['Custom Creator apps, ERP, CRM and Desk', 'System integrations and executive dashboards', 'Project-based work, remote or international'],
      cta: 'Discuss your project',
      message: 'Hello Srinivasa, I found your portfolio and would like to discuss a Zoho project.',
    },
    {
      tag: 'FOR RECRUITERS & HIRING TEAMS',
      title: 'Hire a Zoho lead',
      points: ['Zoho Technical Lead and Senior Zoho Developer roles', 'Business automation and ERP specialist roles', 'Riyadh, Saudi Arabia, or remote'],
      cta: 'Discuss a role',
      message: 'Hello Srinivasa, I found your portfolio and would like to discuss a role.',
    },
  ],
}

export const faq = [
  {
    q: 'Which Zoho products do you work with?',
    a: 'Zoho Creator is my main platform, alongside CRM, Desk, Books, People, Recruit, Cliq, Writer, Analytics and Projects.',
  },
  {
    q: 'Can you connect Zoho with our other systems?',
    a: 'Yes. I build integrations with webhooks and REST APIs, including two-way HRMS sync with ZenHR, Muqeem data import and vehicle-platform links.',
  },
  {
    q: 'Do you build dashboards and reports?',
    a: 'Yes. I have built more than 20 widget-based dashboards, including CEO and admin views that combine data from several applications.',
  },
  {
    q: 'Do you work remotely or on site?',
    a: 'I am based in Riyadh, Saudi Arabia, and I am open to remote and international projects as well as full-time roles.',
  },
  {
    q: 'Which languages do you work in?',
    a: 'English, Telugu and Hindi. The applications I build can run in English and Arabic.',
  },
  {
    q: 'How do I get started?',
    a: 'Send me a WhatsApp message describing the process you want to improve. We can then talk through scope and next steps.',
  },
]
