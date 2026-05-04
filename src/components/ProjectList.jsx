import { useState } from 'react';

import { ProjectItem } from './ProjectItem.jsx';
import { sortProjects } from '../data/projects.js';

export function ProjectList({ projects, sortMode = 'default' }) {
  const [expanded, setExpanded] = useState(false);
  const sortedProjects = sortProjects(projects, sortMode);
  const featuredProjects = sortedProjects.filter((project) => project.featured);
  const extraProjects = sortedProjects.filter((project) => !project.featured);
  const visibleArchiveProjects = expanded ? extraProjects : [];

  return (
    <div className="project-list" id="project-list">
      <div className="flagship-projects" role="region" aria-label="Flagship projects">
        <div className="project-group-label">flagship work</div>
        {featuredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      <div className="project-archive" role="region" aria-label="Project archive">
        {visibleArchiveProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}

        {extraProjects.length > 0 ? (
          <button
            className="projects-toggle"
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? '↑ show less' : `+ show more (${extraProjects.length} projects)`}
          </button>
        ) : null}
      </div>
    </div>
  );
}
