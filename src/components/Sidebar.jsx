import { useEffect, useMemo, useState } from 'react';

import { ExternalLink } from './ExternalLink.jsx';

export function Sidebar({ profile }) {
  const sectionIds = useMemo(() => profile.navigation.map((item) => item.id), [profile.navigation]);
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div>{profile.brand.title}</div>
        <div className="path">{profile.brand.path}</div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigation</div>
        <nav aria-label="Primary navigation">
          {profile.navigation.map((item) => (
            <a
              aria-current={activeSection === item.id ? 'location' : undefined}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Links</div>
        <div className="sidebar-links">
          {profile.links.map((link) => (
            <ExternalLink href={link.href} key={link.id}>
              <span className="dot" />
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>

      <QuickContact entries={profile.contact} />
    </aside>
  );
}

function useActiveSection(sectionIds) {
  const getInitialSection = () => {
    if (typeof window === 'undefined') {
      return sectionIds[0];
    }

    return window.location.hash.replace('#', '') || sectionIds[0];
  };

  const [activeSection, setActiveSection] = useState(getInitialSection);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncHash = () => {
      const hashSection = window.location.hash.replace('#', '');
      if (hashSection) {
        setActiveSection(hashSection);
      }
    };

    if (!('IntersectionObserver' in window)) {
      window.addEventListener('hashchange', syncHash);
      syncHash();
      return () => window.removeEventListener('hashchange', syncHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('hashchange', syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', syncHash);
    };
  }, [sectionIds]);

  return [activeSection, setActiveSection];
}

function QuickContact({ entries }) {
  const quickContactIds = new Set(['work-email', 'linkedin', 'github']);
  const quickContactEntries = entries.filter((entry) => quickContactIds.has(entry.id));

  return (
    <div className="sidebar-section quick-contact" aria-label="Quick contact">
      <div className="sidebar-section-title">Contact</div>
      <div className="quick-contact-links">
        {quickContactEntries.map((entry) => (
          <ExternalLink href={entry.href} key={entry.id}>
            {entry.id === 'work-email' ? entry.text : entry.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
