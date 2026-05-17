import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import logo from '../assets/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-orange-400 bg-orange-400 text-slate-950'
      : 'border-transparent text-slate-300 hover:border-orange-400 hover:bg-slate-800/50 hover:text-orange-300',
  ].join(' ');

const NavBar = () => {
  const [open, setOpen] = useState(false);

  // explicit side links with icons to match DashLayout
  const sideLinks = [
    { label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { label: 'Reports', to: '/reports', icon: <BarChartIcon sx={{ fontSize: 20 }} /> },
    { label: 'Users', to: '/users', icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 relative border-b-2 border-orange-700/30 bg-gradient-to-r from-black via-slate-950 to-orange-950/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open sidebar"
            onClick={() => setOpen(true)}
            className="absolute left-3 top-3 inline-flex items-center justify-center rounded-lg border border-slate-700 w-10 h-10 text-slate-300 hover:bg-slate-800/50 hover:border-orange-400"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
              <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
              <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
            </div>
          </button>

          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8" />
          </NavLink>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-slate-950 to-orange-950/85 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
          <aside
            className={`absolute left-0 top-0 h-full w-64 p-4 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, rgba(6,10,18,0.98) 0%, rgba(15,23,42,0.98) 100%)',
              borderRight: '1px solid rgba(249,115,22,0.18)',
              boxShadow: '0 6px 24px rgba(2,6,23,0.6)',
            }}
          >
            <div className="mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 w-9 h-9 text-slate-300 hover:bg-slate-800/50 hover:border-orange-400"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
                    <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
                    <span className="block w-4 h-0.5 bg-slate-300 rounded-full"></span>
                  </div>
                </button>

                <div>
                  <div className="text-2xl font-extrabold text-slate-100">Ichigo HQ</div>
                  <div className="text-sm text-slate-300 mt-1">Soul Reaper command center</div>
                </div>
              </div>
            </div>

            <div className="border-b" style={{ borderColor: 'rgba(249,115,22,0.15)' }} />

            <nav className="flex flex-col gap-2 mt-4">
              {sideLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={false}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded ${isActive ? 'bg-[rgba(86,48,35,1)] text-white' : 'text-slate-300 hover:bg-slate-700/20 hover:text-orange-300'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="text-slate-200">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
      </div>
    </header>
  );
};

export default NavBar;