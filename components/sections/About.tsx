export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-label">01 &mdash; About</div>
        <h2 className="section-title">
          Turning ideas into
          <br />
          reliable products
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I&apos;m a <strong>Full Stack Developer</strong> based in Dhaka with hands-on
              experience across the entire web stack &mdash; from designing responsive frontends
              with Next.js &amp; Tailwind to engineering robust backends with NestJS, PostgreSQL,
              and real-time WebSocket systems.
            </p>
            <p>
              I care deeply about <strong>performance, scalability</strong> and code quality.
              I&apos;ve worked on delivery platforms, e-commerce systems, and courier management
              tools used in production, writing clean, maintainable code with proper architecture.
            </p>
            <p>
              Currently at <strong>Betopia Group</strong> as a Backend Developer, leading
              full-stack development of an e-commerce platform with Stripe integration and real-time
              communication.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Major Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">40+</div>
              <div className="stat-label">API Endpoints Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3.30</div>
              <div className="stat-label">CGPA / 4.00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
