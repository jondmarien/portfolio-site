import { ExternalLink } from './ExternalLink.jsx';

export function ProjectItem({ project }) {
  return (
    <ExternalLink className="project-item" href={project.href}>
      <article>
        <div className="project-name">{project.name}</div>
        <div className="project-desc">{project.description}</div>
        <div className="project-tags" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag) => (
            <span className={`tag ${tag.type}`} key={`${project.id}-${tag.label}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </article>
      <span className="project-link">{project.linkLabel}</span>
    </ExternalLink>
  );
}
