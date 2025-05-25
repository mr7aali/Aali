"use client";
import { useEffect, useRef } from "react";
import SectionTitle from "../SectionTitle";
import { motion } from "framer-motion";
import * as THREE from "three";

const AboutMe = () => {
  const skills = [
    "Html5",
    "Css",
    "Sass",
    "Responsive Design",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Ant Design",
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "C",
    "React",
    "NextJs",
    "GitHub",
    "NodeJs",
    "Express",
    "Prisma",
    "SQL",
    "PostgreSQL",
    "Firebase",
    "MongoDB",
  ];

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
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x6b7280, // Gray color to match theme
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
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
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <div
      id="ABOUT"
      className="relative px-6 py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white md:px-10"
    >
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
          <SectionTitle title="ABOUT ME" />
          <motion.h1
            variants={itemVariants}
            className="mt-4 font-serif text-4xl font-bold text-gray-800 md:text-5xl"
          >
            About Me
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto mt-6 font-serif text-lg leading-relaxed text-gray-600 md:text-xl"
          >
            Discover more about my journey, expertise, and the technologies I
            work with to create impactful web solutions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-12 mt-16 md:grid-cols-2"
        >
          {/* Get to Know Me Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-center text-gray-800 md:text-4xl md:text-left">
              Get to Know Me
            </h2>
            <p className="font-serif text-base leading-relaxed text-justify text-gray-600 md:text-lg md:text-left">
              I'm a{" "}
              <strong className="text-indigo-600">
                Frontend Web Developer
              </strong>{" "}
              passionate about crafting intuitive and dynamic user interfaces
              for websites and web applications. Explore my work in the{" "}
              <strong className="text-indigo-600">Projects</strong> section to
              see how I contribute to successful digital products.
            </p>
            <p className="font-serif text-base leading-relaxed text-justify text-gray-600 md:text-lg md:text-left">
              I enjoy sharing insights from my experience in{" "}
              <strong className="text-indigo-600">Web Development</strong> to
              support the developer community. Connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/mr7aali/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 transition-colors hover:text-indigo-800"
              >
                LinkedIn
              </a>{" "}
              for valuable content on web development and programming.
            </p>
            <p className="font-serif text-base leading-relaxed text-justify text-gray-600 md:text-lg md:text-left">
              I'm always open to{" "}
              <strong className="text-indigo-600">job opportunities</strong>{" "}
              where I can contribute my skills, learn, and grow. Feel free to
              reach out if you have an exciting role that aligns with my
              expertise.
            </p>
            <motion.a
              href="#contact"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 mt-4 font-semibold text-white transition-colors bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-center text-gray-800 md:text-4xl md:text-left">
              My Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {skills.map((item, i) => (
                <motion.span
                  key={i}
                  variants={skillVariants}
                  whileHover="hover"
                  className="px-4 py-2 text-sm font-semibold text-indigo-800 transition-shadow bg-indigo-100 rounded-full shadow-sm cursor-pointer md:text-base hover:shadow-md"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
