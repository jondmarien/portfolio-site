import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ASCIIText.css';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
  vUv = uv;
  float time = uTime * 5.0;
  float waveFactor = uEnableWaves;
  vec3 transformed = position;

  transformed.x += sin(time + position.y) * 0.24 * waveFactor;
  transformed.y += cos(time + position.z) * 0.08 * waveFactor;
  transformed.z += sin(time + position.x) * 0.42 * waveFactor;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;
  vec2 pos = vUv;

  float r = texture2D(uTexture, pos + vec2(cos(time + pos.x) * 0.002, 0.0)).r;
  float g = texture2D(uTexture, pos + vec2(0.0, sin(time * 0.7 + pos.y) * 0.0015)).g;
  float b = texture2D(uTexture, pos - vec2(cos(time + pos.y) * 0.002, 0.0)).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}
`;

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

class AsciiFilter {
  constructor(renderer, { fontSize, fontFamily, charset, invert } = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.className = 'ascii-filter';

    this.pre = document.createElement('pre');
    this.pre.className = 'ascii-filter-pre';
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.domElement.appendChild(this.canvas);

    this.deg = 0;
    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset =
      charset ??
      " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    if (this.context) {
      this.context.webkitImageSmoothingEnabled = false;
      this.context.mozImageSmoothingEnabled = false;
      this.context.msImageSmoothingEnabled = false;
      this.context.imageSmoothingEnabled = false;
    }

    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', this.onMouseMove);
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
    if (!this.context) return;

    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText('A').width || this.fontSize;

    this.cols = Math.max(1, Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize))));
    this.rows = Math.max(1, Math.floor(this.height / this.fontSize));

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;

    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = `${this.fontSize}px`;
  }

  render(scene, camera) {
    if (!this.context) return;

    this.renderer.render(scene, camera);

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.context.clearRect(0, 0, w, h);
    this.context.drawImage(this.renderer.domElement, 0, 0, w, h);

    this.asciify(this.context, w, h);
    this.hue();
  }

  onMouseMove(e) {
    const ratio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    this.mouse = { x: e.clientX * ratio, y: e.clientY * ratio };
  }

  get dx() {
    return this.mouse.x - this.center.x;
  }

  get dy() {
    return this.mouse.y - this.center.y;
  }

  hue() {
    // Keep color stable for compact inline placements.
    this.domElement.style.filter = 'none';
  }

  asciify(ctx, w, h) {
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

    this.pre.textContent = str;
  }

  dispose() {
    document.removeEventListener('mousemove', this.onMouseMove);
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
    if (!this.context) return;

    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);

    const textWidth = Math.ceil(metrics.width) + 20;
    const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;

    this.canvas.width = textWidth;
    this.canvas.height = textHeight;
  }

  render() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;

    const metrics = this.context.measureText(this.txt);
    const yPos = 10 + metrics.actualBoundingBoxAscent;
    this.context.fillText(this.txt, 10, yPos);
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
    if (document.fonts?.load) {
      try {
        await document.fonts.load('600 200px "IBM Plex Mono"');
        await document.fonts.load('500 12px "IBM Plex Mono"');
      } catch {
        // Fall back to browser fonts if loading fails.
      }

      if (document.fonts.ready) {
        await document.fonts.ready;
      }
    }

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

    const textAspect = this.textCanvas.width / this.textCanvas.height;
    const planeHeight = this.planeBaseHeight;
    const planeWidth = planeHeight * textAspect;

    this.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1 : 0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: 'IBM Plex Mono',
      fontSize: this.asciiFontSize,
      invert: true,
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);

    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('touchmove', this.onMouseMove, { passive: true });
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.filter.setSize(w, h);
  }

  load() {
    this.animate();
  }

  onMouseMove(evt) {
    const point = evt.touches ? evt.touches[0] : evt;
    const bounds = this.container.getBoundingClientRect();
    this.mouse = {
      x: point.clientX - bounds.left,
      y: point.clientY - bounds.top,
    };
  }

  animate() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  render() {
    const time = Date.now() * 0.001;
    this.textCanvas.render();
    this.texture.needsUpdate = true;
    this.mesh.material.uniforms.uTime.value = time * 0.45;

    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    const x = mapRange(this.mouse.y, 0, this.height, 0.12, -0.12);
    const y = mapRange(this.mouse.x, 0, this.width, -0.14, 0.14);

    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  clear() {
    this.scene.traverse((obj) => {
      if (obj.isMesh && obj.material && obj.geometry) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => material?.dispose?.());
        } else {
          obj.material.dispose?.();
        }
        obj.geometry.dispose?.();
      }
    });

    this.scene.clear();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);

    if (this.filter) {
      this.filter.dispose();
      if (this.filter.domElement.parentNode === this.container) {
        this.container.removeChild(this.filter.domElement);
      }
    }

    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);

    this.clear();

    this.texture?.dispose?.();
    this.renderer?.dispose?.();
    this.renderer?.forceContextLoss?.();
  }
}

export default function ASCIIText({
  text = 'Hello World!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true,
}) {
  const containerRef = useRef(null);
  const asciiRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    let cancelled = false;
    let resizeObserver = null;

    const createAndInit = async (container, width, height) => {
      const instance = new CanvAscii(
        { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
        container,
        width,
        height
      );

      await instance.init();
      return instance;
    };

    const setup = async () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (!width || !height) return;

      try {
        asciiRef.current = await createAndInit(containerRef.current, width, height);
      } catch {
        asciiRef.current = null;
        return;
      }

      if (cancelled || !asciiRef.current) return;

      asciiRef.current.load();

      resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || !asciiRef.current) return;

        const { width: nextWidth, height: nextHeight } = entries[0].contentRect;
        if (nextWidth > 0 && nextHeight > 0) {
          asciiRef.current.setSize(nextWidth, nextHeight);
        }
      });

      resizeObserver.observe(containerRef.current);
    };

    setup();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();

      if (asciiRef.current) {
        asciiRef.current.dispose();
        asciiRef.current = null;
      }
    };
  }, [asciiFontSize, enableWaves, planeBaseHeight, text, textColor, textFontSize]);

  return <div ref={containerRef} className="ascii-text-container" />;
}
