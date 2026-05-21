create table if not exists public.bookings (
    id text primary key,
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

alter table public.bookings enable row level security;

drop policy if exists "Allow public booking inserts" on public.bookings;

create policy "Allow public booking inserts"
on public.bookings
for insert
to anon
with check (true);
