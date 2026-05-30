import * as THREE from "three";
import { bodyContour } from "./dig-logo-contours.js";
import { digMarkDataUrl } from "./dig-mark-data.js";

const canvas = document.querySelector("#dig-3d-loader");
const status = document.querySelector("[data-loader-status]");

function setStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

if (!canvas) {
  throw new Error("Missing #dig-3d-loader canvas");
}

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(240, 220, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 240 / 220, 0.1, 100);
camera.position.set(0, 0.08, 7.6);

const group = new THREE.Group();
group.rotation.x = -0.04;
scene.add(group);

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x111820,
  emissive: 0x12091f,
  emissiveIntensity: 0.18,
  metalness: 0.18,
  roughness: 0.54,
});

const sideMaterial = new THREE.MeshStandardMaterial({
  color: 0x05080b,
  emissive: 0x09152a,
  emissiveIntensity: 0.22,
  metalness: 0.12,
  roughness: 0.88,
});

function smoothContour(points, windowSize = 7) {
  const half = Math.floor(windowSize / 2);
  return points.map((_, index) => {
    let x = 0;
    let y = 0;
    for (let offset = -half; offset <= half; offset += 1) {
      const point = points[(index + offset + points.length) % points.length];
      x += point[0];
      y += point[1];
    }
    return [x / windowSize, y / windowSize];
  });
}

function makeSpeechBubbleShape() {
  const shape = new THREE.Shape();
  smoothContour(bodyContour, 9).forEach(([x, y], index) => {
    if (index === 0) {
      shape.moveTo(x, y);
      return;
    }
    shape.lineTo(x, y);
  });
  shape.closePath();
  return shape;
}

const geometry = new THREE.ExtrudeGeometry(makeSpeechBubbleShape(), {
  depth: 0.62,
  bevelEnabled: true,
  bevelThickness: 0.075,
  bevelSize: 0.055,
  bevelSegments: 8,
  curveSegments: 12,
});
geometry.center();
geometry.computeVertexNormals();

const body = new THREE.Mesh(geometry, [bodyMaterial, sideMaterial]);
group.add(body);

const texture = new THREE.TextureLoader().load(digMarkDataUrl);
texture.colorSpace = THREE.SRGBColorSpace;

const markMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: -4,
  polygonOffsetUnits: -4,
});

const markGeometry = new THREE.PlaneGeometry(1.99, 1.99);
const frontMark = new THREE.Mesh(markGeometry, markMaterial);
frontMark.position.set(0.02, 0.21, 0.395);
group.add(frontMark);

const backMark = new THREE.Mesh(markGeometry, markMaterial);
backMark.position.set(0.02, 0.21, -0.395);
backMark.rotation.y = Math.PI;
group.add(backMark);

const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0xff4fd8,
  transparent: true,
  opacity: 0.18,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const glowGeometry = geometry.clone();
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.scale.set(1.045, 1.045, 1.06);
group.add(glow);

scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2024, 1.8));

const key = new THREE.DirectionalLight(0xffffff, 3.6);
key.position.set(-2.7, 3.2, 4.5);
scene.add(key);

const rim = new THREE.DirectionalLight(0xff4fd8, 2.2);
rim.position.set(4.6, 1.2, -3.8);
scene.add(rim);

const rainbowLights = [
  new THREE.PointLight(0xff4fd8, 3.8, 6.5, 1.6),
  new THREE.PointLight(0x4fb3ff, 3.4, 6.5, 1.7),
  new THREE.PointLight(0x9fe870, 3.1, 6.5, 1.7),
  new THREE.PointLight(0xffd166, 2.8, 6, 1.8),
  new THREE.PointLight(0xff5f45, 2.6, 6, 1.8),
];

rainbowLights[0].position.set(2.8, 1.0, -1.8);
rainbowLights[1].position.set(-2.8, 0.8, 2.1);
rainbowLights[2].position.set(2.4, -1.1, 2.4);
rainbowLights[3].position.set(-1.6, -1.4, -2.1);
rainbowLights[4].position.set(0.4, 1.8, 2.8);
rainbowLights.forEach((light) => scene.add(light));

const fill = new THREE.DirectionalLight(0xffffff, 0.9);
fill.position.set(1.8, -1.4, 2.2);
scene.add(fill);

const clock = new THREE.Clock();
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render() {
  const t = clock.getElapsedTime();
  if (!reduced) {
    group.rotation.y = t * Math.PI * 0.945;
    group.position.y = 0;
    const edgePulse = Math.abs(Math.sin(group.rotation.y));
    glow.material.opacity = 0.12 + edgePulse * 0.22;
    glow.material.color.setHSL((t * 0.18) % 1, 1, 0.68);
    rim.color.setHSL((t * 0.18 + 0.15) % 1, 1, 0.64);
    rainbowLights.forEach((light, index) => {
      light.intensity = 2.2 + edgePulse * (2.4 + index * 0.25);
      light.color.setHSL((t * 0.12 + index / rainbowLights.length) % 1, 1, 0.62);
    });
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

setStatus("");
render();
