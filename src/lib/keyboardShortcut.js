export function getPlatformModifier() {
  if (typeof navigator === 'undefined') {
    return 'Ctrl';
  }

  return /Mac|iPhone|iPad/i.test(navigator.platform) ? '⌘' : 'Ctrl';
}

export function formatShortcut(parts) {
  const modifier = getPlatformModifier();
  return parts.map((part) => (part === 'Mod' ? modifier : part)).join('');
}

export function formatShortcutLabel(parts) {
  const modifier = getPlatformModifier();
  return parts
    .map((part) => {
      if (part === 'Mod') {
        return modifier;
      }

      if (part === '←') {
        return '←';
      }

      if (part === '→') {
        return '→';
      }

      return part;
    })
    .join(' ');
}
