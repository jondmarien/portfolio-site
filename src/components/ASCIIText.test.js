import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

import {
  calculateAsciiGridLayout,
  calculateCanvasTextLayout,
  calculateFittedPlaneSize,
  calculateWordmarkLeftOffset,
} from './ASCIIText.jsx';

const asciiTextSource = readFileSync('src/components/ASCIIText.jsx', 'utf8');
const heroSource = readFileSync('src/components/Hero.jsx', 'utf8');

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

  it('does not crop text when advance width is wider than actual ink bounds', () => {
    const layout = calculateCanvasTextLayout({
      metrics: {
        width: 420,
        actualBoundingBoxLeft: 8,
        actualBoundingBoxRight: 300,
        actualBoundingBoxAscent: 60,
        actualBoundingBoxDescent: 12,
        fontBoundingBoxAscent: 80,
        fontBoundingBoxDescent: 20,
      },
      padding: 12,
    });

    expect(layout.canvasWidth).toBeGreaterThanOrEqual(8 + 420 + 24);
  });

  it('calculates deterministic ASCII grid dimensions from font metrics', () => {
    const layout = calculateAsciiGridLayout({
      width: 420,
      height: 126,
      fontSize: 7,
      charWidth: 4.375,
    });

    expect(layout).toEqual({
      cols: 96,
      rows: 18,
      layerWidth: '420px',
      layerHeight: '126px',
    });
  });

  it('left-biases the wordmark inside the camera view instead of shrinking the ASCII grid', () => {
    expect(calculateWordmarkLeftOffset({ viewWidth: 100, planeWidth: 80 })).toBeCloseTo(-9.2, 5);
    expect(calculateWordmarkLeftOffset({ viewWidth: 80, planeWidth: 100 })).toBe(0);
  });

  it('keeps visible ASCII text layers local to the hero instead of scroll-fixed blended text', () => {
    expect(asciiTextSource).not.toContain("backgroundAttachment = 'fixed'");
    expect(asciiTextSource).not.toContain('background-attachment: fixed');
    expect(asciiTextSource).not.toContain("mixBlendMode = 'difference'");
    expect(asciiTextSource).not.toContain('mix-blend-mode: difference');
    expect(asciiTextSource).toContain('ascii-filter-pre-base');
    expect(asciiTextSource).toContain('ascii-filter-pre-accent');
    expect(asciiTextSource).toContain("layer.style.fontWeight = '500'");
    expect(asciiTextSource).toContain("layer.style.overflow = 'hidden'");
    expect(asciiTextSource).toContain('calculateWordmarkLeftOffset');
    expect(asciiTextSource).toContain('@keyframes ascii-rainbow-shift');
    expect(asciiTextSource).toMatch(/\.ascii-filter-pre-base\s*\{[^}]*z-index: 3;/s);
    expect(asciiTextSource).toMatch(/\.ascii-filter-pre-accent\s*\{[^}]*animation: ascii-rainbow-shift/s);
  });

  it('keeps the hero ASCII mark dense and static for cross-browser stability', () => {
    expect(heroSource).toContain('enableWaves={false}');
    expect(heroSource).toContain('asciiFontSize={7}');
  });
});
