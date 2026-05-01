const bearhacksTeamPicture = new URL('../../assets/raw/images/bearhacks-team-picture.png', import.meta.url).href;
const issFantasyCtfClosingCeremony = new URL(
  '../../assets/raw/images/iss-fantasy-ctf-closing-ceremony.jpg',
  import.meta.url
).href;
const issFantasyCtfTeamPictureTwo = new URL(
  '../../assets/raw/images/iss-fantasy-ctf-team-picture-2.jpg',
  import.meta.url
).href;

export const community = [
  {
    id: 'bearhacks-2025',
    name: 'BearHacks 2025–2026',
    role: 'Co-Chair / Dev Lead / Core Organizer',
    description: [
      "Co-organized Sheridan College's first-ever ",
      { text: 'hybrid hackathon', emphasis: 'strong' },
      ', BearHacks 2025 (in 4 weeks!), then helped run BearHacks 2026 as Dev Lead and core organizer, including the attendee/admin portals and backend API.',
    ],
    media: {
      src: bearhacksTeamPicture,
      alt: 'BearHacks team photo',
      caption: 'BearHacks team photo',
    },
  },
  {
    id: 'bearhacks-backend',
    name: 'BearHacks Backend',
    role: 'Backend Lead / Dev Lead',
    description: [
      'Render-hosted API for BearHacks 2026 powering portal auth, QR claiming, hacker profiles, social networking, admin tooling, email campaigns, wallet passes, and boba/momo ordering. Render export covered ',
      { text: '28.4K requests, 77.2K logs, and 7 deploys', emphasis: 'underline' },
      ' during the Apr 24-26 event window.',
    ],
  },
  {
    id: 'issessions-ctf',
    name: 'ISSessions',
    role: 'Former Club Coordinator — ISSessions, Sheridan College',
    description: [
      'Ran the inter and intra-college events for the ISSessions security club while at Sheridan. Published ',
      { text: '20+ challenges', emphasis: 'strong' },
      ' for the 2026 Fantasy CTF. Built and maintained the live scoreboard tool (CTFd API) and published challenge writeups at quartz.chron0.tech.',
    ],
    media: [
      {
        src: issFantasyCtfClosingCeremony,
        alt: 'ISSessions Fantasy CTF closing ceremony',
        caption: 'ISSessions Fantasy CTF closing ceremony',
      },
      {
        src: issFantasyCtfTeamPictureTwo,
        alt: 'ISSessions Fantasy CTF team photo two',
        caption: 'ISSessions Fantasy CTF team photo',
      },
    ],
  },
  {
    id: 'canada-devops-hackathon-toronto',
    name: 'Canada DevOps Hackathon Toronto',
    role: 'Competitor — Team 1, November 2025',
    description: [
      'Won ',
      { text: 'Most Impactful Project', emphasis: 'strong' },
      ' for building HemoStat — a Docker Container Health Monitoring System — during a time-pressured hackathon environment, with a team of 4, in 48 hours.',
    ],
  },
];
