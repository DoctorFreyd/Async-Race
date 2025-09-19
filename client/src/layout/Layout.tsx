import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 px-6 py-4 flex gap-4">
        <Link to="/garage" className="hover:underline">
          Garage
        </Link>
        <Link to="/winners" className="hover:underline">
          Winners
        </Link>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
