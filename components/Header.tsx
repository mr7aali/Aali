"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export default function Header() {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = `#${section.id}`;
        }
      });
      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="logo">
        S<span>.</span>Sukur Ali
      </div>
      <nav aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={activeHref === item.href ? "is-active" : undefined}>
            {item.label}
          </a>
        ))}
        <a href="mailto:mr7aali@gmail.com" className="nav-cta">
          Hire Me
        </a>
      </nav>
    </header>
  );
}
