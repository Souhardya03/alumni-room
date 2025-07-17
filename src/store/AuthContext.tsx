"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetProfileQuery } from "./baseApi";

interface AuthContextType {
  token: string | null;
  data: any;
  refreshTokenFromCookie: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  data: null,
  refreshTokenFromCookie: () => {},
  refetch: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [shouldSkip, setShouldSkip] = useState(true);

  const { data, refetch } = useGetProfileQuery(undefined, {
    skip: shouldSkip,
  });

  const refreshTokenFromCookie = () => {
    const cookieToken = Cookies.get("token") || null;
    setToken(cookieToken);
    if (cookieToken) {
      setShouldSkip(false);
      refetch();
    } else {
      setShouldSkip(true);
    }
  };

  useEffect(() => {
    refreshTokenFromCookie(); // on first load
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, refreshTokenFromCookie, data, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
