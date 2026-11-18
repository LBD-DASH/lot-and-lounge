# Lot & Lounge

Static Astro site: one page per airport covering official parking rates (with the date they were checked), the real total cost of a trip, cheaper park-and-ride and transit options, and lounges listed by terminal with access methods.

Live: https://lbd-dash.github.io/lot-and-lounge/

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321/lot-and-lounge/
npm run build    # outputs dist/
```

## Structure

- `src/content/airports/<iata>.md`: one Markdown file per airport (frontmatter schema in `src/content.config.ts`)
- `src/data/partners.json`: the **only** place outbound partner URLs live (plain official URLs until an affiliate program is approved)
- `src/pages/`: home, airport template (`airports/[slug].astro`), about, privacy, affiliate disclosure, `sitemap.xml`, `robots.txt`
- `.github/workflows/deploy.yml`: builds and deploys to GitHub Pages on every push to `main`

## Custom domain later

Set `SITE_URL` (e.g. `https://lotandlounge.com`) and `BASE_PATH` (`/`) in `.github/workflows/deploy.yml`, add `public/CNAME` with the domain, and configure the domain under Settings → Pages.

## Adding airports

See [PLAYBOOK.md](./PLAYBOOK.md).
