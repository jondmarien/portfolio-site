import { RichText } from './RichText.jsx';

export function CommunityList({ entries }) {
  return (
    <div className="community-list">
      {entries.map((entry) => (
        <article className="community-item" key={entry.id}>
          {entry.media ? (
            <figure className="community-media-card">
              {entry.media.src ? (
                <img className="community-media-image" src={entry.media.src} alt={entry.media.alt} loading="lazy" />
              ) : (
                <div className="community-media-placeholder" role="img" aria-label={entry.media.alt}>
                  <span>image slot</span>
                </div>
              )}
              {entry.media.caption ? <figcaption>{entry.media.caption}</figcaption> : null}
            </figure>
          ) : null}
          <div className="community-name">{entry.name}</div>
          <div className="community-role">{entry.role}</div>
          <p className="community-desc">
            <RichText parts={normalizeTextParts(entry.description)} />
          </p>
        </article>
      ))}
    </div>
  );
}

function normalizeTextParts(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
}
