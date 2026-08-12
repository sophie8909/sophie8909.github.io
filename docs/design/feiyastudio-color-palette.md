# FeiyaStudio Implemented Color Palette Audit

Inspection date: 2026-08-12

This is an implementation audit, not a proposed palette. The active source of truth is `src/main.tsx` plus the imported `src/styles/global.css`, rendered route/page/component JSX, and SVG source attributes under `src/assets/xingque/`.

## Audit scope and method

- Inspected active CSS variables, CSS declarations, gradients, borders, shadows, overlays, SVG `fill`/`stroke` values, SVG opacity attributes, and JSX/TSX inline/theme-like color sources.
- Excluded dependencies, `dist/`, caches, raster-image internal pixels, and CSS selectors/assets not mounted by current routes.
- Excluded declarations that are overridden by a later active declaration when the earlier color cannot reach the current UI.
- Equivalent HEX, `rgba()`, and SVG opacity values are represented as uppercase six-digit HEX plus a separate alpha value.
- `transparent` is recorded as a zero-alpha stop but is not counted as a chromatic effective color.

No CSS, component, theme, asset, or application behavior was changed. The generated JSON is the machine-readable companion to this document.

## Summary counts

| Measure | Count | Counting rule |
| --- | ---: | --- |
| Unique effective RGB colors | 10 | Distinct active base RGB values after normalization |
| Active color-plus-alpha signatures | 70 | The 10 RGB bases plus active CSS alpha and SVG opacity variants; transparent-only values excluded |
| Dominant FeiyaStudio colors | 8 | The eight `:root` colors consistently used across the shared site shell |
| Section-specific colors | 2 | `#D69E8E` and `#FAF7F3`, introduced by XingQue/Beichen surfaces/assets |
| Isolated / one-off RGB colors | 0 | No active base RGB is used only once as a visible color; some alpha signatures are naturally isolated |
| Detected inconsistencies | 6 | Implementation inconsistencies documented below; none were fixed |

## Active implementation inventory

The table records each active base color. Alpha variants are kept separate in the next table and in `feiyastudio-color-palette.json`; they are not flattened onto an assumed background.

| Color | Alpha | Existing token | Semantic role | Usage examples | Source | Frequency | Notes |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| `#2D2926` | 100% | `--text` | Primary ink/text, strong borders, focus outline, SVG linework | Headings, navigation, `:focus-visible`, constellation/chart linework | `src/styles/global.css:13,57,679`; `src/assets/xingque/constellation-medallion.svg:6`; `src/assets/xingque/moon-gate-window.svg:24,33`; `src/assets/xingque/xingque-star-chart.svg:21,28` | dominant | Active shadow and SVG opacity variants are listed below. |
| `#7D746D` | 100% | `--muted` | Muted copy, metadata, disabled text, footer copy | Project descriptions, localized paragraphs, SXSTX copy, disabled actions | `src/styles/global.css:14` and active `var(--muted)` uses throughout | common | Token-only active color; no separate alpha literal. |
| `#8A7177` | 100% | `--secondary` | Secondary text and subtitle color | Hero/project subtitles, quotes, product subtitles | `src/styles/global.css:10` and active `var(--secondary)` uses | common | The same token serves brand-secondary and text-secondary roles. |
| `#B79974` | 100% | `--accent` | Muted gold accent and warm SVG detail | Section numbers, indexes, dates, map blocks, star-chart details | `src/styles/global.css:11,321`; `src/assets/xingque/constellation-medallion.svg:5`; `src/assets/xingque/moon-gate-window.svg:19,47,55`; `src/assets/xingque/xingque-star-chart.svg:12,14,56` | common | Also appears as `rgba(183,153,116,0.24)` in the hero triangle. |
| `#B87C85` | 100% | `--primary` | Primary rose brand, interactive, and decorative color | Primary actions, hover/current links, XingQue strokes, seals, lattices, product accents | `src/styles/global.css:9,62,135,1640,2140,2354,2471,2565,2958,3104,3118`; active `src/assets/xingque/*.svg` | dominant | Repeated hardcoded `rgba()` equivalents and SVG opacity variants are active. |
| `#D69E8E` | 100% | none | XingQue/Beichen soft rose-peach decorative color | Beichen hero wash and moon-gate landscape wash | `src/styles/global.css:1386`; `src/assets/xingque/moon-gate-window.svg:23` | occasional | Section-specific hardcoded color; no CSS variable exists. |
| `#D8D0C8` | 100% | `--line` | Default border, divider, and geometric grid color | Borders, section rules, body grid, blueprint/tool/SXSTX grids | `src/styles/global.css:12,34-35,570-571,629-630,2363-2364` | dominant | Reused as multiple translucent grid values. |
| `#EFE7DD` | 100% | `--surface` | Warm surface, section overlay, card, and action background | Primary buttons, page overlays, XingQue/Beichen surfaces, workflow cards | `src/styles/global.css:8,1641,1662,1853,2141,2180,2207,2365,2960`; `src/assets/xingque/moon-gate-window.svg:20` | common | Active translucent variants remain separate. |
| `#F8F5F1` | 100% | `--background` | Paper/page background, paper fill, and light shadow color | Body/page, header/hero overlays, SVG paper/seal details, wordmark shadows | `src/styles/global.css:7,94,1662,1670,1789,1795,2207,2255`; active `src/assets/xingque/*.svg` | dominant | Also appears directly in active SVGs rather than through the CSS token. |
| `#FAF7F3` | 100% | none | Lighter XingQue elevated/card surface | XingQue product-card gradient, Rilu buttons, moon-gate circle | `src/styles/global.css:1853,2141`; `src/assets/xingque/moon-gate-window.svg:18` | occasional | Near-identical to the global paper color, but intentionally distinct in active XingQue implementation. |

## Active alpha and opacity variants

These are implementation values, not composited colors. CSS alpha values are direct `rgba()` declarations. SVG opacity values include active element/group opacity attributes in the current SVG assets.

| Base color | CSS alpha variants | SVG opacity variants | Representative source |
| --- | --- | --- | --- |
| `#2D2926` | 8% | 42%, 58%, 62%, 72% | `src/styles/global.css:1463,1751,2233`; `src/assets/xingque/constellation-medallion.svg:6`; `moon-gate-window.svg:24,33`; `xingque-star-chart.svg:21,28` |
| `#7D746D` | none | none | `src/styles/global.css:14` |
| `#8A7177` | none | none | `src/styles/global.css:10` |
| `#B79974` | 24% | 22%, 34%, 48%, 55%, 72% | `src/styles/global.css:321`; active SVG accent/ring details |
| `#B87C85` | 8%, 22%, 24%, 28%, 32%, 34%, 36%, 40%, 42%, 48%, 70% | 14%, 24%, 34%, 40%, 42%, 48%, 52%, 54%, 55%, 56%, 58%, 60%, 62%, 64%, 68%, 70%, 72%, 82%, 85%, 86%, 96% | Active primary/rose declarations in `src/styles/global.css`; active SVG strokes/fills/groups |
| `#D69E8E` | 12% | 28% | `src/styles/global.css:1386`; `src/assets/xingque/moon-gate-window.svg:23` |
| `#D8D0C8` | 20%, 28%, 34%, 42% | none | `src/styles/global.css:34-35,570-571,629-630,2363-2364` |
| `#EFE7DD` | 26%, 28%, 34%, 42%, 62%, 72% | 72% | `src/styles/global.css:1641,1662,1853,2141,2180,2207,2365,2960`; `moon-gate-window.svg:20` |
| `#F8F5F1` | 72%, 76%, 84%, 92%, 94%, 96% | 60%, 86% | `src/styles/global.css:94,1662,1670,1789,1795,1919,2180,2207,2255`; active SVG paper/seal details |
| `#FAF7F3` | 72%, 92%, 96% | 96% | `src/styles/global.css:1853,2141`; `src/assets/xingque/moon-gate-window.svg:18` |

## Semantic role classification

### Brand

- Primary: `#B87C85` via `--primary`.
- Secondary: `#8A7177` via `--secondary`.
- Accent: `#B79974` via `--accent`.

### Background

- Page background: `#F8F5F1` via `--background`.
- Section/surface background: `#EFE7DD` via `--surface`.
- Elevated XingQue surface: `#FAF7F3`, hardcoded in active XingQue CSS/SVG.
- Soft decorative background: `#D69E8E`, used in the Beichen hero and moon-gate artwork.

### Text

- Primary text: `#2D2926` via `--text`.
- Secondary text: `#8A7177` via `--secondary`.
- Muted text: `#7D746D` via `--muted`.
- Accent text: `#B79974` via `--accent`.
- Link text: `#B87C85` via `--primary` on active links and hover states.
- Inverse text: no separate inverse text token is implemented. Light text/paper values appear as `#F8F5F1` in skip-link contrast and SVG artwork rather than as a named inverse role.

### Border / Divider

- Default border and divider: `#D8D0C8` via `--line`.
- Soft rose border: `#B87C85` at 22% and other hardcoded alpha values.
- Strong border/focus: `#2D2926` via `--text`.

### Interactive

- Primary button: `#B87C85` border/accent with `#EFE7DD` surface.
- Secondary button: `#D8D0C8` border with transparent background and `#2D2926` text.
- Hover: `#2D2926` border and `#B87C85` text in action links.
- Selected/current: `#B87C85` border; global navigation text stays `#2D2926`.
- Focus: `#2D2926` outline.
- Disabled: `#7D746D` text, rose border, and generic action opacity 76%.

### Status

No semantic success, warning, error, or info colors are implemented in the active frontend. No status category is included in the machine-readable palette.

### Decorative

The active XingQue asset family uses `#B87C85`, `#B79974`, `#D69E8E`, `#2D2926`, `#F8F5F1`, `#EFE7DD`, and `#FAF7F3`. Active sources are:

- `src/assets/xingque/armillary-sphere.svg`
- `src/assets/xingque/astronomical-telescope.svg`
- `src/assets/xingque/constellation-medallion.svg`
- `src/assets/xingque/lattice-moon-gate.svg`
- `src/assets/xingque/lattice-song.svg`
- `src/assets/xingque/lattice-square.svg`
- `src/assets/xingque/moon-gate-window.svg`
- `src/assets/xingque/seal-beichen.svg`
- `src/assets/xingque/xingque-star-chart.svg`

## Dominant FeiyaStudio Palette

These are only the colors that clearly form the shared current FeiyaStudio visual identity. Page-specific additions are intentionally omitted.

### Core brand colors

- `#B87C85` — primary rose for controls, navigation states, brand glyph, and the recurring geometric/XingQue line language.
- `#8A7177` — muted rose-brown secondary text used consistently in subtitles, quotes, and supporting labels.
- `#B79974` — muted gold accent used for numbers, indexes, dates, map geometry, and warm decorative details.

### Main backgrounds

- `#F8F5F1` — dominant paper/page background across the shell and major overlays.
- `#EFE7DD` — warm surface used for primary actions, section layers, and many translucent panels.

### Main text colors

- `#2D2926` — dominant ink for headings, navigation, focus, and strong linework.
- `#7D746D` — dominant muted copy color for descriptions, metadata, disabled text, and footer content.

### Main accent colors

- `#B87C85` — rose interactive and decorative accent.
- `#B79974` — gold label/index accent.

### Main border colors

- `#D8D0C8` — default border/divider and geometric grid color.
- `#B87C85` — rose emphasis border for primary/selected/section-specific controls.

## Color Inconsistencies

These are observations only. They were not corrected.

1. The eight global `:root` colors are tokenized, but the active XingQue SVG assets repeat the same RGB values as hardcoded `fill`/`stroke` values. The CSS and SVG implementations therefore have duplicate sources for the same brand colors.
2. The same primary rose is expressed as `var(--primary)`, direct HEX in SVG, and many hardcoded `rgba(184,124,133,alpha)` declarations. The alpha forms are necessary for translucency, but there is no shared alpha-token layer.
3. `#FAF7F3` is a near-neighbor of the global `#F8F5F1` and is used for active XingQue elevated/card surfaces without a token, creating two very similar paper colors with different ownership.
4. `#D69E8E` is an additional warm rose-peach used only by XingQue/Beichen hero/artwork treatments. It is intentionally section-specific but is hardcoded rather than represented by a section token.
5. Primary action styling changes on XingQue/Beichen: the global action uses `--primary` plus `--surface`, while the section override uses `rgba(184,124,133,0.70)` and `rgba(239,231,221,0.72)` for the same apparent role.
6. Global surfaces mix token references such as `var(--background)`/`var(--surface)` with direct translucent equivalents such as `rgba(248,245,241,...)` and `rgba(239,231,221,...)`. This is visible in page overlays, cards, privacy notes, and portal visuals.

There are also older source declarations for classes such as `.network-*`, `.artcodex-*`, `.project-visual`, `.archive-*`, `.branch-detail-grid`, and `.branch-content-block`. They were not counted as active palette usage because their elements are not mounted by the current route JSX or their backgrounds are overridden by later active rules. Unused asset sources such as `src/assets/xingque/beichen-academy.svg` and the unmounted `lattice-circular.svg` were likewise excluded from the active count.

## Page-specific palettes

### Global FeiyaStudio palette

The homepage, Projects, About, and SXSTX portal/update routes use the eight global colors:

`#F8F5F1`, `#EFE7DD`, `#B87C85`, `#8A7177`, `#B79974`, `#D8D0C8`, `#2D2926`, `#7D746D`.

### Global FeiyaStudio palette → XingQue/Beichen section-specific palette

Routes `/xingque` and `/xingque/beichen` preserve the global palette and add:

- `#FAF7F3` — lighter card/elevated surface and moon-gate circle.
- `#D69E8E` — soft rose-peach hero/artwork wash.

### Component-specific exceptions

- XingQue SVG artwork combines the global rose/gold/ink/paper colors with the two section-specific colors and many explicit opacity values.
- XingQue product cards use the `#FAF7F3` → `#EFE7DD` surface gradient and a rose inset edge.
- Rilu access buttons use `#FAF7F3` at 72% with `#B87C85` text and a 32% rose border.
- SXSTX has a distinct component geometry but no distinct RGB palette; it reuses the global colors with its own grid and panel alpha values.

## Active gradients

All active gradient families and stops are recorded in the JSON under `gradients`. The primary active implementations are:

| Gradient | Exact stops | Active usage | Source |
| --- | --- | --- | --- |
| Body grid | `linear-gradient(90deg, rgba(216,208,200,0.28) 1px, transparent 1px)` and `linear-gradient(180deg, rgba(216,208,200,0.20) 1px, transparent 1px)` | Body grid | `src/styles/global.css:34-35` |
| Featured blueprint grid | Two directions, `rgba(216,208,200,0.42) 1px` to `transparent 1px` | CatRodis blueprint | `src/styles/global.css:570-571` |
| Tool/SXSTX grid | Two directions, `rgba(216,208,200,0.34) 1px` to `transparent 1px` | Supporting-project and SXSTX visuals | `src/styles/global.css:629-630,2363-2364` |
| Product page overlay | `linear-gradient(180deg, rgba(248,245,241,0.96), rgba(239,231,221,0.34))` | XingQue and Beichen page shell | `src/styles/global.css:1662` |
| XingQue hero | `linear-gradient(90deg, rgba(248,245,241,0.94), rgba(248,245,241,0.76))` | XingQue hero | `src/styles/global.css:1670` |
| Product card | `linear-gradient(135deg, rgba(250,247,243,0.96), rgba(239,231,221,0.62))` | XingQue product cards | `src/styles/global.css:1853` |
| Workflow step | `linear-gradient(135deg, rgba(250,247,243,0.92), rgba(239,231,221,0.42))` | XingQue workflow steps | `src/styles/global.css:2960` |
| Beichen hero | `linear-gradient(90deg, rgba(248,245,241,0.94), rgba(248,245,241,0.72))` | Beichen hero | `src/styles/global.css:2207` |
| Rilu privacy note | `linear-gradient(90deg, rgba(248,245,241,0.84), rgba(239,231,221,0.28))` | Beichen Rilu privacy note | `src/styles/global.css:2180` |

The active `tool-visual` and `sxstx-portal-visual` backgrounds also include solid translucent stops `rgba(239,231,221,0.26)` and `rgba(239,231,221,0.28)` respectively. Transparent stops remain literal `transparent` values.

## Active shadow and overlay colors

- `inset 0 0 0 1px rgba(184,124,133,0.08)` — XingQue product-card inset rose edge, `src/styles/global.css:1232`.
- `drop-shadow(0 10px 22px rgba(45,41,38,0.08))` — active XingQue intro artwork, `src/styles/global.css:1463`.
- `drop-shadow(0 22px 38px rgba(45,41,38,0.08))` — active moon-gate artwork, `src/styles/global.css:1751`.
- `drop-shadow(0 22px 34px rgba(45,41,38,0.08))` — active Beichen artwork, `src/styles/global.css:2233`.
- `drop-shadow(0 18px 42px rgba(248,245,241,0.92))` — XingQue and Beichen wordmarks, `src/styles/global.css:1789,1795`.

## Source coverage notes

- `src/main.tsx` imports `src/styles/global.css`, making the stylesheet active for every route.
- No Tailwind configuration, theme object, design-token file, or JSX inline color style was found in the active source tree.
- No active semantic status palette is present.
- PNG assets are referenced by the app, but their internal pixels are not color declarations in the frontend source and were not reverse-engineered for this implementation audit.
