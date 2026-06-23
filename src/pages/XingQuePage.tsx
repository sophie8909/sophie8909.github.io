import { useTranslation } from 'react-i18next';
import { xingqueAssets } from '../assets/xingque';

const branchDetails = [
  {
    title: 'XingQue',
    copy: 'The parent archive for branch-based tools with a scholarly celestial identity.'
  },
  {
    title: 'Beichen',
    copy: 'The northern-star language branch for repeatable reading and writing habits.'
  },
  {
    title: 'Rilu',
    copy: 'The first Beichen tool, built around short diary writing in a target language.'
  }
];

const riluOutputs = ['Minimal version', 'Natural version', 'Emotional version'];

const riluFeatures = [
  {
    title: 'Multilingual diary writing',
    copy: 'Choose a target language and keep the same quiet diary format across languages.'
  },
  {
    title: 'CEFR level control',
    copy: 'Adjust the writing level from A1 to C1 while keeping the diary short and usable.'
  },
  {
    title: 'Native-language support',
    copy: 'Keep English translations by default, and optionally add your native-language meaning.'
  },
  {
    title: 'Vocabulary capture',
    copy: 'Capture only the target-language diary lines and build a local vocabulary record.'
  },
  {
    title: 'Frequency tracking',
    copy: 'See which words return often, counted once per capture to avoid repeated-version noise.'
  },
  {
    title: 'Local-first storage',
    copy: 'Captured replies and vocabulary records stay on the device by default.'
  }
];

const futureTools = [
  {
    title: 'Reading',
    copy: 'For saving short reading notes and useful sentences.'
  },
  {
    title: 'Vocabulary',
    copy: 'For reviewing collected words across languages.'
  },
  {
    title: 'Shadowing',
    copy: 'For speaking practice built around short daily lines.'
  },
  {
    title: 'Review',
    copy: 'For returning to phrases without heavy study sessions.'
  }
];

export const XingQuePage = () => {
  const { i18n } = useTranslation();
  const xingqueTitle = i18n.language.startsWith('zh') ? '星闕' : 'XingQue';

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
                alt={xingqueTitle}
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

      <section className="xingque-branches" aria-labelledby="xingque-branches-title">
        <img
          className="xingque-section-chart"
          src={xingqueAssets.xingqueStarChart}
          alt=""
          aria-hidden="true"
        />
        <div className="section-kicker">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
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
                <img src={xingqueAssets.constellationMedallion} alt="" />
              </span>
              <span>
                <span className="branch-title">Beichen Academy</span>
                <span className="branch-english">BEICHEN</span>
              </span>
            </summary>
            <div className="branch-card-body">
              <div className="branch-card-layout">
                <div className="branch-academy-panel" aria-hidden="true">
                  <img
                    className="branch-academy"
                    src={xingqueAssets.beichenAcademy}
                    alt=""
                    width="900"
                    height="620"
                  />
                  <img className="branch-seal" src={xingqueAssets.sealBeichen} alt="" />
                </div>
                <div className="branch-card-copy">
                  <p>Language-learning tools for quiet, sustainable daily practice.</p>
                  <p>
                    Beichen is the language-learning branch of XingQue. It is built for small
                    daily rituals: writing a few diary lines, collecting useful words, and
                    returning to language without pressure.
                  </p>
                  <div className="branch-detail-grid">
                    {branchDetails.map((detail) => (
                      <div key={detail.title}>
                        <img
                          className="detail-medallion"
                          src={xingqueAssets.constellationMedallion}
                          alt=""
                          aria-hidden="true"
                        />
                        <h3>{detail.title}</h3>
                        <p>{detail.copy}</p>
                      </div>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a className="action-link action-link-primary" href="/xingque/beichen">
                      BEICHEN
                    </a>
                    <button className="action-link" type="button" disabled>
                      STORE COMING SOON
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        <section
          className="branch-content-block branch-rilu-block"
          aria-labelledby="rilu-branch-title"
        >
          <div className="branch-content-heading">
            <p className="eyebrow">Rilu</p>
            <h3 id="rilu-branch-title">Rilu · Daily Language Journal</h3>
            <p className="branch-content-subtitle">
              A ChatGPT companion for short, natural diary writing.
            </p>
          </div>
          <div className="branch-rilu-intro">
            <p>
              Rilu helps turn fragments, keywords, emotions, or broken sentences into three
              diary-ready versions in the language you are learning.
            </p>
            <ol className="rilu-output-list" aria-label="Rilu output versions">
              {riluOutputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ol>
          </div>
          <div className="feature-card-grid branch-feature-grid">
            {riluFeatures.map((feature) => (
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
        </section>

        <section
          className="branch-content-block branch-future-block"
          aria-labelledby="future-beichen-title"
        >
          <div className="branch-content-heading">
            <p className="eyebrow">Later</p>
            <h3 id="future-beichen-title">Future Beichen tools</h3>
            <p>
              Beichen begins with Rilu, but the branch is designed to hold more small
              language-learning tools later.
            </p>
          </div>
          <div className="future-tool-list">
            {futureTools.map((tool) => (
              <article className="future-tool-card" key={tool.title}>
                <img
                  className="future-lattice"
                  src={xingqueAssets.latticeCircular}
                  alt=""
                  aria-hidden="true"
                />
                <h4>{tool.title}</h4>
                <p>{tool.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="branch-privacy-note" aria-labelledby="rilu-privacy-title">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <div>
            <h3 id="rilu-privacy-title">Local by default</h3>
            <p>
              Rilu’s MVP keeps captured replies and vocabulary records on your device. No account
              system, no backend, and no analytics are required for the local workflow.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};
