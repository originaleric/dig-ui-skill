import { useEffect, useRef } from "react";
import * as THREE from "three";
import { bodyContour } from "../assets/dig-logo-contours.js";
import { digMarkDataUrl } from "../assets/dig-mark-data.js";

function smoothContour(points, windowSize = 9) {
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

function disposeObject3D(object) {
  object.traverse((node) => {
    if (node.geometry) {
      node.geometry.dispose();
    }

    if (node.material) {
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if (material.map) {
          material.map.dispose();
        }
        material.dispose();
      });
    }
  });
}

const COLOR_MODES = {
  rainbow: {
    body: 0x111820,
    bodyEmissive: 0x12091f,
    side: 0x05080b,
    sideEmissive: 0x09152a,
    glow: 0xff4fd8,
    rim: 0xff4fd8,
    rainbowLights: [0xff4fd8, 0x4fb3ff, 0x9fe870, 0xffd166, 0xff5f45],
    animateHue: true,
  },
  green: {
    body: 0x111820,
    bodyEmissive: 0x071806,
    side: 0x05080b,
    sideEmissive: 0x0b2a08,
    glow: 0x9fe870,
    rim: 0x9fe870,
    rainbowLights: [0x9fe870, 0x5effd1, 0xc8ff8a, 0x7dff68, 0x3dffc3],
    animateHue: false,
  },
  mono: {
    body: 0x111820,
    bodyEmissive: 0x05080b,
    side: 0x05080b,
    sideEmissive: 0x020304,
    glow: 0xffffff,
    rim: 0xffffff,
    rainbowLights: [0xffffff, 0xb8c0c8, 0x7f8790, 0xffffff, 0x9ca3af],
    animateHue: false,
  },
};

function resolveColors(colorMode, colors) {
  return {
    ...COLOR_MODES[colorMode],
    ...colors,
  };
}

export function Dig3DLogoLoader({
  width = 240,
  height = 220,
  rotationSpeed = 0.945,
  colorMode = "rainbow",
  colors,
  neon = true,
  paused = false,
  pixelRatio = 2,
  className,
  style,
  ariaLabel = "Dig is loading",
}) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  const speedRef = useRef(rotationSpeed);
  const neonRef = useRef(neon);
  const colorsRef = useRef(resolveColors(colorMode, colors));

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    neonRef.current = neon;
  }, [neon]);

  useEffect(() => {
    colorsRef.current = resolveColors(colorMode, colors);
  }, [colorMode, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatio));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.08, 7.6);

    const group = new THREE.Group();
    group.rotation.x = -0.04;
    scene.add(group);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: colorsRef.current.body,
      emissive: colorsRef.current.bodyEmissive,
      emissiveIntensity: neonRef.current ? 0.18 : 0.04,
      metalness: 0.18,
      roughness: 0.54,
    });

    const sideMaterial = new THREE.MeshStandardMaterial({
      color: colorsRef.current.side,
      emissive: colorsRef.current.sideEmissive,
      emissiveIntensity: neonRef.current ? 0.22 : 0.04,
      metalness: 0.12,
      roughness: 0.88,
    });

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
      color: colorsRef.current.glow,
      transparent: true,
      opacity: neonRef.current ? 0.18 : 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const glow = new THREE.Mesh(geometry.clone(), glowMaterial);
    glow.scale.set(1.045, 1.045, 1.06);
    group.add(glow);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2024, 1.8));

    const key = new THREE.DirectionalLight(0xffffff, 3.6);
    key.position.set(-2.7, 3.2, 4.5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(colorsRef.current.rim, neonRef.current ? 2.2 : 0.5);
    rim.position.set(4.6, 1.2, -3.8);
    scene.add(rim);

    const rainbowLights = colorsRef.current.rainbowLights.map(
      (color, index) => new THREE.PointLight(color, 3.8 - index * 0.25, 6.5, 1.6 + index * 0.05),
    );

    rainbowLights[0].position.set(2.8, 1, -1.8);
    rainbowLights[1].position.set(-2.8, 0.8, 2.1);
    rainbowLights[2].position.set(2.4, -1.1, 2.4);
    rainbowLights[3].position.set(-1.6, -1.4, -2.1);
    rainbowLights[4].position.set(0.4, 1.8, 2.8);
    rainbowLights.forEach((light) => scene.add(light));

    const fill = new THREE.DirectionalLight(0xffffff, 0.9);
    fill.position.set(1.8, -1.4, 2.2);
    scene.add(fill);

    const clock = new THREE.Clock();
    let frameId = 0;

    function render() {
      const t = clock.getElapsedTime();

      if (!pausedRef.current) {
        group.rotation.y = t * Math.PI * speedRef.current;
      }

      group.position.y = 0;

      const edgePulse = Math.abs(Math.sin(group.rotation.y));
      const palette = colorsRef.current;
      bodyMaterial.color.setHex(palette.body);
      bodyMaterial.emissive.setHex(palette.bodyEmissive);
      sideMaterial.color.setHex(palette.side);
      sideMaterial.emissive.setHex(palette.sideEmissive);

      if (neonRef.current) {
        glow.material.opacity = 0.12 + edgePulse * 0.22;
        if (palette.animateHue) {
          glow.material.color.setHSL((t * 0.18) % 1, 1, 0.68);
          rim.color.setHSL((t * 0.18 + 0.15) % 1, 1, 0.64);
        } else {
          glow.material.color.setHex(palette.glow);
          rim.color.setHex(palette.rim);
        }
        rim.intensity = 2.2;
        rainbowLights.forEach((light, index) => {
          light.intensity = 2.2 + edgePulse * (2.4 + index * 0.25);
          if (palette.animateHue) {
            light.color.setHSL((t * 0.12 + index / rainbowLights.length) % 1, 1, 0.62);
          } else {
            light.color.setHex(palette.rainbowLights[index % palette.rainbowLights.length]);
          }
        });
      } else {
        glow.material.opacity = 0;
        rim.intensity = 0.5;
        rainbowLights.forEach((light) => {
          light.intensity = 0;
        });
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(frameId);
      disposeObject3D(scene);
      renderer.dispose();
    };
  }, [height, pixelRatio, width]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={ariaLabel}
      className={className}
      role="img"
      style={{
        display: "block",
        width,
        height,
        ...style,
      }}
      width={width * Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio || 1, pixelRatio)}
      height={height * Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio || 1, pixelRatio)}
    />
  );
}

export default Dig3DLogoLoader;
