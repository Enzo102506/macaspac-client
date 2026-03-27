export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        <h1>About Macaspac</h1>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>We're dedicated to building modern, efficient web applications using the latest technologies.</p>
        </section>

        <section className="about-section">
          <h2>What We Use</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h3>React</h3>
              <p>A JavaScript library for building user interfaces with reusable components.</p>
            </div>
            <div className="tech-item">
              <h3>Vite</h3>
              <p>A next-generation frontend build tool that provides instant feedback and lightning-fast HMR.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Get In Touch</h2>
          <p>Have questions or want to collaborate? We'd love to hear from you!</p>
          <a href="mailto:benma@example.com" className="contact-btn">Contact Us</a>
        </section>
      </div>
    </main>
  )
}
