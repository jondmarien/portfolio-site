import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { useContextMenu } from '../hooks/useContextMenu.js';

function ContextMenuItem({ active, item, onActivate, onHighlight, itemIndex }) {
  return (
    <button
      aria-label={item.label}
      className={`context-menu-item${active ? ' is-active' : ''}`}
      onClick={() => onActivate(item)}
      onMouseEnter={() => onHighlight(itemIndex)}
      role="menuitem"
      tabIndex={active ? 0 : -1}
      type="button"
    >
      <span className="context-menu-item-label">{item.label}</span>
      {item.shortcut ? <span className="context-menu-item-shortcut">{item.shortcut}</span> : null}
    </button>
  );
}

export function ContextMenuProvider({ navigation }) {
  const prefersReducedMotion = useReducedMotion();
  const { activeIndex, activateItem, closeMenu, groups, menuRef, open, position, setActiveIndex } =
    useContextMenu({ navigation });

  if (typeof document === 'undefined') {
    return null;
  }

  let runningIndex = 0;

  return createPortal(
    open ? (
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        aria-label="Site context menu"
        className="context-menu"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
        ref={menuRef}
        role="menu"
        style={{ top: position.y, left: position.x, transformOrigin: 'top left' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: 'easeOut' }}
      >
        {groups.map((group, groupIndex) => (
          <div className="context-menu-group" key={group.id}>
            {groupIndex > 0 ? <div className="context-menu-separator" role="separator" /> : null}
            {group.items.map((item) => {
              const itemIndex = runningIndex;
              runningIndex += 1;

              return (
                <ContextMenuItem
                  active={itemIndex === activeIndex}
                  item={item}
                  itemIndex={itemIndex}
                  key={item.id}
                  onActivate={activateItem}
                  onHighlight={setActiveIndex}
                />
              );
            })}
          </div>
        ))}
        <button className="context-menu-dismiss" onClick={closeMenu} tabIndex={-1} type="button">
          close
        </button>
      </motion.div>
    ) : null,
    document.body
  );
}
