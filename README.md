# Chronus Portfolio

A dark, terminal-inspired portfolio site for Jon Marien. It highlights security research, projects, community work, and contact paths in a compact editor-style layout built around the `chrono` identity.

The site is live at `chron0.tech`.

## What It Is

This repo contains the source for a personal portfolio where design is part of the signal: precise, security-minded, technical, and memorable without becoming a generic cyberpunk template.

The design leans into a sparse terminal/editor aesthetic: dark graphite surfaces, monospace chrome, IBM Plex Sans body copy, OKLCH color tokens, restrained purple/teal accents, and a cross-browser ASCII `// chrono` hero.

Content is data-driven so projects, security research, community entries, media, and contact links can be updated without rewriting page structure.

## Main Sections

- About: `whoami`, current focus, highlighted proof points, and profile badges.
- Security research: CVEs, CTF writeups, labs, and blog links.
- Projects: sortable case-file style project rows, details flips, links, and media previews.
- Community: hackathons, clubs, events, and leadership work.
- Contact: email and social links with visible hover/focus affordances.

## Scripts

```sh
bun install
bun run dev
bun run test
bun run test:e2e
bun run build
```

## Repository Notes

Useful root docs:

- [PRODUCT.md](PRODUCT.md): audience, purpose, identity anchors, and product principles.
- [DESIGN.md](DESIGN.md): visual system, component rules, motion, and accessibility expectations.
- [DEVELOPMENT.md](DEVELOPMENT.md): setup, project structure, content updates, and deployment notes.
- [TESTING.md](TESTING.md): unit, e2e, build, and visual verification workflow.
- [AGENTS.md](AGENTS.md): guidance for AI agents working in this repo.
