import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "./baseApi";

interface AuthContextType {
  token: string | null;
  data: any;
  refreshTokenFromCookie: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [skip, setSkip] = useState(true);

  const { data, refetch } = useGetProfileQuery(undefined, {
    skip,
  });

  const refreshTokenFromCookie = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      setToken(storedToken);
      setSkip(!storedToken);

      if (storedToken) {
        refetch();
      }
    } catch (error) {
      console.error("Error reading token from AsyncStorage:", error);
      setToken(null);
      setSkip(true);
    }
  };

  useEffect(() => {
    refreshTokenFromCookie();
  }, []);

  // Update token when login/logout happens
  useEffect(() => {
    const saveToken = async () => {
      try {
        if (data?.data?.token) {
          await AsyncStorage.setItem("authToken", data.data.token);
          setToken(data.data.token);
        }
      } catch (error) {
        console.error("Error saving token to AsyncStorage:", error);
      }
    };

    if (data?.data?.token) {
      saveToken();
    }
  }, [data]);

  const contextValue: AuthContextType = {
    token,
    data,
    refreshTokenFromCookie,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
