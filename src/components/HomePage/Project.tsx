"use client";

import { motion } from "framer-motion";
import ProjectCard from "../card/ProjectCard";
import useParticleBackground from "@/utils/useParticleBackground";
import Link from "next/link";
import { HeroSectionData, projects } from "../../../data";
// import useParticleBackground from "../hooks/useParticleBackground";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
  hover: {
    scale: 1.03,
    transition: { duration: 0.3 },
  },
};
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Project = () => {
  const canvasRef = useParticleBackground();

  // Color palette
  const backgroundColors = [
    "#4f46e5", // Indigo
    "#ec4899", // Pink
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
  ];

  return (
    <motion.section
      id="portfolio"
      className="relative px-4 py-12 overflow-hidden md:px-6 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <h1
            className="mt-3 font-serif text-3xl font-bold md:text-4xl"
            style={{ color: backgroundColors[0] }}
          >
            Recent Projects
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base text-gray-600 md:text-lg">
            Discover my latest works, reflecting my skills and passion for
            crafting innovative web solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 mt-10 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <Link href={project.projectLink} key={index} target="_blank">
              <motion.div
                className="group"
                variants={cardVariants}
                custom={index}
                whileHover="hover"
              >
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  imageLink={project.imageLink}
                  skills={project.skills}
                  accentColor={
                    backgroundColors[index % backgroundColors.length]
                  }
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
            variants={textVariants}
          >
            <a
              target="_blank"
              href={HeroSectionData.cv}
              className="inline-block px-6 py-3 font-semibold text-indigo-600 transition-all duration-300 transform bg-white border border-indigo-200 rounded-lg shadow-md hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg"
            >
              Explore My CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Project;
