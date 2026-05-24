import { describe, expect, it, afterEach } from 'vitest';

import { resetSupportsInterestInvokersCacheForTests, supportsInterestInvokers } from './supportsInterestInvokers.js';

describe('supportsInterestInvokers', () => {
  afterEach(() => {
    resetSupportsInterestInvokersCacheForTests();
  });

  it('returns false when interest invoker APIs are missing', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLButtonElement.prototype, 'interestForElement');

    if (originalDescriptor) {
      Reflect.deleteProperty(HTMLButtonElement.prototype, 'interestForElement');
    }

    expect(supportsInterestInvokers()).toBe(false);

    if (originalDescriptor) {
      Object.defineProperty(HTMLButtonElement.prototype, 'interestForElement', originalDescriptor);
    }
  });
});
