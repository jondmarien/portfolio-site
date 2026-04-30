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
