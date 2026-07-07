import { sxstxUpdateArchiveRoute, updates } from '../data/sxstxContent';
import type { AppRoute } from '../hooks/useRoute';

interface SxstxUpdatePostPageProps {
  route: AppRoute;
}

const renderParagraphs = (content: string) =>
  content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>);

export const SxstxUpdatePostPage = ({ route }: SxstxUpdatePostPageProps) => {
  const update = updates.find((post) => post.route === route);

  if (!update) {
    return (
      <div className="page-shell sxstx-portal-page">
        <section className="page-intro" aria-labelledby="sxstx-update-not-found-title">
          <p className="eyebrow">SXSTX Calculator</p>
          <h1 id="sxstx-update-not-found-title">Update Not Found</h1>
          <p>The requested SXSTX Calculator update could not be found.</p>
          <div className="project-actions">
            <a className="action-link" href={sxstxUpdateArchiveRoute}>
              Return to all SXSTX Calculator update logs
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell sxstx-portal-page">
      <article className="page-intro sxstx-update-post" aria-labelledby="sxstx-update-post-title">
        <p className="eyebrow">SXSTX Calculator Update</p>
        <p className="sxstx-update-date">
          <time dateTime={update.date}>{update.date}</time>
        </p>
        <h1 id="sxstx-update-post-title">{update.title}</h1>
        <p>{update.description}</p>
        <div className="project-actions">
          <a className="action-link" href={sxstxUpdateArchiveRoute}>
            Return to all SXSTX Calculator update logs
          </a>
          <a className="action-link" href="/sxstx-calculator">
            Return to the SXSTX Calculator portal
          </a>
        </div>
      </article>
      <section className="sxstx-portal-section sxstx-archive-section" aria-label="Update content">
        <div className="sxstx-section-copy sxstx-update-post-body">
          {renderParagraphs(update.content)}
        </div>
      </section>
    </div>
  );
};
