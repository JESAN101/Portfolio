import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/apiServices";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await authApi.getMe();
          setAdmin(data.admin);
        } catch {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem("token", data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
