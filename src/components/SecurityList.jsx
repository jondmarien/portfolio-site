import { ExternalLink } from './ExternalLink.jsx';
import BorderGlow from './BorderGlow.jsx';

export function SecurityList({ entries }) {
  const cveCount = entries.filter((entry) => entry.type === 'CVE').length;
  const labCount = entries.filter((entry) => ['CTF', 'LABS'].includes(entry.type)).length;

  return (
    <div className="security-showcase">
      <BorderGlow
        className="security-summary-glow"
        edgeSensitivity={30}
        glowColor="24 92 68"
        backgroundColor="#121018"
        borderRadius={8}
        glowRadius={22}
        glowIntensity={0.82}
        coneSpread={22}
        animated={false}
        colors={['#2dd4bf', '#a78bfa', '#38bdf8']}
        fillOpacity={0.24}
      >
        <div className="security-summary">
          <div>
            <div className="security-eyebrow">research signal</div>
            <p>CVEs, exploit analysis, labs, and writeups with direct security relevance.</p>
          </div>
          <div className="security-summary-stats" aria-label="Security research summary">
            <span>
              <strong>{cveCount}</strong>
              CVE-backed findings
            </span>
            <span>
              <strong>{labCount}</strong>
              Hands-on labs
            </span>
          </div>
        </div>
      </BorderGlow>

      <div className="writeup-list">
        {entries.map((entry) => (
          <article className="writeup-item" key={entry.id}>
            <ExternalLink className="writeup-title" href={entry.href}>
              {entry.title}
            </ExternalLink>
            <div className="writeup-meta">
              <span className={`type ${entry.typeClass}`}>{entry.type}</span>
              {entry.description}
            </div>
            {entry.impact ? <p className="writeup-impact">{entry.impact}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
