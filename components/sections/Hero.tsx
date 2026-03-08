export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <div className="hero-tag">Available for opportunities</div>
        <h1 className="hero-name">
          Sheikh Sukur
          <br />
          <span className="hero-name-italic">Ali</span>
        </h1>
        <p className="hero-role">Full Stack Developer &mdash; Dhaka, Bangladesh</p>
        <p className="hero-desc">
          Building scalable web applications with a focus on clean architecture, real-time systems,
          and pixel-perfect interfaces. 3+ years crafting products at Rokomari, CodenVibe &amp;
          Betopia Group.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#experience" className="btn-outline">
            My Experience
          </a>
        </div>
        <div className="hero-contacts">
          <a href="mailto:mr7aali@gmail.com" className="contact-item">
            <span>&#9993;</span> mr7aali@gmail.com
          </a>
          <a href="tel:+8801967519057" className="contact-item">
            <span>&#8599;</span> +880 1967519057
          </a>
          <a href="https://linkedin.com/in/mr7aali" className="contact-item" target="_blank" rel="noreferrer">
            <span>in</span> linkedin.com/in/mr7aali
          </a>
          <a href="https://github.com/mr7aali" className="contact-item" target="_blank" rel="noreferrer">
            <span>&#9672;</span> github.com/mr7aali
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
