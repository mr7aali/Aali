export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-cta">
          <h3>
            Let&apos;s build something
            <br />
            <em>remarkable</em> together
          </h3>
          <p>Open to full-time roles, freelance projects, and collaborations.</p>
          <a href="mailto:mr7aali@gmail.com" className="btn-primary">
            Get In Touch &rarr;
          </a>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">
              S<span>.</span>Sukur Ali
            </span>
            <p>
              Full Stack Developer based in Dhaka, Bangladesh. Specializing in scalable web
              applications, real-time systems, and pixel-perfect interfaces.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:mr7aali@gmail.com">mr7aali@gmail.com</a>
              </li>
              <li>
                <a href="tel:+8801967519057">+880 1967519057</a>
              </li>
              <li>
                <a href="https://linkedin.com/in/mr7aali" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/mr7aali" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 Sheikh Sukur Ali. Crafted with precision.</span>
          <div className="footer-socials">
            <a href="https://github.com/mr7aali" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/mr7aali" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:mr7aali@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
