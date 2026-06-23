import { useTranslation } from 'react-i18next';
import { xingqueAssets } from '../assets/xingque';
import { LocalizedParagraphs } from '../components/LocalizedParagraphs';
import { getXingQueContent } from '../data/xingqueContent';

export const XingQuePage = () => {
  const { i18n } = useTranslation();
  const content = getXingQueContent(i18n.language);

  return (
    <div className="xingque-page">
      <section className="hero hero-xingque" aria-labelledby="xingque-title">
        <img
          className="xingque-chart-background"
          src={xingqueAssets.xingqueStarChart}
          alt=""
          aria-hidden="true"
        />

        <div className="xingque-hero-layout">
          <div className="xingque-hero-left" aria-hidden="true">
            <img
              className="moon-gate-asset"
              src={xingqueAssets.moonGateWindow}
              alt=""
              width="720"
              height="720"
            />
            <img
              className="hero-lattice hero-lattice-square"
              src={xingqueAssets.latticeSquare}
              alt=""
            />
          </div>

          <div className="hero-inner xingque-hero-copy">
            <h1 id="xingque-title">
              <img
                className="xingque-wordmark"
                src={xingqueAssets.xingqueWordmark}
                alt={content.hero.alt}
                width="1254"
                height="650"
              />
            </h1>
            <p className="hero-subtitle">xingque</p>
          </div>

          <div className="xingque-hero-right" aria-hidden="true">
            <img
              className="armillary-asset"
              src={xingqueAssets.armillarySphere}
              alt=""
              width="520"
              height="620"
            />
            <img
              className="telescope-asset"
              src={xingqueAssets.astronomicalTelescope}
              alt=""
              width="760"
              height="360"
            />
            <img
              className="hero-lattice hero-lattice-song"
              src={xingqueAssets.latticeSong}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="xingque-branches" aria-label={content.xingque.eyebrow}>
        <img
          className="xingque-section-chart"
          src={xingqueAssets.xingqueStarChart}
          alt=""
          aria-hidden="true"
        />
        <LocalizedParagraphs
          paragraphs={content.xingque.body}
          className="section-localized-copy xingque-branches-intro"
        />
        <div className="section-kicker">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <span className="section-number">01</span>
          <p className="eyebrow">{content.xingque.eyebrow}</p>
        </div>
        <div className="section-heading">
          <div className="beichen-branch-intro">
            <div className="beichen-branch-intro-visual" aria-hidden="true">
              <img
                src={xingqueAssets.beichenLogo}
                alt=""
                width="1254"
                height="829"
              />
            </div>
            <div className="beichen-branch-intro-copy">
              <LocalizedParagraphs paragraphs={content.beichen.body} />
            </div>
          </div>
        </div>

        <div className="branch-card-grid">
          <details className="branch-card branch-rilu-card" id="rilu">
            <summary>
              <span className="branch-symbol" aria-hidden="true">
                <img src={xingqueAssets.constellationMedallion} alt="" />
              </span>
              <span>
                <span className="branch-title">{content.rilu.title}</span>
                <span className="branch-english">RILU</span>
              </span>
              <span className="inline-rilu-action">{content.rilu.expandCta}</span>
            </summary>
            <div className="branch-card-body">
              <div className="branch-card-layout">
                <div className="branch-card-copy">
                  <p className="branch-content-subtitle">{content.rilu.short}</p>
                  <LocalizedParagraphs paragraphs={content.rilu.body} />
                </div>
              </div>

              <div className="inline-rilu-body">
                <div className="branch-rilu-intro">
                  <div className="rilu-access-panel">
                    <h4>{content.rilu.accessHeading}</h4>
                    <p>{content.rilu.accessNote}</p>
                    <div className="rilu-access-grid">
                      {content.rilu.access.map((option) => (
                        <article className="rilu-access-card" key={option.title}>
                          {option.recommended ? (
                            <span className="rilu-access-recommendation">
                              {option.recommended}
                            </span>
                          ) : null}
                          <h5>{option.title}</h5>
                          <p>{option.copy}</p>
                          <button className="action-link" type="button" disabled>
                            {option.status}
                          </button>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="feature-card-grid branch-feature-grid">
                  {content.rilu.features.map((feature) => (
                    <article className="beichen-feature-card" key={feature.title}>
                      <img
                        className="feature-medallion"
                        src={xingqueAssets.constellationMedallion}
                        alt=""
                        aria-hidden="true"
                      />
                      <h4>{feature.title}</h4>
                      <p>{feature.copy}</p>
                    </article>
                  ))}
                </div>

                <aside
                  className="branch-privacy-note rilu-privacy-note"
                  aria-labelledby="rilu-privacy-title"
                >
                  <img
                    className="section-medallion"
                    src={xingqueAssets.constellationMedallion}
                    alt=""
                    aria-hidden="true"
                  />
                  <div>
                    <h3 id="rilu-privacy-title">{content.privacy.title}</h3>
                    <p>{content.privacy.body}</p>
                  </div>
                </aside>

                <blockquote className="beichen-footer-quote rilu-footer-quote">
                  {content.quote.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </blockquote>
              </div>
            </div>
          </details>
        </div>

      </section>
    </div>
  );
};
