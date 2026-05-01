import { ExternalLink } from './ExternalLink.jsx';

export function Hero({ profile }) {
  const { hero } = profile;

  return (
    <section className="hero" id="about">
      <div className="hero-prompt">
        <span className="caret">❯</span>
        <span>{hero.prompt}</span>
      </div>
      <h1>
        {hero.name} <span className="name-accent">{hero.alias}</span>
      </h1>
      <div className="tagline">
        {hero.tagline.map((item, index) => (
          <span key={item}>
            {index > 0 ? <span className="sep">·</span> : null}
            {item}
          </span>
        ))}
      </div>
      {hero.badges?.length ? (
        <div className="hero-badges" aria-label="Profile badges">
          {hero.badges.map((badge) => (
            <span className="hero-badge" key={badge}>
              {badge}
            </span>
          ))}
        </div>
      ) : null}
      <div className="hero-body">
        {hero.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph.map((part, partIndex) => (
              <HeroPart key={partIndex} part={part} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

function HeroPart({ part }) {
  if (typeof part === 'string') {
    return part;
  }

  if (part.variant === 'tag') {
    return <span className="inline-tag">{part.text}</span>;
  }

  return (
    <ExternalLink className="text-link" href={part.href}>
      {part.text}
    </ExternalLink>
  );
}
