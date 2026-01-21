// Minimal Lovable Cloud client wrapper (TypeScript)
// Uses environment variables VITE_LOVABLE_API_URL and VITE_LOVABLE_API_KEY
export type Transaction = {
  id: string;
  user_id: string;
  crypto: string;
  amount: number;
  type: 'buy' | 'sell';
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at?: string;
};

const LOVABLE_API_URL = import.meta.env.VITE_LOVABLE_API_URL || process.env.VITE_LOVABLE_API_URL;
const LOVABLE_API_KEY = import.meta.env.VITE_LOVABLE_API_KEY || process.env.VITE_LOVABLE_API_KEY;

if (!LOVABLE_API_URL) {
  console.warn('VITE_LOVABLE_API_URL not set — Lovable Cloud calls will fail.');
}

async function request(path: string, opts: RequestInit = {}) {
  const url = `${LOVABLE_API_URL?.replace(/\/$/, '')}/${path.replace(/^	/, '')}`;
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    ...(opts.headers ? (opts.headers as Record<string,string>) : {}),
  };
  if (LOVABLE_API_KEY) headers['Authorization'] = `Bearer ${LOVABLE_API_KEY}`;
  const res = await fetch(url, {...opts, headers});
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LovableCloud ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export async function getPendingOrders(): Promise<Transaction[]> {
  return request('/admin/transactions?status=pending');
}

export async function confirmTransaction(id: string): Promise<Transaction> {
  return request(`/admin/transactions/${id}/confirm`, { method: 'POST' });
}

export async function updateRate(pair: string, buy: number, sell: number) {
  return request(`/admin/rates/${encodeURIComponent(pair)}`, {
    method: 'PUT',
    body: JSON.stringify({ buy, sell }),
  });
}

export async function getStocks() {
  return request('/admin/stocks');
}

export async function updateStock(crypto: string, newAmount: number) {
  return request(`/admin/stocks/${encodeURIComponent(crypto)}`, {
    method: 'PUT',
    body: JSON.stringify({ amount: newAmount }),
  });
}

export async function getTransactionStatus(id: string): Promise<Transaction> {
  return request(`/transactions/${encodeURIComponent(id)}`);
}