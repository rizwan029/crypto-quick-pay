import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Profil</h1>
        <p>Anda belum masuk. Silakan <a href="/login" className="text-primary underline">masuk</a>.</p>
      </div>
    );
  }

  const avatar =
    (user.user_metadata as any)?.avatar_url ||
    (user.user_metadata as any)?.picture ||
    null;

  const fullName = (user.user_metadata as any)?.full_name || "";
  const metadata = user.user_metadata || {};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-background/50 border rounded-lg p-6 flex gap-6 items-center">
        <div className="flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={fullName || user.email || "avatar"} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              {(fullName || user.email || "U").slice(0,2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{fullName || user.email}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Metadata</h3>
            <pre className="text-sm bg-transparent p-2 rounded border overflow-auto max-h-48">{JSON.stringify(metadata, null, 2)}</pre>
          </div>

          <div className="mt-4">
            <Button onClick={() => signOut()} className="bg-red-600">Keluar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}