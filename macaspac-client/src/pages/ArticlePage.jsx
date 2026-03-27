export default function ArticlePage() {
  return (
    <main className="article-page">
      <div className="article-container">
        <h1>Featured Articles</h1>
        <p>Explore our collection of articles about React, Vite, and modern web development.</p>
        
        <article className="article-card">
          <h2>Getting Started with Vite</h2>
          <p className="article-meta">Published on March 28, 2026</p>
          <p>Learn how to set up a Vite project and get the best performance out of your React application.</p>
          <a href="#" className="read-more">Read More →</a>
        </article>

        <article className="article-card">
          <h2>React Best Practices</h2>
          <p className="article-meta">Published on March 25, 2026</p>
          <p>Discover best practices for building scalable and maintainable React applications.</p>
          <a href="#" className="read-more">Read More →</a>
        </article>

        <article className="article-card">
          <h2>Component Reusability</h2>
          <p className="article-meta">Published on March 20, 2026</p>
          <p>Build reusable components that make your codebase more efficient and easier to maintain.</p>
          <a href="#" className="read-more">Read More →</a>
        </article>
      </div>
    </main>
  )
}
