export function resolveMonthLabels(monthLabels, weekCount, minGapWeeks = 3) {
  if (!weekCount) {
    return [];
  }

  const sorted = [...monthLabels]
    .filter((entry) => entry.label)
    .sort((left, right) => left.weekIndex - right.weekIndex);

  const resolved = [];
  let lastWeekIndex = Number.NEGATIVE_INFINITY;

  sorted.forEach((entry) => {
    if (entry.weekIndex - lastWeekIndex < minGapWeeks) {
      return;
    }

    resolved.push(entry);
    lastWeekIndex = entry.weekIndex;
  });

  return resolved;
}
