# Feiya Studio

Production homepage for [feiyastudio.com](https://feiyastudio.com).

- CatRodis
- ArtCodex
- CLUELESS
- sxstx Calculator

## Stack

- React
- Vite
- TypeScript
- i18next
- GitHub Pages

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── public/
│   ├── CNAME
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   ├── locales/
│   │   ├── en.json
│   │   ├── sv.json
│   │   ├── zh-CN.json
│   │   └── zh-TW.json
│   ├── pages/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Local Development

```bash
npm install
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Updating Homepage Creations

To add or edit homepage creations, update `src/data/creations.json`. Each item supports `id`, localized `title`, localized `subtitle`, localized `description`, and a `buttons` array. Each button supports localized `label`, `href`, and `clickable`. Items and buttons render in the order they appear in the arrays.

## Languages

The site supports:

- Traditional Chinese: `zh-TW`
- Simplified Chinese: `zh-CN`
- English: `en`
- Swedish: `sv`

Translations live in `src/locales/`. The selected language is stored in `localStorage` under `feiya-language`, and language URLs use the `?lang=` query for multilingual SEO alternates.

## GitHub Pages Deployment

The workflow in `.github/workflows/deploy.yml` builds the Vite app and deploys `dist/` to GitHub Pages.

Repository settings:

1. Open GitHub repository settings.
2. Go to `Pages`.
3. Set source to `GitHub Actions`.
4. Push to `main`.

The included workflow will run:

```bash
npm install
npm run build
```

Then it uploads `dist/` with `actions/upload-pages-artifact` and deploys with `actions/deploy-pages`.

## Custom Domain

The `public/CNAME` file contains:

```text
feiyastudio.com
```

After deployment, configure DNS for `feiyastudio.com`:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   sophie8909.github.io
```

Then in GitHub repository settings:

1. Open `Settings` → `Pages`.
2. Set custom domain to `feiyastudio.com`.
3. Enable `Enforce HTTPS` after DNS verification completes.

## SEO

Included:

- OpenGraph tags
- Twitter Card tags
- `robots.txt`
- `sitemap.xml`
- canonical URL
- `hreflang` alternates for all supported languages
- Google AdSense account meta tag
- Google Analytics 4


`npm run build` emits route-specific static HTML plus real `robots.txt` and `sitemap.xml` files in `dist/`.
Run `npm test` to rebuild the production site and verify the generated sitemap, robots directives, canonical URLs, and calculator link.
## Design Notes

The homepage follows an architectural/editorial direction:

- muted low-saturation palette
- square borders
- geometric navigation
- large serif hierarchy
- minimal animation
- no glassmorphism, particles, mascots, or decorative clutter
