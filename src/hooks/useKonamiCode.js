import { useEffect, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || target.isContentEditable;
}

export function useKonamiCode({ onSuccess, storageKey } = {}) {
  const [activated, setActivated] = useState(() => {
    if (typeof window === 'undefined' || !storageKey) {
      return false;
    }

    return window.sessionStorage.getItem(storageKey) === '1';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let progress = 0;

    const handleKeyDown = (event) => {
      if (isEditableTarget(event.target)) {
        progress = 0;
        return;
      }

      if (event.code === KONAMI_SEQUENCE[progress]) {
        progress += 1;

        if (progress === KONAMI_SEQUENCE.length) {
          progress = 0;
          setActivated(true);

          if (storageKey) {
            window.sessionStorage.setItem(storageKey, '1');
          }

          onSuccess?.();
        }

        return;
      }

      progress = event.code === KONAMI_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess, storageKey]);

  return activated;
}

export { KONAMI_SEQUENCE };
