// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.16 * waveFactor;
    transformed.y += cos(time + position.z) * 0.05 * waveFactor;
    transformed.z += sin(time + position.x) * 0.22 * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;
    
    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time + pos.x * 4.) * .006).r;
    float g = texture2D(uTexture, pos + sin(time * 1.3 + pos.y * 3.) * .005).g;
    float b = texture2D(uTexture, pos - cos(time * 1.7 + pos.y * 4.) * .006).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

export function calculateFittedPlaneSize({
  cameraDistance,
  cameraFov,
  containerAspect,
  planeBaseHeight,
  textAspect,
  fitPadding = 0.78,
}) {
  const verticalFov = THREE.MathUtils.degToRad(cameraFov);
  const viewHeight = 2 * Math.tan(verticalFov / 2) * cameraDistance;
  const viewWidth = viewHeight * containerAspect;
  const maxHeightFromView = viewHeight * fitPadding;
  const maxHeightFromWidth = (viewWidth * fitPadding) / textAspect;
  const height = Math.min(planeBaseHeight, maxHeightFromView, maxHeightFromWidth);

  return {
    width: height * textAspect,
    height,
    viewWidth,
    viewHeight,
  };
}

export function calculateCanvasTextLayout({ metrics, padding = 12, fallbackFontSize = 200 }) {
  const actualLeft = Math.abs(metrics.actualBoundingBoxLeft ?? 0);
  const actualRight = Math.abs(metrics.actualBoundingBoxRight ?? 0);
  const actualAscent = metrics.actualBoundingBoxAscent ?? metrics.fontBoundingBoxAscent ?? fallbackFontSize * 0.8;
  const actualDescent = metrics.actualBoundingBoxDescent ?? metrics.fontBoundingBoxDescent ?? fallbackFontSize * 0.25;
  const fontAscent = metrics.fontBoundingBoxAscent ?? actualAscent;
  const fontDescent = metrics.fontBoundingBoxDescent ?? actualDescent;
  const measuredWidth = Math.max(metrics.width + actualLeft, actualLeft + actualRight);
  const measuredHeight = fontAscent + fontDescent;
  const actualHeight = actualAscent + actualDescent;
  const canvasWidth = Math.ceil(measuredWidth) + padding * 2;
  const canvasHeight = Math.ceil(measuredHeight) + padding * 2;
  const baselineY = (canvasHeight - actualHeight) / 2 + actualAscent;

  return {
    canvasWidth,
    canvasHeight,
    baselineX: padding + actualLeft,
    baselineY,
  };
}

export function calculateAsciiGridLayout({ width, height, fontSize, charWidth }) {
  const safeFontSize = Math.max(1, fontSize);
  const safeCharWidth = Math.max(1, charWidth);
  const cols = Math.max(1, Math.floor(width / safeCharWidth));
  const rows = Math.max(1, Math.floor(height / safeFontSize));

  return {
    cols,
    rows,
    layerWidth: `${width}px`,
    layerHeight: `${height}px`,
  };
}

class AsciiFilter {
  constructor(renderer, { fontSize, fontFamily, charset, invert } = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.className = 'ascii-filter';
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    this.basePre = document.createElement('pre');
    this.basePre.className = 'ascii-filter-pre ascii-filter-pre-base';
    this.domElement.appendChild(this.basePre);

    this.pre = document.createElement('pre');
    this.pre.className = 'ascii-filter-pre ascii-filter-pre-accent';
    this.domElement.appendChild(this.pre);

    this.sampleCanvas = document.createElement('canvas');
    this.context = this.sampleCanvas.getContext('2d');

    this.deg = 0;
    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset =
      charset ?? " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    this.context.webkitImageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();

    this.center = { x: width / 2, y: height / 2 };
    this.mouse = { x: this.center.x, y: this.center.y };
  }

  reset() {
    this.context.font = `600 ${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText('A').width;
    const layout = calculateAsciiGridLayout({
      width: this.width,
      height: this.height,
      fontSize: this.fontSize,
      charWidth,
    });

    this.cols = layout.cols;
    this.rows = layout.rows;

    this.sampleCanvas.width = this.cols;
    this.sampleCanvas.height = this.rows;
    this.applyLayerStyles(this.basePre, layout);
    this.applyLayerStyles(this.pre, layout);
  }

  applyLayerStyles(layer, layout) {
    layer.style.fontFamily = this.fontFamily;
    layer.style.fontSize = `${this.fontSize}px`;
    layer.style.fontKerning = 'none';
    layer.style.fontVariantLigatures = 'none';
    layer.style.fontWeight = '600';
    layer.style.height = layout.layerHeight;
    layer.style.left = '0';
    layer.style.lineHeight = '1em';
    layer.style.margin = '0';
    layer.style.overflow = 'hidden';
    layer.style.padding = '0';
    layer.style.position = 'absolute';
    layer.style.tabSize = '1';
    layer.style.textAlign = 'left';
    layer.style.top = '0';
    layer.style.whiteSpace = 'pre';
    layer.style.width = layout.layerWidth;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);

    const w = this.sampleCanvas.width;
    const h = this.sampleCanvas.height;
    this.context.clearRect(0, 0, w, h);
    if (this.context && w && h) {
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    }

    this.asciify(this.context, w, h);
  }

  asciify(ctx, w, h) {
    if (w && h) {
      const imgData = ctx.getImageData(0, 0, w, h).data;
      let str = '';
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const i = x * 4 + y * 4 * w;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          if (a === 0) {
            str += ' ';
            continue;
          }

          const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
          let idx = Math.floor((1 - gray) * (this.charset.length - 1));
          if (this.invert) idx = this.charset.length - idx - 1;
          str += this.charset[idx];
        }
        str += '\n';
      }
      this.basePre.textContent = str;
      this.pre.textContent = str;
    }
  }

  dispose() {
    this.basePre.textContent = '';
    this.pre.textContent = '';
  }
}

class CanvasTxt {
  constructor(txt, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' } = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;

    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);
    const layout = calculateCanvasTextLayout({ metrics, padding: 48, fallbackFontSize: this.fontSize });

    this.canvas.width = layout.canvasWidth;
    this.canvas.height = layout.canvasHeight;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;

    const metrics = this.context.measureText(this.txt);
    const layout = calculateCanvasTextLayout({ metrics, padding: 48, fallbackFontSize: this.fontSize });

    this.context.fillText(this.txt, layout.baselineX, layout.baselineY);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get texture() {
    return this.canvas;
  }
}

class CanvAscii {
  constructor(
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
    containerElem,
    width,
    height
  ) {
    this.textString = text;
    this.asciiFontSize = asciiFontSize;
    this.textFontSize = textFontSize;
    this.textColor = textColor;
    this.planeBaseHeight = planeBaseHeight;
    this.container = containerElem;
    this.width = width;
    this.height = height;
    this.enableWaves = enableWaves;

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
    this.mouse = { x: this.width / 2, y: this.height / 2 };

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  async init() {
    try {
      await document.fonts.load('600 200px "IBM Plex Mono"');
      await document.fonts.load('600 12px "IBM Plex Mono"');
    } catch (e) {
      // Font loading failed, continue with fallback
    }
    await document.fonts.ready;

    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: 'IBM Plex Mono',
      color: this.textColor,
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;

    const { width: planeW, height: planeH } = this.getFittedPlaneSize();

    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 24, 24);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        mouse: { value: 1.0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  getFittedPlaneSize() {
    return calculateFittedPlaneSize({
      cameraDistance: this.camera.position.z,
      cameraFov: this.camera.fov,
      containerAspect: this.width / this.height,
      planeBaseHeight: this.planeBaseHeight,
      textAspect: this.textCanvas.width / this.textCanvas.height,
    });
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: 'IBM Plex Mono',
      fontSize: this.asciiFontSize,
      invert: true,
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);

    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('touchmove', this.onMouseMove);
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    if (this.mesh) {
      const { width: planeW, height: planeH } = this.getFittedPlaneSize();
      const nextGeometry = new THREE.PlaneGeometry(planeW, planeH, 24, 24);
      this.mesh.geometry.dispose();
      this.mesh.geometry = nextGeometry;
    }

    this.filter.setSize(w, h);

    this.center = { x: w / 2, y: h / 2 };
  }

  load() {
    this.animate();
  }

  onMouseMove(evt) {
    const e = evt.touches ? evt.touches[0] : evt;
    const bounds = this.container.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    this.mouse = { x, y };
  }

  animate() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  render() {
    const time = new Date().getTime() * 0.001;

    this.textCanvas.render();
    this.texture.needsUpdate = true;

    this.mesh.material.uniforms.uTime.value = Math.sin(time);

    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    this.mesh.rotation.x = 0;
    this.mesh.rotation.y = 0;
  }

  clear() {
    this.scene.traverse((obj) => {
      if (obj.isMesh && typeof obj.material === 'object' && obj.material !== null) {
        Object.keys(obj.material).forEach((key) => {
          const matProp = obj.material[key];
          if (matProp !== null && typeof matProp === 'object' && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
        obj.material.dispose();
        obj.geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.filter) {
      this.filter.dispose();
      if (this.filter.domElement.parentNode) {
        this.container.removeChild(this.filter.domElement);
      }
    }
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);
    this.clear();
    if (this.texture) {
      this.texture.dispose();
      this.texture = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}

export default function ASCIIText({
  text = 'David!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true,
  onReady,
  onError,
}) {
  const containerRef = useRef(null);
  const asciiRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    let cancelled = false;
    let observer = null;
    let ro = null;

    const createAndInit = async (container, w, h) => {
      const instance = new CanvAscii(
        { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
        container,
        w,
        h
      );
      await instance.init();
      return instance;
    };

    const attachResizeObserver = () => {
      ro = new ResizeObserver((entries) => {
        if (!entries[0] || !asciiRef.current) return;
        const w = entries[0].contentRect.width;
        const h = entries[0].contentRect.height;
        if (w > 0 && h > 0) {
          asciiRef.current.setSize(w, h);
        }
      });
      ro.observe(containerRef.current);
    };

    const setup = async () => {
      const { width, height } = containerRef.current.getBoundingClientRect();

      if (width === 0 || height === 0) {
        observer = new IntersectionObserver(
          async ([entry]) => {
            if (cancelled) return;
            if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {
              const w = entry.boundingClientRect.width;
              const h = entry.boundingClientRect.height;
              observer.disconnect();
              observer = null;

              if (!cancelled) {
                try {
                  asciiRef.current = await createAndInit(containerRef.current, w, h);
                  if (!cancelled && asciiRef.current) {
                    asciiRef.current.load();
                    attachResizeObserver();
                    onReady?.();
                  }
                } catch (error) {
                  asciiRef.current = null;
                  onError?.(error);
                }
              }
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return;
      }

      try {
        asciiRef.current = await createAndInit(containerRef.current, width, height);
        if (!cancelled && asciiRef.current) {
          asciiRef.current.load();
          attachResizeObserver();
          onReady?.();
        }
      } catch (error) {
        asciiRef.current = null;
        onError?.(error);
      }
    };

    setup();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (ro) ro.disconnect();
      if (asciiRef.current) {
        asciiRef.current.dispose();
        asciiRef.current = null;
      }
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return (
    <div
      ref={containerRef}
      className="ascii-text-container"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap');

        .ascii-text-container {
          contain: paint;
          isolation: isolate;
          overflow: hidden;
          pointer-events: none;
        }

        .ascii-filter {
          contain: paint;
          isolation: isolate;
          pointer-events: none;
        }

        .ascii-filter-pre {
          color: oklch(74% 0.14 58);
          font-kerning: none;
          font-variant-ligatures: none;
          font-weight: 600;
          left: 0;
          line-height: 1em;
          margin: 0;
          overflow: hidden;
          padding: 0;
          position: absolute;
          tab-size: 1;
          text-align: left;
          top: 0;
          transform: translate3d(0, 0, 0);
          user-select: none;
          white-space: pre;
        }

        .ascii-filter-pre-base {
          color: oklch(97% 0.014 255 / 82%);
          text-shadow:
            0 0 7px oklch(98% 0.01 255 / 16%),
            0 0 18px oklch(76% 0.13 178 / 8%);
          z-index: 3;
        }

        .ascii-filter-pre-accent {
          animation: ascii-rainbow-shift 5.5s linear infinite;
          color: oklch(74% 0.18 335 / 74%);
          filter: hue-rotate(0deg) saturate(1.55);
          text-shadow:
            -1px 0 0 oklch(72% 0.2 335 / 66%),
            1px 0 0 oklch(82% 0.15 185 / 62%),
            0 1px 0 oklch(88% 0.16 105 / 54%),
            0 0 18px oklch(74% 0.18 335 / 30%),
            0 0 28px oklch(76% 0.13 178 / 16%);
          z-index: 2;
        }

        @keyframes ascii-rainbow-shift {
          from {
            filter: hue-rotate(0deg) saturate(1.55);
          }

          to {
            filter: hue-rotate(360deg) saturate(1.55);
          }
        }
      `}</style>
    </div>
  );
}
