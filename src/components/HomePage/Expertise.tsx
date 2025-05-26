"use client";
import { MobileOutlined } from "@ant-design/icons";
import { FaReact } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";

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
      delay: index === 1 ? 0 : 0.2, // Staggered animation
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
  const Items = [
    {
      title: "Frontend Dev React, NextJS",
      description:
        "Experienced Frontend Developer proficient in React and Next.js. Skilled in creating high-performance web applications with modern UI/UX design.",
      Icon: FaReact,
    },
    {
      title: "Full-Stack Web Developer",
      description:
        "I'm skilled in Next.js and React for front-end, and PostgreSQL, MongoDB, for back-end development. Adept at building robust web applications and ensuring seamless user experiences.",
      Icon: SiPostman,
    },
    {
      title: "Problem Solving",
      description:
        "Experienced in both functional and OOP: C, C++, Python, Java, JavaScript, TypeScript.",
      Icon: MobileOutlined,
    },
  ];
  const [isSpread, setIsSpread] = useState(false);
  const handleContainerHoverStart = (): void => {
    setIsSpread(true);
  };

  const handleContainerHoverEnd = (): void => {
    setIsSpread(false);
  };

  return (
    <motion.section
      className="px-4 py-12 mx-auto mt-16 max-w-7xl sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <motion.h1
        className="mb-12 font-serif text-4xl font-extrabold text-center text-transparent sm:text-5xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        My Expertise
      </motion.h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Items.map((item, index) => (
          <div className="relative" key={index}>
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0 w-full rounded-lg shadow-md cursor-pointer bg-[#4f46e5]"
              variants={backgroundCardVariants}
              initial="hidden"
              animate={isSpread ? "spread" : "stacked"}
              custom={1} // Index for positioning
              style={{
                transform: isSpread
                  ? "none"
                  : "translate(-10px, 10px) rotate(-5deg)",
                // border: "10px solid red",
                zIndex: 1,
              }}
            ></motion.div>
            {/* Main Card */}
            <motion.div
              className="relative z-10 flex flex-col h-full p-6 transition-shadow duration-300 shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl hover:shadow-xl"
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={cardVariants}
              id="update-this-card"
              onHoverStart={handleContainerHoverStart}
              onHoverEnd={handleContainerHoverEnd}
            >
              {/* Icon and Title */}
              <div className="flex items-center mb-4">
                <motion.div
                  className="mr-4 text-4xl text-indigo-400"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <item.Icon />
                </motion.div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
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
    </motion.section>
  );
};

export default Expertise2;
