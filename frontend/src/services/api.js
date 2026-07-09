import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors (e.g. 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  registerTraveler: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password, roleName: 'TRAVELER' });
    return response.data;
  },
  registerPlanner: async (name, email, password, companyData) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      roleName: 'EVENT_PLANNER',
      company: companyData
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const companyService = {
  registerCompany: async (companyData) => {
    const response = await api.post('/companies', companyData);
    return response.data;
  },
  getCompanyDetails: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },
  getMyCompany: async () => {
    const response = await api.get('/companies/my-company');
    return response.data;
  },
  getPendingCompanies: async () => {
    const response = await api.get('/companies/pending');
    return response.data;
  },
  getAllCompanies: async () => {
    const response = await api.get('/companies');
    return response.data;
  },
  approveCompany: async (id, status) => {
    // status: 'APPROVED' or 'REJECTED'
    const response = await api.put(`/companies/${id}/approve`, { status });
    return response.data;
  }
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  updateUserRole: async (id, roleId) => {
    const response = await api.put(`/users/${id}/role`, { roleId });
    return response.data;
  }
};

export const packageService = {
  getPackages: async (params) => {
    const response = await api.get('/packages', { params });
    return response.data.packages || [];
  },
  getPackage: async (id) => {
    const response = await api.get(`/packages/${id}`);
    return response.data.package || null;
  },
  createPackage: async (packageData) => {
    const response = await api.post('/packages', packageData);
    return response.data.package;
  },
  updatePackage: async (id, packageData) => {
    const response = await api.put(`/packages/${id}`, packageData);
    return response.data.package;
  },
  deletePackage: async (id) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  }
};

export const eventService = {
  getEvents: async (params) => {
    const response = await api.get('/events', { params });
    return response.data.events || [];
  },
  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data.event || null;
  },
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data.event;
  },
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data.event;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};

export const destinationService = {
  getDestinations: async () => {
    const response = await api.get('/destinations');
    return response.data;
  },
  createDestination: async (destinationData) => {
    const response = await api.post('/destinations', destinationData);
    return response.data;
  }
};

export default api;






