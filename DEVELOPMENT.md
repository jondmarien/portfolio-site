# Development

This document covers local setup, project structure, testing, content updates, and deployment notes for the Chronus Portfolio repo.

## Stack

- React 19
- Vite 8
- Bun 1
- Express 5
- Three.js
- Vitest + Testing Library
- Playwright
- Vercel

## Getting Started

Install dependencies:

```sh
bun install
```

Run the Vite dev server:

```sh
bun run dev
```

Build for production:

```sh
bun run build
```

Preview the production build with Vite:

```sh
bun run preview
```

Run the Express production server after building:

```sh
bun run start
```

Run tests:

```sh
bun run test
```

Run browser tests:

```sh
bun run test:e2e
```

See [TESTING.md](TESTING.md) for the full verification workflow and targeted commands.

## Project Structure

```txt
api/
  health.js              Vercel function entry for the health route
e2e/
  *.e2e.js               Playwright browser tests
src/
  components/            Reusable React UI components
  data/                  Portfolio content modules
  styles/global.css      Site-wide visual system
  test/setup.js          Vitest DOM matcher setup
DESIGN.md                Visual system and UI constraints
PRODUCT.md               Product context and identity anchors
TESTING.md               Verification workflow
server.js                Local Express server for dist/ and /api/health
vercel.json              Vercel build/runtime configuration
vite.config.js           Vite and Vitest configuration
```

## Updating Content

Most portfolio updates should be data-only changes:

- Update hero, sidebar links, and contact links in `src/data/profile.js`.
- Add or edit projects in `src/data/projects.js`.
- Add security research/writeups in `src/data/security.js`.
- Add community and experience entries in `src/data/community.js`.

Projects can be sorted in the UI and may include media, stats, links, and detail copy. Keep project rows evidence-led: use real artifacts, specific metrics, and direct links.

Profile copy supports rich text fragments through `RichText.jsx`, including strong, italic, underline, accent, link, and tag treatments. Use this for targeted emphasis, not decorative formatting.

## UI Maintenance

- Keep `PRODUCT.md` and `DESIGN.md` in sync with major changes to positioning, visual identity, or component behavior.
- Prefer data and CSS updates over new abstractions unless the existing component shape is genuinely limiting.
- Preserve keyboard and screen-reader semantics for controls. Segmented project sorting uses radio semantics, not generic buttons.
- The ASCII `// chrono` hero is the signature visual. It should stay readable across Chromium, Firefox, and WebKit and avoid browser-sensitive fixed clipped text behavior.
- Contact and navigation links need visible hover and focus states. Do not leave transitions where rest and interactive states resolve to the same visual value.

## Deployment

The site is deployed on Vercel. Vercel uses Bun via `vercel.json`:

```json
{
  "bunVersion": "1.x",
  "buildCommand": "bun run build",
  "outputDirectory": "dist"
}
```

The frontend is served from the Vite `dist/` output. The health endpoint is available at:

```txt
/api/health
```

Expected response:

```json
{ "status": "ok" }
```

## Notes

- `bun.lock` should stay committed so Vercel detects Bun installs.
- `dist/`, `.vercel/`, `node_modules/`, logs, and local env files are ignored.
- WebSockets are intentionally not used because Vercel Functions do not support acting as WebSocket servers.
- The local Express server is only for serving the production build and `/api/health`; day-to-day development should use Vite.
