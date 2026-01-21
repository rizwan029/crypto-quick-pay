import { Calculator, CreditCard, Upload, Send } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Calculator,
      step: '01',
      title: 'Pilih & Hitung',
      description: 'Pilih crypto yang ingin dibeli dan masukkan nominal dalam Rupiah.',
    },
    {
      icon: CreditCard,
      step: '02',
      title: 'Transfer Pembayaran',
      description: 'Transfer ke rekening kami dengan nominal yang sudah termasuk kode unik.',
    },
    {
      icon: Upload,
      step: '03',
      title: 'Upload Bukti',
      description: 'Upload screenshot bukti transfer untuk mempercepat verifikasi.',
    },
    {
      icon: Send,
      step: '04',
      title: 'Terima Crypto',
      description: 'Crypto akan dikirim ke wallet kamu dalam 5-15 menit setelah verifikasi.',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="crypto-badge mb-4">Cara Beli</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            <span className="text-foreground">Beli Crypto </span>
            <span className="gradient-text">dalam 4 Langkah</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Proses pembelian yang mudah dan cepat, bahkan untuk pemula sekalipun.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="glass-card p-6 text-center relative group hover:border-primary/30 transition-all">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
