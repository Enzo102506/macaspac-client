import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-6 sm:px-6">
      <section className="border-y-2 border-gray-300 bg-gray-50 py-6 sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
          Spider-Man Archives
        </div>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
          Spider-Man Chronicles
        </h1>
        <div className="mt-4 max-w-xl text-sm leading-7 text-gray-700">
          Explore in-depth articles about Spider-Man's greatest battles, villains, and heroic moments throughout the years.
        </div>
      </section>

      <section className="border-y-2 border-gray-300 bg-gray-50 py-6 sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600">
          Featured Articles
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
          Latest Stories
        </h2>
      </section>

      <div className="px-6 py-4 grid grid-cols-3 gap-3">
        <article className="rounded-lg border-2 border-gray-300 bg-white p-2 flex flex-col">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-zinc-300 flex-shrink-0" />
          <div className="mt-2 flex-grow flex flex-col">
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Article One
            </div>
            <h3 className="mt-0.5 text-xs font-bold leading-3 text-gray-900">
              The Origin of Spider-Man
            </h3>
            <p className="mt-1 text-[8px] leading-3 text-gray-700 flex-grow">
              Discover the story of how a ordinary teenager was bitten by a radioactive spider and gained extraordinary powers.
            </p>
            <Button className="mt-2 text-xs py-1" variant="primary">Read More</Button>
          </div>
        </article>

        <article className="rounded-lg border-2 border-gray-300 bg-white p-2 flex flex-col">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-zinc-300 flex-shrink-0" />
          <div className="mt-2 flex-grow flex flex-col">
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Article Two
            </div>
            <h3 className="mt-0.5 text-xs font-bold leading-3 text-gray-900">
              Epic Battles Against His Greatest Enemies
            </h3>
            <p className="mt-1 text-[8px] leading-3 text-gray-700 flex-grow">
              From Green Goblin to Doctor Octopus, explore Spider-Man's most intense and memorable confrontations.
            </p>
            <Button className="mt-2 text-xs py-1" variant="primary">Read More</Button>
          </div>
        </article>

        <article className="rounded-lg border-2 border-gray-300 bg-white p-2 flex flex-col">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-zinc-300 flex-shrink-0" />
          <div className="mt-2 flex-grow flex flex-col">
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Article Three
            </div>
            <h3 className="mt-0.5 text-xs font-bold leading-3 text-gray-900">
              The Web-Slinger's Role in the Multiverse
            </h3>
            <p className="mt-1 text-[8px] leading-3 text-gray-700 flex-grow">
              Understand how Spider-Man connects different universes and the impact of multiverse conflicts on the hero.
            </p>
            <Button className="mt-2 text-xs py-1" variant="primary">Read More</Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;