export const profile = {
  brand: {
    title: '~/chrono',
    path: 'Jon Marien',
  },
  breadcrumb: ['~', 'jon-marien', 'index'],
  navigation: [
    { id: 'about', label: 'about', icon: '~' },
    { id: 'security', label: 'security', icon: '⚑' },
    { id: 'projects', label: 'projects', icon: '⌥' },
    { id: 'community', label: 'community', icon: '◈' },
    { id: 'contact', label: 'contact', icon: '@' },
  ],
  links: [
    { id: 'github', label: 'github', href: 'https://github.com/jondmarien' },
    { id: 'site', label: 'chron0.link', href: 'https://chron0.link' },
    { id: 'blog', label: 'blog', href: 'https://quartz.chron0.tech' },
    { id: 'd-sports', label: 'd-sports', href: 'https://d-sports.org' },
    { id: 'linkedin', label: 'linkedin', href: 'https://linkedin.com/in/jondmarien' },
    { id: 'twitch', label: 'twitch', href: 'https://twitch.tv/sirchronoblaze' },
  ],
  hero: {
    prompt: 'whoami',
    name: 'Jon Marien',
    alias: '// chrono',
    tagline: ['CTO @ D-Sports', 'Security Researcher', 'Sheridan College'],
    badges: ['Sheridan College | December 2025, Honors Bachelor Degree, Cyber Security'],
    paragraphs: [
      [
        'Cybersecurity grad building things at the intersection of sports, crypto, and code. CTO of ',
        {
          text: 'D-Sports',
          href: 'https://d-sports.org',
        },
        ' — a hockey-focused fan engagement platform with digital collectibles, leaderboards, and on-chain wallets. 100+ users across 3 countries.',
      ],
      [
        'I spend most of my time writing TypeScript, breaking things on TryHackMe and HackTheBox, serving as BearHacks Co-Chair / Dev Lead / Core Organizer, including the FastAPI/Supabase backend behind the BearHacks portals, and formerly coordinating ISSessions at Sheridan: inter/intra-college events, 20+ Fantasy CTF 2026 challenges, a CTFd live scoreboard, and writeups. The alias has been ',
        {
          text: 'chrono',
          variant: 'tag',
        },
        ' for years. It fits.',
      ],
    ],
  },
  contact: [
    { id: 'work-email', label: 'work email', text: 'jon@d-sports.org', href: 'mailto:jon@d-sports.org' },
    { id: 'personal-email', label: 'personal email', text: 'jon@chron0.tech', href: 'mailto:jon@chron0.tech' },
    { id: 'github', label: 'github', text: 'jondmarien', href: 'https://github.com/jondmarien' },
    { id: 'linkedin', label: 'linkedin', text: 'jondmarien', href: 'https://linkedin.com/in/jondmarien' },
    { id: 'site', label: 'site', text: 'chron0.link', href: 'https://chron0.link' },
    { id: 'blog', label: 'blog', text: 'quartz.chron0.tech', href: 'https://quartz.chron0.tech' },
    { id: 'twitch', label: 'twitch', text: 'sirchronoblaze', href: 'https://twitch.tv/sirchronoblaze' },
  ],
};
