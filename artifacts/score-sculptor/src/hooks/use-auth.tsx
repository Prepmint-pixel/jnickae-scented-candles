import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useGetMe, login, logout, LoginBody, setAuthTokenGetter } from "@workspace/api-client-react";
import { User } from "@workspace/api-client-react/src/generated/api.schemas";
import { useLocation } from "wouter";

// Wire the localStorage token into every API request automatically
setAuthTokenGetter(() => localStorage.getItem("ss_token"));

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginUser: (data: LoginBody) => Promise<void>;
  logoutUser: () => Promise<void>;
  setToken: (token: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem("ss_token"));
  const [, setLocation] = useLocation();

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("ss_token", newToken);
    } else {
      localStorage.removeItem("ss_token");
    }
    setTokenState(newToken);
  };

  const { data: user, isLoading: isUserLoading, error } = useGetMe({
    query: {
      enabled: !!token,
      retry: false,
    },
  });

  useEffect(() => {
    if (error) {
      setToken(null);
    }
  }, [error]);

  const loginUser = async (data: LoginBody) => {
    const res = await login(data);
    setToken(res.token);
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setToken(null);
      setLocation("/login");
    }
  };

  const isLoading = !!token && isUserLoading;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        loginUser,
        logoutUser,
        setToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
