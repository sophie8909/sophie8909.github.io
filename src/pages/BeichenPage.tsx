import { xingqueAssets } from '../assets/xingque';

type BilingualBlockProps = {
  english: string[];
  chinese: string[];
  className?: string;
};

const BilingualBlock = ({ english, chinese, className = '' }: BilingualBlockProps) => (
  <div className={`bilingual-copy ${className}`.trim()}>
    <div className="bilingual-copy-english">
      {english.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    <div className="bilingual-copy-chinese" lang="zh-Hant">
      {chinese.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </div>
);

const beichenDescription = {
  english: [
    'Beichen, the Northern Star, stands at the center of the heavens.',
    'The Beichen Academy is entrusted with the study of languages:\ngathering words,\nordering passages,\nand through steady practice over time,\nturning unfamiliar tongues into familiar companions.'
  ],
  chinese: [
    '北辰者，天之樞也。',
    '北辰院司掌諸語之學，\n收詞句、理篇章，\n以日積月累之功，\n使陌生之語漸成可親之語。'
  ]
};

const riluDescription = {
  english: [
    'Rilu is the first office established within Beichen.',
    'It helps thoughts, fragments, emotions, and unfinished sentences find their place in the language being learned.'
  ],
  chinese: [
    '日錄司為北辰院首設之司。',
    '凡一日所思、\n所見、\n所感，',
    '皆可記之。',
    '或數語，\n或片言，',
    '終成一頁。'
  ]
};

const riluShortDescription = {
  english: ['A daily language journal for small and steady practice.'],
  chinese: ['以日日之記，\n養語言之功。']
};

const beichenOfficesDescription = {
  english: [
    'Rilu is the first office within Beichen.',
    'In time, more offices may be established for reading, vocabulary, speaking practice, and review.',
    'Each serves a different duty, yet all follow the same path of gradual learning.'
  ],
  chinese: [
    '今設日錄一司。',
    '他日或增閱文之閣，\n藏詞之庫，\n習聲之房，\n溫習之館。',
    '皆循其職，\n各守其事。'
  ]
};

const riluFeatures = [
  'Multilingual diary writing',
  'CEFR level control',
  'Three-version output',
  'ChatGPT prompt insertion',
  'Vocabulary capture',
  'High-frequency word tracking',
  'Local-first storage'
];

const futureTools = [
  {
    title: 'Reading Office',
    titleZh: '閱文之閣'
  },
  {
    title: 'Vocabulary Archive',
    titleZh: '藏詞之庫'
  },
  {
    title: 'Speaking Room',
    titleZh: '習聲之房'
  },
  {
    title: 'Review Hall',
    titleZh: '溫習之館'
  }
];

export const BeichenPage = () => {
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
          <p className="eyebrow">XingQue Branch</p>
          <h1 id="beichen-title">XingQue Beichen</h1>
          <BilingualBlock {...beichenDescription} className="beichen-description" />
          <div className="project-actions">
            <a className="action-link action-link-primary" href="#rilu">
              Explore Rilu
            </a>
            <button className="action-link" type="button" disabled>
              Coming Soon
            </button>
          </div>
        </div>
        <div className="beichen-hero-visual" aria-hidden="true">
          <img
            className="beichen-academy-asset"
            src={xingqueAssets.beichenAcademy}
            alt=""
            width="900"
            height="620"
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
          <p className="eyebrow">First Tool</p>
        </div>
        <div className="beichen-section-layout">
          <div className="beichen-section-copy">
            <h2 id="rilu-title">Rilu</h2>
            <BilingualBlock {...riluShortDescription} className="beichen-subtitle" />
            <BilingualBlock {...riluDescription} />
          </div>
          <div className="rilu-highlight" aria-label="Rilu always returns three versions">
            <img className="rilu-seal" src={xingqueAssets.sealBeichen} alt="" aria-hidden="true" />
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
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <span className="section-number">02</span>
          <p className="eyebrow">Features</p>
        </div>
        <h2 id="beichen-features-title">Practice pieces</h2>
        <div className="feature-card-grid">
          {riluFeatures.map((feature) => (
            <article className="beichen-feature-card" key={feature}>
              <img
                className="feature-medallion"
                src={xingqueAssets.constellationMedallion}
                alt=""
                aria-hidden="true"
              />
              <h3>{feature}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="beichen-section privacy-section" aria-labelledby="beichen-privacy-title">
        <div className="section-kicker">
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
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
          <img
            className="section-medallion"
            src={xingqueAssets.constellationMedallion}
            alt=""
            aria-hidden="true"
          />
          <span className="section-number">04</span>
          <p className="eyebrow">Later</p>
        </div>
        <div className="beichen-section-copy">
          <h2 id="beichen-future-title">
            Offices of Beichen
            <span lang="zh-Hant">北辰院諸司</span>
          </h2>
          <BilingualBlock {...beichenOfficesDescription} />
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
              <h3>{tool.title}</h3>
              <p className="future-tool-title-zh" lang="zh-Hant">
                {tool.titleZh}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="beichen-page-footer" aria-label="Beichen footer links">
        <blockquote className="beichen-footer-quote">
          <p>Not built for speed.</p>
          <p>Built for returning.</p>
          <p lang="zh-Hant">不求一日精進，</p>
          <p lang="zh-Hant">但求來日仍願再來。</p>
        </blockquote>
        <div className="beichen-footer-links">
          <a href="/xingque">XingQue</a>
          <a href="/xingque/beichen">Beichen</a>
          <a href="#rilu">Rilu</a>
          <a href="https://github.com/sophie8909" rel="noreferrer" target="_blank">
            GitHub
          </a>
          <span>Coming Soon</span>
        </div>
      </section>
    </div>
  );
};
