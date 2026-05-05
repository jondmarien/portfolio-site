const dSportsLogo = new URL('../../assets/raw/logos/dsports.svg', import.meta.url).href;
const portraitPhoto = new URL('../../assets/raw/me/me.jpg', import.meta.url).href;
const issFantasyCtfTeamPictureOne = new URL(
  '../../assets/raw/images/iss-fantasy-ctf-team-picture-1.jpg',
  import.meta.url
).href;

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
    { id: 'github', label: 'github', href: 'https://github.com/jondmarien', icon: 'github' },
    {
      id: 'site',
      label: 'chron0.link',
      href: 'https://chron0.link',
      icon: 'link',
    },
    { id: 'blog', label: 'blog', href: 'https://quartz.chron0.tech', icon: 'blog' },
    {
      id: 'd-sports',
      label: 'd-sports',
      href: 'https://d-sports.org',
      icon: 'site',
      logoSrc: dSportsLogo,
      logoTone: 'accent',
      logoZoom: true,
    },
    { id: 'linkedin', label: 'linkedin', href: 'https://linkedin.com/in/jondmarien', icon: 'linkedin' },
    { id: 'twitch', label: 'twitch', href: 'https://twitch.tv/sirchronoblaze', icon: 'twitch' },
  ],
  hero: {
    prompt: 'whoami',
    name: 'Jon Marien',
    alias: '// chrono',
    tagline: ['CTO @ D-Sports', 'Security Researcher', 'Cybersecurity Graduate'],
    badges: ['offensive security', 'full-stack TypeScript', 'security engineering'],
    media: [
      {
        id: 'personality-photo',
        src: portraitPhoto,
        alt: 'Portrait of Jon Marien',
        caption: 'Professional portrait',
      },
      {
        id: 'activities-photo',
        src: issFantasyCtfTeamPictureOne,
        alt: 'ISSessions Fantasy CTF team photo one',
        caption: 'Cybersecurity community activity',
      },
    ],
    paragraphs: [
      [
        'Cybersecurity grad building things at the intersection of sports, crypto, and code. CTO of ',
        {
          text: 'D-Sports',
          href: 'https://d-sports.org',
        },
        ' — a hockey-focused fan engagement platform with ',
        { text: 'digital collectibles', emphasis: 'strong' },
        ', leaderboards, and on-chain wallets. ',
        { text: '100+ users across 3 countries', emphasis: 'underline' },
        '.',
      ],
      [
        'I spend most of my time writing ',
        { text: 'TypeScript', emphasis: 'strong' },
        ', breaking things on ',
        { text: 'TryHackMe and HackTheBox', emphasis: 'italic' },
        ', and serving as ',
        { text: 'BearHacks Co-Chair / Dev Lead / Core Organizer', emphasis: 'strong' },
        ', including the FastAPI/Supabase backend behind the BearHacks portals. I also ',
        {
          text: 'coordinated ISSessions at Sheridan: inter/intra-college events, 20+ Fantasy CTF 2026 challenges, a CTFd live scoreboard',
          emphasis: 'strong',
        },
        ', and writeups. The alias has been ',
        {
          text: 'chrono',
          variant: 'tag',
        },
        ' for years. ',
        { text: 'It fits.', emphasis: 'accent' },
      ],
    ],
  },
  contact: [
    { id: 'work-email', label: 'work email', text: 'jon@d-sports.org', href: 'mailto:jon@d-sports.org', icon: 'email' },
    { id: 'personal-email', label: 'personal email', text: 'jon@chron0.tech', href: 'mailto:jon@chron0.tech', icon: 'email' },
    { id: 'github', label: 'github', text: 'jondmarien', href: 'https://github.com/jondmarien', icon: 'github' },
    { id: 'linkedin', label: 'linkedin', text: 'jondmarien', href: 'https://linkedin.com/in/jondmarien', icon: 'linkedin' },
    { id: 'site', label: 'site', text: 'chron0.link', href: 'https://chron0.link', icon: 'site' },
    { id: 'blog', label: 'blog', text: 'quartz.chron0.tech', href: 'https://quartz.chron0.tech', icon: 'blog' },
    { id: 'twitch', label: 'twitch', text: 'sirchronoblaze', href: 'https://twitch.tv/sirchronoblaze', icon: 'twitch' },
  ],
};
