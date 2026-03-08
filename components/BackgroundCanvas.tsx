"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const SHAPE_COUNT = 12;
const LINE_COUNT = 20;

const particleVertexShader = `
  uniform float uTime;
  attribute float aScale;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime + position.x * 0.05) * 0.8;
    pos.x += cos(uTime + position.z * 0.05) * 0.6;

    vAlpha = 0.4 + 0.3 * sin(uTime + position.x + position.y);
    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (220.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float soft = smoothstep(0.5, 0.0, dist);
    float core = smoothstep(0.2, 0.0, dist);
    float alpha = (soft * 0.6 + core * 0.4) * vAlpha;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    const colorPalette = [
      new THREE.Color("#00e5ff"),
      new THREE.Color("#7b61ff"),
      new THREE.Color("#ff6b6b"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 120;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      scales[i] = 2 + Math.random() * 4;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    const shapeGeometries = [
      new THREE.IcosahedronGeometry(1.6, 0),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TetrahedronGeometry(1.7, 0),
    ];

    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < SHAPE_COUNT; i += 1) {
      const geometry = shapeGeometries[i % shapeGeometries.length].clone();
      const material = new THREE.MeshBasicMaterial({
        color: "#00e5ff",
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 90
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotationSpeedX: (Math.random() - 0.5) * 0.002,
        rotationSpeedY: (Math.random() - 0.5) * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
        floatAmplitude: 0.2 + Math.random() * 0.7,
        baseY: mesh.position.y,
      };

      meshes.push(mesh);
      scene.add(mesh);
    }

    const linePositions = new Float32Array(LINE_COUNT * 2 * 3);
    for (let i = 0; i < LINE_COUNT; i += 1) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 95
      );
      const end = start.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        )
      );

      const i6 = i * 6;
      linePositions[i6] = start.x;
      linePositions[i6 + 1] = start.y;
      linePositions[i6 + 2] = start.z;
      linePositions[i6 + 3] = end.x;
      linePositions[i6 + 4] = end.y;
      linePositions[i6 + 5] = end.z;
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#7b61ff",
      transparent: true,
      opacity: 0.04,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouseTarget = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      particleMaterial.uniforms.uTime.value = elapsed;

      camera.position.x += (mouseTarget.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseTarget.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      points.rotation.y = elapsed * 0.015 + mouseTarget.x * 0.05;

      for (const mesh of meshes) {
        const data = mesh.userData as {
          rotationSpeedX: number;
          rotationSpeedY: number;
          floatOffset: number;
          floatAmplitude: number;
          baseY: number;
        };

        mesh.rotation.x += data.rotationSpeedX;
        mesh.rotation.y += data.rotationSpeedY;
        mesh.position.y = data.baseY + Math.sin(elapsed + data.floatOffset) * data.floatAmplitude;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      for (const mesh of meshes) {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      }

      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="background-canvas" ref={mountRef} aria-hidden="true" />;
}
