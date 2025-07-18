import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from './slices/authSlice';
import { useGetProfileQuery } from './baseApi';

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { data: user, refetch } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken) {
        setToken(storedToken);
        dispatch(setCredentials({ token: storedToken, user: null }));
      }
    } catch (error) {
      console.error('Error loading stored token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string, userData: any) => {
    try {
      await SecureStore.setItemAsync('token', newToken);
      setToken(newToken);
      dispatch(setCredentials({ token: newToken, user: userData }));
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
      dispatch(logout());
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout: logoutUser,
        isLoading,
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