export const XingQuePage = () => {
  return (
    <div className="xingque-page">
      <section className="hero hero-xingque" aria-labelledby="xingque-title">
        <div className="hero-grid xingque-ornament" aria-hidden="true">
          <span className="lattice-frame" />
          <span className="lattice-frame lattice-frame-offset" />
          <span className="star-point star-point-a" />
          <span className="star-point star-point-b" />
          <span className="star-point star-point-c" />
          <span className="orbit-line orbit-line-a" />
          <span className="orbit-line orbit-line-b" />
        </div>

        <div className="hero-inner">
          <h1 id="xingque-title">星闕</h1>
          <p className="hero-subtitle">XingQue</p>
        </div>
      </section>

      <section className="xingque-branches" aria-labelledby="xingque-branches-title">
        <div className="section-kicker">
          <span className="section-number">01</span>
          <p className="eyebrow">Branches</p>
        </div>
        <div className="section-heading">
          <h2 id="xingque-branches-title">A quiet constellation of small tools.</h2>
          <p>
            XingQue gathers focused branches for daily creative and learning rituals.
            Beichen is the first branch.
          </p>
        </div>

        <div className="branch-card-grid">
          <details className="branch-card" open>
            <summary>
              <span className="branch-symbol" aria-hidden="true">
                北
              </span>
              <span>
                <span className="branch-title">北辰院</span>
                <span className="branch-english">Beichen</span>
              </span>
            </summary>
            <div className="branch-card-body">
              <p>Language-learning tools for quiet, sustainable daily practice.</p>
              <div className="branch-detail-grid">
                <div>
                  <h3>XingQue</h3>
                  <p>The parent ecosystem for branch-based tools with a soft archive feel.</p>
                </div>
                <div>
                  <h3>Beichen</h3>
                  <p>The language-learning branch for repeatable reading and writing habits.</p>
                </div>
                <div>
                  <h3>Rilu</h3>
                  <p>The first Beichen tool, built around short diary writing in a target language.</p>
                </div>
              </div>
              <div className="project-actions">
                <a className="action-link action-link-primary" href="/xingque/beichen">
                  Beichen
                </a>
                <button className="action-link" type="button" disabled>
                  Store Coming Soon
                </button>
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};
