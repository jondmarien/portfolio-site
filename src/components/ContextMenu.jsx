import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { ContextMenuLeading } from './ContextMenuIcons.jsx';
import { useContextMenu } from '../hooks/useContextMenu.js';

const menuVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.12, ease: 'easeOut' },
  },
};

function ContextMenuItem({ active, item, motionEnabled, onActivate, onHighlight, itemIndex, staggerDelay }) {
  const ItemTag = motionEnabled ? motion.button : 'button';
  const motionProps = motionEnabled
    ? {
      animate: { opacity: 1, y: 0 },
      initial: { opacity: 0, y: 4 },
      transition: { duration: 0.1, ease: 'easeOut', delay: staggerDelay },
    }
    : {};

  return (
    <ItemTag
      aria-label={item.label}
      className={`context-menu-item${active ? ' is-active' : ''}`}
      onClick={() => onActivate(item)}
      onMouseEnter={() => onHighlight(itemIndex)}
      role="menuitem"
      tabIndex={active ? 0 : -1}
      type="button"
      {...motionProps}
    >
      <ContextMenuLeading item={item} />
      <span className="context-menu-item-label">{item.label}</span>
      {item.shortcut ? <span className="context-menu-item-shortcut">{item.shortcut}</span> : null}
    </ItemTag>
  );
}

export function ContextMenuProvider({ navigation }) {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;
  const { activeIndex, activateItem, closeMenu, groups, menuRef, open, position, setActiveIndex } =
    useContextMenu({ navigation });

  if (typeof document === 'undefined') {
    return null;
  }

  let runningIndex = 0;

  const menuMotionProps = motionEnabled
    ? {
      animate: 'visible',
      initial: 'hidden',
      variants: menuVariants,
    }
    : {
      animate: { opacity: 1, scale: 1 },
      initial: { opacity: 1, scale: 1 },
    };

  return createPortal(
    open ? (
      <motion.div
        {...menuMotionProps}
        aria-label="Site context menu"
        className="context-menu"
        ref={menuRef}
        role="menu"
        style={{ top: position.y, left: position.x, transformOrigin: 'top left' }}
        transition={motionEnabled ? undefined : { duration: 0 }}
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
                  motionEnabled={motionEnabled}
                  onActivate={activateItem}
                  onHighlight={setActiveIndex}
                  staggerDelay={motionEnabled ? 0.03 + itemIndex * 0.02 : 0}
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
