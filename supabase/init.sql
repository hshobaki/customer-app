-- Supabase init migration: creates customers table
create table if not exists public.customers (
  id serial primary key,
  name text not null,
  email text,
  phone text
);
