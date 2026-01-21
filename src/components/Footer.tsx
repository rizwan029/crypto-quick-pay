import { Mail, MessageCircle, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    layanan: [
      { name: 'Beli USDT', href: '#' },
      { name: 'Beli Bitcoin', href: '#' },
      { name: 'Beli Ethereum', href: '#' },
      { name: 'Cek Transaksi', href: '#' },
    ],
    bantuan: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Cara Beli', href: '#how-to-buy' },
      { name: 'Hubungi Kami', href: '#' },
      { name: 'Syarat & Ketentuan', href: '#' },
    ],
    social: [
      { name: 'WhatsApp', icon: MessageCircle, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Email', icon: Mail, href: 'mailto:support@asugalakxcrypto.com' },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">A</span>
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">asugalakx</span>
                <span className="text-[10px] text-muted-foreground block -mt-1 tracking-wider">CRYPTO</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform P2P exchange terpercaya di Indonesia. Beli crypto dengan mudah menggunakan transfer bank lokal.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-2">
              {links.layanan.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Bantuan</h4>
            <ul className="space-y-2">
              {links.bantuan.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hubungi Kami</h4>
            <div className="flex gap-3">
              {links.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                  title={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-xs text-accent">
                💬 Support 24/7 via WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} asugalakxcrypto. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇮🇩 Made in Indonesia</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Secure & Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
