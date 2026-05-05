# Testing

This repo uses Vitest for component/unit coverage and Playwright for browser behavior. Use the lightest command that proves the change while iterating, then run the broader checks before calling a branch ready.

## Commands

Run the full Vitest suite:

```sh
bun run test
```

Run focused Vitest files:

```sh
bun run test -- src/components/ASCIIText.test.js
bun run test -- src/styles/global.test.js
```

Run all Playwright tests:

```sh
bun run test:e2e
```

Run only the ASCII cross-browser projects:

```sh
bun run test:e2e -- --project=ascii-chromium --project=ascii-firefox --project=ascii-webkit
```

Run the production build:

```sh
bun run build
```

## What To Run

- Data-only content edits: run the most relevant component/page tests, then `bun run test` if the rendered structure changed.
- CSS and visual-system edits: run `bun run test -- src/styles/global.test.js`, then browser-check the affected area.
- Component behavior edits: add or update component tests near the changed component and run `bun run test`.
- Project sorting or segmented-control edits: run `src/components/SegmentedControl.test.jsx`, `src/App.test.jsx`, and the full Vitest suite.
- ASCII hero edits: run `src/components/ASCIIText.test.js`, `src/styles/global.test.js`, the ASCII Playwright projects, and a manual visual pass in Chromium, Firefox, and WebKit when available.
- Deployment-readiness changes: run `bun run test`, `bun run test:e2e`, and `bun run build`.

## ASCII Hero Checklist

The ASCII `// chrono` mark is the most browser-sensitive part of the site. Verify:

- The pale base ASCII layer and chromatic accent ASCII layer stay aligned.
- The fallback `// chrono` text is hidden after ASCII readiness and visible when ASCII is disabled or unavailable.
- Scrolling does not move the colored layer independently from the base layer.
- Chromium, Firefox, and WebKit do not clip the first letters or shift the mark unpredictably.
- The hero keeps dense sampling with `asciiFontSize` at `8` or lower.
- The visible layers do not use `background-attachment: fixed`, `mix-blend-mode: difference`, or fixed clipped text backgrounds.

## Manual Visual Checks

Automated tests catch layout contracts, but this portfolio is visual. For UI changes, also scan:

- Desktop width around `1280x800`.
- Mobile widths around `390x844` and the `767/769` breakpoint boundary.
- Keyboard focus states for links, buttons, project sorting, details toggles, and modal controls.
- Contact link rest and hover/focus colors.
- Project media frames, especially mixed portrait/landscape images.

## Test Environment Notes

- Playwright starts a Vite server from `playwright.config.js`. If the configured port is already in use, set `PLAYWRIGHT_PORT` to a free port for that run.
- Existing dev servers on `5173` or `5174` are common during local work.
- Test reports and screenshots are written under `test-results/` and the Playwright report output.
