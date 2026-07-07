import faqData from '../content/sxstx/faq.json';
import updatesData from '../content/sxstx/updates.json';

const calculatorUrl = 'https://sxstx.feiyastudio.com/';

interface UpdateItem {
  date: string;
  title: string;
  body: string;
  link?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const updates = updatesData as UpdateItem[];
const faq = faqData as FaqItem[];

export const SxstxCalculatorPage = () => (
  <div className="page-shell sxstx-portal-page">
    <section className="sxstx-portal-hero" aria-labelledby="sxstx-portal-title">
      <div className="sxstx-portal-hero-copy">
        <p className="eyebrow">Project Portal</p>
        <h1 id="sxstx-portal-title">SXSTX Calculator</h1>
        <p className="sxstx-portal-subtitle">Player-made tools for Sword and Staff players.</p>
        <div className="project-actions">
          <a className="action-link action-link-primary" href={calculatorUrl}>
            Open Calculator
          </a>
        </div>
      </div>
      <div className="sxstx-portal-visual" aria-hidden="true">
        <span className="sxstx-portal-orbit sxstx-portal-orbit-a" />
        <span className="sxstx-portal-orbit sxstx-portal-orbit-b" />
        <span className="sxstx-portal-node sxstx-portal-node-a" />
        <span className="sxstx-portal-node sxstx-portal-node-b" />
        <span className="sxstx-portal-node sxstx-portal-node-c" />
      </div>
    </section>

    <section className="sxstx-portal-section" aria-labelledby="sxstx-tool-link-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">Tool Link</p>
        <h2 id="sxstx-tool-link-title">Open the calculator tools.</h2>
      </div>
      <a className="sxstx-tool-card" href={calculatorUrl}>
        <span>SXSTX Calculator</span>
        <strong>https://sxstx.feiyastudio.com/</strong>
      </a>
    </section>

    <section className="sxstx-portal-section" aria-labelledby="sxstx-update-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">Update</p>
        <h2 id="sxstx-update-title">Latest project notes</h2>
      </div>
      <div className="sxstx-update-list">
        {updates.map((update) => (
          <article className="sxstx-update-item" key={`${update.date}-${update.title}`}>
            <time dateTime={update.date}>{update.date}</time>
            <h3>{update.title}</h3>
            <p>{update.body}</p>
            {update.link ? <a href={update.link}>Read more</a> : null}
          </article>
        ))}
      </div>
    </section>

    <section className="sxstx-portal-section" aria-labelledby="sxstx-faq-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">FAQ</p>
        <h2 id="sxstx-faq-title">Common questions</h2>
      </div>
      <div className="sxstx-faq-list">
        {faq.map((item) => (
          <details className="sxstx-faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  </div>
);
