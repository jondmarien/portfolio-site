import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { BrandIcon } from './BrandIcon.jsx';
import { ExternalLink } from './ExternalLink.jsx';

export function Sidebar({ profile }) {
  const sectionIds = useMemo(() => profile.navigation.map((item) => item.id), [profile.navigation]);
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const mobileMenuButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const handleNavigate = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    const currentSection = getActiveSectionFromViewport(sectionIds);
    if (currentSection) {
      setActiveSection(currentSection);
    }
    setMobileMenuOpen((isOpen) => !isOpen);
  };

  return (
    <aside aria-label="Portfolio sidebar" className="sidebar" onWheel={handleSidebarWheel}>
      <div className="mobile-sidebar-header">
        <div className="sidebar-brand">
          <div>{profile.brand.title}</div>
          <div className="path">{profile.brand.path}</div>
        </div>
        <button
          aria-controls={mobileMenuId}
          aria-expanded={mobileMenuOpen}
          className="mobile-menu-toggle"
          onClick={handleMobileMenuToggle}
          ref={mobileMenuButtonRef}
          type="button"
        >
          <span>Menu</span>
          <span className="mobile-menu-toggle-mark" aria-hidden="true">
            {mobileMenuOpen ? '×' : '☰'}
          </span>
        </button>
      </div>

      <div className="mobile-menu" hidden={!mobileMenuOpen} id={mobileMenuId}>
        <nav aria-label="Mobile navigation">
          <NavigationLinks activeSection={activeSection} navigation={profile.navigation} onNavigate={handleNavigate} />
        </nav>
      </div>

      <div className="sidebar-desktop-content">
        <div className="sidebar-brand">
          <div>{profile.brand.title}</div>
          <div className="path">{profile.brand.path}</div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Navigation</div>
          <nav aria-label="Primary navigation">
            <NavigationLinks activeSection={activeSection} navigation={profile.navigation} onNavigate={handleNavigate} />
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
      </div>
    </aside>
  );
}

function NavigationLinks({ activeSection, navigation, onNavigate }) {
  return navigation.map((item) => (
    <a
      aria-current={activeSection === item.id ? 'location' : undefined}
      href={`#${item.id}`}
      key={item.id}
      onClick={() => onNavigate(item.id)}
    >
      <span className="icon">{item.icon}</span>
      <span className="nav-label">{item.label}</span>
    </a>
  ));
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

function getActiveSectionFromViewport(sectionIds) {
  if (typeof window === 'undefined') {
    return sectionIds[0];
  }

  const activationOffset = 128;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const isNearDocumentEnd = scrollHeight > viewportHeight && scrollTop + viewportHeight >= scrollHeight - 2;
  const measuredPositions = [];
  let finalSectionRect = null;
  let nextActiveSection = sectionIds[0];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportTop = rect.top;
    measuredPositions.push(Math.round(viewportTop));
    if (viewportTop <= activationOffset) {
      nextActiveSection = id;
    }
    if (id === sectionIds[sectionIds.length - 1]) {
      finalSectionRect = rect;
    }
  });

  if (isNearDocumentEnd) {
    return sectionIds[sectionIds.length - 1];
  }

  // jsdom/layout-less environments can report identical positions for all sections.
  // In that case preserve existing state and rely on hash/click updates.
  if (new Set(measuredPositions).size <= 1) {
    return null;
  }

  const finalSectionIsFullyVisible =
    finalSectionRect &&
    finalSectionRect.top >= 0 &&
    finalSectionRect.top < viewportHeight &&
    finalSectionRect.bottom > 0 &&
    finalSectionRect.bottom <= viewportHeight;

  if (finalSectionIsFullyVisible) {
    return sectionIds[sectionIds.length - 1];
  }

  return nextActiveSection;
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

    const syncFromScroll = () => {
      const nextActiveSection = getActiveSectionFromViewport(sectionIds);
      if (!nextActiveSection) {
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
    syncHash();
    syncFromScroll();

    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('resize', syncFromScroll);
      window.removeEventListener('scroll', syncFromScroll);
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
            <span className="quick-contact-icon" aria-hidden="true">
              <BrandIcon name={entry.icon ?? entry.id} />
            </span>
            <span>{entry.id === 'work-email' ? entry.text : entry.label}</span>
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
