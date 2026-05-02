import { describe, expect, it } from 'vitest';

import { calculateCanvasTextLayout, calculateFittedPlaneSize } from './ASCIIText.jsx';

describe('ASCIIText sizing', () => {
  it('fits wide text inside the perspective camera view on narrow containers', () => {
    const fitted = calculateFittedPlaneSize({
      cameraDistance: 30,
      cameraFov: 45,
      containerAspect: 300 / 136,
      planeBaseHeight: 18,
      textAspect: 4.7,
    });

    expect(fitted.width).toBeLessThanOrEqual(fitted.viewWidth * 0.92);
    expect(fitted.height).toBeLessThanOrEqual(fitted.viewHeight * 0.92);
    expect(fitted.width / fitted.height).toBeCloseTo(4.7, 5);
  });

  it('keeps normal-width text near its requested base height when it already fits', () => {
    const fitted = calculateFittedPlaneSize({
      cameraDistance: 30,
      cameraFov: 45,
      containerAspect: 4.2,
      planeBaseHeight: 18,
      textAspect: 2.2,
    });

    expect(fitted.height).toBeCloseTo(18, 5);
  });

  it('centers actual text ink inside a font-bounding canvas', () => {
    const layout = calculateCanvasTextLayout({
      metrics: {
        width: 300,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: 300,
        actualBoundingBoxAscent: 60,
        actualBoundingBoxDescent: 12,
        fontBoundingBoxAscent: 80,
        fontBoundingBoxDescent: 20,
      },
    });

    const topPadding = layout.baselineY - 60;
    const bottomPadding = layout.canvasHeight - (layout.baselineY + 12);

    expect(topPadding).toBeCloseTo(bottomPadding, 5);
  });
});
