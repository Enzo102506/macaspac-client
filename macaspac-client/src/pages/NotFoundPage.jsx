import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl">
        <div className="grid gap-0 md:grid-cols-[1.3fr_1fr]">
          <div className="p-10 md:p-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Page Not Found
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-950">
              The path has vanished into Hueco Mundo
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
              Ichigo tried to follow the wrong portal. The page you were looking for has disappeared into the void. Return to the living world or explore another path.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/" variant="primary">
                Go Home
              </Button>
              <Button to="/articles" variant="secondary">
                Read Articles
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-sm text-gray-500">
              <p>Tip: use the menu to move between Home, About, and Articles.</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gray-950 p-6 md:p-0">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWNjejMxbTZpMWNlcGtnZTVyMzVhbzBwNWMxMjFlNGphMjRwdnBqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/byTVPe9Cz5RM4/giphy.gif"
              alt="Ichigo Bleach gif"
              className="relative h-80 w-full object-cover md:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
