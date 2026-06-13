import * as THREE from 'three';

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uMotion;
  attribute float aSeed;
  varying float vGlow;

  void main() {
    vec3 pos = position;

    float wave =
      sin(pos.x * 0.35 + uTime * 0.6 + aSeed) * 0.55 +
      cos(pos.y * 0.28 - uTime * 0.45) * 0.45;
    pos.z += wave * uMotion;

    // pointer repulsion in grid space
    vec2 toPointer = pos.xy - uPointer;
    float dist = length(toPointer);
    float push = smoothstep(6.0, 0.0, dist);
    pos.z += push * 2.4 * uMotion;

    vGlow = push + smoothstep(0.9, 1.0, sin(uTime * 0.8 + aSeed * 7.0)) * 0.35;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.6 + vGlow * 3.2) * (140.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform vec3 uAccentAlt;
  varying float vGlow;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d);

    vec3 color = mix(uBase, uAccent, clamp(vGlow, 0.0, 1.0));
    color = mix(color, uAccentAlt, clamp(vGlow - 0.7, 0.0, 1.0));

    gl_FragColor = vec4(color, alpha * (0.35 + vGlow * 0.65));
  }
`;

export function createHeroScene(canvas, { reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, -4, 16);
  camera.lookAt(0, 0, 0);

  const COLS = 120;
  const ROWS = 70;
  const SPACING = 0.42;
  const count = COLS * ROWS;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  let i = 0;
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      positions[i * 3] = (x - COLS / 2) * SPACING;
      positions[i * 3 + 1] = (y - ROWS / 2) * SPACING;
      positions[i * 3 + 2] = 0;
      seeds[i] = Math.random() * Math.PI * 2;
      i += 1;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(999, 999) },
    uMotion: { value: reducedMotion ? 0 : 1 },
    uBase: { value: new THREE.Color('#3d3a4f') },
    uAccent: { value: new THREE.Color('#b18cf2') },
    uAccentAlt: { value: new THREE.Color('#5fe3c8') },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = -0.55;
  scene.add(points);

  const pointerTarget = new THREE.Vector2(999, 999);
  const raycastPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hit = new THREE.Vector3();

  function setPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    // transform plane into points' local space by inverse-rotating the ray is
    // overkill here; approximate with the tilted plane's world intersection.
    if (raycaster.ray.intersectPlane(raycastPlane, hit)) {
      const local = hit.clone();
      points.worldToLocal(local);
      pointerTarget.set(local.x, local.y);
    }
  }

  function clearPointer() {
    pointerTarget.set(999, 999);
  }

  function resize(width, height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  let raf = 0;
  const startTime = performance.now();

  function frame() {
    uniforms.uTime.value = (performance.now() - startTime) / 1000;
    uniforms.uPointer.value.lerp(pointerTarget, 0.08);
    renderer.render(scene, camera);
    if (!reducedMotion) {
      raf = requestAnimationFrame(frame);
    }
  }

  function start() {
    if (reducedMotion) {
      // single static render
      renderer.render(scene, camera);
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function dispose() {
    cancelAnimationFrame(raf);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  }

  return { start, resize, setPointer, clearPointer, dispose };
}
