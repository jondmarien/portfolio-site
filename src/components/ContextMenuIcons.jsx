const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ContextMenuIcon({ name }) {
  switch (name) {
    case 'copy':
      return (
        <svg {...iconProps}>
          <rect height="10" rx="1.5" width="8" x="5" y="4" />
          <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5H10v7.5A1.5 1.5 0 0 1 8.5 14H5.5A1.5 1.5 0 0 1 4 12.5V6.5Z" />
        </svg>
      );
    case 'select-all':
      return (
        <svg {...iconProps}>
          <rect height="10" rx="1.5" strokeDasharray="2 2" width="10" x="3" y="3" />
        </svg>
      );
    case 'back':
      return (
        <svg {...iconProps}>
          <path d="M10 3 5 8l5 5" />
        </svg>
      );
    case 'forward':
      return (
        <svg {...iconProps}>
          <path d="M6 3l5 5-5 5" />
        </svg>
      );
    case 'reload':
      return (
        <svg {...iconProps}>
          <path d="M12.5 8A4.5 4.5 0 1 1 8 3.5" />
          <path d="M8 1.5V3.5H6" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContextMenuLeading({ item }) {
  if (item.glyph) {
    return <span className="context-menu-item-glyph">{item.glyph}</span>;
  }

  if (item.icon) {
    return (
      <span className="context-menu-item-icon">
        <ContextMenuIcon name={item.icon} />
      </span>
    );
  }

  return <span className="context-menu-item-leading-spacer" aria-hidden="true" />;
}
