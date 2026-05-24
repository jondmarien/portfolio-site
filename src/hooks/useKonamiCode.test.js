import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useKonamiCode, KONAMI_SEQUENCE } from './useKonamiCode.js';

describe('useKonamiCode', () => {
  it('activates after the full sequence is entered', () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useKonamiCode({ onSuccess, storageKey: 'test:snake' }));

    expect(result.current).toBe(false);

    KONAMI_SEQUENCE.forEach((code) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
      });
    });

    expect(result.current).toBe(true);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.getItem('test:snake')).toBe('1');
  });

  it('does not persist activation without a storage key', () => {
    const { result, unmount } = renderHook(() => useKonamiCode());

    KONAMI_SEQUENCE.forEach((code) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
      });
    });

    expect(result.current).toBe(true);

    unmount();

    const { result: freshResult } = renderHook(() => useKonamiCode());
    expect(freshResult.current).toBe(false);
  });

  it('resets progress after a wrong key', () => {
    const { result } = renderHook(() => useKonamiCode({ storageKey: 'test:reset' }));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    });

    expect(result.current).toBe(false);
  });
});
