import { ExternalLink } from './ExternalLink.jsx';

export function Sidebar({ profile }) {
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
            <a href={`#${item.id}`} key={item.id}>
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
    </aside>
  );
}
