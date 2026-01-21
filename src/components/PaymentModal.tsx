import { useState } from 'react';
import { X, Copy, Check, Upload, AlertCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PAYMENT_METHODS,
  PaymentMethod,
  generateUniqueCode,
  formatIDR,
  formatCrypto,
} from '@/lib/crypto';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    idrAmount: number;
    cryptoSymbol: string;
    cryptoAmount: number;
    adminFee: number;
  } | null;
}

type Step = 'payment' | 'upload' | 'confirmation';

const PaymentModal = ({ isOpen, onClose, orderData }: PaymentModalProps) => {
  const [step, setStep] = useState<Step>('payment');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [uniqueCode] = useState(generateUniqueCode());

  if (!isOpen || !orderData) return null;

  const totalAmount = orderData.idrAmount + uniqueCode;
  const bankMethods = PAYMENT_METHODS.filter((m) => m.type === 'bank');
  const ewalletMethods = PAYMENT_METHODS.filter((m) => m.type === 'ewallet');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setProofFile(file);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit to backend
    setStep('confirmation');
  };

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="p-4 rounded-xl bg-secondary/50 border border-white/10">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Ringkasan Order</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Jumlah</span>
            <span className="font-medium">{formatIDR(orderData.idrAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Biaya Admin</span>
            <span className="text-destructive">+{formatIDR(orderData.adminFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kode Unik</span>
            <span className="text-primary">+{uniqueCode}</span>
          </div>
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Transfer</span>
              <span className="text-primary">{formatIDR(totalAmount)}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm text-accent font-medium">
            Kamu akan dapat: {formatCrypto(orderData.cryptoAmount, orderData.cryptoSymbol)}
          </p>
        </div>
      </div>

      {/* Wallet Address */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Alamat Wallet {orderData.cryptoSymbol} Kamu
        </label>
        <Input
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder={`Masukkan alamat wallet ${orderData.cryptoSymbol}`}
          className="input-glass h-12"
        />
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Transfer Bank</h3>
        <div className="grid grid-cols-3 gap-2">
          {bankMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedPayment?.id === method.id
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-secondary/30 hover:border-white/20'
              }`}
            >
              <span className="text-xl">{method.icon}</span>
              <p className="text-xs font-medium mt-1">{method.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">E-Wallet</h3>
        <div className="grid grid-cols-4 gap-2">
          {ewalletMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedPayment?.id === method.id
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-secondary/30 hover:border-white/20'
              }`}
            >
              <span className="text-xl">{method.icon}</span>
              <p className="text-xs font-medium mt-1">{method.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Payment Details */}
      {selectedPayment && selectedPayment.id !== 'qris' && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <h4 className="text-sm font-medium mb-3">Transfer ke:</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  {selectedPayment.type === 'bank' ? 'No. Rekening' : 'Nomor'}
                </p>
                <p className="font-mono font-bold text-lg">{selectedPayment.accountNumber}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(selectedPayment.accountNumber || '')}
                className="border-primary/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Atas Nama</p>
              <p className="font-medium">{selectedPayment.accountName}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div>
                <p className="text-xs text-muted-foreground">Nominal Transfer</p>
                <p className="font-bold text-xl text-primary">{formatIDR(totalAmount)}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(totalAmount.toString())}
                className="border-primary/30"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* QRIS */}
      {selectedPayment?.id === 'qris' && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
            <span className="text-6xl">📲</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Scan QR Code dengan aplikasi favorit</p>
          <p className="font-bold text-xl text-primary mt-2">{formatIDR(totalAmount)}</p>
        </div>
      )}

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-200">
          <p className="font-medium">Penting!</p>
          <p className="text-yellow-200/70 mt-1">
            Transfer TEPAT sesuai nominal <strong>{formatIDR(totalAmount)}</strong> (termasuk kode unik). Pembayaran berbeda nominal akan ditolak.
          </p>
        </div>
      </div>

      <Button
        onClick={() => setStep('upload')}
        disabled={!selectedPayment || !walletAddress}
        className="w-full h-12 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground font-semibold"
      >
        Sudah Transfer
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Upload Bukti Transfer</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload screenshot bukti transfer kamu
        </p>
      </div>

      <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
          id="proof-upload"
        />
        <label htmlFor="proof-upload" className="cursor-pointer block">
          {proofFile ? (
            <div>
              <Check className="w-12 h-12 mx-auto text-accent" />
              <p className="mt-2 font-medium">{proofFile.name}</p>
              <p className="text-sm text-muted-foreground">Klik untuk ganti</p>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Klik untuk upload</p>
              <p className="text-xs text-muted-foreground mt-1">JPG atau PNG, maks 5MB</p>
            </div>
          )}
        </label>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setStep('payment')}
          className="flex-1 h-12 border-white/20"
        >
          Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!proofFile}
          className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground font-semibold"
        >
          Konfirmasi Order
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center animate-pulse-glow">
        <Clock className="w-10 h-10 text-accent" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">Order Berhasil Dibuat!</h3>
        <p className="text-muted-foreground mt-2">
          Kami sedang memverifikasi pembayaran kamu. Proses biasanya selesai dalam 5-15 menit.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-secondary/50 border border-white/10">
        <p className="text-sm text-muted-foreground mb-2">ID Transaksi</p>
        <p className="font-mono text-lg font-bold text-primary">TXN-{Date.now()}</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-muted-foreground">Status</span>
          <span className="crypto-badge status-pending">Pending</span>
        </div>
        <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-muted-foreground">Jumlah</span>
          <span>{formatCrypto(orderData.cryptoAmount, orderData.cryptoSymbol)}</span>
        </div>
        <div className="flex justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-muted-foreground">Wallet</span>
          <span className="font-mono text-xs truncate max-w-[180px]">{walletAddress}</span>
        </div>
      </div>

      <Button onClick={onClose} className="w-full h-12 bg-gradient-to-r from-primary to-blue-400 text-primary-foreground font-semibold">
        Tutup
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-6 max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            {step === 'payment' && 'Instruksi Pembayaran'}
            {step === 'upload' && 'Upload Bukti'}
            {step === 'confirmation' && 'Konfirmasi'}
          </h2>
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {['payment', 'upload', 'confirmation'].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  ['payment', 'upload', 'confirmation'].indexOf(step) >= i
                    ? 'bg-primary'
                    : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        {step === 'payment' && renderPaymentStep()}
        {step === 'upload' && renderUploadStep()}
        {step === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  );
};

export default PaymentModal;
