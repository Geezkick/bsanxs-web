"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Code2,
  Cpu,
  Network,
  Layers3,
  Plus,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Software Engineering",
    description:
      "Purpose-built digital products, web applications and scalable software engineered around real business needs.",
    tags: ["Web applications", "Full-stack", "APIs"],
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI & Intelligent Systems",
    description:
      "Practical AI solutions and intelligent workflows that help businesses operate with greater clarity and efficiency.",
    tags: ["AI integration", "Automation", "AI agents"],
  },
  {
    number: "03",
    icon: Network,
    title: "Systems & Integration",
    description:
      "Connected technology ecosystems that bring platforms, data and business processes together.",
    tags: ["Integrations", "Infrastructure", "Data systems"],
  },
  {
    number: "04",
    icon: Layers3,
    title: "Digital Product Development",
    description:
      "From early-stage concepts to production-ready platforms, we turn ambitious ideas into usable digital products.",
    tags: ["MVP development", "Product strategy", "UX engineering"],
  },
];

const principles = [
  {
    number: "01",
    title: "Think beyond the obvious.",
    text: "We approach every challenge with curiosity, critical thinking and a commitment to finding better solutions.",
  },
  {
    number: "02",
    title: "Engineer with intention.",
    text: "Every decision has a purpose. We value reliable architecture, thoughtful design and maintainable systems.",
  },
  {
    number: "03",
    title: "Build for what comes next.",
    text: "We create with growth, adaptability and long-term value in mind, not just the immediate deliverable.",
  },
];


function ProjectEnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Basic honeypot: quietly ignore obvious automated submissions.
    if (String(data.get("website") || "").trim()) {
      setFeedback({
        type: "success",
        text: "Thank you. Your enquiry has been received.",
      });
      form.reset();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const service = String(data.get("service") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2 || name.length > 120) {
      setFeedback({ type: "error", text: "Please enter your full name." });
      return;
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (message.length < 10 || message.length > 5000) {
      setFeedback({
        type: "error",
        text: "Please describe your project in at least 10 characters.",
      });
      return;
    }

    if (company.length > 200 || service.length > 100 || budget.length > 100) {
      setFeedback({
        type: "error",
        text: "One of the optional fields is too long. Please shorten it.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          service,
          budget,
          message,
          website: String(data.get("website") || ""),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          text: result.error || "We couldn't submit your enquiry. Please try again.",
        });
        return;
      }

      form.reset();
      setFeedback({
        type: "success",
        text: "Thank you. Your enquiry has been received by BSANXS.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "A connection issue prevented submission. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-grid">
        <label className="enquiry-field">
          <span>YOUR NAME *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            placeholder="Full name"
            required
          />
        </label>

        <label className="enquiry-field">
          <span>EMAIL ADDRESS *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            required
          />
        </label>

        <label className="enquiry-field">
          <span>COMPANY <span className="field-optional">OPTIONAL</span></span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={200}
            placeholder="Company or organisation"
          />
        </label>

        <label className="enquiry-field">
          <span>AREA OF INTEREST</span>
          <select name="service" defaultValue="">
            <option value="">Select a service</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="AI & Intelligent Systems">AI & Intelligent Systems</option>
            <option value="Systems Integration">Systems Integration</option>
            <option value="Digital Product Development">Digital Product Development</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="enquiry-field enquiry-full">
          <span>ESTIMATED BUDGET <span className="field-optional">OPTIONAL</span></span>
          <select name="budget" defaultValue="">
            <option value="">Prefer to discuss</option>
            <option value="Under KSh 50,000">Under KSh 50,000</option>
            <option value="KSh 50,000–150,000">KSh 50,000–150,000</option>
            <option value="KSh 150,000–500,000">KSh 150,000–500,000</option>
            <option value="Above KSh 500,000">Above KSh 500,000</option>
            <option value="International / Other">International / Other</option>
          </select>
        </label>

        <label className="enquiry-field enquiry-full">
          <span>TELL US ABOUT YOUR PROJECT *</span>
          <textarea
            name="message"
            rows={5}
            minLength={10}
            maxLength={5000}
            placeholder="What are you looking to build, improve or solve?"
            required
          />
        </label>

        <label className="enquiry-honeypot" aria-hidden="true">
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="enquiry-submit-row">
        <p className="enquiry-privacy">
          Your information will be used to respond to your project enquiry.
        </p>
        <button className="contact-button enquiry-submit" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send enquiry"}
          <ArrowUpRight size={18} />
        </button>
      </div>

      {feedback && (
        <p
          className={`enquiry-feedback ${feedback.type}`}
          role="status"
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}
    </form>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="BSANXS home">
          <img
            className="brand-logo"
            src="/images/bsanxs-logo.png"
            alt="BSANXS Official Logo"
          />
        </a>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#services" onClick={closeMenu}>Capabilities</a>
          <a href="/products" onClick={closeMenu}>Products</a>
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-mobile-cta" href="#contact" onClick={closeMenu}>Start a project ↗</a>
        </nav>

        <a className="header-cta" href="#contact">
          Start a project <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      


      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-content">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="status-dot" />
            INDEPENDENT TECHNOLOGY COMPANY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Technology
            <br />
            with <span className="hero-outline">intent.</span>
          </motion.h1>

          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>
              We design and engineer digital solutions for businesses ready
              to move beyond the ordinary.
            </p>
            <a className="circle-link" href="#services" aria-label="Explore our capabilities">
              <ArrowDownRight size={23} />
            </a>
          </motion.div>
        </div>

        <div className="hero-footer">
          <span>STRATEGY / ENGINEERING / INTELLIGENCE</span>
          <span>BUILT FOR WHAT&apos;S NEXT <span className="footer-arrow">↗</span></span>
        </div>
      </section>

      <section className="engagement-marquee" aria-label="Client stories and partnership opportunities">
        <div className="engagement-track">
          <div className="engagement-group">
            <span className="engagement-label">CLIENT STORIES</span>
            <span className="engagement-copy">Real testimonials coming soon</span>
            <span className="engagement-star">✳</span>
            <span className="engagement-label">PARTNERSHIPS</span>
            <span className="engagement-copy">Open to ambitious collaborators</span>
            <a href="mailto:hello@bsanxs.com?subject=BSANXS%20Partnership">PARTNER WITH BSANXS <span aria-hidden="true">↗</span></a>
            <span className="engagement-star">✳</span>
          </div>
          <div className="engagement-group" aria-hidden="true">
            <span className="engagement-label">CLIENT STORIES</span>
            <span className="engagement-copy">Real testimonials coming soon</span>
            <span className="engagement-star">✳</span>
            <span className="engagement-label">PARTNERSHIPS</span>
            <span className="engagement-copy">Open to ambitious collaborators</span>
            <span className="engagement-copy">Build what comes next</span>
            <span className="engagement-star">✳</span>
          </div>
        </div>
      </section>


      <section className="intro section-pad" id="about">
        <div className="section-label">
          <span>01 / THE COMPANY</span>
          <span>INDEPENDENT BY DESIGN</span>
        </div>

        <div className="intro-grid">
          <h2>
            Ambitious ideas.
            <br />
            <span>Engineered</span> into reality.
          </h2>
          <div className="intro-copy">
            <p>
              BSANXS is a technology company focused on software engineering,
              intelligent automation and connected digital systems.
            </p>
            <p>
              We combine technical thinking with purposeful execution to help
              transform complex challenges into practical, scalable solutions.
            </p>
            <a className="text-link" href="#approach">
              Discover our approach <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-label">
          <span>02 / WHAT WE DO</span>
          <span>CAPABILITIES</span>
        </div>

        <div className="services-heading">
          <h2>Built to solve.<br /><span>Designed to scale.</span></h2>
          <p>
            Focused capabilities. Thoughtful execution.
            Technology built around the problem, not the trend.
          </p>
        </div>

        <div className="service-list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="service-card"
                key={service.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="service-main">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ArrowUpRight className="service-arrow" size={20} />
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="statement">
        <div className="statement-inner">
          <span className="statement-label">OUR POINT OF VIEW</span>
          <h2>
            The future isn&apos;t
            <br />
            something we wait for.
            <br />
            <span>It&apos;s something we build.</span>
          </h2>
          <div className="statement-bottom">
            <span>BSANXS / BUILT FOR WHAT&apos;S NEXT</span>
            <a href="#contact" className="statement-link">
              Build with us <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="approach section-pad" id="approach">
        <div className="section-label">
          <span>03 / HOW WE THINK</span>
          <span>OUR APPROACH</span>
        </div>

        <div className="approach-grid">
          <div className="approach-heading">
            <h2>Good technology<br /><span>starts with better thinking.</span></h2>
            <p>
              Our principles guide how we approach problems, make decisions
              and build solutions.
            </p>
          </div>

          <div className="principles">
            {principles.map((item, index) => (
              <button
                key={item.number}
                className={`principle ${activePrinciple === index ? "principle-active" : ""}`}
                onClick={() => setActivePrinciple(index)}
                aria-expanded={activePrinciple === index}
              >
                <span className="principle-number">{item.number}</span>
                <span className="principle-content">
                  <span className="principle-title">{item.title}</span>
                  {activePrinciple === index && (
                    <motion.span
                      className="principle-text"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.text}
                    </motion.span>
                  )}
                </span>
                <Plus className="principle-plus" size={19} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-top">
          <span>04 / HAVE SOMETHING IN MIND?</span>
          <span>LET&apos;S MAKE IT REAL <ArrowDownRight size={15} /></span>
        </div>
        <h2>
          Let&apos;s build
          <br />
          <span>what&apos;s next.</span>
        </h2>
        <p>
          Have a challenge worth solving or an idea worth building?
          Let&apos;s start with a conversation.
        </p>
        <ProjectEnquiryForm />
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <img
            className="brand-logo"
            src="/images/bsanxs-logo.png"
            alt="BSANXS Official Logo"
          />
        </a>

        <div className="footer-center">
          <span>Technology. Intentionally engineered.</span>
          <span>Leadership: Brian Nyarienya, CEO</span>
        </div>

        <div className="footer-right">
          <a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a>
          <span>© 2026 BSANXS</span>
        </div>
      </footer>
    </main>
  );
}
