"use client";
import { motion } from "framer-motion";
const SectionDevider = () => {
  return (
    <motion.div
      className="h-1 mt-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  );
};

export default SectionDevider;
