import React from 'react';
import { useAuth } from '../../context/AuthContext';
import TravelerDashboard from './TravelerDashboard';
import PlannerDashboard from './PlannerDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardHome = () => {
  const { roleName } = useAuth();
  const userRole = roleName || 'TRAVELER';

  switch (userRole) {
    case 'SUPER_ADMIN':
      return <AdminDashboard />;
    case 'EVENT_PLANNER':
      return <PlannerDashboard />;
    case 'TRAVELER':
    default:
      return <TravelerDashboard />;
  }
};

export default DashboardHome;

