export const resume = {
  lastUpdated: '2026-05-04',
  tagline: 'Cyber security graduate and full-stack security engineer; specialty in DevSecOps.',
  pdfDownload: {
    label: 'download pdf',
    href: '/resume/Jon_Marien_Resume.pdf',
  },
  experience: [
    {
      id: 'd-sports',
      organization: 'D-Sports | Transforming the Digital Sports Fan Landscape',
      href: 'https://d-sports.org',
      dateRange: { start: 'Apr 2025', end: 'Present' },
      roles: [
        {
          id: 'd-sports-cto',
          title: 'CTO (Chief Technology Officer) — Pre-Revenue Startup',
          location: '(Remote) – Ave Maria, Florida, USA',
          bullets: [
            [
              { text: 'Founding CTO', emphasis: 'strong' },
              ' for a sports-tech startup; ',
              { text: 'spearhead end-to-end technical strategy', emphasis: 'strong' },
              ' by defining the product roadmap, ',
              { text: 'evaluating infrastructure decisions', emphasis: 'strong' },
              ', and ',
              { text: 'aligning engineering output with business objectives', emphasis: 'strong' },
              ', resulting in accelerated delivery of the native app.',
            ],
            [
              'Architect and deliver ',
              { text: 'secure, scalable products', emphasis: 'strong' },
              ' across ',
              { text: 'native mobile and web platforms', emphasis: 'strong' },
              ' by embedding ',
              { text: 'security-by-design principles', emphasis: 'strong' },
              ' into the SDLC from day one, ',
              { text: 'reducing the attack surface', emphasis: 'strong' },
              ' before code reaches production.',
            ],
            [
              { text: 'Lead, mentored, and grew an engineering team', emphasis: 'strong' },
              ' by establishing clear technical standards, running code reviews, and fostering a culture of continuous learning, ',
              { text: 'enabling junior engineers to ship production-ready', emphasis: 'strong' },
              ' features independently.',
            ],
            [
              { text: 'Collaborate with design and product leads', emphasis: 'strong' },
              ' to ',
              { text: 'translate business requirements into concrete technical specifications', emphasis: 'strong' },
              ', cutting ambiguity and ',
              { text: 'eliminating scope creep', emphasis: 'strong' },
              ' before sprint kickoff.',
            ],
          ],
        },
        {
          id: 'd-sports-pm-sec',
          title: 'Senior Project Manager & Security Engineer',
          dateRange: { start: 'Jul 2025', end: 'Oct 2025' },
          bullets: [
            [
              { text: 'Streamlined project workflows and delivery timelines', emphasis: 'strong' },
              ' by implementing structured ',
              { text: 'sprint cycles in Linear', emphasis: 'strong' },
              ' and ',
              { text: 'automating status reporting via Discord', emphasis: 'strong' },
              ', reducing delivery delays and keeping cross-functional stakeholders aligned.',
            ],
            [
              'Reduced vulnerability mean-time-to-remediation ',
              { text: 'by 50% by embedding security checkpoints throughout the SDLC', emphasis: 'strong' },
              ', including ',
              { text: 'automated dependency scanning, secret detection, & OWASP-aligned code review gates', emphasis: 'strong' },
              ' in CI/CD pipelines.',
            ],
          ],
        },
      ],
    },
    {
      id: 'hackalyst',
      organization: 'Hackalyst | Helping Sponsors Connect with Hackathons',
      href: 'https://hackalyst.com',
      dateRange: { start: 'June 2025', end: 'April 2026' },
      roles: [
        {
          id: 'hackalyst-security-lead',
          title: 'Security Lead — Pro Bono',
          location: 'Mississauga, ON, CA',
          bullets: [
            [
              { text: 'Security lead', emphasis: 'strong' },
              ' for the full Hackalyst stack (React 19 frontend, FastAPI backend, MongoDB, Traefik load balancer), ',
              { text: 'designed and enforced a layered security architecture', emphasis: 'strong' },
              ' with Clerk enterprise authentication, reducing ',
              { text: 'unauthorized access vectors', emphasis: 'strong' },
              ' across all service boundaries.',
            ],
            [
              'Reduced remediation time of vulnerabilities by 80% by ',
              { text: 'integrating Infisical secrets management into CI/CD pipelines', emphasis: 'strong' },
              ', eliminating hardcoded credentials, and ',
              { text: 'replacing manual secret rotation with automated, policy-enforced workflows.', emphasis: 'strong' },
            ],
            [
              'Established ',
              { text: 'hardened CI/CD pipelines using GitHub Actions', emphasis: 'strong' },
              ' with ',
              { text: 'container scanning, dependency auditing, and staged deployment gates', emphasis: 'strong' },
              ', ensuring ',
              { text: 'zero-downtime releases', emphasis: 'strong' },
              ' while maintaining a ',
              { text: 'continuous security posture', emphasis: 'strong' },
              ' across all environments.',
            ],
          ],
        },
      ],
    },
  ],
  communitySummary: [
    {
      id: 'issessions',
      organization: 'ISSessions | 1300+ Member InfoSec Club from Sheridan College',
      dateRange: { start: 'Apr 2024', end: 'Apr 2026' },
      role: 'Club Coordinator & Executive Producer — Volunteer',
      bullets: [
        [
          { text: 'Volunteer coordinator', emphasis: 'strong' },
          " for Canada's largest post-secondary security club (1,300+ members); designed and deployed ",
          { text: '22 fantasy-themed CTF challenges', emphasis: 'strong' },
          ' across 6 categories; produced multi-platform broadcasts cutting post-production from ',
          { text: '5 days to 3 hours', emphasis: 'strong' },
          ' per session.',
        ],
      ],
      crossLink: '#community',
    },
    {
      id: 'bearhacks',
      organization: 'BearHacks — Sheridan College | Themed Hackathon',
      dateRange: { start: 'Feb 2025', end: 'Apr 2026' },
      role: 'Co-Chair, Dev Lead & Core Organizer',
      bullets: [
        [
          { text: "Co-chaired Sheridan College's first-ever hybrid hackathon", emphasis: 'strong' },
          ' in under 4 weeks; returned as ',
          { text: 'Dev Lead', emphasis: 'strong' },
          ' overseeing platforms and backend API ',
          { text: 'serving 200+ hackers', emphasis: 'strong' },
          ' with 28.4K requests across 7 deploys at 0% error rate.',
        ],
      ],
      crossLink: '#community',
    },
  ],
  projectSummary: [
    {
      id: 'chron0-portfolio',
      organization: 'Personal Portfolio (chron0.tech)',
      href: 'https://chron0.tech',
      dateRange: { start: 'Apr 2026', end: 'Present' },
      stack: 'Next.js · TypeScript · Vite · Vercel · ~70 commits',
      bullets: [
        [
          'Designed and built a ',
          { text: 'terminal-inspired portfolio', emphasis: 'strong' },
          ' showcasing projects, security research, community work, and contact links in a compact editor-style layout.',
        ],
      ],
      crossLink: '#projects',
    },
    {
      id: 'nexus-c2',
      organization: 'Nexus C2 (Educational C2 Lab)',
      dateRange: { start: 'Feb 2026', end: 'Present' },
      stack: 'Python 3 · cryptography (Fernet) · Rich · stdlib HTTP · pytest · uv',
      bullets: [
        [
          'Designed an ',
          { text: 'educational C2 lab', emphasis: 'strong' },
          ' with Fernet-encrypted tasking, token auth, and per-IP rate limiting for authorized security research.',
        ],
      ],
      crossLink: '#projects',
    },
    {
      id: 'capstone-rf',
      organization: 'Capstone: Automotive RF/NFC Security Monitor',
      dateRange: { start: 'Jan 2025', end: 'Aug 2025' },
      stack: 'Python 3.11 · RTL-SDR V4 · Raspberry Pi Pico W · NumPy/SciPy · Rich · pytest',
      bullets: [
        [
          'Developed a vehicle anti-theft monitor using RTL-SDR and real-time FFT analysis, achieving ',
          { text: '>90% detection accuracy', emphasis: 'strong' },
          ' across ',
          { text: '109+ tests', emphasis: 'strong' },
          '.',
        ],
      ],
      crossLink: '#projects',
    },
    {
      id: 'quartz-notes',
      organization: 'Writeups/Notes (quartz.chron0.tech)',
      href: 'https://quartz.chron0.tech',
      dateRange: { start: 'Jan 2023', end: 'Present' },
      stack: 'Quartz v4 · TypeScript · SCSS · xterm.js · Bun · Cloudflare Pages',
      bullets: [
        [
          'Built a customized Quartz v4 digital garden with embedded xterm.js terminal and ',
          { text: '100+ commits', emphasis: 'strong' },
          ' of active security writeups and CTF solutions.',
        ],
      ],
      crossLink: '#projects',
    },
  ],
  competencies: [
    {
      id: 'programming',
      label: 'Programming Languages',
      items: ['Python', 'Rust', 'Go', 'TypeScript', 'React/React Native', 'Java', 'C', 'SQL', 'Assembly', 'Bash/PowerShell'],
    },
    {
      id: 'security',
      label: 'Security',
      items: ['Burp Suite', 'Ghidra', 'Wireshark', 'Metasploit', 'OWASP', 'NIST', 'CVSS', 'IAM (Clerk)', 'Secrets (Infisical)'],
    },
    {
      id: 'web-blockchain',
      label: 'Web & Blockchain',
      items: ['Next.js', 'FastAPI', 'Solidity', 'Solana', 'Web3.js', 'Tailwind CSS', 'shadcn/ui'],
    },
    {
      id: 'devsecops',
      label: 'DevSecOps',
      items: ['Docker', 'DigitalOcean', 'GitHub Actions', 'Traefik', 'Vercel', 'nginx', 'Linux Admin', 'Bun'],
    },
    {
      id: 'ai-llms',
      label: 'AI & LLMs',
      items: ['Cursor', 'Windsurf', 'Warp CLI', 'Gemini CLI', 'Codex', 'Perplexity', 'Prompt & Context Engineering'],
    },
    {
      id: 'soft-skills',
      label: 'Soft Skills',
      items: ['Technical Leadership', 'Risk Communication', 'Project Management (Jira/Linear)', 'Public Speaking'],
    },
    {
      id: 'certifications',
      label: 'Certifications',
      items: ['BSCP (Burp Suite Certified Practitioner) - In progress. Estimated completion May 2026.'],
    },
  ],
  education: [
    {
      id: 'sheridan',
      school: 'Sheridan College - Institute of Technology, Oakville, Canada',
      dateRange: { start: '2021', end: '2025' },
      degree: 'Honours Bachelor of Information Sciences (Cyber Security)',
      certificate: 'Undergraduate Certificate in Resilience, Ethics, & Adaptation',
    },
  ],
};
