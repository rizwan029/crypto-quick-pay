import { useState } from 'react';
import { Menu, X, Wallet, TrendingUp, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

function getInitials(name?: string | null, email?: string | null) {
  const src = name || email || "";
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const Avatar = ({ src, name, email }: { src?: string | null; name?: string | null; email?: string | null }) => {
  const initials = getInitials(name, email);
  if (src) {
    return <img src={src} alt={name || email || "avatar"} className="w-8 h-8 rounded-full object-cover" />;
  }
  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Beranda', href: '/', icon: TrendingUp },
    { name: 'Cara Beli', href: '#how-to-buy', icon: Wallet },
    { name: 'Keamanan', href: '#security', icon: Shield },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Sign out error', err);
      alert('Gagal keluar. Periksa console untuk detail.');
    }
  }

  const avatarUrl =
    (user?.user_metadata as any)?.avatar_url ||
    (user?.user_metadata as any)?.picture ||
    null;

  const displayName = (user?.user_metadata as any)?.full_name || user?.email || null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="font-bold text-lg">asugalakxcrypto</div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="text-sm text-foreground hover:underline">
                {l.name}
              </a>
            ))}

            {!user ? (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                >
                  Masuk
                </Button>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-primary/5"
                  aria-expanded={menuOpen}
                >
                  <Avatar src={avatarUrl} name={(user?.user_metadata as any)?.full_name} email={user.email} />
                  <span className="text-sm">{displayName}</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-background border rounded shadow-lg py-1">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 hover:bg-primary/5"
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-red-500 hover:bg-primary/5"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}

            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-blue-400 hover:opacity-90 btn-glow text-primary-foreground font-semibold"
            >
              Beli Crypto
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="block text-sm text-foreground">
                {l.name}
              </a>
            ))}

            {!user ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Masuk</Button>
              </Link>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar src={avatarUrl} name={(user?.user_metadata as any)?.full_name} email={user.email} />
                  <div className="text-sm">{displayName}</div>
                </div>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:bg-primary/5">
                  Profil
                </Link>
                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-red-500 hover:bg-primary/5">
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;