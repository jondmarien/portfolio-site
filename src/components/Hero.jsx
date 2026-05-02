import { useEffect, useState } from 'react';
import ASCIIText from './ASCIIText.jsx';
import BorderGlow from './BorderGlow.jsx';
import { RichText } from './RichText.jsx';

export function Hero({ profile }) {
  const { hero } = profile;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [asciiReady, setAsciiReady] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState(null);
  const expandedMediaItem = expandedMedia ? expandedMedia.items[expandedMedia.index] : null;
  const canCycleExpandedMedia = expandedMedia ? expandedMedia.items.length > 1 : false;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!expandedMedia) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedMedia(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedMedia]);

  const showPreviousExpandedMedia = (event) => {
    stopEventPropagation(event);
    setExpandedMedia((current) => {
      if (!current || current.items.length <= 1) {
        return current;
      }

      return {
        ...current,
        index: (current.index - 1 + current.items.length) % current.items.length,
      };
    });
  };

  const showNextExpandedMedia = (event) => {
    stopEventPropagation(event);
    setExpandedMedia((current) => {
      if (!current || current.items.length <= 1) {
        return current;
      }

      return {
        ...current,
        index: (current.index + 1) % current.items.length,
      };
    });
  };

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
            <RichText parts={paragraph} />
          </p>
        ))}
      </div>
      {hero.media?.length ? (
        <div className="hero-media-grid" aria-label="Profile personality media">
          {hero.media.map((item, index) => (
            <figure className="hero-media-card" key={item.id}>
              {item.src ? (
                <button
                  aria-label={`Open full image for ${item.alt}`}
                  className="hero-media-trigger"
                  onClick={(event) => {
                    stopEventPropagation(event);
                    setExpandedMedia({ items: hero.media, index });
                  }}
                  type="button"
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </button>
              ) : (
                <div className="hero-media-placeholder" role="img" aria-label={item.alt}>
                  <span>image slot</span>
                </div>
              )}
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      {expandedMediaItem ? (
        <div className="project-media-modal-backdrop" onClick={() => setExpandedMedia(null)} role="presentation">
          <div
            aria-label={expandedMediaItem.alt}
            aria-modal="true"
            className="project-media-modal"
            onClick={stopEventPropagation}
            role="dialog"
          >
            <button
              aria-label="Close image preview"
              className="project-media-modal-close"
              onClick={() => setExpandedMedia(null)}
              type="button"
            >
              close
            </button>
            <div className="project-media-modal-stage">
              <img className="project-media-modal-image" src={expandedMediaItem.src} alt={expandedMediaItem.alt} />
              {canCycleExpandedMedia ? (
                <>
                  <button
                    aria-label="Previous modal image"
                    className="project-media-modal-nav project-media-modal-nav-prev"
                    onClick={showPreviousExpandedMedia}
                    type="button"
                  >
                    {'<'}
                  </button>
                  <button
                    aria-label="Next modal image"
                    className="project-media-modal-nav project-media-modal-nav-next"
                    onClick={showNextExpandedMedia}
                    type="button"
                  >
                    {'>'}
                  </button>
                </>
              ) : null}
            </div>
            <p className="project-media-modal-caption">
              {expandedMediaItem.alt} {canCycleExpandedMedia ? `(${expandedMedia.index + 1}/${expandedMedia.items.length})` : ''}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function stopEventPropagation(event) {
  event.stopPropagation();
}
