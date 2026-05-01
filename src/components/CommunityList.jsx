import { RichText } from './RichText.jsx';

export function CommunityList({ entries }) {
  return (
    <div className="community-list">
      {entries.map((entry) => (
        <article className="community-item" key={entry.id}>
          {normalizeMediaItems(entry.media).length ? (
            <div className="community-media-gallery">
              {normalizeMediaItems(entry.media).map((mediaItem, index) => (
                <figure className="community-media-card" key={`${entry.id}-media-${index}`}>
                  {mediaItem.src ? (
                    <img className="community-media-image" src={mediaItem.src} alt={mediaItem.alt} loading="lazy" />
                  ) : (
                    <div className="community-media-placeholder" role="img" aria-label={mediaItem.alt}>
                      <span>image slot</span>
                    </div>
                  )}
                  {mediaItem.caption ? <figcaption>{mediaItem.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
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

function normalizeMediaItems(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
