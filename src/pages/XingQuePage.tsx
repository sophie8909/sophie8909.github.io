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

export const XingQuePage = () => {
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
            <img
              className="xingque-seal"
              src={xingqueAssets.sealXingque}
              alt=""
              aria-hidden="true"
            />
            <h1 id="xingque-title">XingQue</h1>
            <p className="hero-subtitle">Celestial Archive</p>
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
                <span className="branch-english">Beichen</span>
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
                      Beichen
                    </a>
                    <button className="action-link" type="button" disabled>
                      Store Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};
