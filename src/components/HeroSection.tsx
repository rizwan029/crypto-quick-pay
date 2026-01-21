import { Shield, Zap, Clock, Users } from 'lucide-react';
import CryptoCalculator from './CryptoCalculator';

interface HeroSectionProps {
  onBuyClick?: (data: {
    idrAmount: number;
    cryptoSymbol: string;
    cryptoAmount: number;
    adminFee: number;
  }) => void;
}

const HeroSection = ({ onBuyClick }: HeroSectionProps) => {
  const features = [
    { icon: Zap, label: 'Proses Cepat', desc: '< 15 menit' },
    { icon: Shield, label: 'Aman & Terpercaya', desc: 'Terenkripsi' },
    { icon: Clock, label: '24/7 Support', desc: 'Non-stop' },
    { icon: Users, label: '10K+ User', desc: 'Puas' },
  ];

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-primary font-medium">P2P Exchange Terpercaya</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Beli Crypto</span>
              <br />
              <span className="gradient-text">Mulai Rp 50.000</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Platform P2P exchange yang aman dan terpercaya. Beli USDT, BTC, ETH dengan transfer bank lokal atau e-wallet favorit kamu.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-card-hover p-4 text-center group"
                >
                  <feature.icon className="w-6 h-6 mx-auto text-primary group-hover:text-accent transition-colors" />
                  <p className="text-sm font-medium mt-2 text-foreground">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                <span className="text-sm">BCA, Mandiri, BRI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span className="text-sm">DANA, OVO, GoPay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📲</span>
                <span className="text-sm">QRIS</span>
              </div>
            </div>
          </div>

          {/* Right Content - Calculator */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CryptoCalculator onBuyClick={onBuyClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
