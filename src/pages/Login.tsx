import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const signInWithProvider = async (provider: "google" | "facebook" | "twitter") => {
    try {
      const redirectTo = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(currentPath)}`;
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
    } catch (err) {
      console.error("Login error:", err);
      alert("Gagal memulai proses login. Periksa console untuk detail.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Masuk</h1>
        <p className="text-sm text-muted-foreground mb-6">Masuk menggunakan akun sosial Anda</p>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => signInWithProvider("google")}>Masuk dengan Google</Button>
          <Button className="w-full" onClick={() => signInWithProvider("facebook")}>Masuk dengan Facebook</Button>
          <Button className="w-full" onClick={() => signInWithProvider("twitter")}>Masuk dengan Twitter</Button>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>Jika Anda mengalami masalah, pastikan redirect URL terdaftar di Supabase dan
            VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY sudah benar.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;