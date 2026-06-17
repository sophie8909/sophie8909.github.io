import { calculatorUrl } from '../data/projects';

export const CalculatorPage = () => (
  <div className="page-shell calculator-page">
    <section className="page-intro calculator-hero" aria-labelledby="calculator-page-title">
      <div>
        <p className="eyebrow">Game progression calculator</p>
        <h1 id="calculator-page-title">杖劍傳說素材計算機</h1>
        <p className="project-description">
          A focused calculator page for planning Wand & Sword progression materials, character upgrades,
          skill materials, and equipment development.
        </p>
        <div className="project-actions" aria-label="Calculator actions">
          <a className="action-link action-link-primary" href={calculatorUrl} rel="noreferrer" target="_blank">
            Open Calculator
          </a>
          <a className="action-link" href="/">
            Feiya Studio
          </a>
        </div>
      </div>

      <div className="calculator-panel" aria-label="Calculator workflow preview">
        <span className="visual-shape visual-shape-square" />
        <span className="visual-axis visual-axis-horizontal" />
        <span className="visual-axis visual-axis-vertical" />
        <div className="artcodex-panel-copy">
          <strong>Material planner</strong>
          <span>角色養成 / 技能材料 / 裝備養成</span>
        </div>
      </div>
    </section>

    <section className="project-section calculator-seo-section" aria-labelledby="calculator-seo-title">
      <div className="project-section-copy">
        <p className="eyebrow">Calculator information</p>
        <h2 id="calculator-seo-title">Plan upgrades before spending materials</h2>
        <p className="project-description">
          The Feiya Studio calculator collection includes a 杖劍傳說 素材計算機 for players who want a clearer
          view of 角色養成 costs before committing resources. The tool is designed around practical planning:
          choose the progression target, compare required 技能材料, and keep 裝備養成 needs visible while
          preparing future upgrades.
        </p>
      </div>

      <div className="seo-copy">
        <p>
          This page exists as the Feiya Studio indexable entry point for the calculator. It gives search engines
          and players a stable description of the utility while the working calculator remains available as a
          dedicated tool. The calculator is useful for checking upgrade goals, estimating material pressure, and
          reducing repeated manual lookups during character progression.
        </p>
        <p>
          Keywords such as 杖劍傳說, 素材計算機, 角色養成, 技能材料, and 裝備養成 are included here because they
          describe the actual player workflow: planning character growth, skill upgrade resources, and equipment
          development in one focused place.
        </p>
      </div>
    </section>
  </div>
);
