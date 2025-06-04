"use client";
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

// Animation variants for footer elements
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for nav items and social icons
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Footer = () => {
  const NavItem = [
    { text: "about", path: "#ABOUT" },
    { text: "book", path: "#" },
    { text: "portfolio", path: "#PORTFOLIO" },
    { text: "blog", path: "#" },
    { text: "contact", path: "#CONTACT" },
  ];
  const SocialIcon = [
    { Icon: LinkedinOutlined, path: "https://www.linkedin.com/in/mr7aali/" },
    { Icon: FacebookOutlined, path: "https://www.facebook.com/mr07aali/" },
    { Icon: InstagramOutlined, path: "https://www.instagram.com/mr7aali/" },
    { Icon: GithubOutlined, path: "https://github.com/mr7aali" },
  ];

  return (
    <motion.footer
      className="pt-12 pb-8 mt-16 text-white bg-gradient-to-t from-gray-900 to-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center">
            <motion.div className="mb-4" variants={itemVariants} custom={0}>
              <a
                href="/"
                className="text-3xl font-extrabold tracking-tight text-transparent no-underline bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Aali
                </motion.span>
              </a>
            </motion.div>
            <motion.p
              className="font-sans text-sm text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text"
              variants={itemVariants}
              custom={1}
            >
              <i> © 2025 Sheikh Aali</i>
            </motion.p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <ul className="flex flex-col gap-4 list-none sm:flex-row sm:gap-6">
              {NavItem.map((item, index) => (
                <motion.li
                  key={item.text}
                  custom={index + 2}
                  variants={itemVariants}
                  className="relative"
                >
                  <a
                    href={item.path}
                    className="block w-full text-sm font-medium text-center text-transparent no-underline uppercase bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text group"
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center">
            <div className="flex gap-4">
              {SocialIcon.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.path}
                  target="_blank"
                  className="text-2xl"
                  custom={index + NavItem.length + 2}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.Icon className="[fill: url(#gradient)]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <motion.div
          className="h-px mt-8 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      {/* SVG Gradient Definition for Icons */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#6366F1", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#3B82F6", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </motion.footer>
  );
};

export default Footer;
