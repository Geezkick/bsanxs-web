import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers3,
  MessageSquareText,
} from "lucide-react";
import { serviceData } from "../serviceData";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) {
    return { title: "Service Not Found | BSANXS" };
  }

  return {
    title: `${service.title} | BSANXS`,
    description: service.intro,
    openGraph: {
      title: `${service.title} | BSANXS`,
      description: service.intro,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) notFound();

  return (
    <main className="service-detail-page">
      <header className="service-detail-header">
        <Link href="/" className="service-detail-brand" aria-label="BSANXS home">
          <img src="/images/bsanxs-logo.png" alt="BSANXS" className="service-detail-logo" />
        </Link>

        <nav className="service-detail-nav" aria-label="Main navigation">
          <Link href="/#services">Services</Link>
          <Link href="/products">Products</Link>
          <Link href="/#about">About</Link>
        </nav>

        <Link href="/#contact" className="service-detail-header-cta">
          Start a conversation <ArrowUpRight size={15} />
        </Link>
      </header>

      <section className="service-detail-hero">
        <div className="service-detail-grid" aria-hidden="true" />
        <div className="service-detail-hero-inner">
          <Link href="/#services" className="service-detail-back">
            <ArrowLeft size={14} /> All services
          </Link>

          <div className="service-detail-eyebrow">
            <span className="service-detail-dot" />
            SERVICE {service.number} / {service.eyebrow}
          </div>

          <h1>{service.headline}</h1>
          <p className="service-detail-intro">{service.intro}</p>

          <div className="service-detail-hero-actions">
            <Link href="/#contact" className="service-detail-primary">
              Discuss your project <ArrowRight size={17} />
            </Link>
            <a href="#capabilities" className="service-detail-secondary">
              Explore capabilities <ArrowDown size={16} />
            </a>
          </div>

          <div className="service-detail-hero-foot">
            <span>BSANXS / ENGINEERED WITH INTENT</span>
            <span>{service.number} — 06</span>
          </div>
        </div>
      </section>

      <section className="service-detail-section service-detail-problems">
        <div className="service-detail-section-label">
          <span>01 / THE CHALLENGE</span>
          <span>FROM FRICTION TO POSSIBILITY</span>
        </div>
        <div className="service-detail-two-col">
          <h2>Technology should solve problems, not create more of them.</h2>
          <div>
            <p className="service-detail-section-lead">
              The right solution starts with understanding what is holding your
              business or idea back. We focus on practical needs before choosing
              the technology.
            </p>
            <ul className="service-detail-list">
              {service.problems.map((problem) => (
                <li key={problem}>
                  <span className="service-detail-list-icon"><ArrowUpRight size={16} /></span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="capabilities" className="service-detail-section service-detail-capabilities">
        <div className="service-detail-section-label">
          <span>02 / CAPABILITIES</span>
          <span>WHAT WE CAN BUILD</span>
        </div>
        <div className="service-detail-capability-heading">
          <div>
            <span className="service-detail-icon-tile"><Layers3 size={23} /></span>
            <h2>From requirements to tangible deliverables.</h2>
          </div>
          <p>
            Every engagement is scoped to the objective, complexity and resources
            of the project. Deliverables are agreed before development begins.
          </p>
        </div>

        <div className="service-detail-deliverables">
          {service.deliverables.map((item, index) => (
            <div className="service-detail-deliverable" key={item}>
              <span className="service-detail-index">0{index + 1}</span>
              <span>{item}</span>
              <Check size={17} />
            </div>
          ))}
        </div>
      </section>

      <section className="service-detail-section service-detail-usecases">
        <div className="service-detail-section-label">
          <span>03 / APPLICATIONS</span>
          <span>WHERE IT FITS</span>
        </div>
        <h2>Designed for real-world use.</h2>
        <p className="service-detail-section-lead">
          The best solution depends on the context. These are examples of the
          kinds of projects this service can support.
        </p>
        <div className="service-detail-usecase-grid">
          {service.useCases.map((item, index) => (
            <article className="service-detail-usecase" key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <ArrowUpRight size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail-section service-detail-process">
        <div className="service-detail-section-label">
          <span>04 / OUR APPROACH</span>
          <span>CLARITY AT EVERY STAGE</span>
        </div>
        <h2>A clear path from idea to implementation.</h2>
        <div className="service-detail-process-grid">
          {service.process.map((step, index) => (
            <article className="service-detail-process-card" key={step.title}>
              <span className="service-detail-process-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail-cta">
        <div className="service-detail-cta-orb" aria-hidden="true" />
        <div className="service-detail-cta-copy">
          <span className="service-detail-eyebrow">
            <span className="service-detail-dot" /> HAVE A PROJECT IN MIND?
          </span>
          <h2>Let’s work out what your idea needs.</h2>
          <p>
            Share your goals, constraints and current challenges. We can discuss
            the requirements and identify a sensible next step.
          </p>
        </div>
        <Link href="/#contact" className="service-detail-primary">
          <MessageSquareText size={17} /> Enquire about this service
          <ArrowUpRight size={17} />
        </Link>
      </section>

      <footer className="service-detail-footer">
        <Link href="/" className="service-detail-brand">
          <img src="/images/bsanxs-logo.png" alt="BSANXS" className="service-detail-logo" />
        </Link>
        <span>TECHNOLOGY, INTENTIONALLY ENGINEERED.</span>
        <Link href="/#services">Explore all services <ArrowUpRight size={14} /></Link>
      </footer>
    </main>
  );
}
