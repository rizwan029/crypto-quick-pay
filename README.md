#### Tambahan fitur (Admin Dashboard, Lovable Cloud, Transaction Status, FAQ, Testimonial)

Cara setup singkat:
1. Siapkan akun Lovable Cloud (Postgres) — dapatkan LOVABLE_API_URL dan LOVABLE_API_KEY.
2. Isi `.env` berdasarkan `.env.example`.
3. Jalankan migration contoh: `psql < supabase/lovable_schema.sql` (atau gunakan tools Lovable Cloud untuk migration).
4. Jalankan aplikasi (dev) seperti biasa: `bun dev` / `npm run dev` / `yarn dev`.
5. Akses halaman admin: /admin (pastikan proteksi autentikasi dipasang sesuai kebutuhan).

Catatan keamanan:
- Contoh ini hanya client-side + client wrapper. Endpoint admin di Lovable Cloud harus mengharuskan autentikasi & role-based access.
- Jangan commit LOVABLE_API_KEY ke repo publik.
