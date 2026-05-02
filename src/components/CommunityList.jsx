import { useEffect, useState } from 'react';

import { RichText } from './RichText.jsx';

export function CommunityList({ entries }) {
  const [expandedMedia, setExpandedMedia] = useState(null);
  const expandedMediaItem = expandedMedia ? expandedMedia.items[expandedMedia.index] : null;
  const canCycleExpandedMedia = expandedMedia ? expandedMedia.items.length > 1 : false;

  useEffect(() => {
    if (!expandedMedia) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedMedia(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedMedia]);

  const showPreviousExpandedMedia = (event) => {
    stopEventPropagation(event);
    setExpandedMedia((current) => {
      if (!current || current.items.length <= 1) {
        return current;
      }

      return {
        ...current,
        index: (current.index - 1 + current.items.length) % current.items.length,
      };
    });
  };

  const showNextExpandedMedia = (event) => {
    stopEventPropagation(event);
    setExpandedMedia((current) => {
      if (!current || current.items.length <= 1) {
        return current;
      }

      return {
        ...current,
        index: (current.index + 1) % current.items.length,
      };
    });
  };

  return (
    <div className="community-list">
      {entries.map((entry) => (
        <article className="community-item" key={entry.id}>
          {normalizeMediaItems(entry.media).length ? (
            <div className="community-media-gallery">
              {normalizeMediaItems(entry.media).map((mediaItem, index) => (
                <figure className="community-media-card" key={`${entry.id}-media-${index}`}>
                  {mediaItem.src ? (
                    <button
                      aria-label={`Open full image for ${mediaItem.alt}`}
                      className="community-media-trigger"
                      onClick={(event) => {
                        stopEventPropagation(event);
                        setExpandedMedia({ items: normalizeMediaItems(entry.media), index });
                      }}
                      type="button"
                    >
                      <img className="community-media-image" src={mediaItem.src} alt={mediaItem.alt} loading="lazy" />
                    </button>
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
      {expandedMediaItem ? (
        <div className="project-media-modal-backdrop" onClick={() => setExpandedMedia(null)} role="presentation">
          <div
            aria-label={expandedMediaItem.alt}
            aria-modal="true"
            className="project-media-modal"
            onClick={stopEventPropagation}
            role="dialog"
          >
            <button
              aria-label="Close image preview"
              className="project-media-modal-close"
              onClick={() => setExpandedMedia(null)}
              type="button"
            >
              close
            </button>
            <div className="project-media-modal-stage">
              <img className="project-media-modal-image" src={expandedMediaItem.src} alt={expandedMediaItem.alt} />
              {canCycleExpandedMedia ? (
                <>
                  <button
                    aria-label="Previous modal image"
                    className="project-media-modal-nav project-media-modal-nav-prev"
                    onClick={showPreviousExpandedMedia}
                    type="button"
                  >
                    {'<'}
                  </button>
                  <button
                    aria-label="Next modal image"
                    className="project-media-modal-nav project-media-modal-nav-next"
                    onClick={showNextExpandedMedia}
                    type="button"
                  >
                    {'>'}
                  </button>
                </>
              ) : null}
            </div>
            <p className="project-media-modal-caption">
              {expandedMediaItem.alt} {canCycleExpandedMedia ? `(${expandedMedia.index + 1}/${expandedMedia.items.length})` : ''}
            </p>
          </div>
        </div>
      ) : null}
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

function stopEventPropagation(event) {
  event.stopPropagation();
}
