"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import jsCookie from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = jsCookie.get("jbf_admin_token");
    if (saved) {
      setToken(saved);
      fetch(`${API}/api/admin/auth/profile`, {
        headers: { Authorization: `Bearer ${saved}` },
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => setAdmin(data))
        .catch(() => {
          jsCookie.remove("jbf_admin_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login failed");
    }
    const data = await res.json();
    jsCookie.set("jbf_admin_token", data.token, { expires: 7 });
    setToken(data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    jsCookie.remove("jbf_admin_token");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const { admin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !admin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [admin, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!admin && pathname !== "/admin/login") return null;

  return <>{children}</>;
}

export function useAdminFetch() {
  const { token } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetcher = async (path: string, options?: RequestInit) => {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });
    if (res.status === 401) {
      jsCookie.remove("jbf_admin_token");
      window.location.href = "/admin/login";
      throw new Error("Unauthorized");
    }
    return res;
  };

  return fetcher;
}
