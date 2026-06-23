import { useTranslation } from 'react-i18next';
import { xingqueAssets } from '../assets/xingque';
import { LocalizedParagraphs } from '../components/LocalizedParagraphs';
import { getXingQueContent } from '../data/xingqueContent';

export const BeichenPage = () => {
  const { i18n } = useTranslation();
  const content = getXingQueContent(i18n.language);

  return (
    <div className="beichen-page">
      <section className="beichen-hero" aria-labelledby="beichen-title">
        <img
          className="beichen-chart-background"
          src={xingqueAssets.xingqueStarChart}
          alt=""
          aria-hidden="true"
        />
        <div className="beichen-hero-copy">
          <p className="eyebrow">{content.beichen.eyebrow}</p>
          <h1 id="beichen-title">
            <img
              className="beichen-wordmark"
              src={xingqueAssets.beichenWordmark}
              alt={content.beichen.title}
              width="1254"
              height="829"
            />
          </h1>
          <LocalizedParagraphs paragraphs={content.beichen.body} className="beichen-description" />
          <div className="project-actions">
            <a className="action-link action-link-primary" href="#rilu">
              {content.rilu.title}
            </a>
            <button className="action-link" type="button" disabled>
              {content.nav.comingSoon}
            </button>
          </div>
        </div>
        <div className="beichen-hero-visual" aria-hidden="true">
          <img
            className="beichen-academy-asset"
            src={xingqueAssets.beichenLogo}
            alt=""
            width="1254"
            height="829"
          />
          <img className="beichen-seal" src={xingqueAssets.sealBeichen} alt="" />
          <img className="beichen-lattice" src={xingqueAssets.latticeMoonGate} alt="" />
        </div>
      </section>

      <section className="beichen-section rilu-section" id="rilu" aria-labelledby="rilu-title">
        <div className="section-kicker">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <span className="section-number">01</span>
          <p className="eyebrow">{content.rilu.eyebrow}</p>
        </div>
        <div className="beichen-section-layout">
          <div className="beichen-section-copy">
            <h2 id="rilu-title">{content.rilu.title}</h2>
            <p className="beichen-subtitle">{content.rilu.short}</p>
            <LocalizedParagraphs paragraphs={content.rilu.body} />
          </div>
        </div>
        <div className="rilu-access-actions">
          {content.rilu.access.map((option) => (
            <button
              className="rilu-access-button"
              type="button"
              disabled
              key={option.status}
            >
              {option.recommended ? (
                <span className="rilu-access-recommendation">{option.recommended}</span>
              ) : null}
              <span>{option.status}</span>
            </button>
          ))}
        </div>

        <aside
          className="branch-privacy-note rilu-privacy-note"
          aria-labelledby="beichen-rilu-privacy-title"
        >
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <div>
            <h3 id="beichen-rilu-privacy-title">{content.privacy.title}</h3>
            <p>{content.privacy.body}</p>
          </div>
        </aside>

        <blockquote className="beichen-footer-quote rilu-footer-quote">
          {content.quote.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>
      </section>

      <section className="beichen-section" aria-labelledby="beichen-features-title">
        <div className="section-kicker">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <span className="section-number">02</span>
          <p className="eyebrow">{content.rilu.featuresHeading}</p>
        </div>
        <h2 id="beichen-features-title">{content.rilu.featuresHeading}</h2>
        <div className="feature-card-grid">
          {content.rilu.features.map((feature) => (
            <article className="beichen-feature-card" key={feature.title}>
              <img
                className="feature-medallion"
                src={xingqueAssets.constellationMedallion}
                alt=""
                aria-hidden="true"
              />
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="beichen-page-footer" aria-label="Beichen footer links">
        <div className="beichen-footer-links">
          <a href="/xingque">{content.nav.xingque}</a>
          <a href="/xingque/beichen">{content.nav.beichen}</a>
          <a href="#rilu">{content.nav.rilu}</a>
          <a href="https://github.com/sophie8909" rel="noreferrer" target="_blank">
            GitHub
          </a>
          <span>{content.nav.comingSoon}</span>
        </div>
      </section>
    </div>
  );
};
