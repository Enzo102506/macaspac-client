import Button from '../../components/Button';
import aboutImage from '../../assets/goat.gif';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:gap-12">
          <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/70 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-300">
              <span>Ichigo Theme</span>
              <span className="h-px flex-1 bg-orange-500/30" />
            </div>
            <div className="mt-8 rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/20 p-4 shadow-inner shadow-orange-900/20">
              <img
                src={aboutImage}
                alt="Ichigo Kurosaki"
                className="h-96 w-full rounded-[1.75rem] object-cover shadow-2xl shadow-orange-600/20"
              />
            </div>
            <div className="mt-8 space-y-5 px-1 sm:px-2">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The Substitute Soul Reaper's Domain
              </h2>
              <p className="max-w-xl text-sm leading-7 text-orange-200 sm:text-base">
                Ichigo walks between the living world and Hueco Mundo. His story is raw, relentless, and built around protecting those he loves with unmatched spiritual force.
              </p>
              <div className="rounded-3xl border border-orange-500/20 bg-slate-950/85 p-6 shadow-lg shadow-orange-900/10">
                <div className="text-xs uppercase tracking-[0.3em] text-orange-300">Features</div>
                <ul className="mt-4 space-y-3 text-sm text-orange-200">
                  <li>• Dramatic Ichigo-themed hero layout</li>
                  <li>• Dark glass panels with orange glow accents</li>
                  <li>• Responsive split-screen presentation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/70 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl p-8 sm:p-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-orange-300">
              Welcome Back
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ichigo Kurosaki
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-orange-200 sm:text-base">
              The substitute Soul Reaper with a fierce will to protect his friends and family. This page blends the dark elegance of a sign-in layout with Ichigo’s unstoppable energy.
            </p>
            <div className="mt-10 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 text-sm text-orange-200 shadow-inner shadow-orange-900/10">
                  <div className="text-xs uppercase tracking-[0.3em] text-orange-300">Rank</div>
                  <div className="mt-4 text-xl font-bold text-white">Substitute Soul Reaper</div>
                </div>
                <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 text-sm text-orange-200 shadow-inner shadow-orange-900/10">
                  <div className="text-xs uppercase tracking-[0.3em] text-orange-300">Origin</div>
                  <div className="mt-4 text-xl font-bold text-white">Karakura Town</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 text-sm text-orange-200 shadow-inner shadow-orange-900/10">
                  <div className="text-xs uppercase tracking-[0.3em] text-orange-300">Zanpakutō</div>
                  <div className="mt-4 text-xl font-bold text-white">Zangetsu</div>
                </div>
                <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 text-sm text-orange-200 shadow-inner shadow-orange-900/10">
                  <div className="text-xs uppercase tracking-[0.3em] text-orange-300">Specialty</div>
                  <div className="mt-4 text-xl font-bold text-white">Spiritual Pressure</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/" variant="primary">Return Home</Button>
              <Button to="/articles" variant="secondary">View Articles</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
