const skillGroups = [
  {
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "C", "C++"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "NestJS", "Node.js", "Express.js", "React Native", "Flutter"],
  },
  {
    title: "Databases & ORMs",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Mongoose"],
  },
  {
    title: "Tools & Other",
    items: [
      "Tailwind CSS",
      "SCSS",
      "Git",
      "Figma-to-Code",
      "REST API",
      "WebSocket",
      "WebRTC",
      "Stripe",
      "Cloudinary",
      "JWT",
      "Agile",
      "PWA",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-inner">
        <div className="section-label">03 &mdash; Skills</div>
        <h2 className="section-title">
          Technical
          <br />
          expertise
        </h2>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-category" key={group.title}>
              <div className="skill-cat-title">{group.title}</div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
