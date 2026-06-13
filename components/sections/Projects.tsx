"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  accent: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    accent: "#00e5ff",
    title: "FleetFlow Mobile",
    kicker: "Logistics / Realtime",
    description:
      "A dispatch-first delivery experience with live rider states, route snapshots, wallet movement, and a calm operations view for high-volume orders.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    metric: "42k",
    metricLabel: "orders tracked",
    stack: ["Next.js", "NestJS", "WebSockets", "PostgreSQL"],
    links: [
      { label: "Case Study", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
  {
    accent: "#ffb000",
    title: "BazaarOS",
    kicker: "Commerce / Vendor Tools",
    description:
      "A vendor-buyer platform concept with order controls, coupon flows, store health signals, and fast payment status checks in one mobile surface.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    metric: "18%",
    metricLabel: "faster checkout",
    stack: ["Stripe", "Prisma", "JWT", "Tailwind"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
  {
    accent: "#40f99b",
    title: "CourierTrack",
    kicker: "Parcel / Analytics",
    description:
      "Parcel lifecycle tools with agent assignment, COD status, shipment IDs, and clean analytics built for repeated daily operations.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    metric: "9.8k",
    metricLabel: "parcels indexed",
    stack: ["Next.js 15", "MongoDB", "Mongoose", "Tailwind"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
  {
    accent: "#ff6b6b",
    title: "KitchenDash",
    kicker: "Food / Admin UX",
    description:
      "A restaurant ordering dashboard with menu publishing, customer states, media management, and payment-aware order queues.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    metric: "3.2s",
    metricLabel: "avg menu update",
    stack: ["NextAuth", "Express.js", "MongoDB", "Cloudinary"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/mr7aali" },
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".showcase-item"),
    );
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
      { threshold: 0.1 },
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;

    if (!section || !viewport || !rail) {
      return;
    }

    let frameId = 0;
    let maxTranslate = 0;
    let scrollDistance = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const updateScroll = () => {
      frameId = 0;

      const sectionRect = section.getBoundingClientRect();
      const progress = clamp(-sectionRect.top / scrollDistance);
      const translateX = maxTranslate * progress;

      rail.style.transform = `translate3d(${-translateX}px, 0, 0)`;
      section.style.setProperty("--showcase-progress", `${progress * 100}%`);
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScroll);
    };

    const updateMeasurements = () => {
      const viewportStyle = window.getComputedStyle(viewport);
      const viewportPadding =
        Number.parseFloat(viewportStyle.paddingLeft) +
        Number.parseFloat(viewportStyle.paddingRight);

      // Calculate how much the rail needs to translate
      maxTranslate = Math.max(
        0,
        rail.scrollWidth - viewport.clientWidth + viewportPadding,
      );

      // The scroll distance should match exactly the translation needed
      scrollDistance = maxTranslate;

      // Set the section height to exactly viewport + translation distance
      // This ensures the sticky behavior ends precisely when all content is visible
      section.style.setProperty(
        "--showcase-scroll-height",
        maxTranslate > 0
          ? `${window.innerHeight + maxTranslate}px`
          : `${window.innerHeight}px`,
      );
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(viewport);
    resizeObserver.observe(rail);

    updateMeasurements();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("load", updateMeasurements);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("load", updateMeasurements);
    };
  }, []);

  return (
    <section
      id="projects"
      className="projects-scroll-section "
      ref={sectionRef}
    >
      <div className="showcase-sticky">
        <div className=" showcase-inner">
          <div className="section-label">04 &mdash; Projects</div>
          <div className="showcase-heading">
            <h2 className="section-title">
              Work
              <br />
              showcase
            </h2>
            {/* <p className="showcase-intro">
              Mobile-first product mockups for real systems I build: realtime
              delivery, commerce tools, parcel operations, and admin dashboards.
            </p> */}
          </div>

          <div className="showcase-progress" aria-hidden="true" />

          <div className="showcase-viewport" ref={viewportRef}>
            <div
              className="project-showcase-rail"
              aria-label="Selected project mockups"
              ref={railRef}
            >
              {projects.map((project, index) => (
                <article
                  className="showcase-item"
                  data-index={index}
                  key={project.title}
                  style={
                    { "--project-accent": project.accent } as CSSProperties
                  }
                >
                  <div className="phone-mockup" aria-hidden="true">
                    <div className="phone-bezel">
                      <div className="phone-notch" />
                      <div className="phone-screen">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 140px, 130px"
                        />
                        <div className="screen-scrim" />
                      </div>
                    </div>
                  </div>

                  <div className="showcase-copy">
                    <div className="showcase-count">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="showcase-kicker">{project.kicker}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="project-stack">
                      {project.stack.map((item) => (
                        <span
                          className="stack-badge"
                          key={`${project.title}-${item}`}
                        >
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
                          rel={
                            link.href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                        >
                          {link.label}{" "}
                          <span className="project-link-arrow">&#8599;</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
