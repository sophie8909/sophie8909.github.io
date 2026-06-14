const artcodexGptUrl =
  'https://chatgpt.com/g/g-6a2d872cda7481918ddc94109ccb8a14-artcodex-content-generator';

const workflowItems = [
  {
    number: '01',
    title: 'Project',
    description: 'Keep project-level visual rules, reusable settings, and prompt defaults in one local workspace.'
  },
  {
    number: '02',
    title: 'Category',
    description: 'Group references into focused sets such as styles, characters, locations, props, or custom sets.'
  },
  {
    number: '03',
    title: 'Style',
    description: 'Reuse tone, line quality, palette, rendering notes, and image settings without rewriting them.'
  },
  {
    number: '04',
    title: 'Prompt',
    description: 'Build a clean image-generation prompt from selected assets and send it into the ArtCodex GPT workflow.'
  }
];

export const ArtCodexPage = () => (
  <div className="page-shell artcodex-page">
    <section className="page-intro artcodex-hero" aria-labelledby="artcodex-page-title">
      <div>
        <p className="eyebrow">Chrome extension for creator workflows</p>
        <h1 id="artcodex-page-title">ARTCODEX</h1>
        <p className="project-description">
          ArtCodex is a prompt-generation tool for creating image-generation prompts from organized project
          styles, categories, and reusable visual settings.
        </p>
        <div className="project-actions" aria-label="ArtCodex actions">
          <span className="action-link action-link-primary" aria-disabled="true">
            Chrome Web Store
            <span className="action-link-note">TBC</span>
          </span>
          <a className="action-link" href={artcodexGptUrl} rel="noreferrer" target="_blank">
            Open GPT
          </a>
          <a className="action-link" href="#artcodex-privacy">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="artcodex-panel" aria-label="ArtCodex workflow preview">
        <span className="visual-shape visual-shape-circle" />
        <span className="visual-axis visual-axis-horizontal" />
        <span className="visual-axis visual-axis-vertical" />
        <div className="artcodex-panel-copy">
          <strong>Prompt workbench</strong>
          <span>Project / Category / Style / Prompt</span>
        </div>
      </div>
    </section>

    <section className="project-section artcodex-product" aria-labelledby="artcodex-product-title">
      <div className="project-section-copy">
        <p className="eyebrow">Product information</p>
        <h2 id="artcodex-product-title">Project-first prompt workflow</h2>
        <p className="project-description">
          Organize reusable project context before generating. ArtCodex keeps visual rules, category records,
          style direction, and output settings close to the prompt workflow.
        </p>
      </div>

      <div className="artcodex-workflow-grid" aria-label="ArtCodex workflow steps">
        {workflowItems.map((item) => (
          <article className="artcodex-info-card" key={item.number}>
            <span className="tool-index">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="project-section artcodex-privacy" id="artcodex-privacy" aria-labelledby="privacy-title">
      <div className="project-section-copy">
        <p className="eyebrow">Privacy Policy</p>
        <h2 id="privacy-title">Local-first by design</h2>
        <p className="project-description">Last updated: June 14, 2026</p>
      </div>

      <div className="artcodex-policy-copy">
        <p>
          ArtCodex stores the project data that you create, edit, import, or save in the extension. This may
          include projects, styles, characters, locations, custom categories, prompt history, approved prompt
          versions, UI preferences, and language preferences.
        </p>
        <p>
          ArtCodex stores extension data locally in your browser using chrome.storage.local. Data remains on
          your device unless you choose to copy it, paste it, export it, import it, or submit content through
          ChatGPT yourself.
        </p>
        <p>
          ArtCodex does not use tracking, cookies, analytics, advertising identifiers, or backend services, and
          does not sell or share user data with advertising platforms, data brokers, analytics providers, or
          other third parties.
        </p>
      </div>
    </section>
  </div>
);
