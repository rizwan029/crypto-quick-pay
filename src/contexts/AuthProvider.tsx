import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setRedirect: (path: string) => void;
  getRedirect: () => string | null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
  setRedirect: () => {},
  getRedirect: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const REDIRECT_KEY = "app_auth_redirect";

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setUser(data.session?.user ?? null);
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      try { listener.subscription.unsubscribe(); } catch {}
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    try { localStorage.removeItem(REDIRECT_KEY); } catch {}
  };

  const setRedirect = (path: string) => {
    try { localStorage.setItem(REDIRECT_KEY, path); } catch (err) { console.warn(err); }
  };

  const getRedirect = () => {
    try { return localStorage.getItem(REDIRECT_KEY); } catch { return null; }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 rounded-md glass-card">
          <p className="text-sm text-muted-foreground">Memuat sesi pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setRedirect, getRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
