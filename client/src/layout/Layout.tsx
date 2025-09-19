import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavButton from '../components/NavButton';
import ChevronIcon from '../components/ChevronIcon';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeNav = location.pathname.includes('winners') ? 'winners' : 'garage';

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 px-6 py-4 relative flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Navigation для широкого экрана */}
        <nav className="hidden md:flex flex-col gap-2 absolute left-6 top-1/2 -translate-y-1/2">
          <NavButton active={activeNav === 'garage'} onClick={() => navigate('/garage')}>
            GARAGE
          </NavButton>
          <NavButton active={activeNav === 'winners'} onClick={() => navigate('/winners')}>
            WINNERS
          </NavButton>
        </nav>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 border-2 border-cyan-400 rounded-lg px-8 py-4 relative">
            <div className="absolute inset-0 bg-cyan-400/10 rounded-lg"></div>
            <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] relative z-10">
              ASYNC RACE
            </h1>
            <div className="absolute inset-0 rounded-lg ring-2 ring-cyan-400/50 ring-inset"></div>
          </div>

          {/* Chevron Icons */}
          <div className="flex justify-center gap-2 mt-4 opacity-60 flex-wrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <ChevronIcon key={i} />
            ))}
          </div>

          {/* Navigation для маленького экрана */}
          <nav className="flex gap-2 mt-4 md:hidden">
            <NavButton active={activeNav === 'garage'} onClick={() => navigate('/garage')}>
              GARAGE
            </NavButton>
            <NavButton active={activeNav === 'winners'} onClick={() => navigate('/winners')}>
              WINNERS
            </NavButton>
          </nav>
        </div>
      </header>

      <main className="p-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
