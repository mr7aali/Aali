"use client";

import { motion } from "framer-motion";
import ProjectCard from "../card/ProjectCard";
import useParticleBackground from "@/utils/useParticleBackground";
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

const Project = () => {
  const canvasRef = useParticleBackground();

  const projects = [
    {
      title: "E-commerce Full-stack Website",
      subtitle: "Start Tech",
      description:
        "A fully functional e-commerce platform with React, Next.js, Node.js, and MongoDB, featuring secure payments and responsive design.",
      imageLink:
        "https://i.ibb.co/bNp212J/Web-capture-6-12-2023-03911-localhost.jpg",
      skills: ["React", "NextJs", "NodeJs", "MongoDB", "TailwindCSS"],
    },
    {
      title: "Portfolio Website",
      subtitle: "Personal Project",
      description:
        "A modern portfolio showcasing my skills and projects, built with Next.js, Tailwind CSS, and Framer Motion for dynamic animations.",
      imageLink:
        "https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg",
      skills: ["NextJs", "TypeScript", "TailwindCSS", "React"],
    },
    {
      title: "Task Management App",
      subtitle: "Freelance Work",
      description:
        "A task management application with real-time updates, built using React, Firebase, and TypeScript for efficient collaboration.",
      imageLink: "https://via.placeholder.com/400x300?text=Task+App",
      skills: ["React", "TypeScript", "GitHub"],
    },
  ];

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
      className="relative px-4 py-12 overflow-hidden md:px-6 md:py-16 bg-gradient-to-b from-gray-50 to-white"
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
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                imageLink={project.imageLink}
                accentColor={backgroundColors[index % backgroundColors.length]}
                skills={project.skills}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#projects"
            className="inline-block px-6 py-3 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: backgroundColors[2] }}
          >
            View All Projects
          </motion.a>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          className="h-1 mt-12 bg-gradient-to-r from-transparent via-[#4f46e5] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  );
};

export default Project;
