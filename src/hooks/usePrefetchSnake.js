import { useEffect, useState } from 'react';

import { githubConfig } from '../data/github.js';

export function usePrefetchSnake() {
  const [snakeSrc, setSnakeSrc] = useState(null);

  useEffect(() => {
    let blobUrl = null;
    let cancelled = false;

    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = githubConfig.snakeDarkPath;
    prefetchLink.as = 'fetch';
    document.head.appendChild(prefetchLink);

    async function loadSnake() {
      try {
        const response = await fetch(githubConfig.snakeDarkPath);

        if (!response.ok) {
          throw new Error(`Failed to prefetch snake (${response.status})`);
        }

        const blob = await response.blob();

        if (cancelled) {
          return;
        }

        blobUrl = URL.createObjectURL(blob);
        setSnakeSrc(blobUrl);
      } catch {
        if (!cancelled) {
          setSnakeSrc(githubConfig.snakeDarkPath);
        }
      }
    }

    loadSnake();

    return () => {
      cancelled = true;
      prefetchLink.remove();

      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  return snakeSrc;
}
