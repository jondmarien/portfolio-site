import { ExternalLink } from './ExternalLink.jsx';

export function ContactList({ entries }) {
  return (
    <div className="contact-grid">
      {entries.map((entry) => (
        <div className="contact-row" key={entry.id}>
          <span className="contact-label">{entry.label}</span>
          <span className="contact-value">
            <ExternalLink href={entry.href}>{entry.text}</ExternalLink>
          </span>
        </div>
      ))}
    </div>
  );
}
