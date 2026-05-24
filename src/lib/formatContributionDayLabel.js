function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatContributionDateLabel(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(`${dateString}T00:00:00Z`);
  const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

export function formatContributionDayLabel(day) {
  if (!day?.date) {
    return '';
  }

  const formattedDate = formatContributionDateLabel(day.date);

  if (!day.count) {
    return `No contributions on ${formattedDate}.`;
  }

  const label = day.count === 1 ? 'contribution' : 'contributions';
  return `${day.count} ${label} on ${formattedDate}.`;
}
