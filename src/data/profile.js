export const profile = {
  brand: {
    title: '~/chrono',
    path: 'Jon Marien',
  },
  breadcrumb: ['~', 'jon-marien', 'index'],
  navigation: [
    { id: 'about', label: 'about', icon: '~' },
    { id: 'projects', label: 'projects', icon: '⌥' },
    { id: 'security', label: 'security', icon: '⚑' },
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
        'I spend most of my time writing TypeScript, breaking things on TryHackMe and HackTheBox, co-organizing BearHacks, and running the ISSessions CTF at Sheridan. The alias has been ',
        {
          text: 'chrono',
          variant: 'tag',
        },
        ' for years — it fits.',
      ],
    ],
  },
  contact: [
    { id: 'email', label: 'email', text: 'jon@d-sports.org', href: 'mailto:jon@d-sports.org' },
    { id: 'github', label: 'github', text: 'jondmarien', href: 'https://github.com/jondmarien' },
    { id: 'linkedin', label: 'linkedin', text: 'jondmarien', href: 'https://linkedin.com/in/jondmarien' },
    { id: 'site', label: 'site', text: 'chron0.link', href: 'https://chron0.link' },
    { id: 'blog', label: 'blog', text: 'quartz.chron0.tech', href: 'https://quartz.chron0.tech' },
    { id: 'twitch', label: 'twitch', text: 'sirchronoblaze', href: 'https://twitch.tv/sirchronoblaze' },
  ],
};
