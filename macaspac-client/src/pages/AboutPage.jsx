import Button from '../components/Button';
import aboutImage from '../assets/goat.gif';

const AboutPage = () => {
  return (
    <div className="about-page min-h-screen bg-gray-100 text-gray-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-600">
          <span>About Section</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-4 shadow-xl shadow-gray-200/60 sm:p-6">
            <div className="overflow-hidden rounded-[1.75rem] bg-[#0f172a]">
              <img
                src={aboutImage}
                alt="Ichigo Kurosaki"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-3 px-3 pb-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-600">
                Ichigo Theme
              </div>
              <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
                The Substitute Soul Reaper's Domain
              </h2>
              <p className="text-sm leading-7 text-gray-600">
                A warrior who walks between worlds, Ichigo fights to protect the living and the spirit realm. His power is raw, relentless, and driven by an unbreakable heart.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/60">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Character Profile
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                Ichigo Kurosaki
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-gray-700">
                The substitute Soul Reaper with a fierce will to protect those he loves. Ichigo's journey is defined by his transformation from ordinary teen to legendary warrior.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/" variant="primary">Return Home</Button>
                <Button to="/articles" variant="secondary">View Articles</Button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">Rank</p>
                <p className="mt-4 text-2xl font-bold text-gray-950">Substitute Soul Reaper</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">Origin</p>
                <p className="mt-4 text-2xl font-bold text-gray-950">Karakura Town</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">Zanpakutō</p>
                <p className="mt-4 text-2xl font-bold text-gray-950">Zangetsu</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">Specialty</p>
                <p className="mt-4 text-2xl font-bold text-gray-950">Spiritual Pressure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
