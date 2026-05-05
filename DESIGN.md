# Chronus Portfolio Design System

## Visual Thesis

An austere terminal/editor interface with a stronger evidence hierarchy: dark graphite surfaces, restrained spectral accents, compact controls, and enough typographic contrast to feel designed rather than default.

## Tokens

- Backgrounds should stay near-black but never pure black. Prefer tinted graphite values and OKLCH-compatible colors.
- Purple is the primary project/action accent. Teal is the shell/navigation/security accent. Red, green, and orange are reserved for semantic security or language tags.
- Borders should do more work than shadows. Use thin dividers, subtle inset contrast, and small-radius controls.
- Glow is allowed only where it reinforces the ASCII/terminal identity or a high-value security signal. Avoid stacked gradients, text shadows, and glass panels.

## Typography

- Shell labels, headings, controls, tags, and metadata use the mono stack.
- Body copy should move away from default `Inter` toward a more distinctive but readable sans. Keep body line length tight and scannable.
- Dates, counts, and stats should use tabular numeric rhythm where practical.
- Hierarchy should come from weight, tracking, and spacing, not oversized marketing type.

## Components

- Sidebar: preserve the path-like identity, compact nav, active-section state, quick contact links, and mobile menu.
- Hero: preserve `whoami`, `Jon Marien`, and the ASCII `// chrono` treatment. Convert long proof text into concise command-style chips.
- Section headers: keep the `#` language. Header actions, especially project sorting, should feel attached to the section and remain readable on mobile.
- Segmented controls: secondary utility controls. They should be compact, focus-visible, and clearly single-selection without competing with row actions.
- Project rows: read as case files. Preserve sort modes, date labels, details flip, external links, media previews, and archive expansion.
- Security block: emphasize research value with a flatter, sharper panel rather than decorative cyber glow.
- Community and contact: keep real event assets and contact links; avoid padding with icons or filler copy.

## Motion

- Keep motion fast and functional: hover states, detail reveal, carousel navigation, modal preview, and ASCII wave.
- Honor `prefers-reduced-motion` across CSS animations, hover transforms, and the ASCII hero.
- Do not add GSAP or another motion library for this pass.

## Accessibility

- Maintain semantic `section`, `article`, `nav`, `button`, and link usage.
- All interactive elements need visible focus states that are not color-only.
- Segmented controls must remain understandable as one selected sort mode.
- Modal close and carousel controls must remain keyboard-accessible and readable.

## Anti-Slop Bans

- No broad purple/blue gradient atmosphere.
- No glassmorphism as a default surface.
- No decorative icon for every label.
- No pure black or pure white.
- No fake data or placeholder stats.
- No global visual gimmick that makes native browser behavior harder to use.
