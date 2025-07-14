import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Button = () => {
  return (
    <motion.div
      className="flex flex-col gap-4 justify-center mt-10 sm:flex-row"
      variants={textVariants}
    >
      <a
        target="_blank"
        href="https://drive.google.com/file/d/1WBsVIWXOKahIR3xDql8yvpgeKAsdATeN/view?usp=drive_link"
        className="inline-block px-6 py-3 font-semibold text-indigo-600 bg-white rounded-lg border border-indigo-200 shadow-md transition-all duration-300 transform hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg"
      >
        Explore My CV
      </a>
    </motion.div>
  );
};

export default Button;
