import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Footer from '@/components/Footer';
import PaymentModal from '@/components/PaymentModal';

interface OrderData {
  idrAmount: number;
  cryptoSymbol: string;
  cryptoAmount: number;
  adminFee: number;
}

const Index = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleBuyClick = (data: OrderData) => {
    setOrderData(data);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection onBuyClick={handleBuyClick} />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        orderData={orderData}
      />
    </div>
  );
};

export default Index;
