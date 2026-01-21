import { useState, useEffect } from 'react';
import { ArrowDownUp, Wallet, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CRYPTO_ASSETS,
  MOCK_PRICES,
  calculateCryptoAmount,
  formatIDR,
  formatCrypto,
  ADMIN_FEE_PERCENTAGE,
} from '@/lib/crypto';

interface CryptoCalculatorProps {
  onBuyClick?: (data: {
    idrAmount: number;
    cryptoSymbol: string;
    cryptoAmount: number;
    adminFee: number;
  }) => void;
}

const CryptoCalculator = ({ onBuyClick }: CryptoCalculatorProps) => {
  const [idrAmount, setIdrAmount] = useState<string>('100000');
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_ASSETS[0]);
  const [cryptoResult, setCryptoResult] = useState({ cryptoAmount: 0, adminFee: 0, totalIdr: 0 });

  useEffect(() => {
    const amount = parseFloat(idrAmount.replace(/\D/g, '')) || 0;
    const price = MOCK_PRICES[selectedCrypto.symbol]?.price || 0;
    const result = calculateCryptoAmount(amount, price);
    setCryptoResult(result);
  }, [idrAmount, selectedCrypto]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setIdrAmount(value);
  };

  const quickAmounts = [100000, 250000, 500000, 1000000];
  const currentPrice = MOCK_PRICES[selectedCrypto.symbol];

  const handleBuyClick = () => {
    const amount = parseFloat(idrAmount.replace(/\D/g, '')) || 0;
    if (amount >= 50000 && onBuyClick) {
      onBuyClick({
        idrAmount: amount,
        cryptoSymbol: selectedCrypto.symbol,
        cryptoAmount: cryptoResult.cryptoAmount,
        adminFee: cryptoResult.adminFee,
      });
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Beli Crypto</h2>
        <span className="crypto-badge">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Live Rate
        </span>
      </div>

      {/* Crypto Selection */}
      <div className="flex gap-2 mb-6">
        {CRYPTO_ASSETS.map((crypto) => {
          const price = MOCK_PRICES[crypto.symbol];
          const isSelected = selectedCrypto.id === crypto.id;
          return (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto)}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-secondary/30 hover:border-white/20'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl">{crypto.icon}</span>
                <p className="text-xs font-medium mt-1" style={{ color: crypto.color }}>
                  {crypto.symbol}
                </p>
                {price && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {price.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-accent" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span
                      className={`text-[10px] ${
                        price.change24h >= 0 ? 'text-accent' : 'text-destructive'
                      }`}
                    >
                      {price.change24h > 0 ? '+' : ''}
                      {price.change24h}%
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Jumlah (IDR)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              Rp
            </span>
            <Input
              type="text"
              value={parseFloat(idrAmount || '0').toLocaleString('id-ID')}
              onChange={handleAmountChange}
              className="pl-12 h-14 text-xl font-semibold input-glass text-foreground"
              placeholder="0"
            />
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="flex gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setIdrAmount(amount.toString())}
              className="flex-1 py-2 text-xs font-medium rounded-lg border border-white/10 bg-secondary/30 hover:bg-secondary/50 hover:border-white/20 transition-all"
            >
              {formatIDR(amount).replace('Rp', '').trim()}
            </button>
          ))}
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center py-2">
          <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
            <ArrowDownUp className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Result */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-white/10">
          <label className="text-sm text-muted-foreground mb-2 block">Kamu Dapat</label>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {formatCrypto(cryptoResult.cryptoAmount, selectedCrypto.symbol)}
            </span>
            <span className="text-2xl">{selectedCrypto.icon}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="text-foreground">
                1 {selectedCrypto.symbol} = {formatIDR(currentPrice?.price || 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Biaya Admin ({ADMIN_FEE_PERCENTAGE}%)</span>
              <span className="text-destructive">-{formatIDR(cryptoResult.adminFee)}</span>
            </div>
          </div>
        </div>

        {/* Minimum Warning */}
        {parseFloat(idrAmount || '0') < 50000 && idrAmount !== '' && (
          <div className="flex items-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>Minimal pembelian Rp 50.000</span>
          </div>
        )}

        {/* Buy Button */}
        <Button
          onClick={handleBuyClick}
          disabled={parseFloat(idrAmount || '0') < 50000}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-blue-400 hover:opacity-90 btn-glow disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground"
        >
          <Wallet className="w-5 h-5 mr-2" />
          Beli {selectedCrypto.symbol} Sekarang
        </Button>
      </div>
    </div>
  );
};

export default CryptoCalculator;
