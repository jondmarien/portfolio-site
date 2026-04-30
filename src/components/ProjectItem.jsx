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
  const [screenshot] = project.moreInfo?.screenshots ?? [];

  return (
    <div className="project-card-face project-card-front">
      {screenshot ? (
        <img
          className="project-media"
          src={screenshot.src}
          alt={screenshot.alt ?? `${project.name} preview`}
          loading="lazy"
        />
      ) : null}
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
