import { useEffect, useMemo, useState } from 'react';

import { BrandIcon } from './BrandIcon.jsx';
import { ExternalLink } from './ExternalLink.jsx';

export function Sidebar({ profile }) {
  const sectionIds = useMemo(() => profile.navigation.map((item) => item.id), [profile.navigation]);
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);

  return (
    <aside aria-label="Portfolio sidebar" className="sidebar" onWheel={handleSidebarWheel}>
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
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Links</div>
        <div className="sidebar-links" aria-label="Sidebar links">
          {profile.links.map((link) => (
            <ExternalLink href={link.href} key={link.id}>
              <span className="link-icon" aria-hidden="true">
                {link.logoSrc ? (
                  <img
                    alt=""
                    aria-hidden="true"
                    className={`link-logo${link.logoTone === 'accent' ? ' is-accent' : ''}${link.logoZoom ? ' is-zoomed' : ''}`}
                    loading="lazy"
                    src={link.logoSrc}
                  />
                ) : (
                  <BrandIcon name={link.icon ?? link.id} />
                )}
              </span>
              <span className="link-label">{link.label}</span>
            </ExternalLink>
          ))}
        </div>
      </div>

      <QuickContact entries={profile.contact} />
    </aside>
  );
}

function handleSidebarWheel(event) {
  const sidebar = event.currentTarget;

  if (sidebar.scrollHeight <= sidebar.clientHeight) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  sidebar.scrollTop += event.deltaY;
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

    const scrollRoot = document.querySelector('.main');

    const syncFromScroll = () => {
      const rootTop = scrollRoot?.getBoundingClientRect().top ?? 0;
      const activationOffset = 96;
      const measuredPositions = [];

      let nextActiveSection = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) {
          return;
        }

        const relativeTop = section.getBoundingClientRect().top - rootTop;
        measuredPositions.push(Math.round(relativeTop));
        if (relativeTop <= activationOffset) {
          nextActiveSection = id;
        }
      });

      // jsdom/layout-less environments can report identical positions for all sections.
      // In that case preserve existing state and rely on hash/click updates.
      if (new Set(measuredPositions).size <= 1) {
        return;
      }

      setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection));
    };

    const syncHash = () => {
      const hashSection = window.location.hash.replace('#', '');
      if (hashSection) {
        setActiveSection(hashSection);
      }
    };

    window.addEventListener('hashchange', syncHash);
    window.addEventListener('resize', syncFromScroll);
    window.addEventListener('scroll', syncFromScroll);
    if (scrollRoot) {
      scrollRoot.addEventListener('scroll', syncFromScroll);
    }
    syncHash();
    syncFromScroll();

    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('resize', syncFromScroll);
      window.removeEventListener('scroll', syncFromScroll);
      if (scrollRoot) {
        scrollRoot.removeEventListener('scroll', syncFromScroll);
      }
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
