"use client";

import { useEffect } from "react";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  number: string;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    number: "01 / Featured",
    title: "Multi-Service Delivery & Logistics Platform",
    description:
      "Scalable delivery platform connecting customers, riders, and merchants with real-time GPS tracking, WebRTC, WebSocket-based order broadcasting, and a comprehensive wallet system with automatic commission deduction.",
    stack: ["NestJS", "PostgreSQL", "Prisma", "WebSockets", "WebRTC", "Cloudinary", "JWT"],
    links: [{ label: "GitHub", href: "https://github.com/mr7aali" }],
    featured: true,
  },
  {
    number: "02",
    title: "Vendor-Buyer E-Commerce Platform",
    description:
      "Vendor-buyer connection system with Stripe Payment Intents, coupon management, real-time messaging, and role-based access control.",
    stack: ["NestJS", "PostgreSQL", "Stripe", "JWT"],
    links: [{ label: "GitHub", href: "https://github.com/mr7aali" }],
  },
  {
    number: "03",
    title: "CourierTrack - Courier Management",
    description:
      "Parcel and agent management with real-time tracking, unique IDs, payment processing (COD/online), and comprehensive analytics.",
    stack: ["Next.js 15", "NestJS", "Mongoose", "Tailwind"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
  {
    number: "04",
    title: "Full-Stack Food Ordering Website",
    description:
      "NextAuth authentication, Stripe payments, Cloudinary image storage, and admin dashboard for managing restaurants, users, and orders.",
    stack: ["Next.js", "Express.js", "MongoDB", "Stripe"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
  {
    number: "05",
    title: "Kasra Design Clone - Video Showcase",
    description:
      "Responsive, modern UI cloned from Kasra Design with YouTube API integration, smooth animations, entrance transitions, and hover effects.",
    stack: ["Next.js", "Tailwind CSS", "YouTube API"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
];

export default function Projects() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const index = Number(element.dataset.index ?? "0");
          const timeoutId = window.setTimeout(() => {
            element.classList.add("visible");
          }, index * 120);

          timeoutIds.push(timeoutId);
          observer.unobserve(element);
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section id="projects">
      <div className="section-inner">
        <div className="section-label">04 &mdash; Projects</div>
        <h2 className="section-title">
          Selected
          <br />
          work
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              className={`project-card${project.featured ? " featured" : ""}`}
              data-index={index}
              key={project.title}
            >
              <div className="project-number">{project.number}</div>
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.description}</div>

              <div className="project-stack">
                {project.stack.map((item) => (
                  <span className="stack-badge" key={`${project.title}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.links.map((link) => (
                  <a
                    className="project-link"
                    href={link.href}
                    key={`${project.title}-${link.label}`}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label} <span className="project-link-arrow">&#8599;</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
