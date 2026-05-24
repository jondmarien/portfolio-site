let cachedSupport = null;

export function supportsInterestInvokers() {
  if (cachedSupport !== null) {
    return cachedSupport;
  }

  if (typeof HTMLElement === 'undefined' || typeof HTMLButtonElement === 'undefined') {
    cachedSupport = false;
    return cachedSupport;
  }

  cachedSupport =
    'popover' in HTMLElement.prototype &&
    'showPopover' in HTMLElement.prototype &&
    'interestForElement' in HTMLButtonElement.prototype;

  return cachedSupport;
}

export function resetSupportsInterestInvokersCacheForTests() {
  cachedSupport = null;
}
