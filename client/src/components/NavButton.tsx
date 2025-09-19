import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]'
        : 'bg-gray-900/60 text-cyan-300 border-cyan-500/40 hover:bg-gray-800/80 hover:border-cyan-400/60 hover:text-cyan-200 hover:shadow-[0_0_6px_rgba(34,211,238,0.2)]'
    }`}
    aria-label={`Navigate to ${children}`}
  >
    {children}
  </button>
);

export default NavButton;
