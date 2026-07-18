"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const timelineSections = [
  { href: "#hero", label: "Intro" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

const revealSelectors = [
  "#about .section-label",
  "#about .section-title",
  ".about-text",
  ".stat-card",
  "#experience .section-label",
  "#experience .section-title",
  ".timeline-item",
  ".edu-card",
  "#skills .section-label",
  "#skills .section-title",
  ".skill-category",
  "#projects .section-label",
  "#projects .section-title",
  ".showcase-progress",
  ".showcase-item",
  ".footer-cta",
  ".footer-brand",
  ".footer-col",
].join(",");

export default function ScrollTimeline() {
  const [activeHref, setActiveHref] = useState("#hero");
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });
  const progressValue = prefersReducedMotion ? scrollYProgress : timelineProgress;

  useEffect(() => {
    const sections = timelineSections
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const scrollAnchor = window.innerHeight * 0.38;
      let current = sections[0].id;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= scrollAnchor) {
          current = section.id;
        }
      });

      setActiveHref(`#${current}`);
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors),
    );
    const timeoutIds: number[] = [];

    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.revealDelay ?? "0");
          const timeoutId = window.setTimeout(() => {
            element.classList.add("is-inview");
          }, delay);

          timeoutIds.push(timeoutId);
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.dataset.revealDelay = String((index % 4) * 70);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: progressValue }}
        aria-hidden="true"
      />
      <nav className="scroll-timeline" aria-label="Scroll timeline">
        <motion.span
          className="scroll-timeline-fill"
          style={{ scaleY: progressValue }}
          aria-hidden="true"
        />
        {timelineSections.map((item, index) => (
          <a
            className={activeHref === item.href ? "is-active" : undefined}
            href={item.href}
            key={item.href}
            aria-current={activeHref === item.href ? "step" : undefined}
          >
            <span className="scroll-timeline-dot" aria-hidden="true" />
            <span className="scroll-timeline-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
