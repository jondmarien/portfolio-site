import { ExternalLink } from './ExternalLink.jsx';
import { RichText } from './RichText.jsx';

export function ResumeSummary({ crossLinkLabel, entries }) {
  return (
    <div className="resume-summary">
      {entries.map((entry) => (
        <article className="resume-summary-item" key={entry.id}>
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
          {entry.role ? <div className="resume-summary-role">{entry.role}</div> : null}
          {entry.stack ? <div className="resume-summary-stack">{entry.stack}</div> : null}
          <ul className="resume-bullets">
            {entry.bullets.map((bullet, index) => (
              <li key={`${entry.id}-bullet-${index}`}>
                <RichText parts={bullet} />
              </li>
            ))}
          </ul>
          {entry.crossLink ? (
            <a className="resume-crosslink text-link" href={entry.crossLink}>
              {crossLinkLabel}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
