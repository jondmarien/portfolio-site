import { ExternalLink } from './ExternalLink.jsx';
import { BrandIcon } from './BrandIcon.jsx';

export function ContactList({ entries }) {
  return (
    <div className="contact-grid">
      {entries.map((entry) => (
        <div className="contact-row" key={entry.id}>
          <span className="contact-icon" aria-hidden="true">
            <BrandIcon name={entry.icon ?? entry.id} />
          </span>
          <span className="contact-label">{entry.label}</span>
          <span className="contact-value">
            <ExternalLink href={entry.href}>{entry.text}</ExternalLink>
          </span>
        </div>
      ))}
    </div>
  );
}
