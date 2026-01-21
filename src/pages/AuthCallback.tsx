import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (supabase?.auth?.getSessionFromUrl) {
          await supabase.auth.getSessionFromUrl({ storeSession: true });
        }
      } catch (err) {
        console.error('Error finalizing OAuth session:', err);
      } finally {
        const params = new URLSearchParams(location.search);
        const redirectTo = params.get('redirect') || '/';
        navigate(redirectTo, { replace: true });
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded glass-card">
        <p className="text-sm text-muted-foreground">Memproses login... Anda akan diarahkan segera.</p>
      </div>
    </div>
  );
}