import { updates } from '../data/sxstxContent';

const renderParagraphs = (content: string) =>
  content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>);

export const SxstxUpdateArchivePage = () => (
  <div className="page-shell sxstx-portal-page">
    <section className="page-intro" aria-labelledby="sxstx-update-archive-title">
      <p className="eyebrow">SXSTX Calculator</p>
      <h1 id="sxstx-update-archive-title">Update Logs</h1>
      <p>All SXSTX Calculator portal update logs from the local editable blog file.</p>
      <div className="project-actions">
        <a className="action-link" href="/sxstx-calculator">
          Return to the SXSTX Calculator portal
        </a>
      </div>
    </section>

    <section className="sxstx-portal-section sxstx-archive-section" aria-label="All update logs">
      <div className="sxstx-update-list sxstx-archive-list">
        {updates.map((update) => (
          <article className="sxstx-update-item" key={update.title}>
            <p className="sxstx-update-date">
              <time dateTime={update.date}>{update.date}</time>
            </p>
            <h2>
              <a href={update.route}>{update.title}</a>
            </h2>
            {renderParagraphs(update.content)}
          </article>
        ))}
      </div>
    </section>
  </div>
);
