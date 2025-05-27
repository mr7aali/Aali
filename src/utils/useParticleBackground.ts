import { useEffect, useRef } from "react";
import * as THREE from "three";

const useParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 300 : 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      const pos = (Math.random() - 0.5) * 10;
      posArray[i] = pos;
      basePositions[i] = pos;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const colors = [
      new THREE.Color("#4f46e5"), // Indigo
      new THREE.Color("#ec4899"), // Pink
      new THREE.Color("#3b82f6"), // Blue
      new THREE.Color("#10b981"), // Emerald
      new THREE.Color("#f59e0b"), // Amber
      new THREE.Color("#ef4444"), // Red
    ];

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.015 : 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const colorArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = colors[i % colors.length];
      colorArray.set([color.r, color.g, color.b], i * 3);
    }
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0,
      mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.02;

      // Color cycling
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor((i + time * 0.5) % colors.length);
        colorArray.set(
          [colors[colorIndex].r, colors[colorIndex].g, colors[colorIndex].b],
          i * 3
        );
      }
      particlesGeometry.attributes.color.needsUpdate = true;

      // Particle movement
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] +=
          Math.sin(time + basePositions[i]) * 0.001 + mouseX * 0.002;
        positions[i + 1] +=
          Math.cos(time + basePositions[i + 1]) * 0.001 + mouseY * 0.002;
        positions[i + 2] += Math.sin(time + basePositions[i + 2]) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
};

export default useParticleBackground;
