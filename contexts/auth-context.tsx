"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  StrapiUser,
  getAuthData,
  setAuthData,
  logout as clearAuth,
} from "@/lib/auth";

interface AuthContextType {
  user: StrapiUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: StrapiUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StrapiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const { token: storedToken, user: storedUser } = getAuthData();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: StrapiUser) => {
    setAuthData({ jwt: newToken, user: newUser });
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
