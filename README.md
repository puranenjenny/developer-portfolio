# developer-portfolio

Work-in-progress developer portfolio built with Astro, TypeScript and (where needed) React islands. Everything is free: GitHub Pages, GitHub Actions and open-source tooling only.

> The site currently contains **placeholder content only**.

## Local development

Requires Node 22 (`nvm use` reads `.nvmrc`).

```sh
npm ci
npm run dev                 # http://localhost:4321/
npx astro check             # typecheck
npm run test:subpath        # builds with 3 base paths, fails on root-absolute URLs
BASE_PATH=/developer-portfolio/ npm run build
BASE_PATH=/developer-portfolio/ npm run test:e2e   # Playwright + axe
BASE_PATH=/developer-portfolio/ npm run lhci       # Lighthouse budgets
```

PowerShell: set `$env:BASE_PATH='/developer-portfolio/'` before the commands.

`npm run preview` serves `dist/` only under `BASE_PATH`, like GitHub Pages does for a project site (requests outside the prefix return 404), so layout and asset problems that only show on Pages show up locally too.

## Subpath rules

- `astro.config.mjs` reads `BASE_PATH` (default `/`).
- Internal links and assets must use `withBase()` from `src/utils/url.ts`; never write root-absolute paths like `/img/a.png`.
- Files in `public/` are referenced through `withBase('file.ext')`.

## Branching and review

Work in feature branches, open a PR to `main`, wait for CI and a review. Never push to `main` directly.

## CI and previews

- `ci.yml`: typecheck, subpath test, build, Playwright smoke and axe tests, Lighthouse budgets (performance, accessibility, SEO).
- `preview.yml`: for PRs from this repository only, builds with `BASE_PATH=/developer-portfolio/pr-<n>/`, writes **only** `pr-<n>/` on the `gh-pages` branch and comments the URL. `preview-cleanup.yml` deletes the folder when the PR closes.
- Preview URL: `https://<owner>.github.io/developer-portfolio/pr-<n>/`. Because the user site `puranenjenny.github.io` uses the custom domain `puranenjenny.dev`, project sites are also served at `https://puranenjenny.dev/developer-portfolio/...`. This repository never touches that other repository, its `CNAME` or DNS.
- `deploy.yml` (manual only): publishes `main` to the root of `gh-pages` and keeps the `pr-*` folders. A Pages site has a single source, so previews and production share the `gh-pages` branch.

### One-time setup by the repository owner

In *Settings → Pages*: source **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`, after the first preview run has created the branch. Do not set a custom domain on this repository.

## Content model

`src/content/projects` and `src/content/learning` (Astro content collections, typed in `src/content.config.ts`). Every entry has a `status` of `completed`, `in-progress` or `experiment`, so finished projects, ongoing studies and experiments stay clearly separate. Entries with `placeholder: true` are invented samples and must be replaced before publishing.

## Visual assets policy

- No generative-AI visuals (images, illustrations, icons, textures) in the final site. Temporary AI placeholders are allowed only during prototyping, must be clearly marked as placeholders, and must be replaced with real photos, own artwork or own design work before publishing.
- Project images are never edited, cropped or regenerated. Add them untouched to `public/` and reference them with `withBase()`.
- No personal contact details or application content are published without explicit approval.
