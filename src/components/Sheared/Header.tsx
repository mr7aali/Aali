"use client";
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for header
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animation variants for nav items
const navItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Animation variants for mobile menu
const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// Animation variants for social icons
const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.15, ease: "easeOut" },
  }),
};

// Animation variants for logo letters
const logoLetterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Header = () => {
  const backgroundColors = {
    indigo: "#4f46e5",
    pink: "#ec4899",
    blue: "#3b82f6",
    emerald: "#10b981",
    amber: "#f59e0b",
    red: "#ef4444",
  };

  const NavItems = [
    {
      text: "About",
      path: "#ABOUT",
      baseColor: backgroundColors.indigo,
      hoverColor: backgroundColors.amber,
    },
    {
      text: "Portfolio",
      path: "#PORTFOLIO",
      baseColor: backgroundColors.pink,
      hoverColor: backgroundColors.red,
    },
    {
      text: "Contact",
      path: "#CONTACT",
      baseColor: backgroundColors.blue,
      hoverColor: backgroundColors.pink,
    },
    {
      text: "Dashboard",
      path: "/dashboard",
      baseColor: backgroundColors.emerald,
      hoverColor: backgroundColors.blue,
    },
  ];

  const SocialIcons = [
    {
      Icon: LinkedinOutlined,
      path: "https://www.linkedin.com/in/mr7aali/",
      label: "LinkedIn",
      baseColor: backgroundColors.amber,
      hoverColor: backgroundColors.pink,
    },
    {
      Activeness: "active",
      Icon: FacebookOutlined,
      path: "https://www.facebook.com/mr7aali/",
      label: "Facebook",
      baseColor: backgroundColors.emerald,
      hoverColor: backgroundColors.indigo,
    },
    {
      Icon: InstagramOutlined,
      path: "https://www.instagram.com/sheikh7aali/",
      label: "Instagram",
      baseColor: backgroundColors.red,
      hoverColor: backgroundColors.blue,
    },
    {
      Icon: GithubOutlined,
      path: "https://github.com/mr7aali",
      label: "GitHub",
      baseColor: backgroundColors.blue,
      hoverColor: backgroundColors.red,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b shadow-lg p b-6 backdrop-blur-lg border-red-500/30"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      role="banner"
    >
      <div className="flex items-center px-5 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex-1 text-2xl font-extrabold tracking-tight no-underline sm:text-3xl"
          aria-label="Home"
        >
          <motion.div className="inline-flex">
            {"Aali".split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={logoLetterVariants}
                style={{ color: backgroundColors.blue }}
                whileHover={{ scale: 1.2, color: backgroundColors.indigo }}
                transition={{ duration: 0.2 }}
              >
                <i> {letter}</i>
              </motion.span>
            ))}
          </motion.div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div
          onClick={() => setOpen(!open)}
          className="text-2xl cursor-pointer md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          role="button"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            {open ? (
              <CloseOutlined
                className="transition-colors duration-300"
                style={{ color: backgroundColors.emerald }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = backgroundColors.pink)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = backgroundColors.emerald)
                }
              />
            ) : (
              <MenuOutlined
                className="transition-colors duration-300"
                style={{ color: backgroundColors.emerald }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = backgroundColors.pink)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = backgroundColors.emerald)
                }
              />
            )}
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="items-center hidden space-x-10 md:flex"
          aria-label="Main navigation"
        >
          <ul className="flex space-x-8 list-none">
            {NavItems.map((item, index) => (
              <motion.li
                key={item.text}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                className="relative"
              >
                <Link
                  href={item.path}
                  className="relative px-4 py-2 text-base font-bold no-underline uppercase group"
                  style={{ color: item.baseColor }}
                  aria-current={item.path === "#HOME" ? "page" : undefined}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, color: item.hoverColor }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.text}
                  </motion.span>
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: item.hoverColor }}
                  ></span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex ml-10 space-x-4">
            {SocialIcons.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center group"
              >
                <motion.a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-xl lg:text-2xl"
                  style={{ color: item.baseColor }}
                  whileHover={{ scale: 1.3, color: item.hoverColor }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`Visit my ${item.label}`}
                >
                  <item.Icon />
                </motion.a>
                <span
                  className="hidden absolute bottom-[-10px] text-xs font-bold z-50 group-hover:block"
                  style={{ color: item.hoverColor }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full border-t bg-gray-900/90 backdrop-blur-md md:hidden border-red-500/30"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center px-5 pt-4 pb-6">
              {NavItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  custom={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="block w-full py-3 text-lg font-bold text-center no-underline uppercase transition-colors duration-300 border-b"
                    style={{
                      color: item.baseColor,
                      borderColor: item.baseColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = item.hoverColor;
                      e.currentTarget.style.backgroundColor = `${item.hoverColor}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.baseColor;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    aria-current={item.path === "#HOME" ? "page" : undefined}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
              <div className="flex justify-center py-6 space-x-6">
                {SocialIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col items-center group"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={socialIconVariants}
                  >
                    <motion.a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-2xl"
                      style={{ color: item.baseColor }}
                      whileHover={{ scale: 1.3, color: item.hoverColor }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      aria-label={`Visit my ${item.label}`}
                    >
                      <item.Icon />
                    </motion.a>
                    <span
                      className="hidden absolute bottom-[-12px] text-xs font-bold z-50 group-hover:block"
                      style={{ color: item.hoverColor }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
