import { useTranslation } from 'react-i18next';
import { xingqueAssets } from '../assets/xingque';
import { LocalizedParagraphs } from '../components/LocalizedParagraphs';
import { getXingQueContent, type XingQueContent } from '../data/xingqueContent';

type ProductCardProps = {
  product: XingQueContent['rilu'] | XingQueContent['chenxun'];
  titleId: string;
};

const ProductCard = ({ product, titleId }: ProductCardProps) => (
  <article className="branch-card xingque-product-card" aria-labelledby={titleId}>
    <header className="xingque-product-card-header">
      <span className="branch-symbol" aria-hidden="true">
        <img src={xingqueAssets.constellationMedallion} alt="" />
      </span>
      <div>
        <h3 id={titleId}>{product.title}</h3>
        <p className="branch-content-subtitle">{product.short}</p>
      </div>
    </header>
    <div className="xingque-product-card-body">
      <ul className="xingque-product-tags">
        {product.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <a className="action-link action-link-primary xingque-product-action" href={product.href}>
        {product.cta}
      </a>
    </div>
  </article>
);

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
            <p className="eyebrow">{content.xingque.eyebrow}</p>
            <h1 id="xingque-title">
              <img
                className="xingque-wordmark"
                src={xingqueAssets.xingqueWordmark}
                alt={content.hero.alt}
                width="1254"
                height="650"
              />
            </h1>
            <p className="hero-subtitle">{content.xingque.heading}</p>
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

      <nav className="xingque-product-nav" aria-label={content.xingque.eyebrow}>
        <a href="/xingque/" aria-current="page">
          {content.nav.xingque}
        </a>
        <a href="/Beichen/">{content.nav.beichen}</a>
        <a href="/Beichen/rilu/">{content.nav.rilu}</a>
        <a href="/Beichen/chenxun/">{content.nav.chenxun}</a>
      </nav>

      <section className="xingque-branches" aria-label={content.xingque.branchEyebrow}>
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
          <p className="eyebrow">{content.xingque.branchEyebrow}</p>
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

        <div className="xingque-product-grid">
          <ProductCard product={content.rilu} titleId="rilu-title" />
          <ProductCard product={content.chenxun} titleId="chenxun-title" />
        </div>
        <p className="xingque-products-note">{content.productsNote}</p>

        <section className="xingque-workflow" aria-label={content.workflow.eyebrow}>
          <div className="section-kicker">
            <img
              className="section-medallion"
              src={xingqueAssets.constellationMedallion}
              alt=""
              aria-hidden="true"
            />
            <span className="section-number">02</span>
            <p className="eyebrow">{content.workflow.eyebrow}</p>
          </div>
          <ol className="xingque-workflow-grid">
            {content.workflow.steps.map((step, index) => (
              <li className="xingque-workflow-step" key={step.title}>
                <span className="xingque-step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="xingque-local-device" aria-labelledby="local-device-title">
          <div className="section-kicker">
            <img
              className="section-medallion"
              src={xingqueAssets.constellationMedallion}
              alt=""
              aria-hidden="true"
            />
            <span className="section-number">03</span>
            <p className="eyebrow">{content.localDevice.title}</p>
          </div>
          <div className="section-heading">
            <h2 id="local-device-title">{content.localDevice.title}</h2>
          </div>
          <LocalizedParagraphs paragraphs={content.localDevice.body} />
          <p className="xingque-local-support">{content.localDevice.support}</p>
        </section>

        <blockquote className="beichen-footer-quote xingque-quote">
          {content.quote.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>
      </section>
    </div>
  );
};
