import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user, roleName, roleLabel, logout } = useAuth();
  const navigate = useNavigate();
  const userRole = roleName || 'TRAVELER';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define Nav links based on active role
  const getNavLinks = () => {
    switch (userRole) {
      case 'SUPER_ADMIN':
        return [
          { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { to: '/dashboard/user-management', label: 'User Management', icon: 'group' },
          { to: '/dashboard/company-approvals', label: 'Company Approvals', icon: 'verified_user' },
          { to: '/dashboard/activity-logs', label: 'Activity Logs', icon: 'monitoring' },
        ];
      case 'EVENT_PLANNER':
        return [
          { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { to: '/dashboard/package-management', label: 'Package Management', icon: 'inventory_2' },
          { to: '/dashboard/event-management', label: 'Event Management', icon: 'event' },
          { to: '/dashboard/planner-bookings', label: 'Bookings', icon: 'confirmation_number' },
          { to: '/dashboard/company-profile', label: 'Company Profile', icon: 'analytics' },
        ];
      case 'TRAVELER':
      default:
        return [
          { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { to: '/dashboard/explore-packages', label: 'Explore Packages', icon: 'explore' },
          { to: '/dashboard/explore-events', label: 'Explore Events', icon: 'event' },
          { to: '/dashboard/my-bookings', label: 'My Trips', icon: 'flight_takeoff' },
          { to: '/dashboard/favorites', label: 'Wishlist', icon: 'favorite' },
          { to: '/dashboard/itinerary', label: 'Itinerary Planner', icon: 'edit_calendar' },
          { to: '/dashboard/reviews', label: 'Reviews & Ratings', icon: 'rate_review' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="flex bg-background min-h-screen text-on-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border-subtle flex flex-col h-screen fixed left-0 top-0 z-50 py-6">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                flight_takeoff
              </span>
            </div>
            <div>
              <h1 className="font-headline-md text-xl font-bold text-primary">TravelMate</h1>
              <p className="text-xs text-on-surface-variant opacity-70">
                {userRole === 'SUPER_ADMIN' ? 'Enterprise Admin' : userRole === 'EVENT_PLANNER' ? 'Enterprise Edition' : 'Premium Planning'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-grow space-y-1 px-3 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-all ${
                  isActive
                    ? 'bg-surface-container text-primary font-bold border-r-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-auto space-y-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-xl border border-error/30 text-error hover:bg-error/5 font-label-md text-label-md flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border-subtle bg-surface/80 backdrop-blur-xl flex justify-between items-center px-8 sticky top-0 z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                className="w-full bg-surface-container-lowest border border-border-subtle rounded-full py-2 pl-10 pr-4 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search destinations, bookings, or metrics..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <button className="hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="hover:text-primary transition-colors">
                <span className="material-symbols-outlined">help</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-border-subtle"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-label-md text-label-md text-on-surface">{user?.name || 'Alex Mercer'}</p>
                <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
                  {roleLabel}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl font-bold">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

