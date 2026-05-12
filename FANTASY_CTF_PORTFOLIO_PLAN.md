# FantasyCTF — chronus-portfolio Integration Plan

**Status:** Initial integration committed. This doc is the handoff for follow-on
work (real screenshots, copy polish, optional logo/links work). Hand to a coding
agent and have it execute the "Open follow-ups" list.

**Target file:** `src/data/projects.js`. All changes so far are confined to this
one file — no component, routing, or asset additions yet.

---

## Project overview

FantasyCTF is a 22-challenge high-fantasy CTF, permanently self-hosted at
`https://ctf.chron0.tech`. It originated as the ISSessions Fantasy 2026 CTF
(300+ attendee hybrid event over 3 days), then was migrated off the club's
hosted CTFd onto a personal Hetzner stack. It is built across **three repos**:

| Repo | Role | Stack | Deploy target |
|---|---|---|---|
| `fantasy_ctf_challs` | Challenges + CTFd infra source of truth | Python, Docker, Traefik, CTFd, Postgres, Redis, LiteLLM | Hetzner CPX21 (Ashburn) |
| `ctfd-live-scoreboard` | Full player-facing SPA + serverless proxy/webhook | React 19, TypeScript, Vite 7, Tailwind v4, Bun, Vercel | Vercel (`ctf.chron0.tech`) |
| `fantasy-ctfd-theme` | Custom CTFd Jinja theme (player-facing CTFd UI) | Bootstrap 5, Alpine, Vite, Yarn | CTFd container on Hetzner |

The unusual architectural decision is the **BYO-key LLM design** — LLM-security
challenges (5 of them, Beginner → Expert) talk to a LiteLLM sidecar with
**player-provided** API keys (OpenAI / Anthropic / Gemini / OpenRouter). No
shared quota, no abuse vector, zero ongoing cost. Total infra runs ~$10/mo.

Challenge spread:

- Crypto (5): Base64+ROT13 → Vigenere → weak RSA → AES-CBC bit-flipping → Wiener's attack
- Programming (7): CSV/primality → XOR brute → Dijkstra → TCP+HMAC handshake → black-box reversal → timed gauntlet (Legendary) → custom stack VM (Mythic)
- OSINT (3), Reverse (1), LLM Security (5), Misc/Web (1)
- 7 difficulty tiers, dynamic scoring (100 GP min decay floor across all)
- Flag format: `FantasyCTF{...}` with stylized substitutions (`e→3`, `o→0`, `a→4`)

---

## Changes already made

All in `src/data/projects.js`. No other files touched.

### 1. `featuredProjectOrder`
Added `'fantasy-ctf'` at index 0. Removed `'ctfd-live-scoreboard'` (now
demoted — see below).

### 2. `impressiveProjectOrder`
Added `'fantasy-ctf'` at index 0. `'ctfd-live-scoreboard'` stays at index 6
so the impressive filter still surfaces it in the archive section.

### 3. New `fantasyCtfMedia` constant
Defined right after `ctfdLiveScoreboardMedia`. Currently reuses the live
scoreboard PNGs as placeholder images with FantasyCTF-appropriate alt text
(`'FantasyCTF quest board'`, `'FantasyCTF top adventurers'`). Swap the `src`
references when real fantasy-site screenshots are added.

### 4. New `fantasy-ctf` entry in `projectEntries`
Inserted at the top of the array. Key fields:
- `featured: true`
- Single CTA link: `https://ctf.chron0.tech` (`linkLabel: 'ctf.chron0.tech ↗'`)
- No `logo` — intentionally omitted. The site is no longer a club service.
- `media: fantasyCtfMedia`
- 3 tags: TypeScript, security, CTF
- `moreInfo.details` is a rich-text array with `'300+ attendee'` wrapped in
  `{ emphasis: 'strong' }` — that stat is the strongest credibility lever and
  must keep its bold treatment through any future edits.
- 5 stats picked across all three repos (challenge count, difficulty range,
  stack, infra cost, LLM design).

### 5. Existing `ctfd-live-scoreboard` entry
- `featured: true` line **removed** (object now defaults to non-featured).
- Description tightened to anchor the project to the 3-day live event window,
  with an explicit pointer to the FantasyCTF entry as its successor.
- `moreInfo`, stats, media, links, and tags **left untouched** so the historical
  event achievement (300+ attendees, 2 patches over 3 days) remains intact in
  the archive.

---

## Verification (run these locally)

```bash
cd J:/projects/personal-projects/chronus-portfolio
bun install          # or pnpm/npm — match the project's package manager
bun run dev          # confirm fantasy-ctf renders as the top featured tile
bun run test         # ProjectList.test.jsx + projects.js consumers should still pass
```

Manual checks:

1. **Default sort:** FantasyCTF is the first tile in "flagship work."
2. **Impressive sort:** FantasyCTF is still first. `ctfd-live-scoreboard` no
   longer appears in the flagship section; it shows up in the archive section
   when "show more" is expanded.
3. **Flip the card:** clicking the new tile flips to a back face showing role,
   status, the rich-text paragraph with **300+ attendee** bolded, and the 5
   stats (`ProjectItem.jsx` slices stats at 5 — confirmed the entry is at
   exactly 5).
4. **Date/alpha sorts:** FantasyCTF should appear in expected positions.
   `updatedDate` is `2026-05-11` and `startDate` is `2025-12-01`.

---

## Open follow-ups for the coding agent

Priority order. (1) and (2) are the only items that should ship before the
project is publicly linked from the resume / chron0.tech homepage.

### 1. Real screenshots (mandatory before publishing)

Currently the FantasyCTF tile reuses two `ctfd-live-scoreboard-*.png`
screenshots. They are functional but not on-brand. Replace with screenshots of
the actual `ctf.chron0.tech` site once the fantasy theme is live there.

Suggested capture set:

- Landing / "Quest Giver Awaits" hero
- Challenge board (quest log)
- A single challenge detail page (shows the tavern design system at work)
- Scoreboard / Top Adventurers view
- One LLM challenge mid-conversation (showcases the BYO-key flow)

Add the files under
`assets/raw/images/fantasy-ctf-*.png`. Then in `projects.js`:

```js
const fantasyCtfLandingImage = new URL(
  '../../assets/raw/images/fantasy-ctf-landing.png',
  import.meta.url
).href;
// ...repeat per screenshot
```

Replace the `src:` fields inside `fantasyCtfMedia` with these new constants and
update each `alt:` to describe the actual content. Use `fit: 'cover'` with
`position: 'center top'` if the captures are tall (mirrors `linkcoder`/`qrcoder`
patterns); use `fit: 'contain'` for full-page captures (mirrors the current
scoreboard pattern).

### 2. Replace `updatedDate` cadence

`updatedDate: '2026-05-11'` was set on integration day. Bump it any time the
entry's description, stats, or screenshots change. The portfolio's date sort
relies on it.

### 3. Optional: tighten the description

Current copy is ~38 words — longer than other featured tiles (typically
20–28). If it overflows visually on the tile front face, trim. Suggested
shorter form:

> "22-challenge high-fantasy CTF, permanently self-hosted at ctf.chron0.tech.
> Three repos (challenges + CTFd infra, React 19 SPA, custom CTFd theme) and
> BYO-key LLM challenges with zero shared quota."

### 4. Optional: add subroute / repo links later

Right now `href` is the only link. If you want to expose the repos directly
from the card (mirroring `bearhacks-web-portals` which has 3 links), uncomment
or add:

```js
links: [
  { href: 'https://ctf.chron0.tech', label: 'ctf.chron0.tech ↗' },
  { href: 'https://github.com/jondmarien/fantasy_ctf_challs', label: 'challenges repo ↗' },
  { href: 'https://github.com/jondmarien/ctfd-live-scoreboard', label: 'site repo ↗' },
],
```

Hold off until there's a deliberate reason — the single-link version is cleaner.

### 5. Optional: logo decision

No logo on the tile currently. If you ever want one:

- `issessions.svg` already exists at `assets/raw/logos/issessions.svg` — this
  re-anchors the project to the club origin. Visually consistent with the
  existing demoted `ctfd-live-scoreboard` entry.
- A new `fantasy-ctf` mark would be cleaner (this is now a personal project,
  not a club service) but requires design work.

Add via `logo: { src: ..., alt: 'FantasyCTF logo' }` next to `media:` if you do.

### 6. Memory update for future agent sessions

Update `project_fantasy_ctf.md` to reflect that the portfolio entry now exists:

> Portfolio entry `fantasy-ctf` was added to `chronus-portfolio` on 2026-05-11,
> top of both `featuredProjectOrder` and `impressiveProjectOrder`. Old
> `ctfd-live-scoreboard` entry is demoted to the archive but retained as a
> historical record of the 3-day live event achievement.

---

## What was NOT changed (intentional)

- `src/components/ProjectItem.jsx` — schema is fully compatible, no JSX edits
  needed.
- `src/components/ProjectList.jsx` — featured vs. archive logic already works
  off `featured: true` and the order arrays.
- `archiveProjectOrder` — left at `['link-shortener', 'qrcoder', 'mediacoder']`.
  `ctfd-live-scoreboard` falls back to the default archive index (200), which
  places it after the explicit archive items. If you'd rather have it
  immediately after the archive group's "headliners," add it explicitly:
  `['link-shortener', 'qrcoder', 'mediacoder', 'ctfd-live-scoreboard']`.
- Tests (`src/components/ProjectList.test.jsx`, `src/data/projects` consumers)
  — run them after pulling these changes to confirm no fixtures relied on
  `ctfd-live-scoreboard` being featured or on the previous featured count of 7.
- Assets — no new files added. Image swap is deferred to follow-up (1).

---

## Risk notes

- **Duplicate "300+ attendee" stat across two entries.** The FantasyCTF entry's
  details prose calls out the 300+ attendee origin event; the demoted
  `ctfd-live-scoreboard` entry's `moreInfo.details` also contains the same stat
  for the event-specific framing. This is deliberate — same fact, two angles —
  but if a recruiter scans both, it reads as repetition. If you ever want to
  collapse, drop the stat from the demoted entry's prose (keep it in `stats:`).
- **Placeholder images.** The fantasy-themed CTFd site at `ctf.chron0.tech`
  must be public-facing before screenshots can replace the placeholders; if
  the site is still mid-migration, the tile shows live scoreboard screenshots
  that mismatch the FantasyCTF branding promise. Either ship the site first or
  use the iss-fantasy-ctf event photos
  (`iss-fantasy-ctf-closing-ceremony.jpg`, `iss-fantasy-ctf-team-picture-*.jpg`
  in `assets/raw/images/`) as an interim swap.
