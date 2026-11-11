import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rk_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('rk_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('rk_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('[Auth] Session check failed, clearing stored token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res?.token && res?.user) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('rk_token', res.token);
      localStorage.setItem('rk_user', JSON.stringify(res.user));
      return res.user;
    }
    throw new Error(res?.message || 'Login failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rk_token');
    localStorage.removeItem('rk_user');
  };

  const updateProfile = async (data) => {
    const res = await api.put('/auth/profile', data);
    if (res?.user) {
      setUser((prev) => ({ ...prev, ...res.user }));
      localStorage.setItem('rk_user', JSON.stringify({ ...user, ...res.user }));
    }
    return res;
  };

  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.put('/auth/change-password', { currentPassword, newPassword });
    if (res?.token) {
      setToken(res.token);
      localStorage.setItem('rk_token', res.token);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
        isSuperAdmin: user?.role === 'superadmin',
        loading,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

