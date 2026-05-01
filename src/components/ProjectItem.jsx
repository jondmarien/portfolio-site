import { useState } from 'react';

import { ExternalLink } from './ExternalLink.jsx';

export function ProjectItem({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const links = project.links ?? [{ href: project.href, label: project.linkLabel }];

  const toggleDetails = () => setIsFlipped((current) => !current);

  return (
    <article className={`project-item ${isFlipped ? 'is-flipped' : ''}`}>
      <div className="project-card-content" onClick={toggleDetails}>
        {isFlipped ? <ProjectBack project={project} /> : <ProjectFront project={project} />}
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
    </article>
  );
}

function ProjectFront({ project }) {
  return (
    <div className="project-card-face project-card-front">
      {project.featured ? <ProjectMedia media={project.media} name={project.name} /> : null}
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

function ProjectBack({ project }) {
  const moreInfo = project.moreInfo ?? {
    status: 'More info soon',
    details: 'Additional project details have not been added yet.',
    stats: [],
  };

  return (
    <div className="project-card-face project-card-back">
      {!project.featured ? <ProjectMedia media={project.media} name={project.name} /> : null}
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

function ProjectMedia({ media, name }) {
  const mediaItems = normalizeMedia(media);
  if (!mediaItems.length) {
    return null;
  }

  if (mediaItems.length === 1) {
    return <ProjectMediaAsset media={mediaItems[0]} name={name} />;
  }

  return <ProjectMediaCarousel mediaItems={mediaItems} name={name} />;
}

function ProjectMediaAsset({ media, name }) {
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

  return (
    <div className="project-media-wrap" onClick={stopEventPropagation}>
      <img className="project-media" src={media.src} alt={media.alt ?? `${name} preview`} loading="lazy" />
    </div>
  );
}

function ProjectMediaCarousel({ mediaItems, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = mediaItems[activeIndex];
  const hasMultipleSlides = mediaItems.length > 1;

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
      <ProjectMediaAsset media={activeMedia} name={name} />
      {hasMultipleSlides ? (
        <div className="project-media-carousel-controls">
          <button
            aria-label={`Previous media for ${name}`}
            className="project-media-nav"
            onClick={goToPrevious}
            type="button"
          >
            {'<'}
          </button>
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
          <button aria-label={`Next media for ${name}`} className="project-media-nav" onClick={goToNext} type="button">
            {'>'}
          </button>
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
