import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home', match: (path) => path === '/' },
  { to: '/about', label: 'About', match: (path) => path.startsWith('/about') },
  { to: '/packages', label: 'Packages', match: (path) => path.startsWith('/packages') },
  { to: '/events', label: 'Events', match: (path) => path.startsWith('/events') },
];

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [converterOpen, setConverterOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20 bg-surface/80 backdrop-blur-md border-b border-border-subtle shadow-sm">
      <div className="flex items-center gap-10">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
          TravelMate
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body-md text-body-md transition-colors duration-200 ${
                link.match(location.pathname)
                  ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setConverterOpen(!converterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-body-sm font-label-md text-on-surface hover:bg-surface-variant/40 transition-all"
          >
            <span className="material-symbols-outlined text-lg">currency_exchange</span>
            <span>USD to ETB</span>
          </button>
          {converterOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-border-subtle rounded-xl shadow-lg p-4 text-sm z-50">
              <p className="font-bold text-on-surface">1 USD = 150 ETB</p>
              <p className="text-xs text-on-surface-variant mt-1">Fixed TravelMate rate</p>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-variant transition-all focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-primary-fixed-dim text-primary flex items-center justify-center font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden md:inline font-label-md text-on-surface pr-1">{user?.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border-subtle rounded-xl shadow-lg py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-border-subtle">
                  <p className="font-label-md text-on-surface truncate">{user?.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                  <p className="text-[10px] uppercase font-bold text-primary mt-1 tracking-wider">{user?.role?.name || user?.role}</p>
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2.5 text-body-sm text-error hover:bg-error-container/20 flex items-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block font-label-md text-on-surface-variant px-4 py-2 hover:bg-surface-variant rounded-lg transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register/traveler')}
              className="bg-primary text-on-primary font-label-md px-6 py-2.5 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
