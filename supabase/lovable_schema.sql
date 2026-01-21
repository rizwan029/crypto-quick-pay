-- Example SQL schema for Lovable Cloud PostgreSQL
-- Tables: users, transactions, rates, stocks

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  crypto text NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL, -- buy/sell
  status text NOT NULL DEFAULT 'pending',
  meta jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS rates (
  pair text PRIMARY KEY,
  buy numeric NOT NULL,
  sell numeric NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stocks (
  crypto text PRIMARY KEY,
  amount numeric NOT NULL,
  updated_at timestamptz DEFAULT now()
);