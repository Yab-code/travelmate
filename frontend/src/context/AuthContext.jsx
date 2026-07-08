import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

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

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
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
      // Automatically log in or redirect to login page.
      // If the backend login immediately after register, we can save token.
      // Assuming traveler registration returns standard message, and traveler must login,
      // or if it returns token/user:
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
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
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
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


  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const roleName = getRoleName(user);

  const value = {
    user,
    roleName,
    roleLabel: getRoleLabel(roleName),
    loading,
    error,
    login,
    registerTraveler,
    registerPlanner,
    logout,
    getDashboardPath,
    isAuthenticated: !!user,
    isSuperAdmin: roleName === 'SUPER_ADMIN',
    isEventPlanner: roleName === 'EVENT_PLANNER',
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



