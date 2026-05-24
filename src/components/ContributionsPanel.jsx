import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { githubConfig } from '../data/github.js';
import { CONTRIBUTIONS_DAY_POPOVER_ID, useContributionDayPopover } from '../hooks/useContributionDayPopover.js';
import { useKonamiCode } from '../hooks/useKonamiCode.js';
import { usePrefetchSnake } from '../hooks/usePrefetchSnake.js';
import { formatContributionDayLabel } from '../lib/formatContributionDayLabel.js';
import { resolveMonthLabels } from '../lib/resolveMonthLabels.js';
import { ExternalLink } from './ExternalLink.jsx';

const LEVEL_CLASS_NAMES = [
  'contributions-cell--level-0',
  'contributions-cell--level-1',
  'contributions-cell--level-2',
  'contributions-cell--level-3',
  'contributions-cell--level-4',
];

function ContributionsHeatmap({ data }) {
  const weekCount = data.weeks.length;
  const monthLabels = useMemo(
    () => resolveMonthLabels(data.monthLabels ?? [], weekCount),
    [data.monthLabels, weekCount]
  );
  const {
    handleCellBlur,
    handleCellFocus,
    handleCellPointerEnter,
    handleCellPointerLeave,
    heatmapRef,
    popoverRef,
    useInterestInvokers,
  } = useContributionDayPopover();

  return (
    <div
      aria-label="GitHub contribution activity heatmap"
      className="contributions-heatmap"
      ref={heatmapRef}
      role="group"
    >
      <div
        aria-hidden="true"
        className="contributions-months"
        style={{ '--contributions-week-count': weekCount }}
      >
        {monthLabels.map(({ weekIndex, label }) => (
          <span className="contributions-month" key={`${weekIndex}-${label}`} style={{ '--week-index': weekIndex }}>
            {label}
          </span>
        ))}
      </div>
      <div className="contributions-grid">
        {data.weeks.map((week, weekIndex) => (
          <div className="contributions-week" key={`week-${weekIndex}`}>
            {week.map((day) => (
              <button
                aria-label={formatContributionDayLabel(day)}
                className={`contributions-cell contributions-cell-button ${LEVEL_CLASS_NAMES[day.level] ?? LEVEL_CLASS_NAMES[0]}`}
                data-count={day.count}
                data-date={day.date}
                interestfor={useInterestInvokers ? CONTRIBUTIONS_DAY_POPOVER_ID : undefined}
                key={day.date}
                onBlur={handleCellBlur}
                onFocus={(event) => handleCellFocus(event.currentTarget, day)}
                onMouseEnter={(event) => handleCellPointerEnter(event.currentTarget, day)}
                onMouseLeave={handleCellPointerLeave}
                type="button"
              />
            ))}
          </div>
        ))}
      </div>
      <div
        className="contributions-popover"
        id={CONTRIBUTIONS_DAY_POPOVER_ID}
        popover="hint"
        ref={popoverRef}
        role="tooltip"
      />
    </div>
  );
}

export function ContributionsPanel() {
  const prefersReducedMotion = useReducedMotion();
  const snakeMode = useKonamiCode();
  const snakeSrc = usePrefetchSnake();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      try {
        const response = await fetch(githubConfig.contributionsPath);

        if (!response.ok) {
          throw new Error(`Failed to load contributions (${response.status})`);
        }

        const payload = await response.json();

        if (!cancelled) {
          setData(payload);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load contributions');
        }
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalContributions = data?.totalContributions ?? 0;
  const username = data?.username ?? githubConfig.username;
  const showSnake = snakeMode && Boolean(snakeSrc);

  return (
    <section aria-label="GitHub contributions" className="contributions-panel">
      <div className="contributions-header">
        <h2 className="contributions-title">
          <span className="hash">#</span> contributions
        </h2>
        <ExternalLink className="contributions-profile-link" href={githubConfig.profileUrl}>
          @{username}
        </ExternalLink>
      </div>

      {error ? <p className="contributions-status">{error}</p> : null}

      {!error && !data ? <p className="contributions-status">Loading contribution graph…</p> : null}

      {data ? (
        <>
          <p className="contributions-summary">
            {totalContributions.toLocaleString()} GitHub contributions in the last year
          </p>

          <div className="contributions-stage">
            {snakeSrc ? (
              <motion.div
                animate={{
                  opacity: showSnake ? 1 : 0,
                  scale: showSnake ? 1 : prefersReducedMotion ? 1 : 0.98,
                }}
                aria-hidden={!showSnake}
                className={`contributions-snake${showSnake ? '' : ' contributions-snake--preloading'}`}
                initial={false}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
              >
                <object
                  aria-hidden={!showSnake}
                  aria-label={showSnake ? 'GitHub contribution snake animation' : undefined}
                  className="contributions-snake-image"
                  data={snakeSrc}
                  tabIndex={showSnake ? 0 : -1}
                  type="image/svg+xml"
                >
                  GitHub contribution snake animation
                </object>
              </motion.div>
            ) : null}

            <AnimatePresence mode="wait" initial={false}>
              {!showSnake ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="contributions-heatmap-wrap"
                  exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
                  key="heatmap"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                >
                  <ContributionsHeatmap data={data} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {!showSnake ? (
            <div className="contributions-legend" aria-hidden="true">
              <span className="contributions-legend-label">Less</span>
              {LEVEL_CLASS_NAMES.map((className) => (
                <span className={`contributions-cell ${className}`} key={className} />
              ))}
              <span className="contributions-legend-label">More</span>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
