import React, { useEffect, useState } from 'react';
import { getPendingOrders, confirmTransaction, getStocks, updateRate, updateStock } from '../lib/lovableClient';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pair, setPair] = useState('BTC/IDR');
  const [buy, setBuy] = useState<number | ''>('');
  const [sell, setSell] = useState<number | ''>('');

  async function load() {
    setLoading(true);
    try {
      const o = await getPendingOrders();
      setOrders(o);
    } catch (e) {
      console.error(e);
      alert('Gagal mengambil orders: ' + e);
    } finally { setLoading(false); }
  }

  async function loadStocks() {
    try {
      const s = await getStocks();
      setStocks(s);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); loadStocks(); }, []);

  async function onConfirm(id: string) {
    try {
      await confirmTransaction(id);
      alert('Transaction confirmed: ' + id);
      load();
      loadStocks();
    } catch (e) { alert('Confirm error: ' + e); }
  }

  async function onUpdateRate() {
    if (buy === '' || sell === '') return alert('Masukkan buy & sell');
    try {
      await updateRate(pair, Number(buy), Number(sell));
      alert('Rate updated');
    } catch (e) { alert('Update rate error: ' + e); }
  }

  async function onUpdateStock(crypto: string) {
    const newAmount = prompt(`New amount for ${crypto}`);
    if (!newAmount) return;
    await updateStock(crypto, Number(newAmount));
    await loadStocks();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="font-semibold">Update Rate</h2>
        <div className="flex gap-2 items-center mt-2">
          <input value={pair} onChange={e => setPair(e.target.value)} className="border p-2" />
          <input value={buy} onChange={e => setBuy(Number(e.target.value) || '')} placeholder="Buy" className="border p-2 w-32" />
          <input value={sell} onChange={e => setSell(Number(e.target.value) || '')} placeholder="Sell" className="border p-2 w-32" />
          <button onClick={onUpdateRate} className="bg-blue-600 text-white px-3 py-2 rounded">Update</button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Pending Orders</h2>
        {loading ? <div>Loading...</div> : (
          <table className="w-full mt-2 table-auto border-collapse">
            <thead><tr><th>ID</th><th>User</th><th>Crypto</th><th>Amount</th><th>Type</th><th>Action</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t">
                  <td>{o.id}</td>
                  <td>{o.user_id}</td>
                  <td>{o.crypto}</td>
                  <td>{o.amount}</td>
                  <td>{o.type}</td>
                  <td><button onClick={() => onConfirm(o.id)} className="bg-green-600 text-white px-2 py-1 rounded">Confirm</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="font-semibold">Crypto Stocks</h2>
        <ul className="mt-2">
          {stocks.map((s: any) => (
            <li key={s.crypto} className="flex justify-between border p-2 rounded mb-2">
              <div>{s.crypto} — {s.amount}</div>
              <div>
                <button onClick={() => onUpdateStock(s.crypto)} className="bg-yellow-500 text-white px-2 py-1 rounded">Update Stock</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}