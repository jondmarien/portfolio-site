import { BrandIcon } from './BrandIcon.jsx';
import { ExternalLink } from './ExternalLink.jsx';

export function MobileFooter({ profile }) {
  return (
    <footer className="mobile-footer" aria-label="Mobile links and contact">
      <div className="mobile-footer-section">
        <div className="mobile-footer-title">Links</div>
        <div className="mobile-footer-grid" aria-label="Footer links">
          {profile.links.map((link) => (
            <FooterLink entry={link} key={link.id} />
          ))}
        </div>
      </div>

      <div className="mobile-footer-section">
        <div className="mobile-footer-title">Contact</div>
        <div className="mobile-footer-grid" aria-label="Footer contact">
          {profile.contact.map((entry) => (
            <FooterLink entry={entry} key={entry.id} text={entry.text} />
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ entry, text = entry.label }) {
  return (
    <ExternalLink className="mobile-footer-link" href={entry.href}>
      <span className="mobile-footer-icon" aria-hidden="true">
        <BrandIcon name={entry.icon ?? entry.id} />
      </span>
      <span>{text}</span>
    </ExternalLink>
  );
}
