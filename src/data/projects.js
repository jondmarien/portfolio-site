export const projects = [
  {
    id: 'd-sports',
    name: 'D-Sports',
    href: 'https://d-sports.org',
    description:
      'Sports + blockchain fan engagement platform. Hockey-focused. Pack opening, digital collectibles, crypto wallets, global leaderboards. 100+ users, 3 countries.',
    linkLabel: 'd-sports.org ↗',
    links: [
      { href: 'https://d-sports.org', label: 'd-sports.org ↗' },
      { href: 'https://app.d-sports.org', label: 'app.d-sports.org ↗' },
    ],
    featured: true,
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'blockchain', type: 'web' },
      { label: 'hockey', type: 'web' },
    ],
  },
  {
    id: 'bearhacks-web-portals',
    name: 'BearHacks Web Portals',
    href: 'https://github.com/jondmarien/bearhacks-web-portals',
    description:
      "Registration and admin portals for BearHacks 2026 — Sheridan College's hybrid hackathon, completed after the event weekend.",
    linkLabel: 'github ↗',
    links: [
      { href: 'https://github.com/jondmarien/bearhacks-web-portals', label: 'github ↗' },
      { href: 'https://me.bearhacks.com', label: 'me.bearhacks.com ↗' },
      { href: 'https://admin.bearhacks.com', label: 'admin.bearhacks.com ↗' },
    ],
    moreInfo: {
      role: 'Dev Lead / Core Organizer',
      status: 'BearHacks 2026 completed',
      details:
        'Led development and shipped the attendee and admin portals used for BearHacks 2026. Stats are backed by Vercel Analytics and Observability data; Analytics was enabled Saturday night, after the main Friday event day, so visitor totals undercount the full weekend. The Friday boba/momo ordering flow worked for the large majority of 200+ hackers, with only about 5-10 reported issues.',
      stats: [
        { label: 'Attendee portal', value: '119 visitors' },
        { label: 'Attendee views', value: '312 page views' },
        { label: 'Attendee edge requests', value: '29K' },
        { label: 'Attendee function invocations', value: '4.1K' },
        { label: 'Attendee errors/timeouts', value: '0% / 0%' },
        { label: 'Attendee data transfer', value: '449 MB out / 35 MB in' },
        { label: 'Attendee ISR reads/writes', value: '657 / 0' },
        { label: 'Attendee cache hits', value: '97.9%' },
        { label: 'Attendee top route', value: '/contacts/[id] 2.8K' },
        { label: 'Boba/momo reliability', value: '~95%+ success' },
        { label: 'Admin portal', value: '7 visitors' },
        { label: 'Admin views', value: '15 page views' },
        { label: 'Admin edge requests', value: '5.7K' },
        { label: 'Admin function invocations', value: '896' },
        { label: 'Admin errors/timeouts', value: '0% / 0%' },
        { label: 'Admin data transfer', value: '36 MB out / 7 MB in' },
        { label: 'Admin ISR reads/writes', value: '591 / 0' },
        { label: 'Admin cache hits', value: '89.2%' },
        { label: 'Top attendee referrers', value: 'Google + LinkedIn' },
        { label: 'Attendee devices', value: '89% mobile' },
        { label: 'Average deploy time', value: '~12s' },
      ],
      screenshots: [],
    },
    featured: true,
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'web', type: 'web' },
    ],
  },
  {
    id: 'link-shortener',
    name: 'LinkCoder',
    href: 'https://github.com/jondmarien/linkcoder',
    description:
      'Cloudflare Workers link shortener with auth, dashboard, redirect caching, abuse reporting, admin review, and analytics.',
    linkLabel: 'github ↗',
    links: [
      { href: 'https://github.com/jondmarien/linkcoder', label: 'github ↗' },
      { href: 'https://link.chron0.tech', label: 'link.chron0.tech ↗' },
    ],
    moreInfo: {
      role: 'Builder / maintainer',
      status: 'Live',
      details:
        'Runs as a single Cloudflare Worker with auth, link creation, redirects, reporting, admin review, and analytics paths.',
      stats: [
        { label: 'Runtime', value: 'Cloudflare Workers' },
        { label: 'Database', value: 'D1 + KV' },
      ],
      screenshots: [],
    },
    featured: true,
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'Cloudflare', type: 'web' },
      { label: 'links', type: 'web' },
    ],
  },
  {
    id: 'qrcoder',
    name: 'QRCoder',
    href: 'https://github.com/jondmarien/qrcoder',
    description: 'Custom QR code generator — branded QR codes with logo embedding and styling options.',
    linkLabel: 'github ↗',
    links: [
      { href: 'https://github.com/jondmarien/qrcoder', label: 'github ↗' },
      { href: 'https://qrcoder.chron0.tech', label: 'qrcoder.chron0.tech ↗' },
    ],
    moreInfo: {
      role: 'Builder',
      status: 'Live',
      details: 'Personal utility for generating styled QR codes with branding and logo embedding.',
      stats: [
        { label: 'Live app', value: 'qrcoder.chron0.tech' },
        { label: 'Focus', value: 'branded QR generation' },
      ],
      screenshots: [],
    },
    featured: true,
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'web', type: 'web' },
    ],
  },
  {
    id: 'mediacoder',
    name: 'MediaCoder',
    href: 'https://github.com/jondmarien/mediacoder',
    description: 'Media file converter and background removal tool. Built alongside QRCoder as a personal utility duo.',
    linkLabel: 'github ↗',
    links: [
      { href: 'https://github.com/jondmarien/mediacoder', label: 'github ↗' },
      { href: 'https://mediacoder.chron0.tech', label: 'mediacoder.chron0.tech ↗' },
    ],
    moreInfo: {
      role: 'Builder',
      status: 'Live',
      details: 'Personal media utility for file conversion and background-removal workflows.',
      stats: [
        { label: 'Live app', value: 'mediacoder.chron0.tech' },
        { label: 'Focus', value: 'media tooling' },
      ],
      screenshots: [],
    },
    featured: true,
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'web', type: 'web' },
    ],
  },
  {
    id: 'nexus-c2',
    name: 'Nexus C2',
    href: 'https://c2.chron0.tech',
    description:
      'Python C2 framework. Encrypted agent comms (Fernet), Rich TUI operator console, multi-platform payload delivery (Windows/Linux/macOS), Gatekeeper bypass, screenshot/webcam capture, hardware fingerprinting, loot auto-save, Ghost VPN social-engineering landing page. Live at c2.chron0.tech.',
    linkLabel: 'c2.chron0.tech ↗',
    featured: true,
    tags: [
      { label: 'Python', type: 'py' },
      { label: 'security', type: 'sec' },
      { label: 'C2', type: 'sec' },
    ],
  },
  {
    id: 'automotive-security-capstone',
    name: 'Automotive Security Capstone',
    href: 'https://github.com/jondmarien/automotive-security-capstone',
    description:
      'RTL-SDR V4 + Raspberry Pi Pico W for real-time automotive RF/NFC security monitoring. Detects jamming, replay attacks, and brute force on wireless car entry. Rich CLI dashboard with session export.',
    linkLabel: 'github ↗',
    featured: true,
    tags: [
      { label: 'Python', type: 'py' },
      { label: 'security', type: 'sec' },
      { label: 'hardware', type: 'web' },
    ],
  },
  {
    id: 'burpcord',
    name: 'Burpcord',
    href: 'https://github.com/jondmarien/Burpcord',
    description:
      'BurpSuite extension for Discord rich presence. Shows your active scan target and state in your Discord status. Published to the PortSwigger BApp Store.',
    linkLabel: 'bappstore ↗',
    featured: true,
    tags: [
      { label: 'Java', type: 'java' },
      { label: 'security', type: 'sec' },
      { label: 'BApp Store', type: 'web' },
    ],
  },
  {
    id: 'health-companion',
    name: 'Health Companion',
    href: 'https://github.com/jondmarien/Health-Companion-Plan',
    description:
      'Personal health app monorepo. Expo Router mobile app (iOS/Android/Web) + Express API + PostgreSQL + Drizzle ORM. pnpm workspace with generated OpenAPI types and React Native client.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'mobile', type: 'web' },
      { label: 'Expo', type: 'web' },
    ],
  },
  {
    id: 'ctfd-live-scoreboard',
    name: 'CTFd Live Scoreboard',
    href: 'https://github.com/jondmarien/ctfd-live-scoreboard',
    description:
      'Real-time scoreboard overlay for CTFd. Used at ISSessions competitions — live-polls the CTFd API and renders rankings.',
    linkLabel: 'github ↗',
    links: [
      { href: 'https://github.com/jondmarien/ctfd-live-scoreboard', label: 'github ↗' },
      { href: 'https://scoreboard.issessions.ca/fantasy-ctf', label: 'fantasy ctf ↗' },
      { href: 'https://scoreboard.issessions.ca/', label: 'scoreboard ↗' },
    ],
    moreInfo: {
      role: 'Builder / maintainer',
      status: 'Live',
      details:
        'Built for ISSessions competitions to render CTFd standings as live scoreboard views for participants and organizers.',
      stats: [
        { label: 'Modes', value: 'standard + fantasy CTF' },
        { label: 'Data source', value: 'CTFd API' },
      ],
      screenshots: [],
    },
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'CTF', type: 'sec' },
    ],
  },
  {
    id: 'memoryanalysis-powershell',
    name: 'MemoryAnalysis.Powershell',
    href: 'https://github.com/jondmarien/MemoryAnalysis.Powershell',
    description:
      'PowerShell module wrapping vol3, pyo3, and .NET for memory dump forensics. Includes a Rust bridge for performance-critical analysis paths.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'Rust', type: 'rs' },
      { label: 'security', type: 'sec' },
      { label: 'forensics', type: 'web' },
    ],
  },
  {
    id: 'hemostat',
    name: 'HemoStat',
    href: 'https://github.com/jondmarien/HemoStat',
    description: 'Health vitals monitoring and alert system. Canada DevOps Hackathon Toronto, Nov 2025 — Team 1 project.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'Python', type: 'py' },
      { label: 'hackathon', type: 'web' },
      { label: 'monitoring', type: 'web' },
    ],
  },
  {
    id: 'tuneflow',
    name: 'TuneFlow',
    href: 'https://github.com/jondmarien/TuneFlow',
    description:
      'YouTube description/chapters/comments parser that auto-generates Spotify, YouTube, SoundCloud, and Apple Music playlists.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'music', type: 'web' },
    ],
  },
  {
    id: 'dvulndb',
    name: 'dVulnDB',
    href: 'https://github.com/jondmarien/dVulnDB',
    description:
      'Web3 vulnerability disclosure and bug bounty platform. On-chain vuln registry with structured disclosure flows for security researchers.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'TypeScript', type: 'ts' },
      { label: 'security', type: 'sec' },
      { label: 'Web3', type: 'web' },
    ],
  },
  {
    id: 'contextual',
    name: 'Contextual',
    href: 'https://github.com/jondmarien/contextual-discord',
    description: 'AI-powered GIF picker for Discord. Reads conversation context and suggests the perfect reaction GIF.',
    linkLabel: 'github ↗',
    tags: [
      { label: 'Python', type: 'py' },
      { label: 'AI', type: 'web' },
      { label: 'Discord', type: 'web' },
    ],
  },
  {
    id: 'aoc-2025',
    name: 'Advent of Code 2025',
    href: 'https://github.com/jondmarien/AoC-2025',
    description: 'AoC 2025 solutions written in Go — language learning through competitive algorithmic puzzles.',
    linkLabel: 'github ↗',
    tags: [{ label: 'Go', type: 'go' }],
  },
];
