import { useEffect, useState } from 'react';
import ASCIIText from './ASCIIText.jsx';
import BorderGlow from './BorderGlow.jsx';
import { ExternalLink } from './ExternalLink.jsx';

export function Hero({ profile }) {
  const { hero } = profile;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [asciiReady, setAsciiReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <section className="hero" id="about">
      <div className="hero-prompt">
        <span className="caret">❯</span>
        <span>{hero.prompt}</span>
      </div>
      <h1>
        <span className="hero-name">{hero.name}</span>
        <span className={`name-accent hero-alias hero-alias-line${asciiReady ? ' hero-alias--ascii-ready' : ''}`}>
          <span className="hero-alias-fallback">{hero.alias}</span>
          <span className="hero-alias-ascii" aria-hidden="true">
            <ASCIIText
              text={hero.alias}
              enableWaves={!prefersReducedMotion}
              asciiFontSize={7}
              textFontSize={560}
              planeBaseHeight={18}
              onReady={() => setAsciiReady(true)}
              onError={() => setAsciiReady(false)}
            />
          </span>
        </span>
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
            <BorderGlow
              key={badge}
              className="hero-badge-glow"
              edgeSensitivity={30}
              glowColor="24 92 68"
              backgroundColor="#101117"
              borderRadius={8}
              glowRadius={18}
              glowIntensity={0.82}
              coneSpread={22}
              animated={false}
              colors={['#fb923c', '#f472b6', '#f59e0b']}
              fillOpacity={0.3}
            >
              <span className="hero-badge">{badge}</span>
            </BorderGlow>
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
