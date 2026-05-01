import { useEffect } from 'react';

import { CommunityList } from './components/CommunityList.jsx';
import { ContactList } from './components/ContactList.jsx';
import { Hero } from './components/Hero.jsx';
import { Layout } from './components/Layout.jsx';
import { ProjectList } from './components/ProjectList.jsx';
import { Section } from './components/Section.jsx';
import { SecurityList } from './components/SecurityList.jsx';
import { community } from './data/community.js';
import { profile } from './data/profile.js';
import { projects } from './data/projects.js';
import { securityResearch } from './data/security.js';

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    let resetTimer;

    const clearScrollCursorState = () => {
      root.classList.remove('is-scrolling-up', 'is-scrolling-down');
    };

    const handleWheel = (event) => {
      if (event.deltaY === 0) {
        return;
      }

      const isScrollingUp = event.deltaY < 0;
      root.classList.toggle('is-scrolling-up', isScrollingUp);
      root.classList.toggle('is-scrolling-down', !isScrollingUp);

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(clearScrollCursorState, 180);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
      clearScrollCursorState();
    };
  }, []);

  return (
    <Layout profile={profile}>
      <Hero profile={profile} />

      <Section id="security" title="security research">
        <SecurityList entries={securityResearch} />
      </Section>

      <Section id="projects" title="projects">
        <ProjectList projects={projects} />
      </Section>

      <Section id="community" title="community">
        <CommunityList entries={community} />
      </Section>

      <Section id="contact" title="contact">
        <ContactList entries={profile.contact} />
      </Section>
    </Layout>
  );
}
