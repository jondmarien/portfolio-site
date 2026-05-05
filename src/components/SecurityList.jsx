import { useEffect, useState } from 'react';

import { ExternalLink } from './ExternalLink.jsx';

export function SecurityList({ entries }) {
  const [expandedMedia, setExpandedMedia] = useState(null);
  const cveCount = entries.filter((entry) => entry.type === 'CVE').length;
  const labCount = entries.filter((entry) => ['CTF', 'LABS'].includes(entry.type)).length;
  const closeExpandedMedia = () => setExpandedMedia(null);

  useEffect(() => {
    if (!expandedMedia) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeExpandedMedia();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedMedia]);

  return (
    <div className="security-showcase">
      <div className="security-summary">
        <div>
          <div className="security-eyebrow">research signal</div>
          <p>CVEs, exploit analysis, labs, and writeups with direct security relevance.</p>
        </div>
        <div className="security-summary-stats" aria-label="Security research summary">
          <span>
            <strong>{cveCount}</strong>
            CVE-backed findings
          </span>
          <span>
            <strong>{labCount}</strong>
            Hands-on labs
          </span>
        </div>
      </div>

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
            {entry.impact ? <p className="writeup-impact">{entry.impact}</p> : null}
            {entry.media ? (
              <figure className="writeup-media">
                <button
                  aria-label={`Open full image for ${entry.media.alt}`}
                  className="writeup-media-trigger"
                  onClick={() => setExpandedMedia(entry.media)}
                  type="button"
                >
                  <img src={entry.media.src} alt={entry.media.alt} loading="lazy" />
                </button>
              </figure>
            ) : null}
          </article>
        ))}
      </div>
      {expandedMedia ? (
        <div className="project-media-modal-backdrop" onClick={closeExpandedMedia} role="presentation">
          <div
            aria-label={expandedMedia.alt}
            aria-modal="true"
            className="project-media-modal"
            onClick={stopEventPropagation}
            role="dialog"
          >
            <button aria-label="Close image preview" className="project-media-modal-close" onClick={closeExpandedMedia} type="button">
              close
            </button>
            <div className="project-media-modal-stage">
              <img className="project-media-modal-image" src={expandedMedia.src} alt={expandedMedia.alt} />
            </div>
            <p className="project-media-modal-caption">{expandedMedia.alt}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function stopEventPropagation(event) {
  event.stopPropagation();
}
