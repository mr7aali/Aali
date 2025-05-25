"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -10, rotate: -5 },
  visible: (index: number) => ({
    opacity: 0.7,
    x: index === 1 ? -10 : 10,
    y: index === 1 ? 10 : -10,
    rotate: index === 1 ? -5 : 5,
    transition: { duration: 0.6, delay: 0.2 },
  }),
  spread: (index: number) => ({
    opacity: 0.9,
    x: index === 1 ? -280 : 280,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: index === 1 ? 0 : 0.2,
    },
  }),
  stacked: (index: number) => ({
    opacity: 0.7,
    x: index === 1 ? -10 : 10,
    y: index === 1 ? 10 : -10,
    rotate: index === 1 ? -5 : 5,
    transition: { duration: 0.5 },
  }),
};

const profileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
  spread: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, type: "spring", stiffness: 80, damping: 15 },
  },
  stacked: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5 },
  },
};

const HeroSection: React.FC = () => {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 2D canvas bubble effect
  useEffect(() => {
    if (!canvasRef.current) {
      console.error("HeroSection: Canvas ref is not available");
      return;
    }
    console.log("HeroSection: Canvas ref is available");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("HeroSection: 2D context is not available");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -(Math.random() * 2 + 2), // Upward movement
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(139, 91, 250, 0.7)"; // Indigo
      ctx.globalCompositeOperation = "lighter";

      bubbles.forEach((bubble) => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.x += Math.sin(Date.now() * 0.002 + bubble.x) * 0.5; // Wobble

        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };
    animate();
    console.log("HeroSection: 2D animation loop started");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("HeroSection: 2D canvas cleanup completed");
    };
  }, []);

  const handleContainerHoverStart = (): void => {
    setIsSpread(true);
  };

  const handleContainerHoverEnd = (): void => {
    setIsSpread(false);
  };

  const handleContainerTouchStart = (): void => {
    setIsSpread(true);
  };

  const handleContainerTouchEnd = (): void => {
    setIsSpread(false);
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen py-12 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 sm:py-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[10] pointer-events-none"
        style={{ opacity: 0.9 }}
      />
      <motion.div
        id="if-i-hover-then-the-functionality-will-happanes"
        className="relative z-10 max-w-5xl px-4 mx-auto sm:px-6 lg:px-8"
        onHoverStart={handleContainerHoverStart}
        onHoverEnd={handleContainerHoverEnd}
        onTouchStart={handleContainerTouchStart}
        onTouchEnd={handleContainerTouchEnd}
      >
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="relative flex justify-center mb-8"
            initial="hidden"
            animate="visible"
            style={{ minHeight: "16rem" }}
          >
            <div className="flex items-center justify-center w-full mt-12">
              <AnimatePresence>
                <motion.div
                  className="absolute w-64 h-64 rounded-lg shadow-md cursor-pointer bg-red-950"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isSpread ? "spread" : "stacked"}
                  custom={1}
                  style={{
                    transform: isSpread
                      ? "none"
                      : "translate(-10px, 10px) rotate(-5deg)",
                    zIndex: 1,
                  }}
                ></motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  className="absolute w-64 h-64 bg-[#4f46e5] rounded-lg shadow-md cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isSpread ? "spread" : "stacked"}
                  custom={2}
                  style={{
                    transform: isSpread
                      ? "none"
                      : "translate(10px, -10px) rotate(5deg)",
                    zIndex: 1,
                  }}
                ></motion.div>
              </AnimatePresence>
              <motion.div
                id="update"
                className="relative w-64 h-64 bg-center bg-cover rounded-lg cursor-pointer"
                variants={profileVariants}
                initial="hidden"
                animate={isSpread ? "spread" : "stacked"}
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co/j3fDZYd/IMG-20231018-160911.jpg')",
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(79, 70, 229, 0.2)",
                  zIndex: 2,
                }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            variants={textVariants}
          >
            Hey, I'm <span className="text-indigo-600">Sheikh Aali</span>
          </motion.h1>

          <motion.div
            className="mt-4 text-2xl font-light text-gray-700 sm:text-3xl lg:text-4xl"
            variants={textVariants}
          >
            Full-Stack Developer
          </motion.div>

          <motion.p
            className="max-w-3xl mx-auto mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl"
            variants={textVariants}
          >
            Based in Dhaka, Bangladesh 📍, I'm a passionate developer crafting
            seamless, dynamic web experiences. From sleek e-commerce platforms
            to interactive applications, I turn ideas into reality. Dive into my
            portfolio and let’s create something extraordinary together!
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
            variants={textVariants}
          >
            <Link
              href="#CONTACT"
              className="inline-block px-6 py-3 font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg"
            >
              Connect with Me
            </Link>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1WBsVIWXOKahIR3xDql8yvpgeKAsdATeN/view?usp=drive_link"
              className="inline-block px-6 py-3 font-semibold text-indigo-600 transition-all duration-300 transform bg-white border border-indigo-200 rounded-lg shadow-md hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg"
            >
              Explore My CV
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
