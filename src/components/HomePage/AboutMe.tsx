"use client";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import * as THREE from "three";
import { skills } from "../../../data";

const AboutMe = () => {
  const canvasRef = useRef(null);

  // Three.js setup
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
    const particleCount = isMobile ? 300 : 500; // Fewer particles on mobile
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.3, // Increased stagger for effect
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  // Colors from Expertise2
  const highlightColors = [
    "#4f46e5",
    "#ec4899",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div id="ABOUT" className="relative px-6 py-16 overflow-hidden md:px-10">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="mt-4 font-serif text-3xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text"
          >
            About Me
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto mt-6 font-serif text-base leading-relaxed text-gray-600 md:text-xl"
            style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
          >
            Discover more about my journey, expertise, and the technologies I
            work with to create impactful web solutions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-12 mt-12 md:grid-cols-2 md:mt-16"
        >
          {/* Get to Know Me Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-center text-gray-800 md:text-4xl md:text-left">
              Get to Know Me
            </h2>
            <p
              className="font-serif text-sm leading-relaxed text-justify text-gray-600 md:text-lg md:text-left"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
            >
              Im a{" "}
              <strong style={{ color: highlightColors[0] }}>
                Frontend Web Developer
              </strong>{" "}
              passionate about crafting intuitive and dynamic user interfaces
              for websites and web applications. Explore my work in the{" "}
              <strong style={{ color: highlightColors[1] }}>Projects</strong>{" "}
              section to see how I contribute to successful digital products.
            </p>
            <p
              className="font-serif text-sm leading-relaxed text-justify text-gray-600 md:text-lg md:text-left"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
            >
              I enjoy sharing insights from my experience in{" "}
              <strong style={{ color: highlightColors[2] }}>
                Web Development
              </strong>{" "}
              to support the developer community. Connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/mr7aali/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold transition-colors hover:text-indigo-800"
                style={{ color: highlightColors[3] }}
              >
                LinkedIn
              </a>{" "}
              for valuable content on web development and programming.
            </p>
            <p
              className="font-serif text-sm leading-relaxed text-justify text-gray-600 md:text-lg md:text-left"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
            >
              Im always open to{" "}
              <strong style={{ color: highlightColors[4] }}>
                job opportunities
              </strong>{" "}
              where I can contribute my skills, learn, and grow. Feel free to
              reach out if you have an exciting role that aligns with my
              expertise.
            </p>
            <motion.a
              href="#contact"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundImage: "linear-gradient(to right, #4f46e5, #3b82f6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 mt-4 font-semibold text-white transition-colors rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-lg"
              style={{ animation: "pulse 2s infinite" }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-center text-gray-800 md:text-4xl md:text-left">
              My Skills
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start md:gap-3">
              {skills.map((item, i) => (
                <motion.span
                  key={i}
                  variants={skillVariants}
                  whileHover="hover"
                  className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-sm cursor-pointer md:text-sm md:px-4 md:py-2"
                  style={{
                    backgroundColor:
                      highlightColors[i % highlightColors.length],
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMe;
