"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaCss3Alt, FaGithub } from "react-icons/fa";
import {
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { Tooltip } from "antd";

// Define ProjectCard props
interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageLink: string;
  accentColor: string;
  skills: string[]; // New prop for skills
}

// Map skills to React Icons
const skillIcons: { [key: string]: React.ComponentType } = {
  React: FaReact,
  NodeJs: SiNodedotjs,
  MongoDB: SiMongodb,
  TypeScript: SiTypescript,
  NextJs: SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  CSS: FaCss3Alt,
  GitHub: FaGithub,
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  description,
  imageLink,
  accentColor,
  skills,
}) => {
  // Animation variants for skills icons
  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <div
      className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-sm group hover:shadow-md"
      style={{
        boxShadow: `0 2px 8px ${accentColor}33`, // Subtle colored shadow
      }}
    >
      {/* Image */}
      <div className="relative w-full h-36 sm:h-44">
        <Image
          src={imageLink}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${accentColor}33, transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3
          className="font-serif text-base sm:text-lg font-bold group-hover:text-[var(--accent-dark)]"
          style={
            {
              "--accent-color": accentColor,
              "--accent-dark": `${accentColor}cc`, // Slightly darker shade
              color: accentColor,
            } as React.CSSProperties
          }
        >
          {title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        <p className="mt-2 text-xs text-gray-600 line-clamp-2 group-hover:line-clamp-none">
          {description}
        </p>

        {/* Skills Icons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill] || FaGithub; // Fallback to FaGithub
            return (
              <Tooltip key={index} title={skill} placement="top">
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={iconVariants}
                  className="text-base sm:text-lg"
                  style={{ color: accentColor }}
                >
                  <Icon />
                </motion.div>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Accent Outline on Hover */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        whileHover={{
          outline: `2px solid ${accentColor}`,
          translateY: -2,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProjectCard;
