import { useEffect, useState } from 'react';

import { ExternalLink } from './ExternalLink.jsx';

export function ProjectItem({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState(null);
  const links = project.links ?? [{ href: project.href, label: project.linkLabel }];

  const toggleDetails = () => setIsFlipped((current) => !current);
  const closeExpandedMedia = () => setExpandedMedia(null);
  const expandedMediaItem = expandedMedia ? expandedMedia.items[expandedMedia.index] : null;
  const canCycleExpandedMedia = expandedMedia ? expandedMedia.items.length > 1 : false;

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

  useEffect(() => {
    if (typeof Image === 'undefined') {
      return;
    }

    const mediaItems = normalizeMedia(project.media).filter((item) => item.type === 'image' && item.src);
    mediaItems.forEach((item) => {
      const image = new Image();
      image.src = item.src;
    });
  }, [project.media]);

  return (
    <article className={`project-item ${isFlipped ? 'is-flipped' : ''}`}>
      <div className="project-card-content" onClick={toggleDetails}>
        {isFlipped ? (
          <ProjectBack project={project} onPreviewMedia={setExpandedMedia} />
        ) : (
          <ProjectFront project={project} onPreviewMedia={setExpandedMedia} />
        )}
      </div>
      <div className="project-actions">
        <button
          aria-label={`${isFlipped ? 'Show summary' : 'Show details'} about ${project.name}`}
          aria-pressed={isFlipped}
          className="project-info-toggle"
          onClick={toggleDetails}
          type="button"
        >
          {isFlipped ? 'back to summary' : 'view details'}
        </button>
        <div className="project-links" aria-label={`${project.name} links`}>
          {links.map((link) => (
            <ExternalLink className="project-link" href={link.href} key={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>
      {expandedMediaItem ? (
        <div className="project-media-modal-backdrop" onClick={closeExpandedMedia} role="presentation">
          <div
            aria-label={expandedMediaItem.alt ?? `${project.name} image preview`}
            aria-modal="true"
            className="project-media-modal"
            onClick={stopEventPropagation}
            role="dialog"
          >
            <button aria-label="Close image preview" className="project-media-modal-close" onClick={closeExpandedMedia} type="button">
              close
            </button>
            <div className="project-media-modal-stage">
              <img
                className="project-media-modal-image"
                src={expandedMediaItem.src}
                alt={expandedMediaItem.alt ?? `${project.name} preview`}
              />
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
              {expandedMediaItem.alt ?? `${project.name} preview`}{' '}
              {canCycleExpandedMedia ? `(${expandedMedia.index + 1}/${expandedMedia.items.length})` : ''}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ProjectFront({ project, onPreviewMedia }) {
  return (
    <div className="project-card-face project-card-front">
      {project.featured ? <ProjectMedia media={project.media} name={project.name} onPreviewMedia={onPreviewMedia} /> : null}
      <ProjectLogo logo={project.logo} name={project.name} />
      <div className="project-name">{project.name}</div>
      <div className="project-desc">{project.description}</div>
      <div className="project-tags" aria-label={`${project.name} technologies`}>
        {project.tags.map((tag) => (
          <span className={`tag ${tag.type}`} key={`${project.id}-${tag.label}`}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectBack({ project, onPreviewMedia }) {
  const moreInfo = project.moreInfo ?? {
    status: 'More info soon',
    details: 'Additional project details have not been added yet.',
    stats: [],
  };

  return (
    <div className="project-card-face project-card-back">
      {!project.featured ? <ProjectMedia media={project.media} name={project.name} onPreviewMedia={onPreviewMedia} /> : null}
      <ProjectLogo logo={project.logo} name={project.name} />
      <div className="project-meta-row">
        {moreInfo.role ? <span>{moreInfo.role}</span> : null}
        {moreInfo.status ? <span>{moreInfo.status}</span> : null}
      </div>
      {moreInfo.details ? <p className="project-more-details">{moreInfo.details}</p> : null}
      {moreInfo.stats?.length ? (
        <dl className="project-stats">
          {moreInfo.stats.slice(0, 5).map((stat) => (
            <div className="project-stat" key={`${project.id}-${stat.label}`}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

function ProjectLogo({ logo, name }) {
  if (!logo?.src) {
    return null;
  }

  return <img className="project-logo" src={logo.src} alt={logo.alt ?? `${name} logo`} loading="lazy" />;
}

function ProjectMedia({ media, name, onPreviewMedia }) {
  const mediaItems = normalizeMedia(media);
  if (!mediaItems.length) {
    return null;
  }

  if (mediaItems.length === 1) {
    return (
      <ProjectMediaAsset
        media={mediaItems[0]}
        name={name}
        onPreviewMedia={onPreviewMedia}
        previewContext={{ items: mediaItems, index: 0 }}
      />
    );
  }

  return <ProjectMediaCarousel mediaItems={mediaItems} name={name} onPreviewMedia={onPreviewMedia} />;
}

function ProjectMediaAsset({ media, name, onPreviewMedia, previewContext }) {
  const objectFit = media.fit ?? 'cover';
  const objectPosition = media.position ?? 'center center';
  const loading = media.loading ?? 'lazy';

  if (media.type === 'video') {
    return (
      <div className="project-media-wrap" onClick={stopEventPropagation}>
        <video className="project-media" controls muted playsInline preload="metadata">
          <source src={media.src} type={media.mimeType ?? 'video/mp4'} />
          {media.alt ?? `${name} demo video`}
        </video>
      </div>
    );
  }

  const openPreview = (event) => {
    stopEventPropagation(event);
    onPreviewMedia?.(previewContext ?? { items: [media], index: 0 });
  };

  return (
    <div className="project-media-wrap" onClick={stopEventPropagation}>
      <button
        aria-label={`Open full image for ${media.alt ?? `${name} preview`}`}
        className="project-media-trigger"
        onClick={openPreview}
        type="button"
      >
        <img
          className="project-media"
          src={media.src}
          alt={media.alt ?? `${name} preview`}
          loading={loading}
          fetchPriority={loading === 'eager' ? 'high' : 'auto'}
          style={{ objectFit, objectPosition }}
        />
      </button>
    </div>
  );
}

function ProjectMediaCarousel({ mediaItems, name, onPreviewMedia }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = mediaItems[activeIndex];
  const hasMultipleSlides = mediaItems.length > 1;

  useEffect(() => {
    if (typeof Image === 'undefined') {
      return;
    }

    const preloadableItems = mediaItems.filter((item) => item.type === 'image' && item.src);
    preloadableItems.forEach((item) => {
      const image = new Image();
      image.src = item.src;
    });
  }, [mediaItems]);

  const goToPrevious = (event) => {
    stopEventPropagation(event);
    setActiveIndex((current) => (current - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = (event) => {
    stopEventPropagation(event);
    setActiveIndex((current) => (current + 1) % mediaItems.length);
  };

  const setSlide = (event, index) => {
    stopEventPropagation(event);
    setActiveIndex(index);
  };

  return (
    <div className="project-media-carousel" onClick={stopEventPropagation}>
      <div className="project-media-carousel-stage">
        <ProjectMediaAsset
          media={activeMedia}
          name={name}
          onPreviewMedia={onPreviewMedia}
          previewContext={{ items: mediaItems, index: activeIndex }}
        />
        {hasMultipleSlides ? (
          <>
            <button
              aria-label={`Previous media for ${name}`}
              className="project-media-nav project-media-nav-prev"
              onClick={goToPrevious}
              type="button"
            >
              {'<'}
            </button>
            <button
              aria-label={`Next media for ${name}`}
              className="project-media-nav project-media-nav-next"
              onClick={goToNext}
              type="button"
            >
              {'>'}
            </button>
          </>
        ) : null}
      </div>
      {hasMultipleSlides ? (
        <div className="project-media-carousel-controls">
          <div className="project-media-dots" role="tablist" aria-label={`${name} media slides`}>
            {mediaItems.map((item, index) => (
              <button
                key={`${name}-media-${index}`}
                aria-label={`Show ${item.alt ?? `slide ${index + 1}`} for ${name}`}
                aria-pressed={index === activeIndex}
                className={`project-media-dot ${index === activeIndex ? 'is-active' : ''}`}
                onClick={(event) => setSlide(event, index)}
                type="button"
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="project-media-caption">
        {activeMedia.alt ?? `${name} preview`} {hasMultipleSlides ? `(${activeIndex + 1}/${mediaItems.length})` : ''}
      </div>
    </div>
  );
}

function normalizeMedia(media) {
  if (!media) {
    return [];
  }

  if (Array.isArray(media)) {
    return media.filter((item) => item?.src);
  }

  return media.src ? [media] : [];
}

function stopEventPropagation(event) {
  event.stopPropagation();
}
