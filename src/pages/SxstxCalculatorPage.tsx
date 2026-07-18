import { useState } from 'react';
import { calculatorUrl, faq, sxstxUpdateArchiveRoute, updates } from '../data/sxstxContent';

const latestUpdates = updates.slice(0, 5);

const renderParagraphs = (content: string) =>
  content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>);

const SxstxFaqList = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set());

  const toggleItem = (title: string) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <div className="sxstx-faq-list">
      {faq.map((item) => {
        const isOpen = openItems.has(item.question);
        const panelId = `sxstx-faq-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        return (
          <article className="sxstx-faq-item" key={item.question}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="sxstx-faq-toggle"
                type="button"
                onClick={() => toggleItem(item.question)}
              >
                <span aria-hidden="true" className="sxstx-faq-indicator">
                  {isOpen ? 'V' : '>'}
                </span>
                <span>{item.question}</span>
              </button>
            </h3>
            <div className="sxstx-faq-answer" hidden={!isOpen} id={panelId}>
              {renderParagraphs(item.content)}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const SxstxCalculatorPage = () => (
  <div className="page-shell sxstx-portal-page">
    <section className="sxstx-portal-hero" aria-labelledby="sxstx-portal-title">
      <div className="sxstx-portal-hero-copy">
        <p className="eyebrow">Project Portal</p>
        <h1 id="sxstx-portal-title">SXSTX Calculator</h1>
        <p className="sxstx-portal-subtitle">Player-made tools for Sword x Staff.</p>
        <p className="sxstx-portal-intro">
          SXSTX Calculator is a Feiya Studio project portal for practical Sword x Staff
          tools, including material calculators, equipment score calculators, season score
          planning, update logs, and frequently asked questions.
        </p>
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

    <section className="sxstx-portal-section" aria-labelledby="sxstx-about-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">About</p>
        <h2 id="sxstx-about-title">About</h2>
      </div>
      <div className="sxstx-section-copy">
        <p>
          SXSTX Calculator is developed by Feiya Studio as a lightweight collection of
          player-made tools for Sword x Staff players.
        </p>
        <p>
          The calculator itself is hosted at{' '}
          <a href={calculatorUrl}>https://sxstx.feiyastudio.com/</a>, while this Feiya
          Studio page keeps project context, update logs, and FAQ content easy to find.
        </p>
      </div>
    </section>

    <section className="sxstx-portal-section" aria-labelledby="sxstx-update-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">Update</p>
        <h2 id="sxstx-update-title">Latest Updates</h2>
        <p>Recent SXSTX Calculator project notes from the editable local update log.</p>
      </div>
      <div className="sxstx-update-list">
        {latestUpdates.map((update) => (
          <article className="sxstx-update-item" key={update.title}>
            <p className="sxstx-update-date">
              <time dateTime={update.date}>{update.date}</time>
            </p>
            <h3>
              <a href={update.route}>{update.title}</a>
            </h3>
            <p>{update.description}</p>
          </article>
        ))}
        <a className="action-link sxstx-more-link" href={sxstxUpdateArchiveRoute}>
          More &gt;
        </a>
      </div>
    </section>

    <section className="sxstx-portal-section" aria-labelledby="sxstx-faq-title">
      <div className="sxstx-portal-section-heading">
        <p className="eyebrow">FAQ</p>
        <h2 id="sxstx-faq-title">Frequently Asked Questions</h2>
        <p>Answers to common questions about the SXSTX Calculator project and tools.</p>
      </div>
      <SxstxFaqList />
    </section>
  </div>
);
