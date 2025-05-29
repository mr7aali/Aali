"use client";
import { MobileOutlined } from "@ant-design/icons";
import { FaCss3Alt, FaGithub, FaReact } from "react-icons/fa";
import { SiNodedotjs, SiPostman } from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExpertiseItemsData } from "../../../data";
// import useParticleBackground from "@/utils/useParticleBackground";

// Animation variants for section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animation variants for main cards
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
  hover: {
    scale: 1.0,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const backgroundCardVariants = {
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
    rotate: index === 1 ? -3 : 5,
    transition: { duration: 0.5 },
  }),
};

// Animation variants for icons
const iconVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
};

const Expertise2 = () => {
  // Track hovered card index (null if none)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Define unique background colors for each card
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
      className="relative px-4 pb-12 mx-auto mt-16 overflow-hidden max-w-7xl sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="relative z-10">
        <motion.h1
          className="mb-12 font-serif text-4xl font-extrabold text-center text-transparent sm:text-5xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          My Expertise
        </motion.h1>
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[30px] xl:grid-cols-3 justify-items-center">
          {ExpertiseItemsData.map((item, index) => (
            <div className="relative" key={index}>
              {/* Background Card */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 right-0 w-full rounded-lg shadow-md cursor-pointer"
                style={{
                  backgroundColor: backgroundColors[index],
                  transform:
                    hoveredIndex === index
                      ? "none"
                      : "translate(-10px, 10px) rotate(-5deg)",
                  zIndex: 1,
                }}
                variants={backgroundCardVariants}
                initial="hidden"
                animate={hoveredIndex === index ? "spread" : "stacked"}
                custom={1}
              ></motion.div>
              {/* Main Card */}
              <motion.div
                className="relative z-10 flex flex-col h-full p-6 transition-shadow duration-300 shadow-lg cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl hover:shadow-xl"
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                variants={cardVariants}
                id="update-this-card"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <motion.div
                    style={{
                      color: backgroundColors[index],
                    }}
                    className="mr-4 text-4xl text-indigo-400"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <item.Icon />
                  </motion.div>
                  <h2
                    style={{
                      color: backgroundColors[index],
                    }}
                    className="text-xl font-bold sm:text-2xl"
                  >
                    {item.title}
                  </h2>
                </div>

                {/* Description with Code Style */}
                <div className="relative flex flex-col justify-center flex-grow min-h-[120px]">
                  <motion.span
                    className="font-mono text-sm text-indigo-500 sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {"<h3>"}
                  </motion.span>
                  <motion.p
                    className="pl-4 my-2 font-mono text-sm leading-relaxed text-gray-300 border-l-4 border-indigo-500 sm:text-base"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.span
                    className="font-mono text-sm text-indigo-500 sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {"</h3>"}
                  </motion.span>
                </div>

                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 group-hover:opacity-100" />
              </motion.div>
            </div>
          ))}
        </div>
        {/* Decorative Divider */}
        <motion.div
          className="h-1 mt-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  );
};

export default Expertise2;
