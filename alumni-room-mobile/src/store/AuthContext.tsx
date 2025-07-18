import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

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
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('token');
      if (storedToken) {
        setToken(storedToken);
        // You can fetch user data here if needed
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
      setUser(userData);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setToken(null);
      setUser(null);
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