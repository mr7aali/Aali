"use client";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import { motion } from "framer-motion";
import ProjectCard from "../card/ProjectCard";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
};

const Project = () => {
  const projects = [
    {
      title: "E-commerce Full-stack Website",
      subtitle: "Start Tech",
      description:
        "A fully functional e-commerce platform with React, Next.js, Node.js, and MongoDB, featuring secure payments and responsive design.",
      imageLink:
        "https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg",
    },
    {
      title: "Portfolio Website",
      subtitle: "Personal Project",
      description:
        "A modern portfolio showcasing my skills and projects, built with Next.js, Tailwind CSS, and Framer Motion for dynamic animations.",
      imageLink:
        "https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg",
    },
    {
      title: "Task Management App",
      subtitle: "Freelance Work",
      description:
        "A task management application with real-time updates, built using React, Firebase, and TypeScript for efficient collaboration.",
      imageLink:
        "https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg",
    },
  ];

  // Colors from Expertise2
  const highlightColors = [
    "#4f46e5", // Indigo
    "#ec4899", // Pink
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
  ];

  return (
    <motion.section
      id="PORTFOLIO"
      className="px-6 py-16 bg-gradient-to-b from-gray-50 to-white md:px-10 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <SectionTitle title="MY PORTFOLIO" />
          <h1 className="mt-4 font-serif text-3xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">
            My Portfolio
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-base text-gray-600 md:text-lg">
            Explore some of my latest projects, showcasing my expertise in
            building modern, responsive, and user-friendly web applications.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3"
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
              className="relative group"
            >
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                imageLink={project.imageLink}
                accentColor={highlightColors[index % highlightColors.length]}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              backgroundImage: "linear-gradient(to right, #4f46e5, #3b82f6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-lg"
            style={{ animation: "pulse 2s infinite" }}
          >
            View All Projects
          </motion.a>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          className="h-1 mt-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
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
    </motion.section>
  );
};

export default Project;
