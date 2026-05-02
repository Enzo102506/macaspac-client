import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="about-page min-h-screen bg-white text-gray-900">
      <div className="rounded-[1.25rem] bg-gray-50 px-4 py-6">
        <button className="max-w-md bg-white font-bold text-gray-900 px-4 mb-5" type="button">
          About Ichigo Kurosaki
        </button>
      </div>

      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
        Soul Reaper Protector
      </div>
      <div className="max-w-xl text-xl font-bold leading-tight text-gray-900">
        Ichigo Kurosaki: The Substitute Soul Reaper
      </div>

      <div className="mt-4 max-w-xl text-sm leading-7 text-gray-700 py-6">
        Ichigo Kurosaki is a young man who gained the powers of a Soul Reaper, dedicating himself to protecting both the living world and the Spirit Realm. With his unique blend of human determination and spiritual strength, he faces formidable enemies to preserve peace.
      </div>

      <button className="bg-gray-50 px-4 py-6">
        <p className="text-gray-900">Explore Ichigo's Journey</p>
      </button>

      <section className="bg-gray-50 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
          Spiritual Powers
        </div>
        <h2 className="text-2xl font-bold leading-tight text-gray-900">Soul Reaper Abilities</h2>
        <div className="mt-2 text-xl text-gray-700">Ichigo wields tremendous spiritual power, wielding Zangetsu and mastering multiple sword techniques to protect those he cares about.</div>
        <article className="rounded-3xl border-2 border-gray-300 bg-white py-6 px-4">
          <h3 className="text-lg font-semibold text-gray-900">Bankai Form</h3>
          <p className="text-gray-700 mt-2">Ichigo's most powerful state, allowing him to dramatically increase his speed, strength, and spiritual pressure. His black-clad form becomes an unstoppable force against even the strongest opponents.</p>
        </article>
      </section>

      <section className="bg-gray-50 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
          Allies & Friends
        </div>
        <h2 className="text-2xl font-bold leading-tight text-gray-900">Trusted Companions</h2>
        <article className="rounded-3xl border-2 border-gray-300 bg-white py-6 px-4">
          <h3 className="text-lg font-semibold text-gray-900">Rukia Kuchiki</h3>
          <p className="text-gray-700 mt-2">The Soul Reaper who granted Ichigo his powers and became his closest ally. Their bond transcends the Spirit Realm and the living world.</p>
        </article>
      </section>

      <section className="bg-gray-50 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
          Enemies & Rivals
        </div>
        <h2 className="text-2xl font-bold leading-tight text-gray-900">Formidable Foes</h2>
        <article className="rounded-3xl border-2 border-gray-300 bg-white py-6 px-4">
          <h3 className="text-lg font-semibold text-gray-900">Sosuke Aizen</h3>
          <p className="text-gray-700 mt-2">The mastermind villain who orchestrated the events surrounding Ichigo's journey. A powerful Soul Reaper captain with deceptive abilities and grand ambitions.</p>
        </article>
      </section>

      <section className="bg-gray-50 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
          Victories & Achievements
        </div>
        <h2 className="text-2xl font-bold leading-tight text-gray-900">Hero's Triumphs</h2>
        <article className="rounded-3xl border-2 border-gray-300 bg-white py-6 px-4">
          <h3 className="text-lg font-semibold text-gray-900">Worlds Saved</h3>
          <p className="text-gray-700 mt-2">Ichigo has repeatedly saved both the Soul Society and the human world from destruction, proving himself one of the greatest warriors across all realms.</p>
        </article>
      </section>

      <section className="bg-gray-50 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
          Personal Journey
        </div>
        <h2 className="text-2xl font-bold leading-tight text-gray-900">Growth & Determination</h2>
        <article className="rounded-3xl border-2 border-gray-300 bg-white py-6 px-4">
          <h3 className="text-lg font-semibold text-gray-900">Unwavering Spirit</h3>
          <p className="text-gray-700 mt-2">Despite starting as an ordinary high school student, Ichigo never backs down from a challenge. His protective instinct and determination have made him one of Soul Society's most powerful warriors.</p>
        </article>
      </section>

      <section className="bg-gray-50 py-6">
        <div className="grid gap-4 [grid-cols-[1.1fr,0.9fr]]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
            Soul Reaper Legacy
          </div>
          <button className="text-2xl font-bold leading-tight text-gray-900">Read His Story</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;