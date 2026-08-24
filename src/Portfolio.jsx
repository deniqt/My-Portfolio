import React, { useEffect, useState, useRef } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Menu, X, Workflow, GitBranch } from "lucide-react";
import "./portfolio.css"
// ---------------------------------------------------------------------------
// DATA — sourced from Deniel Dela Cruz's CV
// ---------------------------------------------------------------------------

const ROLES = ["AI Automation Specialist", "Lead Generation Specialist", "WordPress Developer"];

const EXPERIENCE = [
  {
    year: "2026",
    status: "running",
    title: "Freelance AI Automation Specialist",
    org: "Self-employed",
    bullets: [
      "Built automated lead funnels using Systeme.io",
      "Automated email follow-ups and lead data using Make.com",
      "Connected funnels to Google Sheets for automated data management",
      "Used AI automation to streamline marketing and business workflows",
    ],
    tags: ["Make.com", "Systeme.io", "Google Sheets", "AI Automation"],
  },
  {
    year: "2024 — 2026",
    status: "done",
    title: "WordPress Developer (Kadence)",
    org: "Kouru Solution",
    bullets: [
      "Built responsive websites using Kadence Theme and Kadence Blocks",
      "Designed clean, user-friendly layouts focused on conversions",
      "Customized headers, footers, and page sections without coding",
      "Optimized website speed and mobile performance",
      "Created landing pages for lead generation and basic funnels",
      "Integrated forms and email tools for lead capture",
    ],
    tags: ["WordPress", "Kadence", "Landing Pages", "Lead Gen"],
  },
  {
    year: "2025",
    status: "done",
    title: "School Faculty Clerk — 120hr Internship",
    org: "DFuture",
    bullets: [
      "Managed daily data entry, records, and document organization",
      "Ensured accuracy of information across documents",
      "Coordinated with team members for content updates and tasks",
      "Handled administrative tasks",
    ],
    tags: ["Data Entry", "Documentation", "Coordination"],
  },
  {
    year: "2023",
    status: "done",
    title: "WordPress Developer — 80hr Work Immersion",
    org: "Altustech IT Solutions Corp.",
    bullets: [
      "Built responsive websites using Elementor Theme",
      "Figma design translated to responsive website layout",
      "Customized headers, footers, and page sections without coding",
    ],
    tags: ["Elementor", "Figma", "WordPress"],
  },
];

const SKILL_GROUPS = [
  {
    label: "Automation & Growth",
    items: ["AI Automation", "Make.com", "Systeme.io", "Lead Generation", "Sales Funnels", "Email Automation", "Workflow Automation", "CRM & Lead Management"],
  },
  {
    label: "Web & Data",
    items: ["WordPress", "Kadence", "Figma to WordPress", "HTML/CSS", "React", "Vite", "Supabase", "Landing Page Development", "Google Sheets", "Data Management"],
  },
];

const EDUCATION = [
  { period: "2025 — 2027", school: "Bulacan State University", detail: "BS, Information Technology", note: "Philippines" },
  { period: "2021 — 2023", school: "La Consolacion University Philippines", detail: "TVL, Computer Programming", note: "Philippines" },
];

const CERTS = [
  { period: "2025 — 2027", name: "Spark, Strength, Sustain: Recabilation Consolanians in Digital Era", issuer: "LCUP · ICT Week Seminar" },
  { period: "2025", name: "Salesforce Supported Virtual Internship Program", issuer: "8-week virtual internship, Sep–Nov 2025" },
];

const CONTACT = {
  phone: "+63 962 845 5731",
  email: "Denieldelacruz2424@gmail.com",
  location: "Hagonoy, Bulacan, Philippines",
  portfolio: "denieldelacruz.wordpress.com",
};

const NAV = ["About", "Pipeline", "Stack", "Education", "Contact"];

// ---------------------------------------------------------------------------

export default function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState({});
  const nodeRefs = useRef([]);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleNodes((prev) => ({ ...prev, [e.target.dataset.idx]: true }));
          }
        });
      },
      { threshold: 0.25 }
    );
    nodeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dc-root">

      <div className="dc-bg-grid" />

      {/* NAV */}
      <nav className="dc-nav">
        <div className="dc-nav-inner">
          <div className="dc-logo dc-display">
            <span className="dc-logo-mark"><Workflow size={14} /></span>
            DDC
          </div>
          <div className="dc-nav-links">
            {NAV.map((n) => (
              <button key={n} className="dc-nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
            ))}
          </div>
          <a className="dc-nav-cta dc-mono" href={`mailto:${CONTACT.email}`}>Hire me</a>
          <button className="dc-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`dc-mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV.map((n) => (
            <button key={n} className="dc-nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header className="dc-section dc-hero">
        <div className="dc-eyebrow dc-mono">
          <span className="dc-dot" />
          Available for freelance automation & web work
        </div>
        <h1 className="dc-name dc-display">
          Deniel<br /><span>Dela Cruz</span>
        </h1>
        <div className="dc-role-wrap">
          <div className="dc-role-track dc-mono dc-role" style={{ transform: `translateY(-${roleIndex * 28}px)` }}>
            {ROLES.map((r) => (
              <div className="dc-role-item" key={r}>{r}</div>
            ))}
          </div>
        </div>
        <p className="dc-hero-desc">
          I design and wire up the systems that turn traffic into leads —
          WordPress builds on the front end, Make.com and Systeme.io running the
          automations underneath. Based in Bulacan, Philippines.
        </p>
        <div className="dc-cta-row">
          <a className="dc-btn-primary" href={`mailto:${CONTACT.email}`}>
            Start a workflow <ArrowUpRight size={16} />
          </a>
          <button className="dc-btn-ghost" onClick={() => scrollTo("pipeline")}>
            View experience
          </button>
        </div>
      </header>

      {/* ABOUT */}
      <section className="dc-block" id="about">
        <div className="dc-section">
          <div className="dc-section-head">
            <span className="dc-section-num dc-mono">01</span>
            <h2 className="dc-section-title">About</h2>
            <div className="dc-section-line" />
          </div>
          <div className="dc-about-grid">
            <p className="dc-about-text">
              I'm an IT student at <strong>Bulacan State University</strong> who
              spends most of his time building the quiet machinery behind small
              businesses: <strong>WordPress sites</strong> that load fast and convert,
              and <strong>automation pipelines</strong> that catch a lead the moment
              it comes in and follow up before anyone has to think about it.
              What started as freelance WordPress work in 2023 has grown into a
              full lead-to-close pipeline — funnel, follow-up, and record-keeping,
              all connected.
            </p>
            <div>
              <div className="dc-stat-card">
                <div className="dc-stat-num dc-display">3+ yrs</div>
                <div className="dc-stat-label dc-mono">Building WordPress sites</div>
              </div>
              <div className="dc-stat-card">
                <div className="dc-stat-num dc-display">4</div>
                <div className="dc-stat-label dc-mono">Roles across dev, data & automation</div>
              </div>
              <div className="dc-stat-card">
                <div className="dc-stat-num dc-display">Live</div>
                <div className="dc-stat-label dc-mono">Currently running automation for freelance clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE / PIPELINE */}
      <section className="dc-block" id="pipeline">
        <div className="dc-section">
          <div className="dc-section-head">
            <span className="dc-section-num dc-mono">02</span>
            <h2 className="dc-section-title">Pipeline</h2>
            <div className="dc-section-line" />
          </div>
          <div className="dc-pipeline">
            <div className="dc-pipeline-rail" />
            {EXPERIENCE.map((job, i) => (
              <div
                className={`dc-node ${visibleNodes[i] ? "visible" : ""}`}
                key={job.title}
                data-idx={i}
                ref={(el) => (nodeRefs.current[i] = el)}
              >
                <div className={`dc-node-dot ${job.status === "running" ? "running" : ""}`}>
                  <div className="dc-node-dot-core" />
                </div>
                <div className="dc-node-head">
                  <span className="dc-node-year dc-mono">{job.year}</span>
                  {job.status === "running" && <span className="dc-node-status">● running</span>}
                </div>
                <h3 className="dc-node-title dc-display">{job.title}</h3>
                <div className="dc-node-org dc-mono">{job.org}</div>
                <ul className="dc-node-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="dc-tag-row">
                  {job.tags.map((t) => (
                    <span className="dc-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS / STACK */}
      <section className="dc-block" id="stack">
        <div className="dc-section">
          <div className="dc-section-head">
            <span className="dc-section-num dc-mono">03</span>
            <h2 className="dc-section-title">Stack</h2>
            <div className="dc-section-line" />
          </div>
          {SKILL_GROUPS.map((g) => (
            <div className="dc-skill-group" key={g.label}>
              <div className="dc-skill-label">{g.label}</div>
              <div className="dc-pill-row">
                {g.items.map((s) => (
                  <span className="dc-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION + CERTS */}
      <section className="dc-block" id="education">
        <div className="dc-section">
          <div className="dc-section-head">
            <span className="dc-section-num dc-mono">04</span>
            <h2 className="dc-section-title">Education & certificates</h2>
            <div className="dc-section-line" />
          </div>
          <div className="dc-two-col">
            <div>
              <div className="dc-col-title dc-mono">Education</div>
              {EDUCATION.map((e) => (
                <div className="dc-card" key={e.school}>
                  <div className="dc-card-period dc-mono">{e.period}</div>
                  <div className="dc-card-title dc-display">{e.school}</div>
                  <div className="dc-card-sub">{e.detail} · {e.note}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="dc-col-title dc-mono">Certificates</div>
              {CERTS.map((c) => (
                <div className="dc-card" key={c.name}>
                  <div className="dc-card-period dc-mono">{c.period}</div>
                  <div className="dc-card-title dc-display">{c.name}</div>
                  <div className="dc-card-sub">{c.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="dc-block" id="contact">
        <div className="dc-section">
          <div className="dc-contact-panel">
            <GitBranch size={22} color="#8ec1ff" style={{ marginBottom: 18 }} />
            <h2 className="dc-contact-title dc-display">Let's connect the next pipeline.</h2>
            <p className="dc-contact-sub">
              Open to freelance automation builds and WordPress projects.
              Send a message and I'll reply within a day.
            </p>
            <div className="dc-contact-links">
              <a className="dc-contact-link dc-mono" href={`mailto:${CONTACT.email}`}>
                <Mail size={15} /> {CONTACT.email}
              </a>
              <a className="dc-contact-link dc-mono" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                <Phone size={15} /> {CONTACT.phone}
              </a>
              <span className="dc-contact-link dc-mono">
                <MapPin size={15} /> {CONTACT.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="dc-section dc-footer">
        <span>© {new Date().getFullYear()} Deniel Dela Cruz</span>
        <span>{CONTACT.portfolio}</span>
      </footer>
    </div>
  );
}