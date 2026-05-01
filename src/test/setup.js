import { JSDOM } from 'jsdom';

if (typeof document === 'undefined') {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
  });

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.MutationObserver = dom.window.MutationObserver;
  globalThis.Node = dom.window.Node;
  globalThis.getComputedStyle = dom.window.getComputedStyle;
  globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  globalThis.window.matchMedia = globalThis.window.matchMedia ?? (() => ({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));

  class MockObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.IntersectionObserver = globalThis.IntersectionObserver ?? MockObserver;
  globalThis.ResizeObserver = globalThis.ResizeObserver ?? MockObserver;

  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    configurable: true,
  });
}

await import('@testing-library/jest-dom/vitest');

const { cleanup } = await import('@testing-library/react');
const { afterEach } = await import('vitest');

afterEach(() => {
  cleanup();
});
