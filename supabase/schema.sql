-- =============================================
-- Malakesa Transfer & Tour — Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Clients table
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  phone text,
  address text,
  created_at timestamptz default now()
);

-- Invoice number sequence
create sequence if not exists invoice_number_seq start 1001;

-- Invoices table
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  number text unique not null,
  client_id uuid references clients(id) on delete set null,
  client_name text not null,
  client_email text,
  date date not null,
  due_date date not null,
  items jsonb default '[]',
  subtotal numeric(12,2) default 0,
  tax numeric(12,2) default 0,
  total numeric(12,2) default 0,
  notes text,
  status text default 'unpaid',
  created_at timestamptz default now()
);

-- Payments table
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references invoices(id) on delete cascade,
  amount numeric(12,2) not null,
  method text default 'Cash',
  date date not null,
  note text,
  created_at timestamptz default now()
);

-- Seed default clients
insert into clients (name, email, phone, address) values
  ('Paradise Tours Vanuatu', 'info@paradise.vu', '+678 22111', 'Port Vila, Shefa'),
  ('Blue Ocean Resorts', 'reservations@blueocean.vu', '+678 24500', 'Efate Island'),
  ('Pacific Adventure Co.', 'hello@pacadventure.vu', '+678 27890', 'Luganville, Santo')
on conflict do nothing;
