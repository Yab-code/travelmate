import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PendingPlannerNotice = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 pt-8">
      <div className="w-full max-w-xl bg-white border border-accent-yellow/30 shadow-xl rounded-2xl p-6 text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-accent-yellow/10 text-accent-yellow flex items-center justify-center">
          <span className="material-symbols-outlined">pending_actions</span>
        </div>
        <h1 className="text-xl font-bold text-on-surface mb-2">Account pending Super Admin approval</h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Your Event Planner account is waiting for Super Admin approval. Dashboard pages and system features will unlock once approval is granted.
        </p>
        <button onClick={logout} className="mt-6 px-5 py-2.5 rounded-xl border border-border-subtle text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low">
          Sign out
        </button>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated, isPendingPlanner } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isPendingPlanner) {
    return <PendingPlannerNotice />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = typeof user?.role === 'string' ? user.role : user?.role?.name;
    const hasRole = allowedRoles.includes(userRole);
    if (!hasRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
