import { ExternalLink } from './ExternalLink.jsx';

export function ProjectItem({ project }) {
  const links = project.links ?? [{ href: project.href, label: project.linkLabel }];

  return (
    <article className="project-item">
      <div>
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
      <div className="project-links" aria-label={`${project.name} links`}>
        {links.map((link) => (
          <ExternalLink className="project-link" href={link.href} key={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </article>
  );
}
