import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import "./App.css";

const gold = "#D5AD72";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const experience = [
  {
    period: "FEB 2026 — PRESENT",
    role: "Zoho Technical Lead · Business Automation & ERP",
    company: "FFICO · Saudi Arabia",
    details: [
      "Designing and implementing ERP workflows for fleet and workforce operations.",
      "Automating HR, finance and operational processes with Zoho Creator and Deluge.",
      "Building API integrations and coordinating end-to-end solution delivery.",
    ],
    current: true,
  },
  {
    period: "JAN 2025 — DEC 2025",
    role: "Zoho Technical Lead · Business Automation & ERP",
    company: "Hallek Technologies",
    details: [
      "Delivered Zoho Creator, CRM and Desk implementations for client projects.",
      "Built custom applications, workflows, webhooks and API integrations.",
      "Handled requirements, solution design, client communication and delivery.",
    ],
  },
  {
    period: "SEP 2024 — JAN 2025",
    role: "Zoho Developer",
    company: "Transform Hub",
    details: [
      "Developed Creator applications and Deluge workflows for business processes.",
      "Supported customer service operations in Zoho Desk and coordination in CRM.",
      "Contributed to project tracking, surveys and process automation.",
    ],
  },
  {
    period: "MAR 2024 — SEP 2024",
    role: "Zoho Developer",
    company: "Lucky-Tech Membrane Pvt. Ltd.",
    details: [
      "Developed and maintained business applications using Zoho Creator and Deluge.",
      "Supported CRM, Desk and operational workflows while reducing repetitive tasks.",
    ],
  },
  {
    period: "JUN 2023 — FEB 2024",
    role: "Zoho Developer & UI/UX Developer",
    company: "Artmac Soft",
    details: [
      "Built tailored Zoho workflows and custom business solutions.",
      "Worked across Zoho applications and user interface design.",
    ],
  },
  {
    period: "NOV 2022 — MAY 2023",
    role: "UI/UX Developer Trainee",
    company: "Tech Mahindra · Apprenticeship",
    details: [
      "Learned front-end development and UI/UX fundamentals.",
      "Built demo applications and prototypes using web technologies.",
    ],
  },
];

const skillGroups = [
  { number: "01", title: "Zoho ecosystem", items: ["Zoho Creator", "Zoho CRM", "Zoho Desk", "Zoho Books", "Zoho People", "Zoho Analytics", "Zoho Projects", "Zoho Flow"] },
  { number: "02", title: "Automation & integration", items: ["Deluge scripting", "REST APIs", "Webhooks", "JWT payload handling", "Postman", "Third-party integrations", "Workflow design"] },
  { number: "03", title: "Web & product", items: ["JavaScript", "HTML", "CSS", "Bootstrap", "UI/UX design", "Figma", "Canva", "Responsive interfaces"] },
];

const capabilities = [
  { id: "A", title: "Business process automation", text: "Replace repetitive work with structured workflows, approvals, notifications and reliable process logic." },
  { id: "B", title: "ERP & operations systems", text: "Connect people, vehicles, tasks, maintenance and operational records in a unified application." },
  { id: "C", title: "API & system integration", text: "Connect business applications through REST APIs, webhooks, field mapping and data synchronization." },
  { id: "D", title: "Application delivery", text: "Translate requirements into system design, user-friendly applications, testing and rollout." },
];

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span>{index}</span><i />{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.22]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "work", "expertise", "journey", "contact"];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <motion.div className="reading-progress" style={{ scaleX }} />
      {!reduceMotion && (
        <motion.div
          className={`cursor-orb ${hovering ? "cursor-orb--active" : ""}`}
          animate={{ x: cursor.x, y: cursor.y, width: hovering ? 44 : 8, height: hovering ? 44 : 8 }}
          transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.4 }}
        />
      )}
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <span className="wordmark-mark">M<span>.</span></span>
          <span className="wordmark-copy">MITHANA <small>AUTOMATION / ERP</small></span>
        </a>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Main navigation">
          {[
            ["ABOUT", "#about", "about"],
            ["SELECTED WORK", "#work", "work"],
            ["EXPERTISE", "#expertise", "expertise"],
            ["JOURNEY", "#journey", "journey"],
          ].map(([label, href, id]) => (
            <a key={id} className={activeSection === id ? "nav-link nav-link--active" : "nav-link"} href={href} onClick={closeMenu} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>LET'S TALK <span>↗</span></a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <motion.div className="hero-content" style={{ y: reduceMotion ? 0 : heroY, opacity: reduceMotion ? 1 : heroOpacity }}>
            <motion.div className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <span className="status-dot" /> ZOHO TECHNICAL LEAD <span className="kicker-separator">/</span> SAUDI ARABIA
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={stagger}>
              <motion.span variants={reveal} className="hero-title-line">BUILDING</motion.span>
              <motion.span variants={reveal} className="hero-title-line hero-title-outline">SYSTEMS</motion.span>
              <motion.span variants={reveal} className="hero-title-line">THAT <em>WORK.</em></motion.span>
            </motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }}>
              I turn complex business processes into connected, scalable automation — from Zoho ERP workflows to API-powered business systems.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }}>
              <a className="button button--gold" href="#work" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>EXPLORE SELECTED WORK <span>↘</span></a>
              <a className="button button--ghost" href="/resume.pdf" target="_blank" rel="noreferrer" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>VIEW RÉSUMÉ <span>↗</span></a>
            </motion.div>
            <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <span>BUSINESS AUTOMATION</span><b>·</b><span>ERP SYSTEMS</span><b>·</b><span>INTEGRATIONS</span>
            </motion.div>
          </motion.div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.92, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.25, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="art-caption art-caption--top"><span>FIG. 01</span><span>CONNECTED OPERATIONS</span></div>
            <div className="art-core">
              <div className="art-ring art-ring--outer" />
              <div className="art-ring art-ring--middle" />
              <div className="art-ring art-ring--inner" />
              <div className="art-cross art-cross--horizontal" />
              <div className="art-cross art-cross--vertical" />
              <motion.div className="art-center" animate={reduceMotion ? {} : { rotate: 360 }} transition={{ duration: 65, repeat: Infinity, ease: "linear" }}>
                <div className="art-center-inner"><span>MA</span><small>BUSINESS<br />SYSTEMS</small></div>
              </motion.div>
              <span className="orbit-node orbit-node--one" />
              <span className="orbit-node orbit-node--two" />
              <span className="orbit-node orbit-node--three" />
              <span className="orbit-node orbit-node--four" />
            </div>
            <div className="art-caption art-caption--bottom"><span>PROCESS / PEOPLE / PERFORMANCE</span><span>26° N · 46° E</span></div>
            <div className="art-index">01 — 06</div>
          </motion.div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" />SCROLL TO EXPLORE</a>
          <div className="hero-side-note">DESIGNING BETTER BUSINESS FLOW — SINCE 2022</div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-index">01 <span>/ ABOUT</span></div>
          <div className="about-layout">
            <motion.div className="about-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
              <motion.div variants={reveal}><Eyebrow index="01">THE APPROACH</Eyebrow></motion.div>
              <motion.h2 variants={reveal}>LESS MANUAL.<br /><span>MORE MOMENTUM.</span></motion.h2>
            </motion.div>
            <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
              <motion.p className="lead-copy" variants={reveal}>I'm <strong>Srinivasa Reddy Mithana</strong> — a Business Automation & ERP Specialist with 4+ years of experience across the Zoho ecosystem.</motion.p>
              <motion.p variants={reveal}>My work sits where business operations meet technology: understanding how teams work, mapping the process, then building systems that make the work clearer, faster and more dependable.</motion.p>
              <motion.p variants={reveal}>From fleet and workforce management to HR workflows and third-party integrations, I focus on practical solutions that serve real people and real operations.</motion.p>
              <motion.a className="text-link" href="#journey" variants={reveal}>EXPLORE MY JOURNEY <span>↗</span></motion.a>
            </motion.div>
          </div>
          <div className="signal-strip">
            <div><span className="signal-number">04<span>+</span></span><span className="signal-label">YEARS IN TECHNOLOGY</span></div>
            <div><span className="signal-number">01</span><span className="signal-label">CORE SPECIALTY · BUSINESS AUTOMATION</span></div>
            <div><span className="signal-number">∞</span><span className="signal-label">WAYS TO IMPROVE A PROCESS</span></div>
            <div className="signal-statement">CURIOUS BY NATURE.<br /><em>PRECISE BY DESIGN.</em></div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-index">02 <span>/ SELECTED WORK</span></div>
          <div className="section-heading-row">
            <div>
              <Eyebrow index="02">CASE STUDY / 001</Eyebrow>
              <h2 className="section-title">THE WORK<br /><span>IN MOTION.</span></h2>
            </div>
            <p className="section-intro">A look at the systems behind everyday operations. This featured case study is based on my ERP work; sensitive client information is intentionally excluded.</p>
          </div>

          <motion.article className="featured-project" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.8 }}>
            <div className="project-visual">
              <div className="visual-topline"><span>OPERATIONS PLATFORM</span><span>CASE STUDY / 001</span></div>
              <div className="dashboard-frame">
                <div className="dashboard-sidebar">
                  <div className="dashboard-brand"><span>F</span><i>OPERATIONS</i></div>
                  {["Overview", "Employees", "Vehicles", "Maintenance", "Tasks", "Reports"].map((label, i) => <div className={i === 0 ? "dash-menu dash-menu--active" : "dash-menu"} key={label}><span className="dash-icon">{["◫", "◉", "▱", "↻", "☷", "▥"][i]}</span>{label}</div>)}
                  <div className="dashboard-sidebar-foot">WORKSPACE<br /><b>SAUDI ARABIA</b></div>
                </div>
                <div className="dashboard-main">
                  <div className="dashboard-toolbar"><div><span className="dash-overline">MONITOR / OPERATIONS</span><h3>Operations overview</h3></div><div className="dash-avatar">MA</div></div>
                  <div className="dash-metrics">
                    <div><small>WORKSTREAMS</small><b>Fleet <span>+</span></b><i>Vehicle lifecycle</i></div>
                    <div><small>PEOPLE</small><b>Workforce <span>+</span></b><i>Employee lifecycle</i></div>
                    <div><small>VISIBILITY</small><b>Live views <span>↗</span></b><i>Reports & tracking</i></div>
                  </div>
                  <div className="dash-lower">
                    <div className="dash-chart"><div className="dash-block-title">PROCESS FLOW <span>SCHEMATIC</span></div><div className="flow-diagram"><div className="flow-node">REQUEST</div><span>↓</span><div className="flow-node flow-node--gold">WORKFLOW</div><span>↓</span><div className="flow-node">REVIEW / ACTION</div></div></div>
                    <div className="dash-status"><div className="dash-block-title">CORE MODULES</div>{["Employee management", "Vehicle management", "Maintenance", "Task operations"].map((v, i) => <div className="dash-status-row" key={v}><span className="mini-status">{i < 3 ? "✓" : "↗"}</span><span>{v}</span></div>)}</div>
                  </div>
                  <div className="dashboard-disclaimer">ILLUSTRATIVE UI CONCEPT · NOT A LIVE CLIENT SCREENSHOT</div>
                </div>
              </div>
              <div className="visual-footline"><span>WORKFLOW DESIGN</span><span>ZOHO CREATOR / DELUGE</span><span>API INTEGRATIONS</span></div>
            </div>
            <div className="project-detail">
              <div className="project-meta"><span>ERP / OPERATIONS</span><span>2026 — ONGOING</span></div>
              <h3>Fleet &<br /><em>Workforce</em><br />Management</h3>
              <p className="project-summary">A connected operational system designed to bring workforce records, vehicle assignments, maintenance activity and task execution into a more structured workflow.</p>
              <div className="project-divider" />
              <div className="project-fact"><span>01</span><div><b>THE CHALLENGE</b><p>Coordinate people, vehicles, movement and operational tasks across multiple processes.</p></div></div>
              <div className="project-fact"><span>02</span><div><b>THE APPROACH</b><p>Build modular Creator workflows with role-relevant records, process transitions, reports and integrations.</p></div></div>
              <div className="project-fact"><span>03</span><div><b>MY CONTRIBUTION</b><p>Requirements, solution design, Deluge automation, API integration and delivery coordination.</p></div></div>
              <div className="project-tags"><span>ZOHO CREATOR</span><span>DELUGE</span><span>REST API</span><span>WORKFLOWS</span></div>
              <a className="text-link" href="#contact">REQUEST A WALKTHROUGH <span>↗</span></a>
            </div>
          </motion.article>
          <div className="work-note"><span className="note-icon">↗</span><p><strong>More project reviews are being curated.</strong> Additional examples can be linked here when approved screenshots, walkthroughs or public documentation are ready.</p><span className="note-number">01 / 01</span></div>
        </section>

        <section id="expertise" className="section expertise-section">
          <div className="section-index">03 <span>/ CAPABILITIES</span></div>
          <div className="section-heading-row">
            <div><Eyebrow index="03">WHAT I BUILD</Eyebrow><h2 className="section-title">FROM COMPLEXITY<br /><span>TO CLARITY.</span></h2></div>
            <p className="section-intro">Technology is only useful when it solves the right problem. These are the areas where I connect process thinking with implementation.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item, i) => (
              <motion.article className="capability-card" key={item.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: i * 0.08 }} whileHover={reduceMotion ? {} : { y: -7, borderColor: "rgba(213,173,114,.55)" }}>
                <div className="capability-top"><span>{item.id}</span><span className="capability-arrow">↗</span></div>
                <h3>{item.title}</h3><p>{item.text}</p><div className="capability-rule" />
              </motion.article>
            ))}
          </div>
          <div className="skills-block">
            <div className="skills-heading"><Eyebrow index="04">TOOLS OF THE TRADE</Eyebrow><h3>MY TECHNICAL<br /><em>TOOLKIT.</em></h3></div>
            <div className="skill-groups">
              {skillGroups.map((group) => <div className="skill-group" key={group.number}><div className="skill-group-heading"><span>{group.number}</span><h4>{group.title}</h4></div><div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        <section id="journey" className="section journey-section">
          <div className="section-index">04 <span>/ EXPERIENCE</span></div>
          <div className="journey-header"><div><Eyebrow index="05">THE JOURNEY SO FAR</Eyebrow><h2 className="section-title">BUILT THROUGH<br /><span>REAL WORK.</span></h2></div><p className="section-intro">From early UI/UX foundations to leading business automation delivery, each role has shaped how I approach systems and the people who use them.</p></div>
          <div className="timeline">
            {experience.map((item, i) => (
              <motion.article className="timeline-item" key={item.company} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.6, delay: i * 0.04 }}>
                <div className="timeline-marker"><span>{String(i + 1).padStart(2, "0")}</span><i className={item.current ? "timeline-dot timeline-dot--active" : "timeline-dot"} /></div>
                <div className="timeline-main"><div className="timeline-meta"><span>{item.period}</span>{item.current && <b>CURRENT ROLE</b>}</div><h3>{item.role}</h3><h4>{item.company}</h4><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
              </motion.article>
            ))}
          </div>
          <div className="education-line"><div className="education-icon">ED</div><div><span>EDUCATION</span><h3>B.Sc. Computer Science</h3><p>Hindustan Shipyard Degree · 2019–2022 · CGPA 7.23</p></div><div className="education-cert"><span>CERTIFICATION</span><b>Zoho Creator Certified Developer</b></div></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-ambient" aria-hidden="true" />
          <div className="section-index">05 <span>/ CONTACT</span></div>
          <div className="contact-layout">
            <motion.div className="contact-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
              <motion.div variants={reveal}><Eyebrow index="06">START A CONVERSATION</Eyebrow></motion.div>
              <motion.h2 variants={reveal}>LET'S MAKE<br /><em>IT WORK.</em></motion.h2>
              <motion.p variants={reveal}>Have a business process to improve, an automation challenge, or an opportunity to build something useful? Let's talk.</motion.p>
              <motion.div className="contact-direct" variants={reveal}><span>DIRECT CHANNEL</span><a href="mailto:mithanasrinivas888@gmail.com">mithanasrinivas888@gmail.com <b>↗</b></a></motion.div>
            </motion.div>
            <motion.div className="contact-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
              <div className="contact-card-top"><span>AVAILABLE CHANNELS</span><span>01 — 03</span></div>
              <a className="contact-channel" href="mailto:mithanasrinivas888@gmail.com"><span className="channel-icon">@</span><span><small>EMAIL</small><b>Send an email</b></span><i>↗</i></a>
              <a className="contact-channel" href="https://wa.me/966565096318" target="_blank" rel="noreferrer"><span className="channel-icon">↗</span><span><small>WHATSAPP</small><b>+966 565 096 318</b></span><i>↗</i></a>
              <a className="contact-channel" href="tel:+966565096318"><span className="channel-icon">⌕</span><span><small>PHONE</small><b>Call / message</b></span><i>↗</i></a>
              <div className="contact-card-bottom"><span className="status-dot" /> OPEN TO MEANINGFUL TECHNICAL CONVERSATIONS</div>
            </motion.div>
          </div>
          <footer className="footer"><a className="wordmark" href="#home"><span className="wordmark-mark">M<span>.</span></span><span className="wordmark-copy">MITHANA <small>AUTOMATION / ERP</small></span></a><span className="footer-note">DESIGNED WITH INTENT. BUILT FOR IMPACT.</span><a href="#home" className="back-top">BACK TO TOP ↑</a><span className="copyright">© {new Date().getFullYear()} SRINIVASA REDDY MITHANA</span></footer>
        </section>
      </main>
    </div>
  );
}

export default App;
