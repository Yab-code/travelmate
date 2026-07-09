import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService, userService } from '../services/api';

const AuthContext = createContext(null);

export const getRoleName = (account) => {
  if (!account) return null;
  return typeof account.role === 'string' ? account.role : account.role?.name || null;
};

export const getRoleLabel = (roleName) => {
  const labels = {
    SUPER_ADMIN: 'Super Admin',
    EVENT_PLANNER: 'Event Planner',
    TRAVELER: 'Traveler',
  };
  return labels[roleName] || 'Traveler';
};

export const getDashboardPath = () => '/dashboard';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const persistUser = (nextUser) => {
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  useEffect(() => {
    const hydrate = async () => {
      const currentUser = authService.getCurrentUser();
      const token = localStorage.getItem('token');
      if (!currentUser || !token) {
        setLoading(false);
        return;
      }

      setUser(currentUser);
      try {
        const profile = await userService.getProfile();
        if (profile.user) persistUser(profile.user);
      } catch (err) {
        console.error('Failed to refresh profile:', err);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const registerTraveler = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerTraveler(name, email, password);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        persistUser(data.user);
      }
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const registerPlanner = async (name, email, password, companyData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.registerPlanner(name, email, password, companyData);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        persistUser(data.user);
      }
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Planner registration failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const profile = await userService.getProfile();
    if (profile.user) persistUser(profile.user);
    return profile.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const roleName = getRoleName(user);
  const isPendingPlanner = roleName === 'EVENT_PLANNER' && user?.companyStatus !== 'APPROVED';

  const value = {
    user,
    roleName,
    roleLabel: getRoleLabel(roleName),
    loading,
    error,
    login,
    registerTraveler,
    registerPlanner,
    refreshUser,
    logout,
    getDashboardPath,
    isAuthenticated: !!user,
    isSuperAdmin: roleName === 'SUPER_ADMIN',
    isEventPlanner: roleName === 'EVENT_PLANNER',
    isPendingPlanner,
    isTraveler: roleName === 'TRAVELER',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
