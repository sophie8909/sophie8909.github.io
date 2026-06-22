const riluFeatures = [
  'Multilingual diary writing',
  'CEFR level control',
  'Three-version output',
  'ChatGPT prompt insertion',
  'Vocabulary capture',
  'High-frequency word tracking',
  'Local-first storage'
];

const futureTools = ['Reading', 'Vocabulary', 'Shadowing', 'Review'];

export const BeichenPage = () => {
  return (
    <div className="beichen-page">
      <section className="beichen-hero" aria-labelledby="beichen-title">
        <div className="beichen-hero-ornament" aria-hidden="true">
          <span className="archive-line archive-line-a" />
          <span className="archive-line archive-line-b" />
          <span className="archive-star archive-star-a" />
          <span className="archive-star archive-star-b" />
        </div>
        <div className="beichen-hero-copy">
          <p className="eyebrow">XingQue Branch</p>
          <h1 id="beichen-title">XingQue · Beichen</h1>
          <p className="beichen-subtitle">Daily language tools for quiet, sustainable learning.</p>
          <p className="beichen-description">
            Beichen is the language-learning branch of XingQue, built for small, repeatable
            language habits.
          </p>
          <div className="project-actions">
            <a className="action-link action-link-primary" href="#rilu">
              Explore Rilu
            </a>
            <button className="action-link" type="button" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      <section className="beichen-section rilu-section" id="rilu" aria-labelledby="rilu-title">
        <div className="section-kicker">
          <span className="section-number">01</span>
          <p className="eyebrow">First Tool</p>
        </div>
        <div className="beichen-section-layout">
          <div className="beichen-section-copy">
            <h2 id="rilu-title">Rilu</h2>
            <p className="beichen-subtitle">A multilingual daily journal companion for ChatGPT.</p>
            <p>
              Rilu helps you turn each day into short, natural diary entries in your target
              language.
            </p>
          </div>
          <div className="rilu-highlight" aria-label="Rilu always returns three versions">
            <p>Always returns exactly three diary-ready versions:</p>
            <ol>
              <li>Minimal</li>
              <li>Natural</li>
              <li>Emotional</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="beichen-section" aria-labelledby="beichen-features-title">
        <div className="section-kicker">
          <span className="section-number">02</span>
          <p className="eyebrow">Features</p>
        </div>
        <h2 id="beichen-features-title">Practice pieces</h2>
        <div className="feature-card-grid">
          {riluFeatures.map((feature) => (
            <article className="beichen-feature-card" key={feature}>
              <span aria-hidden="true" />
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="beichen-section privacy-section" aria-labelledby="beichen-privacy-title">
        <div className="section-kicker">
          <span className="section-number">03</span>
          <p className="eyebrow">Privacy</p>
        </div>
        <div className="beichen-section-copy">
          <h2 id="beichen-privacy-title">Local by default</h2>
          <p>
            Your captured replies and vocabulary records stay on your device by default. No
            backend, no account system, and no analytics in the MVP.
          </p>
        </div>
      </section>

      <section className="beichen-section" aria-labelledby="beichen-future-title">
        <div className="section-kicker">
          <span className="section-number">04</span>
          <p className="eyebrow">Later</p>
        </div>
        <h2 id="beichen-future-title">More Beichen tools may come later</h2>
        <div className="future-tool-list">
          {futureTools.map((tool) => (
            <article className="future-tool-card" key={tool}>
              <h3>{tool}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="beichen-page-footer" aria-label="Beichen footer links">
        <a href="/xingque">XingQue</a>
        <a href="/xingque/beichen">Beichen</a>
        <a href="#rilu">Rilu</a>
        <a href="https://github.com/sophie8909" rel="noreferrer" target="_blank">
          GitHub
        </a>
        <span>Coming Soon</span>
      </section>
    </div>
  );
};
