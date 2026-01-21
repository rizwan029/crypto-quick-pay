import React, { useState } from 'react';
import { getTransactionStatus } from '../lib/lovableClient';

export default function TransactionStatus() {
  const [id, setId] = useState('');
  const [tx, setTx] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function onCheck(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    try {
      const r = await getTransactionStatus(id.trim());
      setTx(r);
    } catch (err) {
      alert('Gagal mengambil status: ' + err);
      setTx(null);
    } finally { setLoading(false); }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Cek Status Transaksi</h1>
      <form onSubmit={onCheck} className="flex gap-2">
        <input value={id} onChange={e => setId(e.target.value)} placeholder="Masukkan ID transaksi" className="border p-2 flex-1" />
        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">Check</button>
      </form>

      {loading && <div className="mt-4">Loading...</div>}

      {tx && (
        <div className="mt-4 border p-4 rounded">
          <div><strong>ID:</strong> {tx.id}</div>
          <div><strong>Status:</strong> {tx.status}</div>
          <div><strong>Crypto:</strong> {tx.crypto}</div>
          <div><strong>Amount:</strong> {tx.amount}</div>
          <div><strong>Updated:</strong> {tx.updated_at || tx.created_at}</div>
        </div>
      )}
    </div>
  );
}