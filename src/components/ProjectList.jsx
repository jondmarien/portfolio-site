import { useState } from 'react';

import { ProjectItem } from './ProjectItem.jsx';

export function ProjectList({ projects }) {
  const [expanded, setExpanded] = useState(false);
  const featuredProjects = projects.filter((project) => project.featured);
  const extraProjects = projects.filter((project) => !project.featured);
  const visibleProjects = expanded ? projects : featuredProjects;

  return (
    <div className="project-list" id="project-list">
      {visibleProjects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}

      <button
        className="projects-toggle"
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        {expanded ? '↑ show less' : `+ show more (${extraProjects.length} projects)`}
      </button>
    </div>
  );
}
