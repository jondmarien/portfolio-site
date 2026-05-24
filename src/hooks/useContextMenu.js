import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { buildContextMenuGroups, flattenContextMenuItems } from '../data/contextMenu.js';
import { getPlatformModifier } from '../lib/keyboardShortcut.js';

const MENU_WIDTH = 272;
const MENU_HEIGHT_ESTIMATE = 340;
const MENU_MARGIN = 8;

function getViewportScale() {
  if (typeof document === 'undefined') {
    return 1;
  }

  const zoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom || '1');
  return Number.isFinite(zoom) && zoom > 0 ? zoom : 1;
}

function getPointerPosition(event) {
  const scale = getViewportScale();

  return {
    x: event.clientX / scale,
    y: event.clientY / scale,
  };
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || target.isContentEditable;
}

function shouldUseNativeMenu(event) {
  if (isEditableTarget(event.target)) {
    return true;
  }

  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    return true;
  }

  return false;
}

function shouldUseNativeMenuForElement(element) {
  if (!(element instanceof HTMLElement)) {
    return true;
  }

  if (isEditableTarget(element)) {
    return true;
  }

  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    return true;
  }

  return false;
}

function clampPosition(x, y) {
  const scale = getViewportScale();
  const viewportWidth = window.innerWidth / scale;
  const viewportHeight = window.innerHeight / scale;

  return {
    x: Math.min(Math.max(MENU_MARGIN, x), viewportWidth - MENU_WIDTH - MENU_MARGIN),
    y: Math.min(Math.max(MENU_MARGIN, y), viewportHeight - MENU_HEIGHT_ESTIMATE - MENU_MARGIN),
  };
}

function getLinkFromTarget(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest('a[href]');
  return anchor instanceof HTMLAnchorElement ? anchor.href : null;
}

async function copyText(value) {
  if (!value) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${sectionId}`);
}

function selectMainContent() {
  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(main);
  selection.removeAllRanges();
  selection.addRange(range);
}

function runMenuAction(action, context) {
  switch (action.type) {
    case 'copy': {
      const selection = window.getSelection()?.toString();
      if (selection) {
        return copyText(selection);
      }

      if (context.linkHref) {
        return copyText(context.linkHref);
      }

      return copyText(window.location.href);
    }
    case 'select-all':
      selectMainContent();
      return Promise.resolve(true);
    case 'navigate':
      navigateToSection(action.targetId);
      return Promise.resolve(true);
    case 'history':
      if (action.direction === 'back') {
        window.history.back();
      } else {
        window.history.forward();
      }
      return Promise.resolve(true);
    case 'reload':
      window.location.reload();
      return Promise.resolve(true);
    default:
      return Promise.resolve(false);
  }
}

export function useContextMenu({ navigation }) {
  const groups = useMemo(() => buildContextMenuGroups({ navigation }), [navigation]);
  const items = useMemo(() => flattenContextMenuItems(groups), [groups]);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [context, setContext] = useState({ linkHref: null });
  const menuRef = useRef(null);
  const invokerRef = useRef(null);
  const openModeRef = useRef('pointer');

  const closeMenu = useCallback(() => {
    const shouldRestoreFocus = openModeRef.current === 'keyboard';
    const invoker = invokerRef.current;

    setOpen(false);
    setActiveIndex(0);

    if (shouldRestoreFocus && invoker instanceof HTMLElement && invoker.isConnected) {
      invoker.focus({ preventScroll: true });
    }

    invokerRef.current = null;
    openModeRef.current = 'pointer';
  }, []);

  const openMenuAt = useCallback(({ context: nextContext, invoker, mode, x, y }) => {
    setPosition(clampPosition(x, y));
    setContext(nextContext);
    setActiveIndex(0);
    invokerRef.current = invoker ?? null;
    openModeRef.current = mode;
    setOpen(true);
  }, []);

  const openMenu = useCallback(
    (event) => {
      if (shouldUseNativeMenu(event)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const pointer = getPointerPosition(event);
      const invoker = event.target instanceof HTMLElement ? event.target : null;

      openMenuAt({
        context: { linkHref: getLinkFromTarget(event.target) },
        invoker,
        mode: 'pointer',
        x: pointer.x,
        y: pointer.y,
      });
    },
    [openMenuAt]
  );

  const activateItem = useCallback(
    async (item) => {
      if (!item) {
        return;
      }

      await runMenuAction(item.action, context);
      closeMenu();
    },
    [closeMenu, context]
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) {
        return;
      }

      closeMenu();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (!open) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % items.length);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(items.length - 1);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateItem(items[activeIndex]);
        return;
      }

      const shortcutIndex = items.findIndex((item) => item.shortcut === event.key);
      if (shortcutIndex >= 0) {
        event.preventDefault();
        activateItem(items[shortcutIndex]);
        return;
      }

      const modifier = getPlatformModifier();
      const usesMod = event.metaKey || event.ctrlKey;

      if (usesMod && event.key.toLowerCase() === 'c') {
        event.preventDefault();
        activateItem(items.find((item) => item.id === 'copy'));
        return;
      }

      if (usesMod && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        activateItem(items.find((item) => item.id === 'select-all'));
        return;
      }

      if (usesMod && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        activateItem(items.find((item) => item.id === 'reload'));
        return;
      }

      if (usesMod && event.key === 'ArrowLeft') {
        event.preventDefault();
        activateItem(items.find((item) => item.id === 'back'));
        return;
      }

      if (usesMod && event.key === 'ArrowRight') {
        event.preventDefault();
        activateItem(items.find((item) => item.id === 'forward'));
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activateItem, activeIndex, closeMenu, items, open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'F10' || !event.shiftKey || event.defaultPrevented) {
        return;
      }

      const layout = document.querySelector('.layout');
      const active = document.activeElement;

      if (!layout || !(active instanceof HTMLElement) || !layout.contains(active)) {
        return;
      }

      if (shouldUseNativeMenuForElement(active)) {
        return;
      }

      event.preventDefault();
      const scale = getViewportScale();
      const rect = active.getBoundingClientRect();

      openMenuAt({
        context: { linkHref: getLinkFromTarget(active) },
        invoker: active,
        mode: 'keyboard',
        x: rect.left / scale,
        y: rect.bottom / scale,
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMenuAt]);

  useEffect(() => {
    const handleContextMenu = (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      openMenu(event);
    };

    document.addEventListener('contextmenu', handleContextMenu, true);

    return () => document.removeEventListener('contextmenu', handleContextMenu, true);
  }, [openMenu]);

  return {
    activeIndex,
    closeMenu,
    groups,
    items,
    menuRef,
    open,
    position,
    setActiveIndex,
    activateItem,
  };
}

export {
  clampPosition,
  getLinkFromTarget,
  getPointerPosition,
  getViewportScale,
  isEditableTarget,
  runMenuAction,
  shouldUseNativeMenu,
  shouldUseNativeMenuForElement,
};
