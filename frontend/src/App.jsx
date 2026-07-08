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

          {/* ─── Fallback ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
