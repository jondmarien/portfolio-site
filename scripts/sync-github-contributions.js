import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, '..');
const defaultOutputPath = join(repoRoot, 'public/github/contributions.json');

const { values } = parseArgs({
  options: {
    username: { type: 'string', default: 'jondmarien' },
    output: { type: 'string', default: defaultOutputPath },
  },
});

const username = values.username;
const outputPath = values.output;

async function fetchContributionDays(targetUsername) {
  const response = await fetch(`https://github.com/users/${targetUsername}/contributions`, {
    headers: {
      'User-Agent': 'chronus-portfolio-sync/1.0',
      Accept: 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contributions for ${targetUsername}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const totalContributions = totalMatch
    ? Number.parseInt(totalMatch[1].replace(/,/g, ''), 10)
    : 0;

  const days = [];
  const tooltips = new Map();
  let pendingTooltipFor = null;
  let pendingTooltipText = '';

  const rewriter = new HTMLRewriter()
    .on('[data-date]', {
      element(element) {
        const date = element.getAttribute('data-date');
        const level = Number.parseInt(element.getAttribute('data-level') ?? '0', 10);

        if (!date) {
          return;
        }

        days.push({
          id: element.getAttribute('id'),
          date,
          level: Number.isNaN(level) ? 0 : level,
          count: 0,
        });
      },
    })
    .on('tool-tip[for]', {
      element(element) {
        pendingTooltipFor = element.getAttribute('for');
        pendingTooltipText = '';
      },
      text(textChunk) {
        if (!pendingTooltipFor) {
          return;
        }

        pendingTooltipText += textChunk.text;

        if (textChunk.lastInTextNode) {
          tooltips.set(pendingTooltipFor, pendingTooltipText.trim());
          pendingTooltipFor = null;
          pendingTooltipText = '';
        }
      },
    });

  await rewriter.transform(new Response(html)).text();

  if (days.length === 0) {
    throw new Error(`No contribution cells found for ${targetUsername}. GitHub markup may have changed.`);
  }

  days.forEach((day) => {
    if (!day.id) {
      return;
    }

    const tooltip = tooltips.get(day.id);
    day.count = parseCountFromTooltip(tooltip);
    delete day.id;
  });

  return { days, totalContributions };
}

function parseCountFromTooltip(tooltip) {
  if (!tooltip) {
    return 0;
  }

  if (/no contributions/i.test(tooltip)) {
    return 0;
  }

  const match = tooltip.match(/([\d,]+)\s+contributions?/i);
  if (!match) {
    return 0;
  }

  return Number.parseInt(match[1].replace(/,/g, ''), 10);
}

function buildWeekColumns(days) {
  const sortedDays = [...days].sort((left, right) => left.date.localeCompare(right.date));
  const weeks = [];

  for (let index = 0; index < sortedDays.length; index += 7) {
    weeks.push(sortedDays.slice(index, index + 7));
  }

  return weeks;
}

function buildMonthLabels(weeks) {
  const labels = new Map();

  weeks.forEach((week, weekIndex) => {
    week.forEach((day) => {
      const date = new Date(`${day.date}T00:00:00Z`);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

      if (date.getUTCDate() !== 1 || labels.has(monthKey)) {
        return;
      }

      labels.set(monthKey, {
        weekIndex,
        label: date.toLocaleString('en-US', {
          month: 'short',
          timeZone: 'UTC',
        }),
      });
    });
  });

  return Array.from(labels.values()).sort((left, right) => left.weekIndex - right.weekIndex);
}

async function syncSnakeAssets(targetUsername) {
  const outputDir = join(repoRoot, 'public/github');
  const remoteBase = `https://raw.githubusercontent.com/${targetUsername}/${targetUsername}/output`;
  const assets = [
    { filename: 'snake-dark.svg', url: `${remoteBase}/github-snake-dark.svg` },
    { filename: 'snake.svg', url: `${remoteBase}/github-snake.svg` },
  ];

  await mkdir(outputDir, { recursive: true });

  for (const asset of assets) {
    const response = await fetch(asset.url, {
      headers: {
        'User-Agent': 'chronus-portfolio-sync/1.0',
        Accept: 'image/svg+xml,text/plain,*/*',
      },
    });

    if (!response.ok) {
      console.warn(`Skipped ${asset.filename}: ${response.status} ${response.statusText}`);
      continue;
    }

    const svg = await response.text();
    if (!svg.includes('<svg')) {
      console.warn(`Skipped ${asset.filename}: response was not SVG markup`);
      continue;
    }

    await Bun.write(join(outputDir, asset.filename), svg);
    console.log(`Wrote ${asset.filename}`);
  }
}

async function syncContributions() {
  const { days, totalContributions } = await fetchContributionDays(username);
  const weeks = buildWeekColumns(days);
  const monthLabels = buildMonthLabels(weeks);

  const payload = {
    username,
    totalContributions,
    generatedAt: new Date().toISOString(),
    monthLabels,
    weeks,
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await Bun.write(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Wrote ${days.length} days (${weeks.length} weeks) to ${outputPath}`);
  console.log(`Total contributions: ${totalContributions}`);

  await syncSnakeAssets(username);
}

await syncContributions();
