# AGENTS.md

## Learned User Preferences

- Always write code and docs in English.
- Prefer functional React code and straightforward data-driven updates.
- Keep implementation details conservative and aligned with the existing repo patterns.
- When fixing bugs, verify the issue exists first, add focused regression coverage when practical, and then patch.

## Learned Workspace Facts

- This is the Chronus personal portfolio at `chron0.tech`, built with React 19, Vite 8, Bun, Express, Three.js, Vitest, Testing Library, and Playwright.
- Root docs define the working context:
  - `PRODUCT.md` for audience, purpose, product principles, and identity anchors.
  - `DESIGN.md` for visual constraints, component rules, motion, accessibility, and anti-slop bans.
  - `DEVELOPMENT.md` for setup, structure, content updates, and deployment.
  - `TESTING.md` for verification commands and when to run each layer.
- The design direction is sparse terminal/editor, not generic cyberpunk: near-black graphite surfaces, monospace chrome, IBM Plex Sans body copy, purple/teal accents, and evidence-led content.
- The ASCII `// chrono` hero is the signature visual. Keep it readable across Chromium, Firefox, and WebKit. Avoid `background-attachment: fixed`, clipped text backgrounds, and `mix-blend-mode: difference` for visible ASCII layers.
- The hero ASCII currently prioritizes stable alignment over wave/tilt motion. Do not re-enable motion without cross-browser visual verification.
- Portfolio content lives mostly in `src/data/*.js`. Prefer updating data modules before changing component structure.
- Project sorting uses accessible radio semantics. Preserve keyboard navigation and `aria-checked` behavior.
- Contact and navigation links need visible hover/focus states. Do not make rest and interactive colors identical when a transition implies affordance.
- Use `bun run test` for the full Vitest suite, targeted `bun run test -- <path>` while iterating, `bun run test:e2e` for Playwright, and `bun run build` before claiming production readiness.
