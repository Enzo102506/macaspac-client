const Footer = () => {
  const handleTermsClick = (e) => {
    e.preventDefault();
    window.location.href = '/not-found';
  };

  return (
    <footer className="bg-gradient-to-r from-black via-slate-950 to-orange-950/40 text-white border-t-2 border-orange-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-orange-300">Ichigo's Journey</h3>
            <p className="text-sm text-slate-300">
              Explore the world of Soul Reapers and the supernatural battles that define honor and protection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-orange-300">Quick Links</h4>
            <a href="/" className="text-slate-300 hover:text-orange-400 transition text-sm">
              Home
            </a>
            <a href="/about" className="text-slate-300 hover:text-orange-400 transition text-sm">
              About
            </a>
            <a href="/articles" className="text-slate-300 hover:text-orange-400 transition text-sm">
              Articles
            </a>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-orange-300">Connect</h4>
            <p className="text-sm text-slate-300">
              Follow for updates on Ichigo's story and exclusive content.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-300 hover:text-orange-400 transition text-sm">
                Twitter
              </a>
              <a href="#" className="text-slate-300 hover:text-orange-400 transition text-sm">
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-700/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2026 Ichigo Kurosaki. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-300 hover:text-orange-300 transition">
                Privacy Policy
              </a>
              <a href="/not-found" onClick={handleTermsClick} className="text-sm text-slate-300 hover:text-orange-300 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
