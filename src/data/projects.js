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
        'Led development and shipped the attendee and admin portals used for BearHacks 2026. Stats are backed by Vercel Analytics and Observability data; Analytics was enabled Day 1 night, after the main Day 1 event day, so visitor totals undercount the full weekend. The Day 1 boba/momo ordering flow worked for the large majority of 200+ hackers, with only about 5-10 reported issues.',
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
        'Single Cloudflare Worker for the public landing page, auth, dashboard, link creation, redirects, abuse reports, admin review, and owner analytics.',
      stats: [
        { label: 'Runtime', value: 'Cloudflare Workers + Hono' },
        { label: 'Storage', value: 'D1 source of truth + KV hot cache' },
        { label: 'Auth', value: 'Better Auth magic links + Google OAuth' },
        { label: 'Analytics', value: 'Cloudflare Analytics Engine' },
        { label: 'Abuse controls', value: 'rate limits + admin review queue' },
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
      details:
        'Modern QR generator with real-time previews, adjustable size/error correction/colors/margins, and high-quality PNG, SVG, and PDF exports.',
      stats: [
        { label: 'Framework', value: 'Next.js 16 + React 19' },
        { label: 'Exports', value: 'PNG, SVG, PDF' },
        { label: 'UI', value: 'Tailwind CSS v4 + shadcn/ui' },
        { label: 'Processing', value: 'qrcode.react + Sharp + pdf-lib' },
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
      details:
        'Privacy-focused media utility that processes files server-side for image/video conversion, quality controls, and algorithmic background removal.',
      stats: [
        { label: 'Framework', value: 'Next.js 16 + Bun' },
        { label: 'Images', value: 'JPEG, PNG, WebP, AVIF, TIFF' },
        { label: 'Video', value: 'MP4/H.264 + WebM/VP9 via FFmpeg' },
        { label: 'Processing', value: 'Sharp + fluent-ffmpeg' },
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
    moreInfo: {
      role: 'Security research builder',
      status: 'Live educational research framework',
      details:
        'Operator-focused Python C2 research project with a unified HTTP server/dashboard process, encrypted task/result channels, token auth, deploy routes, and a Ghost VPN landing page.',
      stats: [
        { label: 'Operator UI', value: 'Rich terminal dashboard' },
        { label: 'Crypto', value: 'Fernet task/result encryption' },
        { label: 'Payloads', value: 'Windows, Linux, macOS stagers' },
        { label: 'Capture', value: 'screenshot + webcam loot auto-save' },
        { label: 'Agent intel', value: 'CPU, RAM, GPU, display, disk' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: '4th-year cybersecurity capstone builder',
      status: '2025 capstone proof of concept',
      details:
        'Automotive RF/NFC security monitor using RTL-SDR V4 hardware, Raspberry Pi Pico W, Python signal processing, and a Rich CLI dashboard for real-time evidence presentation.',
      stats: [
        { label: 'Hardware', value: 'RTL-SDR V4 + Raspberry Pi Pico W' },
        { label: 'Signals', value: '315/433 MHz automotive monitoring' },
        { label: 'Detection', value: 'replay, jamming, brute force, injection' },
        { label: 'Validation', value: '>90% target accuracy + 109+ tests' },
        { label: 'Output', value: 'session export + technical evidence views' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: 'Builder / maintainer',
      status: 'v2.6.0 release',
      details:
        'Burp Suite extension that updates Discord Rich Presence from real-time testing activity across Intercept, Scanner, Proxy, Repeater, Intruder, site map/scope, WebSockets, and Collaborator.',
      stats: [
        { label: 'Platform', value: 'Burp Suite Montoya API' },
        { label: 'Runtime', value: 'Java 21 + Gradle ShadowJar' },
        { label: 'Reliability', value: 'retry backoff + reload RPC button' },
        { label: 'UX', value: 'Settings panel + embedded logs' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: 'Builder',
      status: 'Active personal app',
      details:
        'pnpm workspace for a health companion mobile app and API, with modular Expo Router screens, Express route/service/repository layers, generated OpenAPI clients, and synced health logs.',
      stats: [
        { label: 'Mobile', value: 'Expo Router for iOS/Android/Web' },
        { label: 'API', value: 'Express + Zod contracts' },
        { label: 'Database', value: 'PostgreSQL + Drizzle' },
        { label: 'Offline UX', value: 'MMKV cache + sync endpoints' },
      ],
      screenshots: [],
    },
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
        'Fantasy-themed live scoreboard for ISSessions Fantasy CTF 2026, with CTFd-backed rankings, quest/challenge views, adventurer stats, First Blood Discord webhooks, and server-side API token proxying.',
      stats: [
        { label: 'Frontend', value: 'React 19 + TypeScript + Vite 7' },
        { label: 'Data source', value: 'CTFd API via Vercel proxy' },
        { label: 'Refresh', value: '30s polling + server-side cache' },
        { label: 'Events', value: 'First Blood Discord webhook' },
        { label: 'Views', value: 'scoreboard, guilds, adventurers, quests' },
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
    moreInfo: {
      role: 'Builder / maintainer',
      status: 'Production ready core cmdlets',
      details:
        'PowerShell memory forensics module built around Volatility 3 with a Rust/PyO3 bridge, native pipeline support, custom formatting, caching, and performance-focused analysis paths.',
      stats: [
        { label: 'Module', value: 'PowerShell 7.6+ / .NET 10' },
        { label: 'Bridge', value: 'Rust 1.90+ + PyO3 + Python 3.12' },
        { label: 'Forensics', value: 'Volatility 3 process and DLL analysis' },
        { label: 'Performance', value: 'LRU cache + parallel processing' },
        { label: 'Caveat', value: 'Win11 26100 limits network/malware plugins' },
      ],
      screenshots: [],
    },
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
    description:
      'Autonomous Docker container health monitoring system. Canada DevOps Hackathon Toronto, Nov 2025 — Team 1 project.',
    linkLabel: 'github ↗',
    moreInfo: {
      role: 'Team Lead / competitor',
      status: 'Most Impactful Project winner',
      details:
        'Multi-agent container health monitor that detects Docker issues, analyzes root causes with GPT-4/Claude or rule fallback, executes guarded remediation, and sends Slack/dashboard alerts.',
      stats: [
        { label: 'Event', value: 'Canada DevOps Hackathon Toronto' },
        { label: 'Team', value: 'Team 1, 48-hour build' },
        { label: 'Agents', value: 'Monitor, Analyzer, Responder, Alert' },
        { label: 'Messaging', value: 'Redis pub/sub + shared state' },
        { label: 'Dashboard', value: 'Streamlit + Prometheus/Grafana' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: 'Builder',
      status: 'Playable AI playlist utility',
      details:
        'AI-powered playlist generator that parses YouTube descriptions, chapters, and comments, recognizes songs with Gemini/Genkit, and exports playlists to Spotify and regular YouTube playlists.',
      stats: [
        { label: 'Framework', value: 'Next.js + Genkit' },
        { label: 'AI', value: 'Google Gemini song recognition' },
        { label: 'Music APIs', value: 'Spotify + YouTube' },
        { label: 'Cache', value: 'Redis album art/API cache' },
        { label: 'Paused', value: 'SoundCloud integration awaiting API support' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: 'Builder',
      status: 'Prototype / concept platform',
      details:
        'Blockchain-powered vulnerability disclosure and bug bounty platform concept with CVSS 4.0/3.0 scoring, wallet-based researcher flows, escrow-style reward ideas, and cyberpunk security tooling.',
      stats: [
        { label: 'Frontend', value: 'Next.js 14 + TypeScript' },
        { label: 'Web3', value: 'Phantom wallet + Solana web3.js' },
        { label: 'Standards', value: 'CVSS 4.0 + 3.0 severity scoring' },
        { label: 'Storage', value: 'IPFS planned for decentralized files' },
      ],
      screenshots: [],
    },
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
    moreInfo: {
      role: 'Builder',
      status: 'Plugin prototype',
      details:
        'Natural-language GIF search for Discord through a Vencord plugin, backed by semantic search with a keyword fallback and a privacy-focused no-tracking design.',
      stats: [
        { label: 'Frontend', value: 'TypeScript + React Vencord plugin' },
        { label: 'Backend', value: 'FastAPI + Python' },
        { label: 'AI search', value: 'Sentence Transformers + Qdrant' },
        { label: 'Fallback', value: 'hybrid semantic + keyword search' },
      ],
      screenshots: [],
    },
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
