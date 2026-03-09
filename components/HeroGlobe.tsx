"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EARTH_RADIUS = 1.34;
const BANGLADESH = { lat: 23.685, lon: 90.3563 };

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

function createLabelSprite(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 360;
  canvas.height = 120;
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(8, 17, 32, 0.9)";
  context.strokeStyle = "rgba(0, 229, 255, 0.55)";
  context.lineWidth = 3;
  context.beginPath();
  context.roundRect(4, 6, canvas.width - 8, canvas.height - 12, 18);
  context.fill();
  context.stroke();
  context.fillStyle = "#d9f7ff";
  context.font = "600 42px 'DM Mono', monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 0.95,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.72, 0.24, 1);
  return sprite;
}

export default function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0, 5.8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.rotateSpeed = 0.6;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.set(0, 0, 0);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/textures/earth_atmos_2048.jpg");
    const earthNormalTexture = textureLoader.load(
      "/textures/earth_normal_2048.jpg",
    );
    const earthSpecularTexture = textureLoader.load(
      "/textures/earth_specular_2048.jpg",
    );
    const cloudTexture = textureLoader.load("/textures/earth_clouds_1024.png");
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    cloudTexture.colorSpace = THREE.SRGBColorSpace;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    earthTexture.anisotropy = maxAnisotropy;
    earthNormalTexture.anisotropy = maxAnisotropy;
    earthSpecularTexture.anisotropy = maxAnisotropy;
    cloudTexture.anisotropy = Math.min(maxAnisotropy, 8);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 96, 96);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: earthNormalTexture,
      normalScale: new THREE.Vector2(0.75, 0.75),
      specularMap: earthSpecularTexture,
      specular: new THREE.Color("#37658f"),
      shininess: 24,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    const clouds =
      cloudTexture &&
      new THREE.Mesh(
        new THREE.SphereGeometry(1.4, 64, 64),
        new THREE.MeshPhongMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
    if (clouds) {
      globeGroup.add(clouds);
    }

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.56, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color("#00d8ff") },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            gl_FragColor = vec4(glowColor, intensity * 0.58);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    );
    scene.add(atmosphere);

    const bangladeshVector = latLonToVector3(
      BANGLADESH.lat,
      BANGLADESH.lon,
      EARTH_RADIUS,
    );
    globeGroup.rotation.y = Math.atan2(-bangladeshVector.x, bangladeshVector.z);

    const pinGroup = new THREE.Group();
    const pinStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.2, 10),
      new THREE.MeshStandardMaterial({
        color: "#ff4d6d",
        emissive: "#a62343",
        emissiveIntensity: 0.6,
        roughness: 0.35,
      }),
    );
    pinStem.position.y = 0.11;

    const pinHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      new THREE.MeshStandardMaterial({
        color: "#ff6b6b",
        emissive: "#ff3358",
        emissiveIntensity: 0.9,
        roughness: 0.25,
      }),
    );
    pinHead.position.y = 0.22;

    const pinPulseMaterial = new THREE.MeshBasicMaterial({
      color: "#ff6b6b",
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const pinPulse = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.086, 40),
      pinPulseMaterial,
    );
    pinPulse.rotation.x = -Math.PI / 2;
    pinPulse.position.y = 0.008;

    pinGroup.add(pinStem, pinHead, pinPulse);
    const pinPosition = latLonToVector3(
      BANGLADESH.lat,
      BANGLADESH.lon,
      EARTH_RADIUS + 0.01,
    );
    pinGroup.position.copy(pinPosition);
    pinGroup.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      pinPosition.clone().normalize(),
    );
    globeGroup.add(pinGroup);

    const pinLabel = createLabelSprite("Me");
    if (pinLabel) {
      const labelPosition = latLonToVector3(
        BANGLADESH.lat,
        BANGLADESH.lon,
        EARTH_RADIUS + 0.35,
      );
      pinLabel.position.copy(labelPosition);
      globeGroup.add(pinLabel);
    }

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.04, 0.016, 10, 260),
      new THREE.MeshBasicMaterial({
        color: "#7b61ff",
        transparent: true,
        opacity: 0.36,
      }),
    );
    orbitRing.rotation.x = Math.PI * 0.44;
    orbitRing.rotation.y = Math.PI * 0.12;
    scene.add(orbitRing);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.24, 0.01, 8, 220),
      new THREE.MeshBasicMaterial({
        color: "#00e5ff",
        transparent: true,
        opacity: 0.24,
      }),
    );
    orbitRing2.rotation.x = Math.PI * 0.18;
    orbitRing2.rotation.z = Math.PI * 0.35;
    scene.add(orbitRing2);

    const particleCount = 160;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color("#00e5ff");
    const lilac = new THREE.Color("#7b61ff");
    const mixed = new THREE.Color();

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.15 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const i3 = i * 3;

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.cos(phi);
      particlePositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      mixed.copy(cyan).lerp(lilac, Math.random() * 0.75);
      particleColors[i3] = mixed.r;
      particleColors[i3 + 1] = mixed.g;
      particleColors[i3 + 2] = mixed.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.78,
      size: 0.034,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
    });

    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    const ambient = new THREE.AmbientLight("#98dfff", 0.54);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight("#ffffff", 1.5);
    keyLight.position.set(4.5, 2.2, 3.4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#00e5ff", 0.72);
    fillLight.position.set(-4.2, -1.4, 2.4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight("#7b61ff", 1.1, 14);
    rimLight.position.set(-2.6, 2.8, -3.8);
    scene.add(rimLight);

    const resize = () => {
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;
      if (!width || !height) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mountNode);

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();

      controls.update();

      if (clouds) {
        clouds.rotation.y += 0.00045;
      }

      pinPulse.scale.setScalar(1 + 0.25 * (0.5 + 0.5 * Math.sin(elapsed * 3)));
      pinPulseMaterial.opacity =
        0.65 + 0.2 * (0.5 + 0.5 * Math.sin(elapsed * 3));

      atmosphere.rotation.y = elapsed * 0.05;
      orbitRing.rotation.z = elapsed * 0.2;
      orbitRing2.rotation.z = -elapsed * 0.16;
      particleField.rotation.y = elapsed * 0.05;
      particleField.rotation.x = Math.sin(elapsed * 0.35) * 0.06;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      controls.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.Material).dispose();
      orbitRing.geometry.dispose();
      (orbitRing.material as THREE.Material).dispose();
      orbitRing2.geometry.dispose();
      (orbitRing2.material as THREE.Material).dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (clouds) {
        clouds.geometry.dispose();
        (clouds.material as THREE.Material).dispose();
      }
      pinStem.geometry.dispose();
      (pinStem.material as THREE.Material).dispose();
      pinHead.geometry.dispose();
      (pinHead.material as THREE.Material).dispose();
      pinPulse.geometry.dispose();
      pinPulseMaterial.dispose();
      if (pinLabel) {
        (
          (pinLabel.material as THREE.SpriteMaterial).map as THREE.Texture
        ).dispose();
        (pinLabel.material as THREE.Material).dispose();
      }
      earthTexture.dispose();
      earthNormalTexture.dispose();
      earthSpecularTexture.dispose();
      cloudTexture.dispose();

      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-globe-frame" aria-hidden="true">
      <div className="hero-globe-orb" ref={mountRef} />
      <span className="hero-globe-halo hero-globe-halo--outer" />
      <span className="hero-globe-halo hero-globe-halo--inner" />
    </div>
  );
}
