import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  profileApi,
  skillApi,
  projectApi,
  experienceApi,
  educationApi,
  certificateApi,
} from "../services/publicApi";

const PortfolioContext = createContext(null);

const DEFAULT_LIMIT = 100;

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [profileRes, skillsRes, projectsRes, experienceRes, educationRes, certificatesRes] =
        await Promise.all([
          profileApi.get(),
          skillApi.getAll({ limit: DEFAULT_LIMIT, sort: "order" }),
          projectApi.getAll({ published: true, limit: DEFAULT_LIMIT }),
          experienceApi.getAll(),
          educationApi.getAll(),
          certificateApi.getAll(),
        ]);

      setData({
        profile: profileRes.data.data,
        skills: skillsRes.data.data,
        projects: projectsRes.data.data,
        experience: experienceRes.data.data,
        education: educationRes.data.data,
        certificates: certificatesRes.data.data,
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const value = useMemo(
    () => ({ ...data, loading, error, retry: fetchAll }),
    [data, loading, error, fetchAll]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};
