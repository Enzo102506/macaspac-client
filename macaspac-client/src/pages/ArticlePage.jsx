import Button from '../components/Button';
import articles from './article-content';

const ArticlePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-6 sm:px-6">
      <section className="border-y-2 border-gray-300 bg-gray-50 py-8 sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
          Soul Reaper Archives
        </div>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-950">
          Ichigo Kurosaki Chronicles
        </h1>
        <div className="mt-4 max-w-2xl text-sm leading-7 text-gray-700">
          Discover the most powerful moments, transformations, and battles that shaped Ichigo’s journey through the Soul Society and beyond.
        </div>
      </section>

      <section className="mt-8 px-6 sm:px-0">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="rounded-3xl border-2 border-gray-300 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">
                {article.category}
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-950">{article.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{article.excerpt}</p>
              <Button className="mt-6 text-xs py-2" variant="primary">
                {article.button}
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;