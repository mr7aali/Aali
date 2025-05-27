"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageLink: string;
  accentColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  description,
  imageLink,
  accentColor,
}) => {
  return (
    <div className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageLink}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="font-serif text-xl font-bold text-gray-800 group-hover:text-[var(--accent-color)]"
          style={{ "--accent-color": accentColor } as React.CSSProperties}
        >
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        <p className="mt-3 text-sm text-gray-600 line-clamp-3 group-hover:line-clamp-none">
          {description}
        </p>
      </div>

      {/* Accent Border on Hover */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent rounded-2xl"
        whileHover={{ borderColor: accentColor }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProjectCard;
