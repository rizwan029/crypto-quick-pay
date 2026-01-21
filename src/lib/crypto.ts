// Crypto utility functions and types

export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

export const CRYPTO_ASSETS: CryptoAsset[] = [
  { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '💵', color: '#26A17B' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
];

export const ADMIN_FEE_PERCENTAGE = 2; // 2% admin fee

// Mock prices (will be replaced with real API)
export const MOCK_PRICES: Record<string, CryptoPrice> = {
  USDT: { symbol: 'USDT', price: 15850, change24h: 0.12 },
  BTC: { symbol: 'BTC', price: 1650000000, change24h: 2.45 },
  ETH: { symbol: 'ETH', price: 58500000, change24h: -1.23 },
};

export function calculateCryptoAmount(
  idrAmount: number,
  cryptoPrice: number,
  adminFeePercent: number = ADMIN_FEE_PERCENTAGE
): { cryptoAmount: number; adminFee: number; totalIdr: number } {
  const adminFee = (idrAmount * adminFeePercent) / 100;
  const netAmount = idrAmount - adminFee;
  const cryptoAmount = netAmount / cryptoPrice;
  
  return {
    cryptoAmount,
    adminFee,
    totalIdr: idrAmount,
  };
}

export function generateUniqueCode(): number {
  return Math.floor(Math.random() * 900) + 100; // 3 digit unique code
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCrypto(amount: number, symbol: string): string {
  const decimals = symbol === 'BTC' ? 8 : symbol === 'ETH' ? 6 : 2;
  return `${amount.toFixed(decimals)} ${symbol}`;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet';
  icon: string;
  accountNumber?: string;
  accountName?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bca', name: 'BCA', type: 'bank', icon: '🏦', accountNumber: '1234567890', accountName: 'PT Asugalakx Crypto' },
  { id: 'mandiri', name: 'Mandiri', type: 'bank', icon: '🏦', accountNumber: '0987654321', accountName: 'PT Asugalakx Crypto' },
  { id: 'bri', name: 'BRI', type: 'bank', icon: '🏦', accountNumber: '5678901234', accountName: 'PT Asugalakx Crypto' },
  { id: 'dana', name: 'DANA', type: 'ewallet', icon: '📱', accountNumber: '08123456789', accountName: 'Asugalakx Crypto' },
  { id: 'ovo', name: 'OVO', type: 'ewallet', icon: '📱', accountNumber: '08123456789', accountName: 'Asugalakx Crypto' },
  { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: '📱', accountNumber: '08123456789', accountName: 'Asugalakx Crypto' },
  { id: 'qris', name: 'QRIS', type: 'ewallet', icon: '📲', accountNumber: '', accountName: 'Scan QR Code' },
];

export type TransactionStatus = 'pending' | 'reviewing' | 'completed' | 'cancelled';

export interface Transaction {
  id: string;
  userId: string;
  cryptoSymbol: string;
  cryptoAmount: number;
  idrAmount: number;
  adminFee: number;
  uniqueCode: number;
  totalAmount: number;
  paymentMethod: string;
  walletAddress: string;
  status: TransactionStatus;
  proofUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
