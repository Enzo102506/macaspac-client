import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Reports', to: '/reports' },
  { label: 'Users', to: '/users' },
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-orange-700/30 bg-gradient-to-r from-black via-slate-950 to-orange-950/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8" />
        </NavLink>

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
    </header>
  );
};

export default NavBar;