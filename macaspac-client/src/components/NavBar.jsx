import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';

const publicLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const viewerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const editorLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const adminLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/dashboard/articles' },
  { label: 'Users', to: '/users' },
  { label: 'Reports', to: '/reports' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-orange-400 bg-orange-400 text-slate-950'
      : 'border-transparent text-slate-300 hover:border-orange-400 hover:bg-slate-800/50 hover:text-orange-300',
  ].join(' ');

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userType = localStorage.getItem('type');
  const isDashboardContext = location.pathname.startsWith('/dashboard') || location.pathname === '/users' || location.pathname === '/reports';

  const links = isDashboardContext
    ? []
    : isLoggedIn
      ? userType === 'admin'
        ? adminLinks
        : userType === 'editor'
          ? editorLinks
          : viewerLinks
      : publicLinks;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    navigate('/');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 relative border-b-2 border-orange-700/30 bg-gradient-to-r from-black via-slate-950 to-orange-950/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
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

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition border-red-500/50 text-red-300 hover:border-red-400 hover:bg-red-500/20"
          >
            <LogoutIcon sx={{ fontSize: 16 }} />
            <span>Logout</span>
          </button>
        )}
      </div>

    </header>
  );
};

export default NavBar;