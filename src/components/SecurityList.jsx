import { ExternalLink } from './ExternalLink.jsx';

export function SecurityList({ entries }) {
  return (
    <div className="writeup-list">
      {entries.map((entry) => (
        <article className="writeup-item" key={entry.id}>
          <ExternalLink className="writeup-title" href={entry.href}>
            {entry.title}
          </ExternalLink>
          <div className="writeup-meta">
            <span className={`type ${entry.typeClass}`}>{entry.type}</span>
            {entry.description}
          </div>
        </article>
      ))}
    </div>
  );
}
