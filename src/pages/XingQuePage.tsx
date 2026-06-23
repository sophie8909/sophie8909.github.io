import { useTranslation } from 'react-i18next';
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

const xingqueDescription = {
  english: [
    'XingQue takes inspiration from the halls and offices of a traditional Chinese court.',
    'Each academy keeps its own charge.\nEach office tends to its own duties.',
    'Like stars scattered across the night sky,\nthey stand apart,\nyet quietly sustain the rhythms of daily life.'
  ],
  chinese: [
    '星闕取意於古代宮闕與百司。',
    '諸院各有所掌，\n諸司各有所職。',
    '如群星分布於夜空，\n彼此獨立，\n卻共同維繫著日常。'
  ]
};

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

const branchDetails = [
  {
    title: 'XingQue',
    copy: xingqueDescription
  },
  {
    title: 'Beichen',
    copy: beichenDescription
  },
  {
    title: 'Rilu',
    copy: riluShortDescription
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
    title: 'Reading Office',
    titleZh: '閱文之閣',
    copy: 'For reading practice.'
  },
  {
    title: 'Vocabulary Archive',
    titleZh: '藏詞之庫',
    copy: 'For keeping words.'
  },
  {
    title: 'Speaking Room',
    titleZh: '習聲之房',
    copy: 'For speaking practice.'
  },
  {
    title: 'Review Hall',
    titleZh: '溫習之館',
    copy: 'For returning to what has been learned.'
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
          <BilingualBlock {...xingqueDescription} className="section-bilingual-copy" />
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
                  <BilingualBlock {...beichenDescription} />
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
                        <BilingualBlock {...detail.copy} className="detail-bilingual-copy" />
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
            <BilingualBlock {...riluShortDescription} className="branch-content-subtitle" />
          </div>
          <div className="branch-rilu-intro">
            <BilingualBlock {...riluDescription} />
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
            <h3 id="future-beichen-title">
              Offices of Beichen
              <span lang="zh-Hant">北辰院諸司</span>
            </h3>
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
                <h4>{tool.title}</h4>
                <p className="future-tool-title-zh" lang="zh-Hant">
                  {tool.titleZh}
                </p>
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

        <blockquote className="beichen-footer-quote">
          <p>Not built for speed.</p>
          <p>Built for returning.</p>
          <p lang="zh-Hant">不求一日精進，</p>
          <p lang="zh-Hant">但求來日仍願再來。</p>
        </blockquote>
      </section>
    </div>
  );
};
