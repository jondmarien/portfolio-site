# Development

This document covers local setup, project structure, testing, content updates, and deployment notes for the Chronus Portfolio repo.

## Stack

- React 19
- Vite 8
- Bun 1
- Express 5
- Vitest + Testing Library
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

## Project Structure

```txt
api/
  health.js              Vercel function entry for the health route
src/
  components/            Reusable React UI components
  data/                  Portfolio content modules
  styles/global.css      Site-wide visual system
  test/setup.js          Vitest DOM matcher setup
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

Projects with `featured: true` show before the `show more` toggle. Projects without `featured: true` are hidden until expanded.

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
