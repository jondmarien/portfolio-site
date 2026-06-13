import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ASCIIText from '../../components/ASCIIText.jsx';
import { community } from '../../data/community.js';
import { profile } from '../../data/profile.js';
import { projects } from '../../data/projects.js';
import { resume } from '../../data/resume.js';
import { securityResearch } from '../../data/security.js';
import { createHeroScene } from './heroScene.js';
import './landing.css';

gsap.registerPlugin(ScrollTrigger);

const ROLES = profile.hero.tagline; // ['CTO @ D-Sports', 'Security Researcher', 'Cybersecurity Graduate']

const STATS = [
  { value: 22, suffix: '', label: 'CTF challenges designed' },
  { value: 100, suffix: '+', label: 'users across 3 countries' },
  { value: 300, suffix: '+', label: 'attendees at Fantasy CTF 2026' },
  { value: 2, suffix: '', label: 'CVE deep-dives published' },
];

// renders the data layer's rich-text arrays ({ text, emphasis, href, variant } | string)
function renderRich(content, keyPrefix = 'rich') {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return null;
  return content.map((part, i) => {
    if (typeof part === 'string') return part;
    const key = `${keyPrefix}-${i}`;
    if (part.href) {
      return (
        <a key={key} href={part.href} target="_blank" rel="noreferrer" className="rich-link">
          {part.text}
        </a>
      );
    }
    if (part.variant === 'tag') {
      return (
        <code key={key} className="rich-tag">
          {part.text}
        </code>
      );
    }
    switch (part.emphasis) {
      case 'strong':
        return <strong key={key}>{part.text}</strong>;
      case 'italic':
        return <em key={key}>{part.text}</em>;
      case 'underline':
        return <u key={key}>{part.text}</u>;
      case 'accent':
        return (
          <span key={key} className="rich-accent">
            {part.text}
          </span>
        );
      default:
        return <span key={key}>{part.text}</span>;
    }
  });
}

function splitWords(text) {
  return text.split(' ').map((word, i) => (
    <span className="word-mask" key={`${word}-${i}`}>
      <span className="word">{word}&nbsp;</span>
    </span>
  ));
}

export default function LandingApp() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const [asciiReady, setAsciiReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- three.js hero field ---
    const scene = createHeroScene(canvasRef.current, { reducedMotion: prefersReduced });
    const heroEl = canvasRef.current.parentElement;
    const onResize = () => scene.resize(heroEl.clientWidth, heroEl.clientHeight);
    onResize();
    scene.start();
    window.addEventListener('resize', onResize);
    const onPointer = (e) => scene.setPointer(e.clientX, e.clientY);
    window.addEventListener('pointermove', onPointer);

    // --- lenis smooth scroll, driven by gsap ticker ---
    let lenis;
    if (!prefersReduced) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
      lenis.on('scroll', ScrollTrigger.update);
      const update = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      lenis._gsapUpdate = update;
    }

    // --- drag-to-scroll for the case-file strip ---
    const track = rootRef.current.querySelector('.case-track');
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    const onTrackDown = (e) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(e.pointerId);
    };
    const onTrackMove = (e) => {
      if (!dragging) return;
      track.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
    };
    const onTrackUp = (e) => {
      dragging = false;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    };
    const onTrackWheel = (e) => {
      // let a plain wheel scroll the strip when the pointer is over it
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && track.scrollWidth > track.clientWidth) {
        const atStart = track.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }
    };
    track.addEventListener('pointerdown', onTrackDown);
    track.addEventListener('pointermove', onTrackMove);
    track.addEventListener('pointerup', onTrackUp);
    track.addEventListener('pointercancel', onTrackUp);
    track.addEventListener('wheel', onTrackWheel, { passive: false });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (mmCtx) => {
          const { desktop, reduced } = mmCtx.conditions;

          if (reduced) {
            gsap.set('.word, .hero-meta, .hero-rule, [data-reveal], .case-card, .stat-value', {
              clearProps: 'all',
              opacity: 1,
              y: 0,
            });
            return;
          }

          // --- hero load choreography ---
          gsap
            .timeline({ defaults: { ease: 'power4.out' } })
            .from('.hero-title .word', { yPercent: 120, duration: 1.2, stagger: 0.06 }, 0.15)
            .from('.l-hero-alias', { opacity: 0, y: 24, duration: 0.9 }, 0.7)
            .from('.hero-meta', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.85)
            .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.1 }, 0.6)
            .from('.scroll-cue', { opacity: 0, duration: 0.8 }, 1.4);

          // hero parallax out
          gsap.to('.hero-inner', {
            yPercent: -18,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: { trigger: '.l-hero', start: 'top top', end: 'bottom top', scrub: true },
          });

          // --- generic reveals ---
          gsap.utils.toArray('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              y: 56,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            });
          });

          // --- section heading word reveals ---
          gsap.utils.toArray('.sec-title').forEach((el) => {
            gsap.from(el.querySelectorAll('.word'), {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.05,
              ease: 'power4.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            });
          });

          // --- security: free-scrolling case strip with staggered entrance ---
          gsap.from('.case-card', {
            y: 48,
            opacity: 0,
            duration: 0.8,
            stagger: desktop ? 0.08 : 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.case-track', start: 'top 88%' },
          });

          // --- project image mask reveals ---
          gsap.utils.toArray('.work-visual').forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: 'inset(0 0 100% 0)' },
              {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: { trigger: el, start: 'top 80%' },
              }
            );
            const img = el.querySelector('img');
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.25 },
                {
                  scale: 1,
                  duration: 1.4,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 80%' },
                }
              );
            }
          });

          // --- stat counters ---
          gsap.utils.toArray('.stat-value').forEach((el) => {
            const target = Number(el.dataset.value);
            const obj = { n: 0 };
            gsap.to(obj, {
              n: target,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
              onUpdate: () => {
                el.firstChild.textContent = Math.round(obj.n);
              },
            });
          });

          // --- footer wordmark slide ---
          gsap.from('.footer-wordmark', {
            yPercent: 35,
            ease: 'none',
            scrollTrigger: {
              trigger: '.landing-footer',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          });
        }
      );
    }, rootRef);

    return () => {
      track.removeEventListener('pointerdown', onTrackDown);
      track.removeEventListener('pointermove', onTrackMove);
      track.removeEventListener('pointerup', onTrackUp);
      track.removeEventListener('pointercancel', onTrackUp);
      track.removeEventListener('wheel', onTrackWheel);
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(lenis._gsapUpdate);
        lenis.destroy();
      }
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      scene.dispose();
    };
  }, []);

  const featured = projects
    .map((p) => ({ ...p, cover: Array.isArray(p.media) ? p.media.find((m) => m?.src) : p.media }))
    .filter((p) => p.featured && p.cover?.src);

  return (
    <div className="landing" ref={rootRef}>
      <div className="grain" aria-hidden="true" />

      <header className="landing-nav">
        <a className="nav-brand" href="#top">
          ~/chrono
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#security">security</a>
          <a href="#projects">projects</a>
          <a href="#community">community</a>
          <a href="#resume">resume</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <section className="l-hero" id="top">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-inner">
          <p className="hero-meta hero-kicker">
            <span className="prompt">$</span> whoami — Jon Marien
          </p>
          <h1 className="hero-title" aria-label="Security researcher building in the open">
            {splitWords('SECURITY')}
            <br />
            {splitWords('RESEARCHER')}
          </h1>
          <div className="hero-row">
            <p className="hero-title hero-serif-line">
              <em className="hero-serif">{splitWords('building in the open.')}</em>
            </p>
            <div className={`hero-ascii${asciiReady ? ' hero-ascii--ready' : ''}`} data-reveal>
              <span className="hero-ascii-fallback">{profile.hero.alias}</span>
              <ASCIIText
                text={profile.hero.alias}
                enableWaves={false}
                asciiFontSize={7}
                textFontSize={560}
                planeBaseHeight={18}
                onReady={() => setAsciiReady(true)}
                onError={() => setAsciiReady(false)}
              />
            </div>
          </div>
          <div className="hero-rule" aria-hidden="true" />
          <p className="l-hero-alias">
            <span className="alias-tag">// chrono</span> — {ROLES.join(' · ')}
          </p>
          <p className="hero-meta hero-blurb">
            Offensive security, full-stack TypeScript, and security engineering. CTO at D-Sports.
            22-challenge self-hosted CTF. CVE deep-dives. Breaking things on TryHackMe &amp; HackTheBox.
          </p>
        </div>
        <p className="scroll-cue" aria-hidden="true">
          scroll <span className="cue-line" />
        </p>
      </section>

      <section className="security-pin" id="security" aria-label="Security research">
        <div className="security-head">
          <p className="section-index">01</p>
          <h2 className="sec-title">{splitWords('case files')}</h2>
          <p className="section-sub" data-reveal>
            CVE analysis, CTF writeups, and lab work — the research trail.
          </p>
        </div>
        <div className="case-track">
          {securityResearch.map((entry, i) => (
            <a className="case-card" href={entry.href} key={entry.id} target="_blank" rel="noreferrer">
              <p className="case-no">{String(i + 1).padStart(2, '0')}</p>
              <p className={`case-type case-type--${entry.typeClass}`}>{entry.type}</p>
              <h3 className="case-title">{entry.title}</h3>
              <p className="case-desc">{entry.description}</p>
              <p className="case-impact">{entry.impact}</p>
              <p className="case-open">open file ↗</p>
            </a>
          ))}
        </div>
      </section>

      <section className="stats-band" aria-label="Proof points">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <p className="stat-value" data-value={s.value}>
              <span>0</span>
              {s.suffix}
            </p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="projects" id="projects" aria-label="Selected projects">
        <div className="projects-head">
          <p className="section-index">02</p>
          <h2 className="sec-title">{splitWords('selected work')}</h2>
        </div>
        {featured.map((p, i) => {
          const media = p.cover;
          return (
            <article className={`work-row ${i % 2 ? 'work-row--flip' : ''}`} key={p.id}>
              <div className="work-info" data-reveal>
                <p className="work-no">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="work-name">{p.name}</h3>
                <p className="work-desc">{p.description}</p>
                <p className="work-tags">
                  {p.tags?.map((t) => (
                    <span className="work-tag" key={t.label}>
                      {t.label}
                    </span>
                  ))}
                </p>
                <p className="work-links">
                  {(p.links ?? [{ href: p.href, label: p.linkLabel ?? 'view ↗' }]).map((l) => (
                    <a className="work-link" href={l.href} key={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ))}
                </p>
                {p.moreInfo ? (
                  <details className="work-intel">
                    <summary>extra intel</summary>
                    <div className="work-intel-body">
                      {p.moreInfo.role ? (
                        <p className="intel-line">
                          <span className="intel-label">role</span> {p.moreInfo.role}
                        </p>
                      ) : null}
                      {p.moreInfo.status ? (
                        <p className="intel-line">
                          <span className="intel-label">status</span> {p.moreInfo.status}
                        </p>
                      ) : null}
                      {p.moreInfo.details ? (
                        <p className="intel-details">{renderRich(p.moreInfo.details, `${p.id}-details`)}</p>
                      ) : null}
                      {p.moreInfo.stats?.length ? (
                        <dl className="intel-stats">
                          {p.moreInfo.stats.map((s) => (
                            <div className="intel-stat" key={s.label}>
                              <dt>{s.label}</dt>
                              <dd>{s.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  </details>
                ) : null}
              </div>
              <div className="work-visual">
                <img src={media.src} alt={media.alt ?? `${p.name} screenshot`} loading="lazy" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="index" id="archive" aria-label="All projects">
        <div className="index-head">
          <p className="section-index">03</p>
          <h2 className="sec-title">{splitWords('full index')}</h2>
          <p className="section-sub" data-reveal>
            Everything shipped — featured or not.
          </p>
        </div>
        <ul className="index-list">
          {projects.map((p, i) => (
            <li className="index-row" data-reveal key={p.id}>
              <a href={p.href} target="_blank" rel="noreferrer">
                <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="index-name">{p.name}</span>
                <span className="index-desc">{p.description}</span>
                <span className="index-year">{(p.updatedDate ?? p.startDate ?? '').slice(0, 4)}</span>
                <span className="index-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="crew" id="community" aria-label="Community">
        <div className="crew-head">
          <p className="section-index">04</p>
          <h2 className="sec-title">{splitWords('community')}</h2>
          <p className="section-sub" data-reveal>
            Hackathons, clubs, and the people side of security.
          </p>
        </div>
        <div className="crew-grid">
          {community.map((entry) => {
            const media = Array.isArray(entry.media) ? entry.media[0] : entry.media;
            return (
              <article className="crew-card" data-reveal key={entry.id}>
                {media?.src ? (
                  <div className="crew-media">
                    <img src={media.src} alt={media.alt ?? entry.name} loading="lazy" />
                  </div>
                ) : null}
                <div className="crew-body">
                  <h3 className="crew-name">{entry.name}</h3>
                  <p className="crew-role">{entry.role}</p>
                  <p className="crew-desc">{renderRich(entry.description, entry.id)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dossier" id="resume" aria-label="Resume">
        <div className="dossier-head">
          <p className="section-index">05</p>
          <h2 className="sec-title">{splitWords('resume')}</h2>
          <p className="section-sub" data-reveal>
            {resume.tagline}{' '}
            <a className="rich-link" href={resume.download?.href ?? '/resume/Jon_Marien_Resume.pdf'} target="_blank" rel="noreferrer">
              {resume.download?.label ?? 'download pdf'} ↗
            </a>
          </p>
        </div>

        <div className="dossier-columns">
          <div className="dossier-timeline" data-reveal>
            <h3 className="dossier-subhead">experience</h3>
            {resume.experience.map((org) => (
              <details className="xp" key={org.id}>
                <summary>
                  <span className="xp-org">{org.organization}</span>
                  <span className="xp-dates">
                    {org.dateRange.start} — {org.dateRange.end}
                  </span>
                </summary>
                <div className="xp-body">
                  {(org.roles ?? [{ id: org.id, title: org.role, bullets: org.bullets }]).map((role) => (
                    <div className="xp-role" key={role.id}>
                      <p className="xp-title">
                        {role.title}
                        {role.dateRange ? (
                          <span className="xp-dates">
                            {' '}
                            · {role.dateRange.start} — {role.dateRange.end}
                          </span>
                        ) : null}
                      </p>
                      {role.location ? <p className="xp-loc">{role.location}</p> : null}
                      <ul className="xp-bullets">
                        {(role.bullets ?? []).map((b, i) => (
                          <li key={i}>{renderRich(b, `${role.id}-${i}`)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}

            <h3 className="dossier-subhead">community leadership</h3>
            {(resume.communitySummary ?? []).map((org) => (
              <details className="xp" key={org.id}>
                <summary>
                  <span className="xp-org">{org.organization}</span>
                  <span className="xp-dates">
                    {org.dateRange.start} — {org.dateRange.end}
                  </span>
                </summary>
                <div className="xp-body">
                  <div className="xp-role">
                    {org.role ? <p className="xp-title">{org.role}</p> : null}
                    <ul className="xp-bullets">
                      {(org.bullets ?? []).map((b, i) => (
                        <li key={i}>{renderRich(b, `${org.id}-${i}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}

            <h3 className="dossier-subhead">key projects</h3>
            {(resume.projectSummary ?? []).map((proj) => (
              <details className="xp" key={proj.id}>
                <summary>
                  <span className="xp-org">{proj.organization}</span>
                  <span className="xp-dates">
                    {proj.dateRange.start} — {proj.dateRange.end}
                  </span>
                </summary>
                <div className="xp-body">
                  <div className="xp-role">
                    {proj.stack ? <p className="xp-loc">{proj.stack}</p> : null}
                    <ul className="xp-bullets">
                      {(proj.bullets ?? []).map((b, i) => (
                        <li key={i}>{renderRich(b, `${proj.id}-${i}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}

            <h3 className="dossier-subhead">education</h3>
            {resume.education.map((ed) => (
              <div className="edu" key={ed.id} data-reveal>
                <p className="xp-org">{ed.school}</p>
                <p className="xp-dates">
                  {ed.dateRange.start} — {ed.dateRange.end}
                </p>
                <p className="edu-degree">{ed.degree}</p>
                {ed.certificate ? <p className="edu-cert">{ed.certificate}</p> : null}
              </div>
            ))}
          </div>

          <aside className="dossier-skills" data-reveal>
            <h3 className="dossier-subhead">competencies</h3>
            {resume.competencies.map((group) => (
              <div className="skill-group" key={group.id}>
                <p className="skill-label">{group.label}</p>
                <p className="skill-chips">
                  {group.items.map((item) => (
                    <span className="work-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              offensive security — TypeScript — CTF design — red team tooling — incident analysis —
              full-stack engineering —&nbsp;
            </span>
          ))}
        </div>
      </section>

      <footer className="landing-footer" id="contact">
        <div className="footer-top" data-reveal>
          <h2 className="footer-cta">
            Got a target in scope?
            <br />
            <em>Let&rsquo;s talk.</em>
          </h2>
          <div className="footer-links">
            {profile.contact.map((c) => (
              <a key={c.id} href={c.href} target="_blank" rel="noreferrer">
                {c.label} <span className="footer-link-text">{c.text}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">
          CHRONO
        </p>
        <p className="footer-fine">© 2026 Jon Marien — chron0.tech</p>
      </footer>
    </div>
  );
}
