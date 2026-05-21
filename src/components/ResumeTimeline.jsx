import { useMemo, useState } from 'react';

import { ExternalLink } from './ExternalLink.jsx';
import { RichText } from './RichText.jsx';

export function ResumeTimeline({ entries }) {
  const defaultExpandedIds = useMemo(
    () => entries.flatMap((entry) => (entry.roles[0] ? [entry.roles[0].id] : [])),
    [entries],
  );
  const [expandedRoleIds, setExpandedRoleIds] = useState(() => new Set(defaultExpandedIds));

  const toggleRole = (roleId) => {
    setExpandedRoleIds((current) => {
      const next = new Set(current);
      if (next.has(roleId)) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });
  };

  return (
    <div className="resume-timeline">
      {entries.map((entry) => (
        <article className="resume-org" key={entry.id}>
          <div className="resume-org-header">
            {entry.href ? (
              <ExternalLink className="resume-org-name text-link" href={entry.href}>
                {entry.organization}
              </ExternalLink>
            ) : (
              <div className="resume-org-name">{entry.organization}</div>
            )}
            {entry.dateRange ? (
              <div className="resume-dates">
                {entry.dateRange.start} – {entry.dateRange.end}
              </div>
            ) : null}
          </div>
          {entry.roles.map((role) => {
            const isExpanded = expandedRoleIds.has(role.id);
            const roleLabel = formatRoleLabel(role);

            return (
              <div className={`resume-role ${isExpanded ? 'is-expanded' : ''}`} key={role.id}>
                <button
                  aria-expanded={isExpanded}
                  className="resume-role-toggle"
                  onClick={() => toggleRole(role.id)}
                  type="button"
                >
                  <span className="resume-role-title">{roleLabel}</span>
                  {role.location ? <span className="resume-role-location">{role.location}</span> : null}
                </button>
                {role.bullets.length ? (
                  <ul className="resume-bullets">
                    {role.bullets.map((bullet, index) => (
                      <li key={`${role.id}-bullet-${index}`}>
                        <RichText parts={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </article>
      ))}
    </div>
  );
}

function formatRoleLabel(role) {
  const dateSuffix = role.dateRange ? ` · ${role.dateRange.start} – ${role.dateRange.end}` : '';
  return `${role.title}${dateSuffix}`;
}
