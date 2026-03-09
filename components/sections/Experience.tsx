"use client";

import { useEffect } from "react";

const experiences = [
  {
    role: "Backend Developer",
    company: "Betopia Group",
    tag: "Current",
    current: true,
    period: "Jan 2026 - Present",
    location: "Mohakhali, Dhaka",
    bullets: [
      "Built full-stack e-commerce platform using NestJS 11, PostgreSQL, and Prisma ORM with vendor-buyer management and Stripe payment.",
      "Implemented JWT auth with role-based access control and RESTful APIs for 40+ endpoints.",
      "Designed complex database schema for vendors, buyers, products, orders, and payments.",
      "Integrated real-time communication using WebSocket and WebRTC.",
    ],
  },
  {
    role: "Next.js Developer",
    company: "CodenVibe",
    tag: "Contract",
    current: false,
    period: "Sep 2025 - Dec 2025",
    location: "Uttara, Dhaka",
    bullets: [
      "Developed responsive websites using Redux and Next.js 15, ensuring pixel-perfect Figma-to-code conversion.",
      "Built and deployed a Progressive Web App (PWA) for offline access.",
      "Optimized performance and resolved cross-platform compatibility issues.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Rokomari",
    tag: "Full-time",
    current: false,
    period: "Jan 2023 - Feb 2025",
    location: "Motijheel, Dhaka",
    bullets: [
      "Developed responsive web apps with Next.js, TypeScript, Tailwind CSS, and SCSS.",
      "Converted Figma designs to pixel-perfect, cross-device layouts.",
      "Collaborated with backend teams to integrate APIs and improve UX.",
    ],
  },
];

const courses = [
  "Data Structures",
  "Algorithms",
  "Web Development",
  "Database Systems",
  "Machine Learning",
];

export default function Experience() {
  useEffect(() => {
    const timelineItems = Array.from(document.querySelectorAll<HTMLElement>(".timeline-item"));
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

    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section id="experience">
      <div className="section-inner">
        <div className="section-label">02 &mdash; Experience</div>
        <h2 className="section-title">
          Where I&apos;ve
          <br />
          worked
        </h2>

        <div className="experience-layout">
          <div className="timeline">
            {experiences.map((item, index) => (
              <div className="timeline-item" data-index={index} key={`${item.company}-${item.period}`}>
                <div className="timeline-header">
                  <div>
                    <div className="timeline-role">{item.role}</div>
                    <div className="timeline-company">{item.company}</div>
                    <span className={`timeline-tag${item.current ? " current" : ""}`}>
                      {item.current ? <>&bull; Current</> : item.tag}
                    </span>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-date">{item.period}</span>
                    <span className="timeline-loc">{item.location}</span>
                  </div>
                </div>
                <ul className="timeline-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="edu-column">
            <div className="section-label education-label">Education</div>
            <div className="edu-card">
              <div className="edu-degree">B.Sc. in Computer Science</div>
              <div className="edu-school">Bangladesh University of Business &amp; Technology</div>
              <div className="edu-meta">Expected Dec 2025 - Dhaka, Bangladesh</div>
              <div className="edu-gpa">GPA: 3.30 / 4.00</div>
              <div className="edu-subtitle">Relevant Coursework:</div>
              <div className="edu-courses">
                {courses.map((course) => (
                  <span className="course-tag" key={course}>
                    {course}
                  </span>
                ))}
              </div>

              <div className="edu-featured">
                <div className="edu-featured-label">Featured Project</div>
                <div className="edu-featured-text">Stroke Prediction Model using Machine Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
