import { profile } from './profile.js';
import { resume } from './resume.js';

const siteUrl = 'https://www.chron0.tech';

export const seo = {
  siteUrl,
  canonicalUrl: `${siteUrl}/`,
  siteName: 'chrono',
  locale: 'en_US',
  themeColor: '#0b0d10',
  title: 'Jon Marien | CTO @ D-Sports · Offsec · DevSecOps · CTF',
  description:
    'Cyber engineer & CTO at D-Sports. DevSecOps, offensive security, CVE/CTF writeups. ISSessions & BearHacks lead. Resume PDF, projects, and research.',
  keywords: [
    'Jon Marien',
    'chrono',
    'security engineer',
    'DevSecOps',
    'offensive security',
    'CTO',
    'D-Sports',
    'cybersecurity portfolio',
    'TypeScript',
    'ISSessions',
    'BearHacks',
    'Sheridan College',
    'Burp Suite',
    'CVE writeups',
    'CTF',
    'security research',
    'hire',
    'portfolio resume',
  ],
  author: profile.hero.name,
  og: {
    type: 'website',
    image: `${siteUrl}/og/jon-marien.jpg`,
    imageAlt: 'Jon Marien — CTO, offensive security engineer, and CTF organizer',
    imageWidth: 1200,
    imageHeight: 1200,
  },
  twitter: {
    card: 'summary_large_image',
  },
  resumePdf: {
    href: resume.pdfDownload.href,
    title: `${profile.hero.name} Resume (PDF)`,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: seoSiteLabel(),
        description:
          'Portfolio of Jon Marien — CTO and security engineer with DevSecOps, offensive research, CTF work, and shipped full-stack projects.',
        inLanguage: 'en-US',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: profile.hero.name,
        alternateName: 'chrono',
        url: siteUrl,
        image: `${siteUrl}/og/jon-marien.jpg`,
        jobTitle: 'Chief Technology Officer & Security Engineer',
        description: resume.tagline,
        email: 'mailto:jon@chron0.tech',
        worksFor: {
          '@type': 'Organization',
          name: 'D-Sports',
          url: 'https://d-sports.org',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Sheridan College',
        },
        knowsAbout: [
          'Cybersecurity',
          'DevSecOps',
          'Offensive Security',
          'TypeScript',
          'Full-Stack Engineering',
          'Project Management',
          'Capture The Flag',
          'CVE Analysis',
          'Community Leadership',
        ],
        sameAs: profile.links.map((link) => link.href),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: siteUrl,
        name: `${profile.hero.name} — Portfolio`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        inLanguage: 'en-US',
        dateModified: resume.lastUpdated,
      },
    ],
  },
};

function seoSiteLabel() {
  return `${profile.hero.name} (${profile.brand.title})`;
}
