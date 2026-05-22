create extension if not exists pgcrypto;

create table if not exists public.bookings (
    id text primary key,
    user_id uuid references auth.users(id) on delete set null,
    guest_name text not null,
    guest_email text not null,
    guest_phone text not null,
    checkin date not null,
    checkout date not null,
    guests integer not null,
    room_id integer,
    room_name text not null,
    room_category text,
    nightly_price numeric(10, 2) not null,
    total_price numeric(10, 2) not null,
    created_at timestamptz not null default now()
);

create table if not exists public.searches (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    country text not null,
    city text not null,
    checkin date not null,
    checkout date not null,
    guests integer not null,
    created_at timestamptz not null default now()
);

create table if not exists public.room_unavailability (
    id uuid primary key default gen_random_uuid(),
    room_id integer not null,
    start_date date not null,
    end_date date not null,
    note text default 'Pilns numurs',
    created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.searches enable row level security;
alter table public.room_unavailability enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Allow public booking inserts" on public.bookings;
drop policy if exists "Allow booking reads" on public.bookings;
drop policy if exists "Allow search inserts" on public.searches;
drop policy if exists "Allow search reads" on public.searches;
drop policy if exists "Allow admin booking reads" on public.bookings;
drop policy if exists "Allow admin search reads" on public.searches;
drop policy if exists "Allow room availability reads" on public.room_unavailability;
drop policy if exists "Allow room availability inserts" on public.room_unavailability;
drop policy if exists "Allow admin room availability reads" on public.room_unavailability;
drop policy if exists "Allow admin self lookup" on public.admin_users;

create policy "Allow public booking inserts"
on public.bookings
for insert
to anon, authenticated
with check (true);

create policy "Allow booking reads"
on public.bookings
for select
to authenticated
using (auth.uid() = user_id);

create policy "Allow admin booking reads"
on public.bookings
for select
to authenticated
using (
    exists (
        select 1
        from public.admin_users
        where admin_users.email = auth.jwt()->>'email'
    )
);

create policy "Allow search inserts"
on public.searches
for insert
to anon, authenticated
with check (true);

create policy "Allow search reads"
on public.searches
for select
to authenticated
using (auth.uid() = user_id);

create policy "Allow admin search reads"
on public.searches
for select
to authenticated
using (
    exists (
        select 1
        from public.admin_users
        where admin_users.email = auth.jwt()->>'email'
    )
);

create policy "Allow room availability reads"
on public.room_unavailability
for select
to anon, authenticated
using (true);

create policy "Allow room availability inserts"
on public.room_unavailability
for insert
to anon, authenticated
with check (true);

create policy "Allow admin self lookup"
on public.admin_users
for select
to authenticated
using (email = auth.jwt()->>'email');

-- Example:
-- insert into public.admin_users (email) values ('your-admin@email.com');
