import { formatShortcutLabel } from '../lib/keyboardShortcut.js';

export function buildContextMenuGroups({ navigation }) {
  const navItems = navigation.map((item, index) => ({
    id: `nav-${item.id}`,
    label: item.label,
    glyph: item.icon,
    shortcut: String(index + 1),
    action: { type: 'navigate', targetId: item.id },
  }));

  return [
    {
      id: 'clipboard',
      items: [
        {
          id: 'copy',
          label: 'Copy',
          icon: 'copy',
          shortcut: formatShortcutLabel(['Mod', 'C']),
          action: { type: 'copy' },
        },
        {
          id: 'select-all',
          label: 'Select all',
          icon: 'select-all',
          shortcut: formatShortcutLabel(['Mod', 'A']),
          action: { type: 'select-all' },
        },
      ],
    },
    {
      id: 'navigation',
      items: navItems,
    },
    {
      id: 'history',
      items: [
        {
          id: 'back',
          label: 'Back',
          icon: 'back',
          shortcut: formatShortcutLabel(['Mod', '←']),
          action: { type: 'history', direction: 'back' },
        },
        {
          id: 'forward',
          label: 'Forward',
          icon: 'forward',
          shortcut: formatShortcutLabel(['Mod', '→']),
          action: { type: 'history', direction: 'forward' },
        },
        {
          id: 'reload',
          label: 'Reload',
          icon: 'reload',
          shortcut: formatShortcutLabel(['Mod', 'R']),
          action: { type: 'reload' },
        },
      ],
    },
  ];
}

export function flattenContextMenuItems(groups) {
  return groups.flatMap((group) => group.items);
}
