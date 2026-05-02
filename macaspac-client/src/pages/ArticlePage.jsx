import Button from '../components/Button';
import articles from './article-content';

const ArticlePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white py-6 sm:px-6">
      <section className="border-y border-orange-700/30 bg-slate-950/80 py-8 sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
          Soul Reaper Archives
        </div>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-white">
          Ichigo Kurosaki Chronicles
        </h1>
        <div className="mt-4 max-w-2xl text-sm leading-7 text-orange-200">
          Discover the most powerful moments, transformations, and battles that shaped Ichigo’s journey through the Soul Society and beyond.
        </div>
      </section>

      <section className="mt-8 px-6 sm:px-0">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="rounded-3xl border border-orange-700/30 bg-slate-950/90 overflow-hidden shadow-lg shadow-orange-900/20 transition hover:-translate-y-1">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-300">
                  {article.category}
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{article.title}</h2>
                <p className="mt-3 text-sm leading-7 text-orange-200">{article.excerpt}</p>
                <Button className="mt-6 text-xs py-2 bg-orange-500 text-black border-orange-500 hover:bg-orange-400" variant="primary">
                  {article.button}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;