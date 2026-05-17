import Button from '../../components/Button';
import characterImage from '../../assets/character.png';
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import card4 from '../../assets/card4.png';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white">
      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300 mb-8">
            Hero Section
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <h1 className="text-5xl font-bold leading-tight text-white mb-6">
                Ichigo Kurosaki
              </h1>
              <p className="text-base leading-7 text-orange-200 mb-8">
                The substitute Soul Reaper with a strong sense of justice and fierce determination to protect his loved ones. With his unique blend of human and Soul Reaper powers, Ichigo faces countless battles against powerful foes in the world of spirits and hollows.
              </p>
              <Button variant="primary" className="bg-orange-500 text-black hover:bg-orange-400 border-orange-500">
                Learn More
              </Button>
            </div>

            <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <img
                src={characterImage}
                alt="Character"
                className="w-full h-96 rounded-[2rem] object-cover shadow-2xl shadow-orange-700/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300 mb-4">
            Power Statistics
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Combat Strength</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {['Attack', 'Speed', 'Spiritual Pressure', 'Technique'].map((label) => (
              <div key={label} className="rounded-3xl border border-orange-700/20 bg-slate-900/90 p-8 text-center shadow-lg shadow-orange-900/10">
                <div className="text-4xl font-bold text-white mb-2">100</div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300 mb-4">
            Command Center
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Ichigo Mission Control</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Dashboard',
                description: 'View team status, mission objectives, and Soul Reaper readiness.',
                to: '/dashboard',
              },
              {
                title: 'Reports',
                description: 'Inspect battle logs, power trends, and spirit energy estimates.',
                to: '/reports',
              },
              {
                title: 'Users',
                description: 'Monitor allies, squad status, and active Soul Reaper profiles.',
                to: '/users',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-orange-700/20 bg-slate-950/85 p-8 shadow-lg shadow-orange-900/20">
                <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 mb-6">{item.description}</p>
                <Button to={item.to} variant="primary" className="bg-orange-500 text-black hover:bg-orange-400 border-orange-500">
                  Open {item.title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300 mb-4">
            Features
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Featured Characters</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { card: card1, name: 'Ichigo Vs Ulquiorra' },
              { card: card2, name: 'Grimmjow Vs Ichigo' },
              { card: card3, name: 'Vasto Ichigoat' },
              { card: card4, name: 'The Goat Ichigo' }
            ].map(({ card, name }, index) => (
              <article key={index} className="rounded-[2rem] overflow-hidden border border-orange-700/20 bg-slate-950/85 shadow-lg shadow-orange-900/20 transition hover:-translate-y-1">
                <img
                  src={card}
                  alt={name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;