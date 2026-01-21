import { Shield, Zap, Wallet, HeadphonesIcon, Lock, RefreshCw } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Transaksi Cepat',
      description: 'Proses pembelian crypto selesai dalam hitungan menit setelah pembayaran dikonfirmasi.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
    {
      icon: Shield,
      title: 'Keamanan Terjamin',
      description: 'Semua data transaksi terenkripsi dan kami tidak menyimpan private key wallet.',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Wallet,
      title: 'Multi Payment',
      description: 'Bayar dengan transfer bank lokal (BCA, Mandiri, BRI) atau e-wallet (DANA, OVO, GoPay).',
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      icon: RefreshCw,
      title: 'Harga Real-time',
      description: 'Rate harga crypto terupdate secara real-time dari exchange terkemuka.',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      icon: HeadphonesIcon,
      title: 'Support 24/7',
      description: 'Tim customer service siap membantu kapanpun kamu butuhkan.',
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
    },
    {
      icon: Lock,
      title: 'Minimal Rendah',
      description: 'Mulai beli crypto dari Rp 50.000 saja. Cocok untuk pemula!',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
    },
  ];

  return (
    <section id="how-to-buy" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="crypto-badge mb-4">Kenapa Pilih Kami?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            <span className="text-foreground">Platform </span>
            <span className="gradient-text">Terpercaya</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Kami menyediakan layanan terbaik untuk pembelian crypto dengan harga kompetitif dan keamanan terjamin.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card-hover p-6 group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
