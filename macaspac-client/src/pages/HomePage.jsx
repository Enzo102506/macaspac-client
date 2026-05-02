import Button from '../components/Button';
import characterImage from '../assets/character.png';
import card1 from '../assets/card1.png';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.png';
import card4 from '../assets/card4.png';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-600 mb-8">
            Hero Section
          </div>
          
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">
                Ichigo Kurosaki

              </h1>
              <p className="text-base leading-7 text-gray-700 mb-8">
                The substitute Soul Reaper with a strong sense of justice and a fierce determination to protect his loved ones. With his unique blend of human and Soul Reaper powers, Ichigo faces countless battles against powerful foes in the world of spirits and hollows.

              </p>
              <Button variant="primary">
                Learn More
              </Button>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-end">
              <img 
                src={characterImage} 
                alt="Character" 
                className="w-full h-72 rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Power Statistics Section */}
      <section className="px-6 py-16 sm:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-600 mb-4">
            Power Statistics
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Combat Strength</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-300 p-8 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Attack 
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-300 p-8 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">97</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Speed
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-300 p-8 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Spiritual Pressure
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-300 p-8 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">96</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
                Technique 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-6 py-16 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-600 mb-4">
            Feature Cards
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Freestyle</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <article className="rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-lg transition bg-white">
              <img 
                src={card1} 
                alt="Feature Card One" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Feature Card One
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-lg transition bg-white">
              <img 
                src={card2} 
                alt="Feature Card Two" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Feature Card Two
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-lg transition bg-white">
              <img 
                src={card3} 
                alt="Feature Card Three" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Feature Card Three
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-gray-300 hover:shadow-lg transition bg-white">
              <img 
                src={card4} 
                alt="Feature Card Four" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Feature Card Four
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;