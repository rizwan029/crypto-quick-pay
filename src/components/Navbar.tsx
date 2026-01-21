import { useState } from 'react';
import { Menu, X, Wallet, TrendingUp, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#', icon: TrendingUp },
    { name: 'Cara Beli', href: '#how-to-buy', icon: Wallet },
    { name: 'Keamanan', href: '#security', icon: Shield },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center btn-glow">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text">asugalakx</span>
              <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider">CRYPTO</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <link.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
            >
              Cek Transaksi
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-blue-400 hover:opacity-90 btn-glow text-primary-foreground font-semibold"
            >
              Beli Crypto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5 text-primary/60" />
                {link.name}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-white/10">
              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10"
              >
                Cek Transaksi
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary to-blue-400 text-primary-foreground font-semibold">
                Beli Crypto
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
