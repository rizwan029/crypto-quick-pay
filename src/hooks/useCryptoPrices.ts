import { useState, useEffect, useCallback } from 'react';
import { CryptoPrice } from '@/lib/crypto';

interface BinancePrice {
  symbol: string;
  price: string;
}

const BINANCE_SYMBOLS = {
  USDT: 'USDTBIDR', // Binance uses BIDR for IDR pairs
  BTC: 'BTCUSDT',
  ETH: 'ETHUSDT',
};

// USDT to IDR rate (since Binance doesn't have direct IDR pairs for all)
const USDT_IDR_FALLBACK = 15850;

export function useCryptoPrices(refreshInterval = 30000) {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({
    USDT: { symbol: 'USDT', price: USDT_IDR_FALLBACK, change24h: 0 },
    BTC: { symbol: 'BTC', price: 1650000000, change24h: 0 },
    ETH: { symbol: 'ETH', price: 58500000, change24h: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setError(null);
      
      // Fetch all prices in parallel
      const [usdtResponse, btcResponse, ethResponse, tickerResponse] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTBIDR'),
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["USDTBIDR","BTCUSDT","ETHUSDT"]'),
      ]);

      // Parse responses
      const usdtData: BinancePrice = await usdtResponse.json();
      const btcData: BinancePrice = await btcResponse.json();
      const ethData: BinancePrice = await ethResponse.json();
      const tickerData = await tickerResponse.json();

      // Get 24h change percentages
      const changes: Record<string, number> = {};
      tickerData.forEach((ticker: { symbol: string; priceChangePercent: string }) => {
        changes[ticker.symbol] = parseFloat(ticker.priceChangePercent);
      });

      // USDT price in IDR (from USDTBIDR pair)
      const usdtPriceIDR = parseFloat(usdtData.price) || USDT_IDR_FALLBACK;
      
      // BTC and ETH prices in USDT, convert to IDR
      const btcPriceUSDT = parseFloat(btcData.price);
      const ethPriceUSDT = parseFloat(ethData.price);

      setPrices({
        USDT: {
          symbol: 'USDT',
          price: usdtPriceIDR,
          change24h: changes['USDTBIDR'] || 0,
        },
        BTC: {
          symbol: 'BTC',
          price: btcPriceUSDT * usdtPriceIDR,
          change24h: changes['BTCUSDT'] || 0,
        },
        ETH: {
          symbol: 'ETH',
          price: ethPriceUSDT * usdtPriceIDR,
          change24h: changes['ETHUSDT'] || 0,
        },
      });

      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch crypto prices:', err);
      setError('Gagal memuat harga. Menggunakan harga terakhir.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchPrices();

    // Set up interval for auto-refresh
    const interval = setInterval(fetchPrices, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  return {
    prices,
    loading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
}
