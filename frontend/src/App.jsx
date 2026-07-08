import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth Pages
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TravelerRegister from './pages/TravelerRegister';
import PlannerRegister from './pages/PlannerRegister';

// Global Pages
import Home from './pages/Home';
import TravelPackages from './pages/TravelPackages';
import PackageDetails from './pages/PackageDetails';
import Events from './pages/Events';
import About from './pages/About';

// Ethiopia Pages
import HomeEthiopia from './pages/HomeEthiopia';
import TravelPackagesEthiopia from './pages/TravelPackagesEthiopia';
import PackageDetailsEthiopia from './pages/PackageDetailsEthiopia';
import EventsEthiopia from './pages/EventsEthiopia';
import AboutEthiopia from './pages/AboutEthiopia';

// Dashboard Components
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';

// Admin Dashboard Components
import AdminUserManagement from './pages/dashboard/AdminUserManagement';
import AdminCompanyApprovals from './pages/dashboard/AdminCompanyApprovals';
import AdminActivityLogs from './pages/dashboard/AdminActivityLogs';

// Planner Dashboard Components
import PlannerPackageManagement from './pages/dashboard/PlannerPackageManagement';
import PlannerEventManagement from './pages/dashboard/PlannerEventManagement';
import PlannerBookings from './pages/dashboard/PlannerBookings';
import PlannerCompanyProfile from './pages/dashboard/PlannerCompanyProfile';
import PlannerCreateEditPackage from './pages/dashboard/PlannerCreateEditPackage';
import PlannerCreateEditEvent from './pages/dashboard/PlannerCreateEditEvent';

// Traveler Dashboard Components
import TravelerExplorePackages from './pages/dashboard/TravelerExplorePackages';
import TravelerExploreEvents from './pages/dashboard/TravelerExploreEvents';
import TravelerBookings from './pages/dashboard/TravelerBookings';
import TravelerBookingDetails from './pages/dashboard/TravelerBookingDetails';
import TravelerFavorites from './pages/dashboard/TravelerFavorites';
import TravelerItinerary from './pages/dashboard/TravelerItinerary';
import TravelerReviews from './pages/dashboard/TravelerReviews';

/**
 * Layout wrapper that includes Navbar + Footer around page content.
 * All public-facing pages share this shell.
 */
const AppLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ─── Auth Routes (no Navbar/Footer) ─── */}
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register/traveler" element={<TravelerRegister />} />
          <Route path="/register/planner" element={<PlannerRegister />} />

          {/* ─── Global (International) Routes ─── */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/packages"
            element={
              <AppLayout>
                <TravelPackages />
              </AppLayout>
            }
          />
          <Route
            path="/packages/:id"
            element={
              <AppLayout>
                <PackageDetails />
              </AppLayout>
            }
          />
          <Route
            path="/events"
            element={
              <AppLayout>
                <Events />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />

          {/* ─── Ethiopia (/et) Routes ─── */}
          <Route
            path="/et"
            element={
              <AppLayout>
                <HomeEthiopia />
              </AppLayout>
            }
          />
          <Route
            path="/et/packages"
            element={
              <AppLayout>
                <TravelPackagesEthiopia />
              </AppLayout>
            }
          />
          <Route
            path="/et/packages/:id"
            element={
              <AppLayout>
                <PackageDetailsEthiopia />
              </AppLayout>
            }
          />
          <Route
            path="/et/events"
            element={
              <AppLayout>
                <EventsEthiopia />
              </AppLayout>
            }
          />
          <Route
            path="/et/about"
            element={
              <AppLayout>
                <AboutEthiopia />
              </AppLayout>
            }
          />

          {/* ─── Dashboard Routes (Nested under /dashboard) ─── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />

            {/* SUPER_ADMIN Pages */}
            <Route
              path="user-management"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminUserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="company-approvals"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminCompanyApprovals />
                </ProtectedRoute>
              }
            />
            <Route
              path="activity-logs"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <AdminActivityLogs />
                </ProtectedRoute>
              }
            />

            {/* EVENT_PLANNER Pages */}
            <Route
              path="package-management"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerPackageManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="package-new"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerCreateEditPackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="package-edit/:id"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerCreateEditPackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="event-management"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerEventManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="event-new"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerCreateEditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="event-edit/:id"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerCreateEditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="planner-bookings"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="company-profile"
              element={
                <ProtectedRoute allowedRoles={['EVENT_PLANNER']}>
                  <PlannerCompanyProfile />
                </ProtectedRoute>
              }
            />

            {/* TRAVELER Pages */}
            <Route
              path="explore-packages"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerExplorePackages />
                </ProtectedRoute>
              }
            />
            <Route
              path="explore-events"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerExploreEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-bookings"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="booking-details/:id"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerBookingDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="favorites"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerFavorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="itinerary"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerItinerary />
                </ProtectedRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <ProtectedRoute allowedRoles={['TRAVELER']}>
                  <TravelerReviews />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ─── Fallback ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;



